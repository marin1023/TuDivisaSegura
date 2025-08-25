import{j as r}from"./jsx-runtime.D_zvdyIk.js";import{r as e}from"./index.BVOCwoKb.js";const d=()=>{const[a,s]=e.useState(null),[t,n]=e.useState(null);return e.useEffect(()=>{s(136.89),n(3.555)},[]),r.jsxs("div",{className:"exchange-rates",children:[r.jsx("h3",{children:"Tasas de Referencia"}),r.jsxs("div",{className:"rates-container",children:[r.jsxs("div",{className:"rate-card",children:[r.jsx("h4",{children:"Dólar BCV (VES)"}),r.jsx("p",{children:a?`${a}`:"Cargando..."})]}),r.jsxs("div",{className:"rate-card",children:[r.jsx("h4",{children:"Dólar (USD) a Sol (PEN)"}),r.jsx("p",{children:t?`S/ ${t}`:"Cargando..."})]})]}),r.jsx("style",{jsx:!0,children:`
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
      `})]})};export{d as default};
