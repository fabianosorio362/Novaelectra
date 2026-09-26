import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Lock } from 'lucide-react';

const CreditCardForm = ({ data, onChange, errors }) => {
  const handleChange = (e) => {
    let { name, value } = e.target;
    
    if (name === 'cardNumber') {
      value = value.replace(/\D/g, '').substring(0, 16);
      value = value.replace(/(\d{4})/g, '$1 ').trim();
    }
    
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '').substring(0, 4);
      if (value.length >= 3) {
        value = `${value.substring(0,2)}/${value.substring(2,4)}`;
      }
    }
    
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 4);
    }
    
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="mt-5 p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-5 shadow-inner">
      <div className="flex items-center gap-2 mb-2 text-sm text-slate-500 font-medium">
        <Lock className="h-4 w-4" /> Los datos de tu tarjeta están encriptados
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cardNumber" className="text-slate-700">Número de Tarjeta</Label>
        <div className="relative">
          <Input 
            id="cardNumber" 
            name="cardNumber" 
            value={data.cardNumber} 
            onChange={handleChange} 
            className={`h-12 pl-12 font-mono text-base ${errors.cardNumber ? 'border-destructive bg-destructive/5' : 'bg-white'}`} 
            placeholder="0000 0000 0000 0000" 
          />
          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        </div>
        {errors.cardNumber && <p className="text-xs text-destructive font-medium">{errors.cardNumber}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cardholderName" className="text-slate-700">Nombre del Titular</Label>
        <Input 
          id="cardholderName" 
          name="cardholderName" 
          value={data.cardholderName} 
          onChange={handleChange} 
          className={`h-12 ${errors.cardholderName ? 'border-destructive bg-destructive/5' : 'bg-white'}`} 
          placeholder="Como aparece en la tarjeta" 
        />
        {errors.cardholderName && <p className="text-xs text-destructive font-medium">{errors.cardholderName}</p>}
      </div>
      
      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="expiryDate" className="text-slate-700">Expiración</Label>
          <Input 
            id="expiryDate" 
            name="expiryDate" 
            value={data.expiryDate} 
            onChange={handleChange} 
            className={`h-12 text-center font-mono ${errors.expiryDate ? 'border-destructive bg-destructive/5' : 'bg-white'}`} 
            placeholder="MM/YY" 
          />
          {errors.expiryDate && <p className="text-xs text-destructive font-medium">{errors.expiryDate}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv" className="text-slate-700">CVV</Label>
          <Input 
            id="cvv" 
            name="cvv" 
            type="password" 
            value={data.cvv} 
            onChange={handleChange} 
            className={`h-12 text-center font-mono tracking-widest ${errors.cvv ? 'border-destructive bg-destructive/5' : 'bg-white'}`} 
            placeholder="•••" 
          />
          {errors.cvv && <p className="text-xs text-destructive font-medium">{errors.cvv}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;