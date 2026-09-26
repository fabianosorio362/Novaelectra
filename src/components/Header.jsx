import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Zap, LogOut, User, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';
import pb from '@/lib/pocketbaseClient.js';
import { useToast } from '@/hooks/use-toast';

const Header = ({ setIsCartOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid);
  
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => {
      setIsAuthenticated(pb.authStore.isValid);
    });
    setIsAuthenticated(pb.authStore.isValid);
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    pb.authStore.clear();
    setIsMobileMenuOpen(false);
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente.",
    });
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tienda?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileSearchOpen(false);
      setSearchQuery('');
    }
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { path: '/tienda', label: 'Tienda' },
    { path: '/acerca-de-nosotros', label: 'Acerca de Nosotros' },
    { path: '/contacto', label: 'Contacto' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* LEFT: Logo only (completely free of surrounding elements) */}
          <Link to="/" className="flex items-center gap-1.5 group shrink-0">
            <div className="relative">
              <Zap className="h-6 w-6 text-primary group-hover:text-accent transition-colors duration-200" fill="currentColor" />
              <div className="absolute inset-0 blur-md bg-primary/30 group-hover:bg-accent/30 transition-colors duration-200" />
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Novaelectra
            </span>
          </Link>

          {/* CENTER: Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-md lg:max-w-lg relative group px-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
            <div className="search-bar-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="sr-only">Buscar</button>
            </div>
          </form>

          {/* RIGHT: Navigation & Actions */}
          <div className="flex items-center gap-2 lg:gap-4 shrink-0">
            
            {/* Inicio Icon Link */}
            <Link
              to="/"
              className={`p-1.5 rounded-md transition-all duration-200 hidden sm:flex ${
                isActive('/')
                  ? 'text-primary bg-primary/10'
                  : 'text-foreground hover:text-primary hover:bg-muted'
              }`}
              title="Inicio"
            >
              <Home className="h-4 w-4" />
            </Link>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 text-sm rounded-md font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Actions */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-slate-600 hover:text-slate-900 hidden lg:flex" disabled>
                    <User className="w-3.5 h-3.5 mr-1.5" /> Mi Cuenta
                  </Button>
                  <Button 
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-xs border-slate-200 text-slate-600 hover:bg-slate-100 transition-all duration-200"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-1.5" /> Salir
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    asChild
                    size="sm" 
                    className="h-8 px-3 text-xs bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-400 text-white border-0 shadow-[0_0_10px_rgba(139,92,246,0.3)] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300"
                  >
                    <Link to="/login">Iniciar Sesión</Link>
                  </Button>
                  <Button 
                    asChild
                    size="sm" 
                    className="h-8 px-3 text-xs bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-400 text-white border-0 shadow-[0_0_10px_rgba(139,92,246,0.3)] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300"
                  >
                    <Link to="/register">Registrarse</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Icons: Search (Mobile), Cart, Menu Toggle */}
            <div className="flex items-center gap-1.5 lg:border-l lg:border-border/50 lg:pl-2">
              
              <Button
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                variant="outline"
                size="icon"
                className={`h-8 w-8 md:hidden transition-all duration-200 shrink-0 ${
                  isMobileSearchOpen 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-primary/30 hover:border-primary hover:bg-primary/10 text-primary'
                }`}
              >
                <Search className="h-4 w-4" />
              </Button>

              <Button
                onClick={() => setIsCartOpen(true)}
                variant="outline"
                size="icon"
                className="h-8 w-8 relative border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-200 shrink-0"
              >
                <ShoppingCart className="h-4 w-4 text-primary" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-gradient-to-r from-accent to-secondary text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                    {cartItemCount}
                  </span>
                )}
              </Button>

              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                variant="outline"
                size="icon"
                className="h-8 w-8 lg:hidden border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-200 shrink-0"
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4 text-primary" />
                ) : (
                  <Menu className="h-4 w-4 text-primary" />
                )}
              </Button>
            </div>
            
          </div>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full px-4 py-3 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-lg"
          >
            <form onSubmit={handleSearch} className="w-full relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <div className="search-bar-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="sr-only">Buscar</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-border/40 bg-background"
          >
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm rounded-md font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-2 border-t border-border/50" />

              {/* Mobile Auth Actions */}
              {isAuthenticated ? (
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start px-3 py-2 h-auto text-slate-600"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
                </Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button 
                    asChild 
                    size="sm"
                    className="w-full justify-center px-3 py-2 h-auto bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-400 text-white border-0 shadow-[0_0_10px_rgba(139,92,246,0.3)] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300"
                  >
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Iniciar Sesión</Link>
                  </Button>
                  <Button 
                    asChild 
                    size="sm"
                    className="w-full justify-center px-3 py-2 h-auto bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-400 text-white border-0 shadow-[0_0_10px_rgba(139,92,246,0.3)] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300"
                  >
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Registrarse</Link>
                  </Button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;