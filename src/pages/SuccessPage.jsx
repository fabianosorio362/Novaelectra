import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { formatCurrency } from '@/api/EcommerceApi.js';
import pb from '@/lib/pocketbaseClient.js';

const SuccessPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [isLoading, setIsLoading] = useState(!order);

  useEffect(() => {
    if (!order && orderId) {
      // Fallback: Attempt to fetch if refreshed (will only work if authenticated according to access rules)
      pb.collection('orders').getOne(orderId, { $autoCancel: false })
        .then(data => {
          setOrder(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Could not fetch order data:", err);
          setIsLoading(false);
        });
    }
  }, [order, orderId]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const defaultCurrency = { code: "COP", symbol: "$", decimal_digits: 0 };

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-24 px-4">
      <Helmet>
        <title>Orden Confirmada | Novaelectra</title>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden"
        >
          {/* Header Success Banner */}
          <div className="bg-gradient-to-br from-success/10 to-success/5 p-10 text-center border-b border-success/10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-success/20"
            >
              <CheckCircle className="h-10 w-10 text-white" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
              ¡Gracias por tu compra!
            </h1>
            <p className="text-lg text-slate-600 max-w-lg mx-auto">
              Hemos recibido tu orden y la estamos procesando. Te hemos enviado un correo de confirmación.
            </p>
          </div>

          <div className="p-8 md:p-10">
            {/* Order Brief Info */}
            {orderId && (
              <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-10 gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Número de Orden</p>
                  <p className="text-xl font-bold text-slate-900 font-mono">{orderId.toUpperCase()}</p>
                </div>
                {order?.totalAmount && (
                  <div className="text-center sm:text-right">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Pagado</p>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(order.totalAmount, defaultCurrency)}</p>
                  </div>
                )}
              </div>
            )}

            {/* Next Steps Grid */}
            <h3 className="text-xl font-bold text-slate-900 mb-6">Próximos pasos</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex gap-4">
                <div className="bg-primary/10 p-3 rounded-xl h-fit">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Preparación de Envío</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Tu pedido será empacado y despachado en las próximas 24 horas hábiles.
                  </p>
                </div>
              </div>
              
              {order?.paymentMethod === 'efecty' && (
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex gap-4">
                  <div className="bg-warning/10 p-3 rounded-xl h-fit">
                    <CheckCircle className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Pago Pendiente Efecty</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Recuerda realizar tu pago con la referencia <span className="font-bold text-slate-800">{order.efectyReference}</span> en los próximos 3 días.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-slate-100">
              <Button asChild size="lg" className="rounded-xl h-14 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold shadow-lg w-full sm:w-auto px-8">
                <Link to="/tienda">
                  Seguir Comprando <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl h-14 text-slate-600 hover:text-primary hover:bg-primary/5 border-slate-200 w-full sm:w-auto px-8">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" /> Volver al Inicio
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;