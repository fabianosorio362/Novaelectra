import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, ArrowLeft, Minus, Plus, SearchX, CheckCircle } from 'lucide-react';
import { FEATURED_PRODUCTS } from '@/lib/data.js';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

const formatCOP = (val) => {
  if (val === null || val === undefined || isNaN(val)) {
    return 'Precio no disponible';
  }
  return `COP $${Number(val).toLocaleString('es-CO', { minimumFractionDigits: 0 }).replace(/,/g, '.')}`;
};

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const foundProduct = FEATURED_PRODUCTS.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setIsNotFound(true);
      }
    } else {
      setIsNotFound(true);
    }
  }, [id]);

  const handleAddToCart = useCallback(async () => {
    if (product) {
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
          toast({
            variant: "destructive",
            title: "Aviso",
            description: "No se puede añadir al carrito un producto sin precio.",
          });
          return;
        }

        await addToCart(cartProduct, variant, quantity, 999);
        toast({
          title: "Agregado al carrito",
          description: `${quantity} x ${product.name} agregado.`,
        });
        navigate('/cart');
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    }
  }, [product, quantity, addToCart, toast, navigate]);

  const handleQuantityChange = useCallback((amount) => {
    setQuantity(prevQuantity => {
        const newQuantity = prevQuantity + amount;
        if (newQuantity < 1) return 1;
        return newQuantity;
    });
  }, []);

  if (isNotFound || (!product && isNotFound)) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-white text-center p-10 rounded-3xl border border-slate-100 shadow-lg">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <SearchX className="h-12 w-12 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Producto no encontrado
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            El producto que buscas no existe, no está disponible o ha sido removido de nuestro catálogo.
          </p>
          <div className="flex flex-col gap-3">
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-full h-12 text-base font-semibold shadow-md"
            >
              <Link to="/">Volver al inicio</Link>
            </Button>
            <Button 
              onClick={() => navigate(-1)} 
              variant="outline"
              className="w-full border-primary/20 text-primary hover:bg-primary/5 rounded-full h-12 text-base font-semibold"
            >
              Regresar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const priceValue = product.price !== undefined ? product.price : (product.price_in_cents ? product.price_in_cents / 100 : undefined);

  return (
    <>
      <Helmet>
        <title>{`${product.name} - Novaelectra`}</title>
        <meta name="description" content={product.description?.substring(0, 160) || product.name} />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Volver
          </button>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-3xl bg-white p-6 md:p-10 shadow-sm border border-slate-100 flex items-center justify-center min-h-[400px] md:min-h-[500px] group">
                <img
                  src={product.image || placeholderImage}
                  alt={product.name}
                  className="w-full h-full max-h-[400px] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
                {product.name}
              </h1>
              
              {/* Title Section Price */}
              <div className="flex items-center flex-wrap gap-4 mb-8">
                <span className={`text-4xl lg:text-5xl font-extrabold ${priceValue !== undefined ? 'price-premium' : 'text-slate-500 text-3xl'}`}>
                  {formatCOP(priceValue)}
                </span>
              </div>

              {/* Action Area */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm mb-8">
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between border border-slate-200 rounded-2xl p-1 bg-slate-50 w-full sm:w-auto">
                    <Button 
                      onClick={() => handleQuantityChange(-1)} 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-xl h-12 w-12 text-slate-600 hover:bg-white hover:shadow-sm hover:text-primary transition-all"
                    >
                      <Minus size={20} />
                    </Button>
                    <span className="w-16 text-center text-slate-800 font-bold text-xl tabular-nums">
                      {quantity}
                    </span>
                    <Button 
                      onClick={() => handleQuantityChange(1)} 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-xl h-12 w-12 text-slate-600 hover:bg-white hover:shadow-sm hover:text-primary transition-all"
                    >
                      <Plus size={20} />
                    </Button>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <Button 
                    onClick={handleAddToCart} 
                    disabled={priceValue === undefined}
                    className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed" 
                  >
                    <ShoppingCart className="mr-2 h-6 w-6" /> Agregar al carrito
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="inline-flex items-center gap-2 text-success font-medium">
                      <CheckCircle size={18} /> Disponible en stock
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Descripción del Producto</h3>
                <p>{product.description}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;