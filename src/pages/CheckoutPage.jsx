import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/hooks/useCart';
import pb from '@/lib/pocketbaseClient.js';

import CustomerInfoForm from '@/components/checkout/CustomerInfoForm.jsx';
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector.jsx';
import PaymentMethodFlow from '@/components/checkout/PaymentMethodFlow.jsx';
import OrderSummary from '@/components/checkout/OrderSummary.jsx';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    fullName: '', email: '', phone: '', deliveryAddress: '', city: '', postalCode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const [errors, setErrors] = useState({});

  const currencyInfo = cartItems[0]?.variant?.currency_info || {
    code: "COP", symbol: "$", decimal_digits: 0
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.variant.sale_price_in_cents ?? item.variant.price_in_cents) * item.quantity, 0);
  }, [cartItems]);

  const taxes = Math.round(subtotal * 0.19);
  const shipping = subtotal > 220000 ? 0 : 15000;
  const total = subtotal + shipping + taxes;

  const validateCustomerInfo = () => {
    const newErrors = {};
    if (!customerInfo.fullName.trim()) newErrors.fullName = "El nombre es requerido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) newErrors.email = "Correo electrónico inválido";
    if (!/^\d{10}$/.test(customerInfo.phone)) newErrors.phone = "El teléfono debe tener 10 dígitos";
    if (!customerInfo.deliveryAddress.trim()) newErrors.deliveryAddress = "La dirección es requerida";
    if (!customerInfo.city.trim()) newErrors.city = "La ciudad es requerida";
    if (!customerInfo.postalCode.trim()) newErrors.postalCode = "El código postal es requerido";

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      toast.error("Por favor revisa los errores en la información de contacto", { position: 'top-center' });
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (validateCustomerInfo()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalConfirm = async (paymentData) => {
    setIsSubmitting(true);
    
    try {
      const record = await pb.collection('orders').create({
        customerName: customerInfo.fullName,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        deliveryAddress: customerInfo.deliveryAddress,
        city: customerInfo.city,
        postalCode: customerInfo.postalCode,
        paymentMethod,
        items: cartItems,
        subtotal,
        shippingCost: shipping,
        taxes,
        totalAmount: total,
        orderStatus: 'pending',
        paymentStatus: 'pending_confirmation',
        ...paymentData
      }, { $autoCancel: false });

      toast.success("¡Orden procesada con éxito!");
      clearCart();
      // Pass the order data in state to the success page to avoid requiring auth to view
      navigate(`/success/${record.id}`, { state: { order: record } });
      
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Hubo un problema al procesar tu orden. Intenta de nuevo.", { position: 'top-center' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <Helmet><title>Checkout | Novaelectra</title></Helmet>
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">No hay productos</h2>
          <p className="text-slate-500 mb-8">Tu carrito está vacío. Agrega algunos productos para proceder al pago.</p>
          <Button asChild size="lg" className="w-full rounded-xl h-12">
            <Link to="/tienda">Explorar Tienda</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <Helmet>
        <title>Pago Seguro | Novaelectra</title>
      </Helmet>
      
      <div className="border-b border-slate-200 bg-slate-50/80 py-4 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
          <Link to="/cart" className="flex items-center text-sm font-bold text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver al carrito
          </Link>
          <div className="flex items-center text-sm text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <ShieldCheck className="h-4 w-4 mr-1.5" /> Pago 100% Seguro
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-10 lg:py-16">
        
        {/* Step Indicator */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-colors ${step >= 1 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
            <div className={`h-1 w-16 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-slate-100'}`} />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-colors ${step >= 2 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-7 overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <CustomerInfoForm 
                    data={customerInfo} 
                    onChange={setCustomerInfo} 
                    errors={errors} 
                  />
                  
                  <PaymentMethodSelector
                    selected={paymentMethod}
                    onChange={setPaymentMethod}
                  />

                  <Button
                    onClick={handleContinue}
                    className="w-full h-16 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r from-primary to-accent text-white"
                  >
                    Continuar al Pago
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <PaymentMethodFlow 
                    method={paymentMethod}
                    total={total}
                    currencyInfo={currencyInfo}
                    onConfirm={handleFinalConfirm}
                    onBack={() => setStep(1)}
                    isProcessing={isSubmitting}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              taxes={taxes}
              total={total}
              currencyInfo={currencyInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;