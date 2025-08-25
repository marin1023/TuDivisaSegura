import React, { useState, useEffect, useCallback } from 'react';

const Calculator = () => {
    const [sendAmount, setSendAmount] = useState('100');
    const [receiveAmount, setReceiveAmount] = useState('');
    const [sendCurrency, setSendCurrency] = useState('USD');
    const [receiveCurrency, setReceiveCurrency] = useState('PEN');
    const [exchangeRates, setExchangeRates] = useState({});
    const [lastEdited, setLastEdited] = useState('send'); // 'send' or 'receive'

    const commissionRates = {
        DEFAULT: 0.04, // 4% default commission
        PEN_VES: 0,      // 0% commission for PEN to VES (and vice-versa)
    };

    const getCommissionRate = useCallback((from, to) => {
        const key1 = `${from}_${to}`;
        const key2 = `${to}_${from}`;
        if (commissionRates[key1] !== undefined) {
            return commissionRates[key1];
        }
        if (commissionRates[key2] !== undefined) {
            return commissionRates[key2];
        }
        return commissionRates.DEFAULT;
    }, [commissionRates]);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                // --- API Calls ---
                const cryptoPromise = fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,eur,pen');
                const usdRatesPromise = fetch('https://api.frankfurter.app/latest?from=USD&to=EUR,PEN');
                const eurRatesPromise = fetch('https://api.frankfurter.app/latest?from=EUR&to=USD,PEN');
                const penRatesPromise = fetch('https://api.frankfurter.app/latest?from=PEN&to=USD,EUR');

                const [cryptoResponse, usdRatesResponse, eurRatesResponse, penRatesResponse] = await Promise.all([
                    cryptoPromise,
                    usdRatesPromise,
                    eurRatesPromise,
                    penRatesPromise
                ]);

                const cryptoData = await cryptoResponse.json();
                const usdRatesData = await usdRatesResponse.json();
                const eurRatesData = await eurRatesResponse.json();
                const penRatesData = await penRatesResponse.json();

                // --- Manual & Hardcoded Rates ---
                // Modifica el valor de la siguiente linea para cambiar la tasa de Dolar a Bolivar
                const usdToVesRate = 136.89;
                // La siguiente linea calcula la tasa de PEN a VES basado en la regla de 3 PEN = 131.13 VES
                const penToVesRate = usdToVesRate / 3;

                const rates = {
                    USD: {
                        EUR: usdRatesData.rates.EUR,
                        PEN: usdRatesData.rates.PEN,
                        BTC: 1 / cryptoData.bitcoin.usd,
                        ETH: 1 / cryptoData.ethereum.usd,
                        VES: usdToVesRate
                    },
                    EUR: {
                        USD: eurRatesData.rates.USD,
                        PEN: eurRatesData.rates.PEN,
                        BTC: 1 / cryptoData.bitcoin.eur,
                        ETH: 1 / cryptoData.ethereum.eur,
                        VES: eurRatesData.rates.USD * usdToVesRate
                    },
                    PEN: {
                        USD: penRatesData.rates.USD,
                        EUR: penRatesData.rates.EUR,
                        BTC: 1 / cryptoData.bitcoin.pen,
                        ETH: 1 / cryptoData.ethereum.pen,
                        VES: penToVesRate
                    },
                    BTC: {
                        USD: cryptoData.bitcoin.usd,
                        EUR: cryptoData.bitcoin.eur,
                        PEN: cryptoData.bitcoin.pen,
                        ETH: cryptoData.bitcoin.usd / cryptoData.ethereum.usd,
                        VES: cryptoData.bitcoin.usd * usdToVesRate
                    },
                    ETH: {
                        USD: cryptoData.ethereum.usd,
                        EUR: cryptoData.ethereum.eur,
                        PEN: cryptoData.ethereum.pen,
                        BTC: cryptoData.ethereum.usd / cryptoData.bitcoin.usd,
                        VES: cryptoData.ethereum.usd * usdToVesRate
                    },
                    VES: {
                        USD: 1 / usdToVesRate,
                        EUR: 1 / (eurRatesData.rates.USD * usdToVesRate),
                        PEN: 1 / penToVesRate,
                        BTC: 1 / (cryptoData.bitcoin.usd * usdToVesRate),
                        ETH: 1 / (cryptoData.ethereum.usd * usdToVesRate),
                    }
                };
                setExchangeRates(rates);
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
                // Fallback to manual rates in case of API error
                const usdToVesRate = 136.89;
                const penToVesRate = 136.89 / 3;
                setExchangeRates({
                    USD: { EUR: 0.92, VES: usdToVesRate, PEN: 3.7, BTC: 1/60000, ETH: 1/3000 },
                    EUR: { USD: 1.08, VES: 1.08 * usdToVesRate, PEN: 4.0, BTC: 1/55000, ETH: 1/2800 },
                    VES: { USD: 1/usdToVesRate, EUR: 1/(1.08 * usdToVesRate), PEN: 1/penToVesRate, BTC: 1/(60000 * usdToVesRate), ETH: 1/(3000*usdToVesRate) },
                    PEN: { USD: 0.27, EUR: 0.25, VES: penToVesRate, BTC: 1/222000, ETH: 1/11100 },
                    BTC: { USD: 60000, EUR: 55000, PEN: 222000, VES: 60000 * usdToVesRate, ETH: 20 },
                    ETH: { USD: 3000, EUR: 2800, PEN: 11100, VES: 3000 * usdToVesRate, BTC: 0.05 },
                });
            }
        };

        fetchRates();
    }, []);

    const calculateConversion = useCallback(() => {
        if (Object.keys(exchangeRates).length === 0) return;

        const commissionRate = getCommissionRate(sendCurrency, receiveCurrency);

        if (lastEdited === 'send') {
            const amountToSend = parseFloat(sendAmount);
            if (!amountToSend || isNaN(amountToSend)) {
                setReceiveAmount('');
                return;
            }
            const conversionRate = exchangeRates[sendCurrency]?.[receiveCurrency];
            if (!conversionRate) {
                setReceiveAmount('');
                return;
            }
            const amountAfterCommission = amountToSend * (1 - commissionRate);
            const calculatedReceiveAmount = amountAfterCommission * conversionRate;
            setReceiveAmount(calculatedReceiveAmount.toFixed(2));
        } else { // lastEdited === 'receive'
            const amountToReceive = parseFloat(receiveAmount);
            if (!amountToReceive || isNaN(amountToReceive)) {
                setSendAmount('');
                return;
            }
            const conversionRate = exchangeRates[sendCurrency]?.[receiveCurrency];
            if (!conversionRate) {
                setSendAmount('');
                return;
            }
            const calculatedSendAmount = amountToReceive / conversionRate / (1 - commissionRate);
            setSendAmount(calculatedSendAmount.toFixed(2));
        }
    }, [sendAmount, receiveAmount, sendCurrency, receiveCurrency, exchangeRates, lastEdited, getCommissionRate]);

    useEffect(() => {
        calculateConversion();
    }, [calculateConversion]);

    const handleSendAmountChange = (e) => {
        setSendAmount(e.target.value);
        setLastEdited('send');
    };

    const handleReceiveAmountChange = (e) => {
        setReceiveAmount(e.target.value);
        setLastEdited('receive');
    };

    const handleSendCurrencyChange = (e) => {
        setSendCurrency(e.target.value);
    };

    const handleReceiveCurrencyChange = (e) => {
        setReceiveCurrency(e.target.value);
    };

    const currentCommissionRate = getCommissionRate(sendCurrency, receiveCurrency);
    const commissionValue = sendAmount ? (parseFloat(sendAmount) * currentCommissionRate).toFixed(2) : '0.00';

    const handleStartNow = () => {
        const message = `Hola, vengo de TuDivisaSegura y quisiera hacer una consulta sobre la siguiente conversión:\n- Envío: ${sendAmount} ${sendCurrency}\n- Recibes: ${receiveAmount} ${receiveCurrency}\n- Comisión (${(currentCommissionRate * 100).toFixed(0)}%): ${commissionValue} ${sendCurrency}`;
        const whatsappUrl = `https://wa.me/51925846218?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="flex flex-col items-center justify-center font-sans p-4">
            <div className="w-full max-w-lg p-6 md:p-8 space-y-6 bg-white rounded-2xl shadow-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">Conversor de Divisas</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="sendAmount" className="text-sm font-medium text-gray-600">ENVIAS</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                                id="sendAmount"
                                type="number"
                                value={sendAmount}
                                onChange={handleSendAmountChange}
                                placeholder="0.00"
                                className="flex-1 block w-full px-3 py-2 md:px-4 md:py-3 text-base md:text-lg text-gray-900 bg-gray-50 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            <select
                                value={sendCurrency}
                                onChange={handleSendCurrencyChange}
                                className="px-3 py-2 md:px-4 md:py-3 bg-gray-100 border-t border-b border-r border-gray-300 text-gray-900 rounded-r-md focus:ring-blue-500 focus:border-blue-500 text-base md:text-lg"
                            >
                                {Object.keys(exchangeRates).map(currency => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="receiveAmount" className="text-sm font-medium text-gray-600">RECIBES</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                                id="receiveAmount"
                                type="number"
                                value={receiveAmount}
                                onChange={handleReceiveAmountChange}
                                placeholder="0.00"
                                className="flex-1 block w-full px-3 py-2 md:px-4 md:py-3 text-base md:text-lg text-gray-900 bg-gray-50 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            <select
                                value={receiveCurrency}
                                onChange={handleReceiveCurrencyChange}
                                className="px-3 py-2 md:px-4 md:py-3 bg-gray-100 border-t border-b border-r border-gray-300 text-gray-900 rounded-r-md focus:ring-blue-500 focus:border-blue-500 text-base md:text-lg"
                            >
                                {Object.keys(exchangeRates).map(currency => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="text-sm text-center text-gray-500">
                    <p>Comisión de envío ({currentCommissionRate * 100}%): <span className="font-semibold text-gray-700">{commissionValue} {sendCurrency}</span></p>
                </div>

                <button
                    onClick={handleStartNow}
                    disabled={!sendAmount || !receiveAmount}
                    className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Comenzar Ahora
                </button>
            </div>
        </div>
    );
};

export default Calculator;

