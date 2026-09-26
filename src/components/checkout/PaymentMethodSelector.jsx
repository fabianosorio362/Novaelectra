import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Landmark, Wallet, Banknote } from 'lucide-react';

const PaymentMethodSelector = ({ selected, onChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Selecciona un Método de Pago</h2>
      
      <RadioGroup value={selected} onValueChange={onChange} className="space-y-4">
        {/* Tarjeta de Crédito / Débito */}
        <div className={`p-5 rounded-3xl border-2 transition-all duration-300 ${selected === 'tarjeta' ? 'border-primary bg-primary/5 shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'}`}>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="tarjeta" id="tarjeta" className="w-5 h-5" />
            <Label htmlFor="tarjeta" className="flex items-center gap-3 cursor-pointer font-bold text-lg text-slate-800 flex-grow">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              Tarjeta de Crédito / Débito
            </Label>
          </div>
        </div>

        {/* PSE */}
        <div className={`p-5 rounded-3xl border-2 transition-all duration-300 ${selected === 'pse' ? 'border-primary bg-primary/5 shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'}`}>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="pse" id="pse" className="w-5 h-5" />
            <Label htmlFor="pse" className="flex items-center gap-3 cursor-pointer font-bold text-lg text-slate-800 flex-grow">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              PSE (Pago Seguro en Línea)
            </Label>
          </div>
        </div>

        {/* Transferencia Bancaria */}
        <div className={`p-5 rounded-3xl border-2 transition-all duration-300 ${selected === 'transferencia' ? 'border-primary bg-primary/5 shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'}`}>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="transferencia" id="transferencia" className="w-5 h-5" />
            <Label htmlFor="transferencia" className="flex items-center gap-3 cursor-pointer font-bold text-lg text-slate-800 flex-grow">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                <Landmark className="h-5 w-5 text-primary" />
              </div>
              Transferencia Bancaria
            </Label>
          </div>
        </div>

        {/* Efecty */}
        <div className={`p-5 rounded-3xl border-2 transition-all duration-300 ${selected === 'efecty' ? 'border-primary bg-primary/5 shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'}`}>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="efecty" id="efecty" className="w-5 h-5" />
            <Label htmlFor="efecty" className="flex items-center gap-3 cursor-pointer font-bold text-lg text-slate-800 flex-grow">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                <Banknote className="h-5 w-5 text-primary" />
              </div>
              Efecty (Pago en Efectivo)
            </Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;