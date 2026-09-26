import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Banknote, Clock, MapPin } from 'lucide-react';
import { formatCurrency } from '@/api/EcommerceApi.js';

const EfectyPaymentFlow = ({ onConfirm, isProcessing, total, currencyInfo }) => {
  const [reference, setReference] = useState('');

  useEffect(() => {
    // Generate a random 8 digit reference
    setReference(Math.floor(10000000 + Math.random() * 90000000).toString());
  }, []);

  const handleSubmit = () => {
    onConfirm({
      efectyReference: reference,
      paymentReference: `EFE-${reference}`
    });
  };

  return (
    <div className="space-y-6 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Banknote className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Pago en Efectivo (Efecty)</h3>
          <p className="text-slate-500 text-sm">Paga de forma física en cualquier punto Efecty</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center space-y-4">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Convenio: <span className="text-slate-900">123456</span></p>
        
        <div>
          <p className="text-sm text-slate-500 mb-1">Referencia de Pago generada:</p>
          <div className="text-4xl font-mono font-extrabold text-slate-900 tracking-widest bg-white inline-block px-6 py-3 rounded-xl border-2 border-primary/20 shadow-sm">
            {reference}
          </div>
        </div>

        <div>
          <p className="text-sm text-slate-500 mb-1">Valor a pagar:</p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(total, currencyInfo)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex gap-3 p-4 rounded-xl bg-orange-50 border border-orange-100 text-orange-800">
          <Clock className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium leading-tight">
            Tienes <span className="font-bold">3 días hábiles</span> para realizar el pago antes de que tu orden sea cancelada.
          </p>
        </div>
        <div className="flex gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-800">
          <MapPin className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium leading-tight">
            Acércate a cualquier punto Efecty a nivel nacional e indica el convenio y tu referencia.
          </p>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isProcessing}
        className="w-full h-14 text-lg font-bold rounded-xl shadow-lg bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-1 transition-transform"
      >
        {isProcessing ? 'Procesando...' : 'Generar Orden y Confirmar'}
      </Button>
    </div>
  );
};

export default EfectyPaymentFlow;