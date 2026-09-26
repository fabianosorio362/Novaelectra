import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 mt-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-7 w-7 text-accent" fill="currentColor" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Novaelectra
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Tu tienda de confianza para tecnología de vanguardia. Tablets, smartphones, consolas y más.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-100">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-slate-300 hover:text-accent transition-colors duration-200">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/tienda" className="text-sm text-slate-300 hover:text-accent transition-colors duration-200">
                  Tienda
                </Link>
              </li>
              <li>
                <Link to="/acerca-de-nosotros" className="text-sm text-slate-300 hover:text-accent transition-colors duration-200">
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-sm text-slate-300 hover:text-accent transition-colors duration-200">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-100">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-slate-300">
                <Mail className="h-4 w-4 text-accent" />
                <span>info@novaelectra.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-300">
                <Phone className="h-4 w-4 text-accent" />
                <span>+573105290771</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Ciudad Tuluá valle del cauca</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-100">Síguenos</h3>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-primary transition-all duration-200 hover:scale-110">
                <Facebook className="h-5 w-5 text-slate-100" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-secondary transition-all duration-200 hover:scale-110">
                <Instagram className="h-5 w-5 text-slate-100" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-accent transition-all duration-200 hover:scale-110">
                <Twitter className="h-5 w-5 text-slate-100" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © 2026 Novaelectra. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-slate-400 hover:text-accent transition-colors duration-200">
              Política de Privacidad
            </Link>
            <Link to="/terms" className="text-sm text-slate-400 hover:text-accent transition-colors duration-200">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;