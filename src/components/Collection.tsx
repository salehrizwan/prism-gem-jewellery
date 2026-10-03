import React, { useState } from 'react';
import { Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

interface CollectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const Collection: React.FC<CollectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'All', label: 'All Bracelets' },
    { id: 'Tennis Bracelet', label: 'Tennis Bracelets' },
    { id: 'Gold Bracelet', label: 'Gold Bracelets' },
    { id: 'Gemstone Bracelet', label: 'Gemstone Cuffs' },
    { id: 'Pearl Bracelet', label: 'Pearl Bracelets' },
    { id: 'Diamond Bangle', label: 'Diamond Bangles' },
  ];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1500);
  };

  return (
    <section id="collection" className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="flex items-center justify-center gap-3 text-xs tracking-[0.28em] uppercase text-zinc-400 font-medium">
            <span>The Curated Selection</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-black tracking-tight">
            Luxury Bracelet Collection
          </h2>
          <div className="w-12 h-[1px] bg-black mx-auto mt-4 mb-2" />
          <p className="text-sm md:text-base text-zinc-500 font-light leading-relaxed">
            Each bracelet is an exploration of restraint, wrist proportion, and pure brilliance. Individually cast in platinum and solid 18K gold, hand-set with certified diamonds and natural gemstones.
          </p>
        </div>

        {/* Category Filters (Clean Segmented / Text Bar with No Pill Badges) */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all rounded-none ${
                selectedCategory === cat.id
                  ? 'bg-black text-white font-medium shadow-xs'
                  : 'bg-zinc-50 text-zinc-600 hover:text-black hover:bg-zinc-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid: 3-column desktop layout with generous whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProducts.map((product) => {
            const isAdded = recentlyAddedId === product.id;
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group flex flex-col bg-white border border-zinc-200 hover:border-black transition-all duration-300 cursor-pointer"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-[1/1] w-full overflow-hidden bg-zinc-50 border-b border-zinc-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/1.jfif';
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Top Category Indicator (Unboxed clean text) */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-700 bg-white/90 backdrop-blur-xs px-2.5 py-1 border border-zinc-200">
                      {product.category}
                    </span>
                  </div>

                  {/* Hover Action Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="px-4 py-2.5 bg-white text-black text-xs uppercase tracking-[0.16em] font-medium hover:bg-zinc-100 transition-colors flex items-center gap-2"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Piece</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`px-4 py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-colors flex items-center gap-2 ${
                        isAdded
                          ? 'bg-zinc-900 text-white'
                          : 'bg-black text-white hover:bg-zinc-800'
                      }`}
                      title="Add to Cart"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Product Card Details */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-400 font-medium truncate">
                        {product.subtitle}
                      </p>
                      <span className="text-base font-serif font-medium tabular-nums text-black shrink-0">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-medium text-black group-hover:text-zinc-700 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed font-light">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 uppercase tracking-widest text-[11px]">
                      {product.specifications.metal.split(' ')[0]} {product.specifications.metal.split(' ')[1] || ''}
                    </span>
                    <span className="font-medium text-black tracking-[0.12em] uppercase text-[11px] group-hover:underline flex items-center gap-1">
                      Details & Order →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
