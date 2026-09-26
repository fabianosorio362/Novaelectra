import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getProductQuantities } from '@/api/EcommerceApi';
import { FEATURED_PRODUCTS, CATEGORIES } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { Loader2, SlidersHorizontal, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TiendaPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = (searchParams.get('search') || '').trim();

  useEffect(() => {
    const fetchProductsWithQuantities = async () => {
      try {
        setLoading(true);
        setError(null);

        const productsResponse = await getProducts();

        if (productsResponse.products.length === 0) {
          // Fall back to the static featured catalog so the store is never empty
          setProducts(FEATURED_PRODUCTS);
          return;
        }

        const productIds = productsResponse.products.map(product => product.id);

        const quantitiesResponse = await getProductQuantities({
          fields: 'inventory_quantity',
          product_ids: productIds
        });

        const variantQuantityMap = new Map();
        quantitiesResponse.variants.forEach(variant => {
          variantQuantityMap.set(variant.id, variant.inventory_quantity);
        });

        const productsWithQuantities = productsResponse.products.map(product => ({
          ...product,
          variants: product.variants.map(variant => ({
            ...variant,
            inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
          }))
        }));

        setProducts(productsWithQuantities);
      } catch (err) {
        // Fall back to the static featured catalog if the store API fails
        setProducts(FEATURED_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsWithQuantities();
  }, []);

  const getProductPriceValue = (p) =>
    p.price !== undefined
      ? p.price
      : (p.variants?.[0]?.sale_price_in_cents ?? p.variants?.[0]?.price_in_cents ?? 0) / 100;

  const getProductName = (p) => p.name ?? p.title ?? '';

  const filteredProducts = useMemo(() => {
    let result = activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => {
        const name = (p.name ?? p.title ?? '').toLowerCase();
        const desc = (p.description ?? '').toLowerCase();
        const cat = (p.category ?? '').toLowerCase();
        return name.includes(q) || desc.includes(q) || cat.includes(q);
      });
    }

    return result;
  }, [products, activeCategory, searchQuery]);

  const clearSearch = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('search');
    setSearchParams(next, { replace: true });
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aPrice = getProductPriceValue(a);
    const bPrice = getProductPriceValue(b);

    switch (sortBy) {
      case 'price-low':
        return aPrice - bPrice;
      case 'price-high':
        return bPrice - aPrice;
      case 'name':
        return getProductName(a).localeCompare(getProductName(b));
      default:
        return 0;
    }
  });

  return (
    <>
      <Helmet>
        <title>Tienda - Novaelectra</title>
        <meta name="description" content="Explora nuestra amplia selección de productos tecnológicos. Tablets, smartphones, consolas y más." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
              Nuestra tienda
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Descubre nuestra selección completa de productos tecnológicos de última generación
            </p>
          </motion.div>

          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-primary/10 border border-primary/20"
            >
              <Search className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm text-foreground">
                Mostrando resultados para <strong className="font-semibold\">&quot;{searchQuery}&quot;</strong>
              </span>
              <Button
                onClick={clearSearch}
                variant="ghost"
                size="sm"
                className="ml-auto h-8 px-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" /> Limpiar
              </Button>
            </motion.div>
          )}

          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                    : 'bg-white text-foreground border border-slate-200 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <SlidersHorizontal className="h-5 w-5" />
              <span className="font-medium">{sortedProducts.length} productos disponibles</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">Ordenar por:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-primary/30 focus:border-primary">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Predeterminado</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="name">Nombre: A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
            </div>
          )}

          {error && (
            <div className="text-center p-8 bg-destructive/10 rounded-2xl border-2 border-destructive/20">
              <p className="text-destructive font-medium">Error al cargar productos: {error}</p>
            </div>
          )}

          {!loading && !error && sortedProducts.length === 0 && (
            <div className="text-center p-12 bg-muted rounded-2xl">
              <p className="text-muted-foreground text-lg">
                {searchQuery
                  ? `No se encontraron productos para "${searchQuery}".`
                  : 'No hay productos disponibles en esta categoría.'}
              </p>
              {searchQuery && (
                <Button onClick={clearSearch} variant="outline" className="mt-4">
                  Limpiar búsqueda
                </Button>
              )}
            </div>
          )}

          {!loading && !error && sortedProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TiendaPage;