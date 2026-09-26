import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, ShieldCheck } from 'lucide-react';
import CreditCardForm from './CreditCardForm.jsx';
import { validateCardNumber } from '@/lib/luhnValidator.js';

const CreditCardPaymentFlow = ({ onConfirm, isProcessing }) => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLocalProcessing, setIsLocalProcessing] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!cardData.cardholderName.trim()) newErrors.cardholderName = "El titular es requerido";
    
    const rawCard = cardData.cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(rawCard) || !validateCardNumber(rawCard)) {
      newErrors.cardNumber = "Número de tarjeta inválido";
    }
    
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = "Usa formato MM/YY";
    }
    
    if (!/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = "CVV inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsLocalProcessing(true);
      
      // Simulate 2-3 second processing state
      setTimeout(() => {
        setIsLocalProcessing(false);
        const last4 = cardData.cardNumber.replace(/\s/g, '').slice(-4);
        onConfirm({
          paymentReference: `CC-****${last4}-${Math.floor(Math.random() * 10000)}`,
        });
      }, 2500);
    }
  };

  const loading = isProcessing || isLocalProcessing;

  return (
    <div className="space-y-6 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
      
      {/* Loading Overlay */}
      {isLocalProcessing && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
          <h4 className="text-xl font-bold text-slate-800">Procesando pago...</h4>
          <p className="text-slate-500 mt-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-success" />
            Conectando con la pasarela segura
          </p>
        </div>
      )}

      <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <CreditCard className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Pago con Tarjeta</h3>
          <p className="text-slate-500 text-sm">Transacción 100% segura y encriptada</p>
        </div>
      </div>

      <CreditCardForm 
        data={cardData} 
        onChange={setCardData} 
        errors={errors} 
      />

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full h-14 text-lg font-bold rounded-xl shadow-lg bg-gradient-to-r from-primary to-accent text-white hover:-translate-y-1 transition-transform mt-6"
      >
        {loading ? 'Procesando...' : 'Confirmar y Pagar'}
      </Button>
    </div>
  );
};

export default CreditCardPaymentFlow;