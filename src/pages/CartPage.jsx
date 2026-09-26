import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ArrowLeft, CreditCard, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

const formatCOP = (val) => {
  if (val === null || val === undefined || isNaN(val)) {
    return 'Precio no disponible';
  }
  return `COP $${Number(val).toLocaleString('es-CO', { minimumFractionDigits: 0 }).replace(/,/g, '.')}`;
};

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (variantId, currentQuantity, change, availableQuantity) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    if (availableQuantity && newQuantity > availableQuantity) {
      toast.error(`Solo hay ${availableQuantity} unidades disponibles.`);
      return;
    }
    updateQuantity(variantId, newQuantity);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/checkout');
  };

  const totalCOP = cartItems.reduce((total, item) => {
    const priceCents = item.variant.sale_price_in_cents ?? item.variant.price_in_cents;
    // Format based on cents where decimals = 0
    return total + (priceCents || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20">
      <Helmet>
        <title>Carrito de Compras | Novaelectra</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 md:mb-12"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground" style={{ letterSpacing: '-0.02em' }}>
              Tu Carrito
            </h1>
            <p className="text-muted-foreground mt-2">
              {cartItems.length} {cartItems.length === 1 ? 'artículo' : 'artículos'} en tu pedido
            </p>
          </div>
          <Button asChild variant="outline" className="hidden sm:flex rounded-full border-primary/20 text-primary hover:bg-primary/10">
            <Link to="/tienda">
              <ArrowLeft className="mr-2 h-4 w-4" /> Seguir comprando
            </Link>
          </Button>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-sm border border-slate-100 min-h-[50vh]"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Tu carrito está vacío</h2>
            <p className="text-slate-500 mb-8 max-w-md text-center">
              Parece que aún no has añadido nada a tu carrito. Explora nuestra tienda para encontrar los mejores productos tecnológicos.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-full px-8 shadow-lg active:scale-[0.98] transition-all">
              <Link to="/tienda">
                Explorar Tienda <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence>
                {cartItems.map((item) => {
                  const price = item.variant.sale_price_in_cents ?? item.variant.price_in_cents;
                  const itemSubtotal = (price || 0) * item.quantity;
                  const availableQuantity = item.variant.manage_inventory ? item.variant.inventory_quantity : 999;
                  const displayTitle = item.product.name || item.product.title;

                  return (
                    <motion.div
                      key={item.variant.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm relative group"
                    >
                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-slate-50 rounded-2xl p-2 flex items-center justify-center relative overflow-hidden">
                        <img 
                          src={item.product.image || "https://placehold.co/400"} 
                          alt={displayTitle} 
                          className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <Link to={`/product/${item.product.id}`} className="text-lg font-bold text-slate-800 hover:text-primary transition-colors line-clamp-2">
                              {displayTitle}
                            </Link>
                            {item.variant.title && item.variant.title !== 'Default' && (
                              <p className="text-sm text-slate-500 mt-1">Variante: {item.variant.title}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-extrabold text-lg text-slate-900">
                              {formatCOP(price)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full text-slate-600 hover:bg-white hover:text-primary hover:shadow-sm transition-all"
                              onClick={() => handleQuantityChange(item.variant.id, item.quantity, -1, availableQuantity)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-10 text-center font-semibold text-slate-800 tabular-nums">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full text-slate-600 hover:bg-white hover:text-primary hover:shadow-sm transition-all"
                              onClick={() => handleQuantityChange(item.variant.id, item.quantity, 1, availableQuantity)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-4">
                            <p className="text-sm font-semibold text-slate-500 hidden sm:block">
                              Subtotal: <span className="text-slate-900 font-bold">{formatCOP(itemSubtotal)}</span>
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-full text-slate-400 hover:text-destructive hover:bg-destructive/10 transition-colors"
                              onClick={() => removeFromCart(item.variant.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              <div className="sm:hidden flex justify-center mt-6">
                <Button asChild variant="outline" className="rounded-full w-full border-primary/20 text-primary">
                  <Link to="/tienda">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Seguir comprando
                  </Link>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-lg p-6 lg:p-8 sticky top-24"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-6">Resumen del pedido</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({cartItems.length} artículos)</span>
                    <span className="font-medium text-slate-900">{formatCOP(totalCOP)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Envío</span>
                    <span className="font-medium text-success">Gratis</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Impuestos</span>
                    <span className="font-medium text-slate-800">Calculado en checkout</span>
                  </div>
                </div>
                
                <div className="h-px w-full bg-slate-100 my-6" />
                
                <div className="flex justify-between items-end mb-8">
                  <span className="text-lg font-bold text-slate-800">Estimado</span>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                      {formatCOP(totalCOP)}
                    </span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout} 
                  disabled={cartItems.length === 0}
                  className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-xl shadow-lg active:scale-[0.98] transition-all text-lg font-bold"
                >
                  <span className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" /> Proceder al pago
                  </span>
                </Button>
                
                <div className="mt-6 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4 text-success" />
                  Pago 100% seguro y encriptado
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;