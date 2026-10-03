import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopCollection: () => void;
  onExploreStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopCollection, onExploreStory }) => {
  return (
    <section id="home" className="relative pt-28 md:pt-36 pb-16 md:pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Luxury Headline & Call to Action */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8 z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs tracking-[0.28em] uppercase text-zinc-500 font-medium">
                <span>Haute Joaillerie</span>
                <span aria-hidden="true" className="text-zinc-300">·</span>
                <span>Permanent Collection</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-serif font-normal tracking-tight text-black leading-[1.08] text-balance">
                Timeless Elegance, Crafted to Shine.
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 font-light leading-relaxed max-w-xl">
                PRISM Gem Jewellery celebrates the silent power of unblemished stones and architectural metalwork. Meticulously handcrafted in pure platinum and 18-karat gold to transcend fleeting trends.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onShopCollection}
                className="inline-flex items-center justify-center px-8 py-4 bg-black text-white hover:bg-zinc-800 transition-colors text-xs uppercase tracking-[0.2em] font-medium rounded-none shadow-xs group"
              >
                <span>Shop Collection</span>
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <button
                type="button"
                onClick={onExploreStory}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-zinc-300 text-zinc-900 hover:border-black hover:bg-zinc-50 transition-colors text-xs uppercase tracking-[0.2em] font-medium rounded-none"
              >
                Our Philosophy
              </button>
            </div>

            {/* Trust and Provenance Notes (Unboxed metadata with typographic separators) */}
            <div className="pt-8 border-t border-zinc-100 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-400 font-medium">Provenance</p>
                <p className="text-sm font-serif text-zinc-900 mt-1">Conflict-Free Stones</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-400 font-medium">Atelier</p>
                <p className="text-sm font-serif text-zinc-900 mt-1">Master Goldsmiths</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-400 font-medium">Delivery</p>
                <p className="text-sm font-serif text-zinc-900 mt-1">Insured Worldwide</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Fidelity Campaign Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden bg-zinc-100 group border border-zinc-200">
              <img
                src="/images/6.png"
                alt="PRISM Gem Jewellery haute joaillerie luxury campaign photography"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/1.jfif';
                }}
                className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

              {/* Minimalist Editorial Floating Watermark */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white pointer-events-none">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase opacity-75">Campaign 2026</p>
                  <p className="text-base font-serif italic tracking-wide">The Solitaire & Light Series</p>
                </div>
                <div className="text-right">
                  <span className="text-xs tracking-[0.2em] uppercase font-mono opacity-80">950 Pt · VVS1</span>
                </div>
              </div>
            </div>

            {/* Subtle decorative framing lines */}
            <div className="hidden lg:block absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-zinc-300 pointer-events-none -z-10" />
          </div>
        </div>

        {/* Subtle Scroll Down Indicator */}
        <div className="flex justify-center pt-16">
          <button
            type="button"
            onClick={onShopCollection}
            className="flex flex-col items-center gap-2 text-zinc-400 hover:text-black transition-colors"
            aria-label="Scroll down to collection"
          >
            <span className="text-[10px] uppercase tracking-[0.25em]">Explore Catalog</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce stroke-[1.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};
