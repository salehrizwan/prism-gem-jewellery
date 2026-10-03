import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { ProductPage } from './components/ProductPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product, quantity = 1, selectedOption?: string) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedOption === selectedOption
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { product, quantity, selectedOption }];
      }
    });

    showToast(`Added ${product.name} to your bag`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number, selectedOption?: string) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.product.id === productId && item.selectedOption === selectedOption) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (productId: string, selectedOption?: string) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product.id === productId && item.selectedOption === selectedOption)
      )
    );
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
  };

  const scrollToSection = (targetId: string) => {
    if (selectedProduct) {
      setSelectedProduct(null);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 50);
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalogue = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Top Banner Notice with Direct WhatsApp */}
      <div className="bg-black text-white text-[11px] uppercase tracking-[0.24em] py-2 px-4 text-center border-b border-zinc-900 font-medium flex items-center justify-center gap-4">
        <span>Complimentary insured courier delivery with every luxury bracelet</span>
        <span className="hidden md:inline text-zinc-500">|</span>
        <a
          href="https://wa.me/923035380945"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline text-emerald-400 hover:text-emerald-300 font-mono tracking-widest lowercase underline"
        >
          whatsapp: 03035380945
        </a>
      </div>

      {/* Main Navigation Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectProduct={handleSelectProduct}
        products={PRODUCTS}
      />

      <main className="flex-1">
        {selectedProduct ? (
          /* Dedicated Separate Product Page View (NOT a popup modal box) */
          <ProductPage
            product={selectedProduct}
            onBack={handleBackToCatalogue}
          />
        ) : (
          /* Homepage Catalog & Story */
          <>
            {/* Hero Section */}
            <Hero
              onShopCollection={() => scrollToSection('collection')}
              onExploreStory={() => scrollToSection('about')}
            />

            {/* Permanent Luxury Bracelet Collection */}
            <Collection
              products={PRODUCTS}
              onSelectProduct={handleSelectProduct}
              onAddToCart={(product) => handleAddToCart(product)}
            />

            {/* Brand & Atelier Story */}
            <About />

            {/* Direct WhatsApp Contact & Consultation */}
            <Contact />
          </>
        )}
      </main>

      {/* Minimalist Black Luxury Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Floating Direct WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Luxury Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Tactile Confirmation Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-black text-white px-5 py-3 text-xs tracking-wider uppercase font-medium shadow-2xl border border-zinc-800 animate-slide-in-up flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
