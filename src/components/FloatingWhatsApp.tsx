import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const phoneNumber = '03035380945';
  const whatsappNumber = '923035380945';

  const defaultMessage = encodeURIComponent(
    'Hello PRISM Gem Jewellery! I am interested in your luxury bracelets collection. Please assist me with pricing, availability, and custom orders.'
  );

  return (
    <aside aria-label="WhatsApp quick contact" className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      <div className="hidden md:flex flex-col items-end pointer-events-none transition-all duration-300 transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
        <span className="bg-black text-white text-[11px] uppercase tracking-widest px-3 py-1.5 shadow-xl border border-zinc-800">
          Order on WhatsApp
        </span>
        <span className="bg-zinc-900 text-emerald-400 font-mono text-[10px] px-2 py-0.5 mt-0.5 border border-zinc-800">
          {phoneNumber}
        </span>
      </div>

      <a
        href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
        aria-label="Direct WhatsApp Contact 03035380945"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30 pointer-events-none"></span>
        <MessageCircle className="w-7 h-7 fill-white/20 stroke-white" />
      </a>
    </aside>
  );
};
