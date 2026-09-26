import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

import PSEPaymentFlow from './PSEPaymentFlow.jsx';
import EfectyPaymentFlow from './EfectyPaymentFlow.jsx';
import BankTransferPaymentFlow from './BankTransferPaymentFlow.jsx';
import CreditCardPaymentFlow from './CreditCardPaymentFlow.jsx';

const PaymentMethodFlow = ({ method, total, currencyInfo, onConfirm, onBack, isProcessing }) => {
  const renderFlow = () => {
    switch (method) {
      case 'pse':
        return <PSEPaymentFlow onConfirm={onConfirm} isProcessing={isProcessing} />;
      case 'efecty':
        return <EfectyPaymentFlow onConfirm={onConfirm} isProcessing={isProcessing} total={total} currencyInfo={currencyInfo} />;
      case 'transferencia':
        return <BankTransferPaymentFlow onConfirm={onConfirm} isProcessing={isProcessing} />;
      case 'tarjeta':
      default:
        return <CreditCardPaymentFlow onConfirm={onConfirm} isProcessing={isProcessing} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <Button 
        variant="ghost" 
        onClick={onBack} 
        disabled={isProcessing}
        className="text-slate-500 hover:text-primary pl-0"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Volver a información
      </Button>
      
      {renderFlow()}
    </motion.div>
  );
};

export default PaymentMethodFlow;