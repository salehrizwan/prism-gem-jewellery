import React from 'react';
import { Gem, Compass, Feather } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-zinc-950 text-white border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="flex items-center gap-3 text-xs tracking-[0.28em] uppercase text-zinc-400 font-medium">
            <span>Atelier Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>About PRISM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
            Quiet restraint in an age of excess.
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed pt-2">
            PRISM Gem Jewellery was established on an uncomplicated principle: true luxury requires no theatrical gestures. We focus exclusively on timeless, carefully selected jewellery pieces that honour the natural beauty of precious gemstones and noble metals.
          </p>
        </div>

        {/* 3 Core Pillars (Subtle, honest, zero-hype editorial columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pt-8 border-t border-zinc-800">
          <div className="space-y-4">
            <div className="w-10 h-10 border border-zinc-700 flex items-center justify-center text-white">
              <Gem className="w-4 h-4 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-serif text-white">
              Deliberate Stone Selection
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Every diamond and coloured gemstone is evaluated individually for optical purity, facet balance, and organic depth rather than mere carat weight alone. We prioritize clarity, natural lustre, and responsible origin above all.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 border border-zinc-700 flex items-center justify-center text-white">
              <Compass className="w-4 h-4 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-serif text-white">
              Noble Metallurgy
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Our mountings are forged exclusively in dense 950 solid platinum and 18-karat gold. Free of plating or hollow components, each creation carries a reassuring physical weight designed to endure through generations of daily wear.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 border border-zinc-700 flex items-center justify-center text-white">
              <Feather className="w-4 h-4 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-serif text-white">
              Proportional Harmony
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              We design with minimalist discipline. By paring away decorative distraction, the architecture of the jewellery draws immediate focus to the interaction of light, metal silhouette, and gemstone radiance.
            </p>
          </div>
        </div>

        {/* Atelier Statement Banner */}
        <div className="mt-20 p-8 md:p-12 border border-zinc-800 bg-zinc-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.24em] text-zinc-400 font-mono">
              The PRISM Standard
            </span>
            <p className="text-sm md:text-base font-serif italic text-zinc-200">
              “Fine jewellery is not a momentary adornment; it is an enduring repository of memory, intention, and light.”
            </p>
          </div>
          <div className="text-xs tracking-[0.2em] uppercase text-zinc-400 shrink-0">
            Handcrafted · Tested · Documented
          </div>
        </div>
      </div>
    </section>
  );
};
