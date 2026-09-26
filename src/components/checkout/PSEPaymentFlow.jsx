import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet } from 'lucide-react';

const BANKS = [
  'Bancolombia', 'Davivienda', 'BBVA', 'Scotiabank', 'Itaú', 
  'Banco de Bogotá', 'Banco Caja Social', 'Banco W', 'Nequi', 'Daviplata'
];

const PSEPaymentFlow = ({ onConfirm, isProcessing }) => {
  const [formData, setFormData] = useState({
    bankName: '',
    documentType: '',
    documentNumber: ''
  });
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    const newErrors = {};
    if (!formData.bankName) newErrors.bankName = 'Selecciona un banco';
    if (!formData.documentType) newErrors.documentType = 'Selecciona el tipo de documento';
    if (!formData.documentNumber.trim()) newErrors.documentNumber = 'Ingresa el número de documento';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      onConfirm({
        bankName: formData.bankName,
        documentType: formData.documentType,
        documentNumber: formData.documentNumber,
        paymentReference: `PSE-${Math.floor(Math.random() * 100000000)}`
      });
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Wallet className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Pago con PSE</h3>
          <p className="text-slate-500 text-sm">Transferencia segura desde tu cuenta bancaria</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label className="text-slate-700">Banco</Label>
          <Select onValueChange={(val) => setFormData({ ...formData, bankName: val })}>
            <SelectTrigger className={`h-12 bg-slate-50 ${errors.bankName ? 'border-destructive' : 'border-slate-200'}`}>
              <SelectValue placeholder="Selecciona tu banco" />
            </SelectTrigger>
            <SelectContent>
              {BANKS.map((bank) => (
                <SelectItem key={bank} value={bank}>{bank}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.bankName && <p className="text-xs text-destructive">{errors.bankName}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-2 md:col-span-1">
            <Label className="text-slate-700">Tipo de Documento</Label>
            <Select onValueChange={(val) => setFormData({ ...formData, documentType: val })}>
              <SelectTrigger className={`h-12 bg-slate-50 ${errors.documentType ? 'border-destructive' : 'border-slate-200'}`}>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                <SelectItem value="NIT">NIT</SelectItem>
                <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
              </SelectContent>
            </Select>
            {errors.documentType && <p className="text-xs text-destructive">{errors.documentType}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="text-slate-700">Número de Documento</Label>
            <Input 
              value={formData.documentNumber}
              onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value.replace(/\D/g, '') })}
              placeholder="Ej. 1020304050"
              className={`h-12 bg-slate-50 ${errors.documentNumber ? 'border-destructive' : 'border-slate-200'}`}
            />
            {errors.documentNumber && <p className="text-xs text-destructive">{errors.documentNumber}</p>}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 border border-slate-200 leading-relaxed">
        Al hacer clic en confirmar, registrarás tu orden y te redireccionaremos a la pasarela segura de PSE para concluir el pago.
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isProcessing}
        className="w-full h-14 text-lg font-bold rounded-xl shadow-lg bg-gradient-to-r from-primary to-accent text-white hover:-translate-y-1 transition-transform"
      >
        {isProcessing ? 'Procesando...' : 'Confirmar Pago en PSE'}
      </Button>
    </div>
  );
};

export default PSEPaymentFlow;