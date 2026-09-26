import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Truck, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard.jsx';
import { CAROUSEL_PRODUCTS } from '@/lib/data.js';

const features = [
  {
    icon: Zap,
    title: 'Entrega rápida',
    description: 'Recibe tus productos en 24-72 horas a nivel de todo Colombia',
  },
  {
    icon: Shield,
    title: 'Garantía extendida',
    description: 'Todos nuestros productos incluyen garantía de fabricante',
  },
  {
    icon: Truck,
    title: 'Envío gratis',
    description: 'en compras mayores a COP $220.000',
  },
  {
    icon: CreditCard,
    title: 'Pago seguro',
    description: 'Múltiples opciones de pago con tecnología encriptada',
  },
];

const HomePage = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    loop: true,
    skipSnaps: false
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  // Fix Alexa image if it's broken or missing in the data
  const fixedProducts = CAROUSEL_PRODUCTS.map(product => {
    if (product.name.toLowerCase().includes('alexa') || product.name.toLowerCase().includes('echo')) {
      return {
        ...product,
        image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=500&auto=format&fit=crop'
      };
    }
    return product;
  });

  return (
    <>
      <Helmet>
        <title>Novaelectra - Tecnología de Vanguardia</title>
        <meta name="description" content="Descubre las últimas novedades en tecnología. Tablets, smartphones, consolas y más en Novaelectra." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1648841875038-abd6b89c19b2"
            alt="Tecnología moderna"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/80 to-slate-950/90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
              Tecnología que{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                transforma
              </span>{' '}
              tu vida
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre las últimas novedades en tablets, smartphones, consolas y accesorios tecnológicos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold text-lg px-8 py-6 shadow-2xl hover:shadow-primary/50 transition-all duration-300 active:scale-[0.98]"
              >
                <Link to="/tienda">
                  Explorar Tienda <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-secondary via-primary to-accent hover:from-secondary/90 hover:via-primary/90 hover:to-accent/90 text-white font-semibold text-lg px-8 py-6 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 active:scale-[0.98] border-0"
              >
                <Link to="/acerca-de-nosotros">Conoce más</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-slate-50 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
              Productos <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Destacados</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Selección especial de nuestros mejores lanzamientos tecnológicos
            </p>
          </motion.div>

          <div className="relative max-w-[1400px] mx-auto px-4 md:px-12 mb-10">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-[var(--carousel-slide-spacing)] py-6 items-stretch">
                {fixedProducts.map((product, index) => (
                  <div key={product.id} className="embla__slide animate-slide-in flex-shrink-0" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 bg-white/90 backdrop-blur border-2 border-primary/10 hover:border-primary hover:bg-primary text-primary hover:text-white shadow-xl transition-all duration-300 z-10 hover:scale-110 active:scale-95"
              aria-label="Producto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 bg-white/90 backdrop-blur border-2 border-primary/10 hover:border-primary hover:bg-primary text-primary hover:text-white shadow-xl transition-all duration-300 z-10 hover:scale-110 active:scale-95"
              aria-label="Siguiente producto"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${
                    index === selectedIndex 
                      ? 'w-10 bg-gradient-to-r from-primary to-secondary' 
                      : 'w-2.5 bg-primary/20 hover:bg-primary/40'
                  }`}
                  aria-label={`Ir a la diapositiva ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 rounded-full shadow-lg transition-all duration-200 active:scale-[0.98]"
            >
              <Link to="/tienda">
                Ver catálogo completo <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
              ¿Por qué elegir Novaelectra?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary group-hover:to-secondary flex items-center justify-center transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;