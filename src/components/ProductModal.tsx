import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Truck, RefreshCw, Check, Minus, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedOption?: string) => void;
  onBuyNow: (product: Product, quantity: number, selectedOption?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setAddedSuccess(false);
      if (product.options && product.options.choices.length > 0) {
        setSelectedOption(product.options.choices[0]);
      } else {
        setSelectedOption('');
      }
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, selectedOption || undefined);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  const handleBuyNowClick = () => {
    onBuyNow(product, quantity, selectedOption || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div
        className="relative bg-white w-full max-w-5xl border border-zinc-200 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-black transition-colors bg-white/80 backdrop-blur-xs"
          aria-label="Close product details"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Product Imagery */}
          <div className="md:col-span-6 bg-zinc-50 flex items-center justify-center p-6 md:p-10 border-b md:border-b-0 md:border-r border-zinc-200">
            <div className="relative aspect-square w-full max-w-md bg-white border border-zinc-200 overflow-hidden shadow-xs">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/1.jfif';
                }}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 border border-zinc-200 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                Natural Light Studio · 1:1 Macro
              </div>
            </div>
          </div>

          {/* Right Column: Information, Specifications & Actions */}
          <div className="md:col-span-6 p-6 md:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Subtitle */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium">
                <span>{product.category}</span>
                <span aria-hidden="true">·</span>
                <span>Atelier Masterpiece</span>
              </div>

              {/* Title & Price */}
              <h2 className="text-2xl md:text-3xl font-serif text-black leading-tight">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-serif tabular-nums text-black font-normal">
                  ${product.price.toLocaleString()} USD
                </span>
                <span className="text-xs text-zinc-400 uppercase tracking-wider">
                  Insured Duty & Tax Included
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed pt-1">
                {product.description}
              </p>

              {/* Material & Specifications Grid */}
              <div className="pt-4 border-t border-zinc-200 space-y-2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-900 font-medium">
                  Material & Gemstone Specifications
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs bg-zinc-50 p-4 border border-zinc-200">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">Metal</span>
                    <span className="text-zinc-800 font-medium">{product.specifications.metal}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">Gemstone</span>
                    <span className="text-zinc-800 font-medium">{product.specifications.gemstone}</span>
                  </div>
                  {product.specifications.caratWeight && (
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">Weight / Size</span>
                      <span className="text-zinc-800 font-medium">{product.specifications.caratWeight}</span>
                    </div>
                  )}
                  {product.specifications.clarity && (
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">Clarity</span>
                      <span className="text-zinc-800 font-medium">{product.specifications.clarity}</span>
                    </div>
                  )}
                  {product.specifications.color && (
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">Color Grade</span>
                      <span className="text-zinc-800 font-medium">{product.specifications.color}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">Hallmark & Certification</span>
                    <span className="text-zinc-800 font-medium text-[11px]">{product.specifications.hallmark}</span>
                  </div>
                </div>
              </div>

              {/* Optional Variant Selection (Size, Length, etc.) */}
              {product.options && (
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] uppercase tracking-[0.18em] text-zinc-900 font-medium block">
                    {product.options.name}
                  </label>
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full bg-white border border-zinc-300 py-2.5 px-3 text-xs tracking-wide text-zinc-800 focus:outline-none focus:border-black rounded-none"
                  >
                    {product.options.choices.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-[11px] uppercase tracking-[0.18em] text-zinc-900 font-medium block">
                  Quantity
                </label>
                <div className="flex items-center w-32 border border-zinc-300">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-zinc-600 hover:text-black disabled:text-zinc-300 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="flex-1 text-center font-mono text-xs tabular-nums font-medium text-zinc-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-zinc-600 hover:text-black transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs: Add to Cart and Buy Now */}
            <div className="space-y-3 pt-4 border-t border-zinc-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCartClick}
                  className={`w-full py-3.5 px-4 text-xs uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center gap-2 border border-black ${
                    addedSuccess
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white text-black hover:bg-zinc-50'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNowClick}
                  className="w-full py-3.5 px-4 text-xs uppercase tracking-[0.18em] font-medium bg-black text-white hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-2 pt-3 text-[10px] text-zinc-500 uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>Free Insured Express</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>Certified Authentic</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>30-Day Evaluation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
