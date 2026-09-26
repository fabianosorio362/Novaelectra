import React from 'react';
import { formatCurrency } from '@/api/EcommerceApi.js';
import { Separator } from '@/components/ui/separator';

const OrderSummary = ({ cartItems, subtotal, shipping, taxes, total, currencyInfo }) => {
  return (
    <div className="bg-slate-50 rounded-[2rem] p-6 lg:p-8 border border-slate-200 shadow-sm sticky top-24">
      <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Resumen del Pedido</h3>
      
      <div className="space-y-5 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
        {cartItems.map((item) => {
          const price = item.variant.sale_price_in_cents ?? item.variant.price_in_cents;
          return (
            <div key={item.variant.id} className="flex gap-4">
              <div className="w-20 h-20 bg-white rounded-2xl p-2 flex-shrink-0 border border-slate-100 shadow-sm relative">
                <img 
                  src={item.product.image} 
                  alt={item.product.title || item.product.name} 
                  className="w-full h-full object-contain mix-blend-multiply" 
                />
                <div className="absolute -top-2 -right-2 bg-slate-800 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <p className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug">
                  {item.product.title || item.product.name}
                </p>
                {item.variant.title && item.variant.title !== 'Default' && (
                  <p className="text-xs text-slate-500 mt-1">{item.variant.title}</p>
                )}
              </div>
              <div className="text-right flex flex-col justify-center">
                <p className="text-sm font-bold text-slate-900">
                  {formatCurrency(price * item.quantity, currencyInfo)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Separator className="my-8 bg-slate-200" />

      <div className="space-y-4 text-base text-slate-600">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900">{formatCurrency(subtotal, currencyInfo)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Envío</span>
          <span className={`font-semibold ${shipping === 0 ? 'text-success' : 'text-slate-900'}`}>
            {shipping === 0 ? 'Gratis' : formatCurrency(shipping, currencyInfo)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Impuestos (19% IVA)</span>
          <span className="font-semibold text-slate-900">{formatCurrency(taxes, currencyInfo)}</span>
        </div>
      </div>

      <Separator className="my-8 bg-slate-200" />

      <div className="flex justify-between items-end">
        <span className="text-xl font-bold text-slate-900">Total</span>
        <div className="text-right">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
            {formatCurrency(total, currencyInfo)}
          </span>
          <p className="text-xs text-slate-400 mt-1">Incluye todos los impuestos</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;