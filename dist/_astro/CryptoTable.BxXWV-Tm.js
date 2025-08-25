import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as a}from"./index.BVOCwoKb.js";const c=()=>{const[t,o]=a.useState([]);return a.useEffect(()=>{fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false").then(e=>e.json()).then(e=>{o(e)})},[]),r.jsxs("div",{className:"crypto-table",children:[r.jsx("h3",{children:"Mercado de Criptomonedas"}),r.jsx("div",{className:"crypto-cards-container",children:t.map(e=>r.jsxs("div",{className:"crypto-card",children:[r.jsx("img",{src:e.image,alt:e.name,width:"50"}),r.jsxs("div",{className:"crypto-info",children:[r.jsx("h4",{children:e.name}),r.jsx("p",{children:e.symbol.toUpperCase()})]}),r.jsx("div",{className:"crypto-price",children:r.jsxs("p",{children:["$",e.current_price.toLocaleString()]})})]},e.id))}),r.jsx("style",{jsx:!0,children:`
        .crypto-table {
          margin-bottom: 4rem;
          text-align: center;
        }
        h3 {
          margin-bottom: 2rem;
          font-weight: 700;
          font-size: 24px;
        }
        .crypto-cards-container {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
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
          font-size: 1.1rem;
        }
        @media (max-width: 768px) {
          .crypto-cards-container {
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          }
        }
      `})]})};export{c as default};
