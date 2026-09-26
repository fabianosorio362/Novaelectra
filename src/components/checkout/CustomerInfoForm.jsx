import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CustomerInfoForm = ({ data, onChange, errors }) => {
  const handleChange = (e) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Información de Contacto y Envío</h2>
      
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="fullName" className="text-slate-600 font-medium">Nombre Completo</Label>
            <Input 
              id="fullName" 
              name="fullName" 
              value={data.fullName} 
              onChange={handleChange} 
              className={`h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors ${errors.fullName ? 'border-destructive focus-visible:ring-destructive' : ''}`} 
              placeholder="Ej. Ana María López" 
            />
            {errors.fullName && <p className="text-xs text-destructive font-medium">{errors.fullName}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-600 font-medium">Correo Electrónico</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={data.email} 
              onChange={handleChange} 
              className={`h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`} 
              placeholder="ana.lopez@ejemplo.com" 
            />
            {errors.email && <p className="text-xs text-destructive font-medium">{errors.email}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-600 font-medium">Teléfono (Celular)</Label>
            <Input 
              id="phone" 
              name="phone" 
              type="tel" 
              value={data.phone} 
              onChange={handleChange} 
              className={`h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors ${errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}`} 
              placeholder="300 123 4567" 
              maxLength={10} 
            />
            {errors.phone && <p className="text-xs text-destructive font-medium">{errors.phone}</p>}
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="deliveryAddress" className="text-slate-600 font-medium">Dirección de Envío</Label>
            <Input 
              id="deliveryAddress" 
              name="deliveryAddress" 
              value={data.deliveryAddress} 
              onChange={handleChange} 
              className={`h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors ${errors.deliveryAddress ? 'border-destructive focus-visible:ring-destructive' : ''}`} 
              placeholder="Calle 123 # 45-67, Apto 801" 
            />
            {errors.deliveryAddress && <p className="text-xs text-destructive font-medium">{errors.deliveryAddress}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city" className="text-slate-600 font-medium">Ciudad / Municipio</Label>
            <Input 
              id="city" 
              name="city" 
              value={data.city} 
              onChange={handleChange} 
              className={`h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors ${errors.city ? 'border-destructive focus-visible:ring-destructive' : ''}`} 
              placeholder="Bogotá" 
            />
            {errors.city && <p className="text-xs text-destructive font-medium">{errors.city}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="postalCode" className="text-slate-600 font-medium">Código Postal</Label>
            <Input 
              id="postalCode" 
              name="postalCode" 
              value={data.postalCode} 
              onChange={handleChange} 
              className={`h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors ${errors.postalCode ? 'border-destructive focus-visible:ring-destructive' : ''}`} 
              placeholder="110111" 
            />
            {errors.postalCode && <p className="text-xs text-destructive font-medium">{errors.postalCode}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoForm;