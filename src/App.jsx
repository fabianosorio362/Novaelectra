import React, { useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from '@/hooks/useCart.jsx';
import { Toaster } from '@/components/ui/sonner.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ShoppingCart from '@/components/ShoppingCart.jsx';
import WhatsAppButton from '@/components/WhatsAppButton.jsx';
import PaymentMethodsBanner from '@/components/PaymentMethodsBanner.jsx';
import HomePage from '@/pages/HomePage.jsx';
import TiendaPage from '@/pages/TiendaPage.jsx';
import AcercaDeNosotrosPage from '@/pages/AcercaDeNosotrosPage.jsx';
import ContactoPage from '@/pages/ContactoPage.jsx';
import ProductDetailPage from '@/pages/ProductDetailPage.jsx';
import CartPage from '@/pages/CartPage.jsx';
import CheckoutPage from '@/pages/CheckoutPage.jsx';
import SuccessPage from '@/pages/SuccessPage.jsx';
import RegisterPage from '@/pages/RegisterPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <CartProvider>
            <Router>
                <ScrollToTop />
                <div className="min-h-screen flex flex-col">
                    <Header setIsCartOpen={setIsCartOpen} />
                    <PaymentMethodsBanner />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/tienda" element={<TiendaPage />} />
                            <Route path="/acerca-de-nosotros" element={<AcercaDeNosotrosPage />} />
                            <Route path="/contacto" element={<ContactoPage />} />
                            <Route path="/product/:id" element={<ProductDetailPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/success" element={<SuccessPage />} />
                            <Route path="/success/:orderId" element={<SuccessPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </main>
                    <Footer />
                    <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
                </div>
                <WhatsAppButton />
                <Toaster />
            </Router>
        </CartProvider>
    );
}

export default App;