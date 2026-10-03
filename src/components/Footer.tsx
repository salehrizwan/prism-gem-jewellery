import React from 'react';
import { Instagram, MessageCircle, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (targetId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const phoneNumber = '03035380945';
  const whatsappNumber = '923035380945';

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    onNavigate(targetId);
  };

  return (
    <footer className="bg-black text-white border-t border-zinc-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-zinc-900">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-serif tracking-[0.24em] uppercase text-white font-medium">
              PRISM Gem Jewellery
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              Timeless elegance, crafted to shine. Minimalist luxury bracelet collection sculptured in pure 950 platinum, 18-karat solid gold, and verified natural diamonds and gemstones.
            </p>
            <div className="pt-2 text-[11px] uppercase tracking-widest text-zinc-500 font-mono">
              Direct Atelier Service · 100% Insured Delivery
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-300 font-medium">
              Navigation
            </p>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLink(e, 'home')}
                  className="hover:text-white transition-colors"
                >
                  Home Showcase
                </a>
              </li>
              <li>
                <a
                  href="#collection"
                  onClick={(e) => handleLink(e, 'collection')}
                  className="hover:text-white transition-colors"
                >
                  Bracelet Collection
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLink(e, 'about')}
                  className="hover:text-white transition-colors"
                >
                  Atelier Philosophy
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLink(e, 'contact')}
                  className="hover:text-white transition-colors"
                >
                  Direct WhatsApp Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp Contact Details - No Email, No Location */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-300 font-medium">
              Direct Contact & Orders
            </p>
            <div className="space-y-3 text-xs text-zinc-400 font-light leading-relaxed">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white hover:text-emerald-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-medium">WhatsApp Contact</span>
                  <span className="font-mono text-sm font-semibold">{phoneNumber}</span>
                </div>
              </a>

              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-2.5 text-white hover:text-zinc-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-medium">Call Directly</span>
                  <span className="font-mono text-sm">{phoneNumber}</span>
                </div>
              </a>
            </div>

            {/* Social Platform - ONLY Instagram */}
            <div className="pt-3 space-y-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                Follow On Instagram
              </p>
              <a
                href="https://www.instagram.com/prismgemjewellery?stkn=emUzZ210ZXN4a29q"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-zinc-300 hover:text-white transition-colors p-2 border border-zinc-800 hover:border-zinc-500"
              >
                <Instagram className="w-4 h-4" />
                <span className="font-serif italic">@prismgemjewellery</span>
              </a>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 PRISM Gem Jewellery. Direct Orders: {phoneNumber}</p>
          <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase">
            <span>Genuine Platinum & Gold</span>
            <span>Insured Courier</span>
            <span>Direct WhatsApp</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
