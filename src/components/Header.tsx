import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight, MessageCircle, Instagram } from 'lucide-react';
import { Product } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onSelectProduct,
  products,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 py-4 shadow-xs'
            : 'bg-white/90 backdrop-blur-xs border-b border-zinc-100 py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="text-xl md:text-2xl font-serif tracking-[0.22em] uppercase font-medium text-black hover:opacity-80 transition-opacity"
          >
            PRISM Gem Jewellery
          </a>

          {/* Zone 2: 4 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.18em] uppercase font-medium text-zinc-700">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all"
            >
              Home
            </a>
            <a
              href="#collection"
              onClick={(e) => handleNavClick(e, 'collection')}
              className="hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all"
            >
              Collection
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hover:text-black transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-black hover:after:w-full after:transition-all"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary interactive controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://www.instagram.com/prismgemjewellery?stkn=emUzZ210ZXN4a29q"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-800 hover:text-black transition-colors p-1"
              title="Follow on Instagram"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 stroke-[1.5]" />
            </a>

            <a
              href="https://wa.me/923035380945"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 border border-emerald-200 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>03035380945</span>
            </a>

            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-zinc-800 hover:text-black transition-colors p-1"
              aria-label="Search collection"
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-2 text-zinc-800 hover:text-black transition-colors p-1 relative"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              <span className="text-xs font-mono tabular-nums tracking-wider text-black font-medium">
                ({cartCount})
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-zinc-800 hover:text-black transition-colors p-1"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[1.5]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Quick Search Dropdown Bar */}
        {searchOpen && (
          <div className="border-t border-zinc-200 bg-white px-6 md:px-12 py-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 absolute left-3 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search diamond tennis bracelet, gold link bracelet, pearl bracelet..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-zinc-50 border border-zinc-300 py-2.5 pl-10 pr-10 text-sm tracking-wide text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black rounded-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-zinc-400 hover:text-black text-xs uppercase"
                  >
                    Clear
                  </button>
                )}
              </div>

              {searchQuery.trim() && (
                <div className="mt-3 border border-zinc-200 bg-white divide-y divide-zinc-100 shadow-sm max-h-80 overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-xs tracking-wider text-zinc-500 uppercase">
                      No jewellery pieces found matching "{searchQuery}"
                    </div>
                  ) : (
                    searchResults.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          onSelectProduct(product);
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full p-3 flex items-center gap-4 text-left hover:bg-zinc-50 transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/1.jfif';
                          }}
                          className="w-12 h-12 object-cover bg-zinc-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                            {product.category}
                          </p>
                          <p className="text-sm font-medium text-zinc-900 truncate">
                            {product.name}
                          </p>
                        </div>
                        <span className="text-xs font-mono tabular-nums text-zinc-900 font-medium shrink-0">
                          ${product.price.toLocaleString()}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs md:hidden">
          <div className="bg-white border-b border-zinc-200 px-6 pt-24 pb-8 space-y-6">
            <nav className="flex flex-col space-y-5 text-sm tracking-[0.2em] uppercase font-medium">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className="py-1 border-b border-zinc-100 text-zinc-800 hover:text-black"
              >
                Home
              </a>
              <a
                href="#collection"
                onClick={(e) => handleNavClick(e, 'collection')}
                className="py-1 border-b border-zinc-100 text-zinc-800 hover:text-black"
              >
                Collection
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className="py-1 border-b border-zinc-100 text-zinc-800 hover:text-black"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="py-1 border-b border-zinc-100 text-zinc-800 hover:text-black"
              >
                Contact
              </a>
            </nav>

            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs tracking-wider text-zinc-500 uppercase">
              <span>Atelier & Showroom</span>
              <span>New York · London</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
