import React from 'react';

const PaymentMethodsBanner = () => {
  const methods = ['PSE', 'Nequi', 'Daviplata', 'Visa', 'Efecty'];

  // Duración del recorrido completo a través de la pantalla
  const duration = 22;

  return (
    <div className="w-full bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--primary))] overflow-hidden relative h-[44px] z-10 flex items-center">
      {/* Degradado sutil para profundidad */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" aria-hidden="true" />

      {methods.map((method, index) => {
        // Retrasos escalonados para distribuir los items uniformemente
        const delay = (duration / methods.length) * index * -1;

        return (
          <div
            key={method}
            className="absolute left-0 animate-scroll-item flex items-center justify-center whitespace-nowrap"
            style={{
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            <span className="text-sm font-semibold tracking-[0.12em] uppercase text-white drop-shadow-sm">
              {method}
            </span>
            <div className="w-1 h-1 rounded-full bg-white/70 mx-6" aria-hidden="true" />
          </div>
        );
      })}
    </div>
  );
};

export default PaymentMethodsBanner;
