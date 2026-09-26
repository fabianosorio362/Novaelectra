import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Package, CheckCircle2, Heart } from 'lucide-react';

const features = [
  {
    emoji: '⚡',
    title: 'Entrega rápida',
    description: '24 a 48 horas con número de seguimiento',
  },
  {
    emoji: '🛡️',
    title: 'Garantía extendida',
    description: 'garantía oficial de fábrica',
  },
  {
    emoji: '🚚',
    title: 'Envío gratis',
    description: 'en compras mayores a COP $220.000',
  },
  {
    emoji: '🔒',
    title: 'Pago 100% seguro',
    description: 'tecnología SSL encriptada',
  },
  {
    emoji: '🎧',
    title: 'Soporte 24/7',
    description: 'WhatsApp, correo y formulario',
  },
  {
    emoji: '📦',
    title: 'Catálogo siempre actualizado',
    description: 'lo último en tecnología',
  },
];

const commitments = [
  'Garantizar la autenticidad y calidad de todos nuestros productos.',
  'Mantener total transparencia en nuestros precios y políticas.',
  'Proteger tu privacidad y datos personales en todo momento.',
  'Brindar soluciones rápidas y efectivas ante cualquier inconveniente.',
  'Evolucionar constantemente para mejorar tu experiencia de compra.',
];

const categories = [
  'Smartphones y Telefonía',
  'Laptops y Computación',
  'Audio y Entretenimiento',
  'Accesorios Inteligentes',
  'Hogar Conectado',
];

const AcercaDeNosotrosPage = () => {
  return (
    <>
      <Helmet>
        <title>Conoce Más - NovaElectra</title>
        <meta name="description" content="Descubre quiénes somos, por qué elegir NovaElectra y nuestro compromiso contigo." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
              Conoce más sobre <span className="text-primary">NovaElectra</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Tu destino confiable para la mejor tecnología. Descubre nuestra esencia, nuestras ventajas y el compromiso que tenemos con cada uno de nuestros clientes.
            </p>
          </motion.div>

          {/* Section 1: ¿Quiénes somos? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 group">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900" style={{ letterSpacing: '-0.02em' }}>
                ¿Quiénes somos?
              </h2>
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
                <div className="prose prose-lg text-slate-600 leading-relaxed">
                  <p>
                    En NovaElectra, somos unos apasionados por la innovación. Nacimos con el propósito de acercar la tecnología de vanguardia a todos los hogares y profesionales, facilitando el acceso a herramientas que transforman la manera en que vivimos, trabajamos y nos entretenemos.
                  </p>
                  <p>
                    No somos solo una tienda; somos tu aliado tecnológico. Nos esforzamos por entender tus necesidades para ofrecerte recomendaciones precisas y un catálogo siempre actualizado con las últimas tendencias del mercado global.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900">
                    <Package className="text-primary h-6 w-6" /> Nuestras Categorías Principales
                  </h3>
                  <ul className="space-y-3">
                    {categories.map((category, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: ¿Por qué elegir NovaElectra? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 text-center" style={{ letterSpacing: '-0.02em' }}>
              ¿Por qué elegir NovaElectra?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-4 bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-100">
                    {feature.emoji}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Section 3: Nuestro compromiso contigo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 text-white/5 pointer-events-none">
                <Heart className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-white/10 p-3 rounded-xl flex items-center justify-center">
                    <Heart className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold" style={{ letterSpacing: '-0.02em' }}>
                    Nuestro compromiso contigo
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                  {commitments.map((commitment, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                      <div className="mt-1 bg-white/20 p-1 rounded-full flex-shrink-0">
                        <Heart className="h-4 w-4 text-white fill-white" />
                      </div>
                      <p className="text-slate-200 font-medium leading-relaxed">
                        {commitment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default AcercaDeNosotrosPage;