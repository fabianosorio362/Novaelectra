import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Landmark, Copy, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const BankTransferPaymentFlow = ({ onConfirm, isProcessing }) => {
  const [receipt, setReceipt] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const bankDetails = {
    banco: 'Bancolombia',
    cuenta: '12345678901',
    tipo: 'Cuenta Corriente',
    titular: 'NovaElectra S.A.S.',
    nit: '900.123.456-7'
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Número de cuenta copiado');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    if (!receipt.trim()) {
      setError('Por favor ingresa el número de comprobante o referencia de tu transferencia.');
      return;
    }
    setError('');
    
    onConfirm({
      bankName: bankDetails.banco,
      transferenceReceipt: receipt,
      paymentReference: `TR-${receipt}`
    });
  };

  return (
    <div className="space-y-6 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Landmark className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Transferencia Bancaria</h3>
          <p className="text-slate-500 text-sm">Transfiere directamente a nuestras cuentas</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
        <p className="text-sm font-semibold text-slate-700">Realiza la transferencia a la siguiente cuenta:</p>
        
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-slate-200">
            <span className="text-slate-500">Banco</span>
            <span className="font-bold text-slate-900">{bankDetails.banco}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-200">
            <span className="text-slate-500">Tipo de cuenta</span>
            <span className="font-bold text-slate-900">{bankDetails.tipo}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-200">
            <span className="text-slate-500">Titular</span>
            <span className="font-bold text-slate-900">{bankDetails.titular}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-200">
            <span className="text-slate-500">NIT</span>
            <span className="font-bold text-slate-900">{bankDetails.nit}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-slate-500">Número de cuenta</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-primary font-mono">{bankDetails.cuenta}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full text-slate-400 hover:text-primary"
                onClick={() => handleCopy(bankDetails.cuenta)}
              >
                {copied ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-slate-700 font-bold">Número de Comprobante / Referencia</Label>
        <p className="text-xs text-slate-500">Una vez realizada la transferencia, ingresa el número de comprobante para verificar tu pago rápidamente.</p>
        <Input 
          value={receipt}
          onChange={(e) => setReceipt(e.target.value)}
          placeholder="Ej. 123456789"
          className={`h-12 bg-slate-50 font-mono text-base ${error ? 'border-destructive' : 'border-slate-200'}`}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isProcessing}
        className="w-full h-14 text-lg font-bold rounded-xl shadow-lg bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-1 transition-transform"
      >
        {isProcessing ? 'Procesando...' : 'Confirmar Transferencia'}
      </Button>
    </div>
  );
};

export default BankTransferPaymentFlow;