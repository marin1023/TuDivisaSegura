import React from "react";

const Banner = () => {
  return (
    <div className="w-full bg-blue-900 text-white">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between p-6 md:p-8">
        
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left p-4 md:pr-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight md:leading-normal">
            Intercambio de Remesas y Divisas Seguras
          </h1>
          <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-200">
            En <span className="font-semibold">TuDivisaSegura</span>, ofrecemos un
            servicio transparente, seguro y eficiente de Intercambio
            para que tu dinero llegue rápido y con las mejores
            tasas.
          </p>

          <button
            className="mt-6 bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Conoce más
          </button>
        </div>

        <div className="flex-1 w-full md:w-1/2 p-4">
          <img
            src="/cambios-ofic.png"
            alt="Intercambio de Divisas"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        
      </div>
    </div>
  );
};

export default Banner;