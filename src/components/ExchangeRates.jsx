import React, { useState, useEffect } from 'react';

const ExchangeRates = () => {
  const [bcvRate, setBcvRate] = useState(null);
  const [penRate, setPenRate] = useState(null);

  useEffect(() => {
    // Simulación de API para BCV
    setBcvRate(136.89);

    // Tasa de PEN/USD de XE.com
    setPenRate(3.555);

  }, []);

  return (
    <div className="exchange-rates">
      <h3>Tasas de Referencia</h3>
      <div className="rates-container">
        <div className="rate-card">
          <h4>Dólar BCV (VES)</h4>
          <p>{bcvRate ? `${bcvRate}` : 'Cargando...'}</p>
        </div>
        <div className="rate-card">
          <h4>Dólar (USD) a Sol (PEN)</h4>
          <p>{penRate ? `S/ ${penRate}` : 'Cargando...'}</p>
        </div>
      </div>
      <style jsx>{`
        .exchange-rates {
          margin-bottom: 4rem;
          text-align: center;
        }
        h3 {
          margin-bottom: 5rem;
          font-weight: 700;
          padding: 1rem;
          
        }
        .rates-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          justify-content: center;
        }
        .rate-card {
          background: var(--card-background);
          padding: 2rem;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .rate-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.15);
        }
        .rate-card h4 {
          margin: 0 0 0.5rem 0;
          color: var(--secondary-color);
          font-weight: 400;
        }
        .rate-card p {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
          color: var(--primary-color);
        }
      `}</style>
    </div>
  );
};

export default ExchangeRates;