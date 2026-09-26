import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

const placeholderImage = "https://placehold.co/400x300/e2e8f0/475569?text=No+Image";

const formatCOP = (val) => {
  if (val === null || val === undefined || isNaN(val)) {
    return 'Precio no disponible';
  }
  return `COP $${Number(val).toLocaleString('es-CO', { minimumFractionDigits: 0 }).replace(/,/g, '.')}`;
};

const ProductCard = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleBuyNow = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Adapt hardcoded product structure to what useCart expects
    const cartProduct = { ...product, title: product.name };
    const variant = {
      id: product.id,
      title: 'Default',
      price_in_cents: (product.price || 0) * 100,
      currency_info: { code: 'COP', symbol: '$' },
      manage_inventory: false
    };

    try {
      if (!product.price && product.price !== 0) {
        toast.error('Este producto no tiene precio disponible.');
        return;
      }
      
      await addToCart(cartProduct, variant, 1, 999);
      toast.success(`${product.name} añadido al carrito`);
      navigate('/cart');
    } catch (error) {
      toast.error(error.message || 'Error al añadir al carrito');
    }
  };

  const handleViewDetails = () => {
    if (product?.id) {
      navigate(`/product/${product.id}`);
    } else {
      toast.error('Producto no encontrado');
    }
  };

  // Determine the price to display
  const priceValue = product?.price !== undefined ? product.price : (product?.price_in_cents ? product.price_in_cents / 100 : undefined);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <div 
        className="group flex flex-col h-full relative overflow-hidden rounded-2xl bg-card border border-slate-100 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <div className="relative overflow-hidden bg-slate-50 flex items-center justify-center p-4 min-h-[220px] cursor-pointer" onClick={handleViewDetails}>
          <img
            src={product?.image || placeholderImage}
            alt={product?.name || 'Producto'}
            className="w-full h-auto max-h-[180px] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
        
        <div className="flex flex-col flex-grow p-5 bg-white text-center">
          <h3 className="text-base md:text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200 cursor-pointer" onClick={handleViewDetails}>
            {product?.name || 'Producto sin nombre'}
          </h3>
          
          <div className="mt-auto mb-5">
            <div className="flex flex-col items-center justify-center gap-1">
              <span className={`text-xl md:text-2xl font-extrabold ${priceValue !== undefined ? 'price-premium' : 'text-slate-500 text-lg'}`}>
                {formatCOP(priceValue)}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleBuyNow} 
              disabled={priceValue === undefined}
              className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Comprar ahora
            </Button>
            <Button 
              onClick={handleViewDetails}
              variant="outline"
              className="w-full rounded-full border-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary font-semibold transition-all duration-200 active:scale-[0.98]"
            >
              <Eye className="mr-2 h-4 w-4" /> Detalle
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;