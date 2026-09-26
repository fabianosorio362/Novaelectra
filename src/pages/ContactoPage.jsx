import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
const ContactoPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Campos incompletos', {
        description: 'Por favor completa todos los campos del formulario.'
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
      const newSubmission = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      submissions.push(newSubmission);
      localStorage.setItem('contact_submissions', JSON.stringify(submissions));
      toast.success('Mensaje enviado', {
        description: 'Gracias por contactarnos. Te responderemos pronto.'
      });
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      toast.error('Error', {
        description: 'Hubo un problema al enviar tu mensaje. Intenta nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <>
      <Helmet>
        <title>Contacto - Novaelectra</title>
        <meta name="description" content="Ponte en contacto con Novaelectra. Estamos aquí para ayudarte con cualquier pregunta sobre nuestros productos." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{
              letterSpacing: '-0.02em',
              textWrap: 'balance'
            }}>
                Estamos aquí para{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  ayudarte
                </span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                ¿Tienes alguna pregunta? Nuestro equipo está listo para asistirte
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.6
            }}>
                <h2 className="text-3xl font-bold text-foreground mb-6">Información de contacto</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Puedes contactarnos a través de cualquiera de estos medios. Respondemos en menos de 24 horas.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border-2 border-primary/10 hover:border-primary/30 transition-all duration-200">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground">info@novaelectra.com</p>
                      <p className="text-muted-foreground">soporte@novaelectra.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border-2 border-primary/10 hover:border-primary/30 transition-all duration-200">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Teléfono</h3>
                      <p className="text-muted-foreground">+57 3105290771</p>
                      <p className="text-sm text-muted-foreground">Lunes a Viernes: 9:00 - 18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border-2 border-primary/10 hover:border-primary/30 transition-all duration-200">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Dirección</h3>
                      <p className="text-muted-foreground">Av. 5 #18a -57 con Norte.</p>
                      <p className="text-muted-foreground">Tulua valle del cauca</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }}>
                <div className="bg-white p-8 rounded-2xl border-2 border-primary/10 shadow-xl">
                  <h2 className="text-3xl font-bold text-foreground mb-6">Envíanos un mensaje</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-foreground font-medium mb-2 block">
                        Nombre completo
                      </Label>
                      <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Tu nombre" required className="border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground" />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-foreground font-medium mb-2 block">
                        Correo electrónico <span className="text-destructive" aria-hidden="true">*</span>
                        <span className="sr-only"> obligatorio</span>
                      </Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="tu@email.com" required className="border-primary/30 focus:border-primary text-foreground placeholder:text-muted-foreground" />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-foreground font-medium mb-2 block">
                        Mensaje
                      </Label>
                      <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="¿En qué podemos ayudarte?" required rows={6} className="border-primary/30 focus:border-primary resize-none text-foreground placeholder:text-muted-foreground" />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold py-6 text-lg shadow-lg transition-all duration-200 active:scale-[0.98]">
                      {isSubmitting ? 'Enviando...' : <>
                          <Send className="mr-2 h-5 w-5" /> Enviar mensaje
                        </>}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>;
};
export default ContactoPage;