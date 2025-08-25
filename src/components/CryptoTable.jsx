import React, { useState, useEffect } from 'react';

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => {
        setCryptoData(data);
      });
  }, []);

  return (
    <div className="crypto-table">
      <h3>Mercado de Criptomonedas</h3>
      <div className="crypto-cards-container">
        {cryptoData.map(crypto => (
          <div key={crypto.id} className="crypto-card">
            <img src={crypto.image} alt={crypto.name} width="40" />
            <div className="crypto-info">
              <h4>{crypto.name}</h4>
              <p>{crypto.symbol.toUpperCase()}</p>
            </div>
            <div className="crypto-price">
              <p>${crypto.current_price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .crypto-table {
          margin-bottom: 4rem;
          text-align: center;
        }
        h3 {
          margin-bottom: 2rem;
          font-weight: 700;
          font-size: 1.5rem; /* 24px */
        }
        .crypto-cards-container {
          display: grid;
          gap: 1rem;
          /* Mobile-first: 1 column */
          grid-template-columns: 1fr;
        }
        .crypto-card {
          display: flex;
          align-items: center;
          background: var(--card-background);
          padding: 1rem;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .crypto-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.15);
        }
        .crypto-card img {
          margin-right: 1rem;
        }
        .crypto-info {
          flex-grow: 1;
          text-align: left;
        }
        .crypto-info h4, .crypto-info p {
          margin: 0;
        }
        .crypto-info h4 {
          font-size: 1rem;
        }
        .crypto-info p {
          font-size: 0.9rem;
          color: var(--secondary-color);
        }
        .crypto-price p {
          font-weight: 700;
          font-size: 1rem;
        }
        
        /* Small screens and up: 2 columns */
        @media (min-width: 640px) {
          .crypto-cards-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
        
        /* Medium screens and up: 3 columns */
        @media (min-width: 768px) {
          .crypto-cards-container {
            grid-template-columns: repeat(3, 1fr);
          }
          .crypto-price p {
            font-size: 1.1rem;
          }
        }

        /* Large screens and up: 5 columns */
        @media (min-width: 1024px) {
          .crypto-cards-container {
            grid-template-columns: repeat(5, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default CryptoTable;