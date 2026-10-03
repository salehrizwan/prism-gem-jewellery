import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Phone, ShieldCheck, Truck, Award, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string>(
    product.options?.choices[1] || product.options?.choices[0] || 'Standard'
  );

  const totalPrice = product.price * quantity;
  const phoneNumber = '03035380945';
  const whatsappNumber = '923035380945';

  const handleWhatsAppBuy = () => {
    // Construct the absolute image URL if possible
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const imageUrl = product.image.startsWith('http') ? product.image : `${origin}${product.image}`;

    const message = `*New Order Inquiry — PRISM Gem Jewellery*

• *Product:* ${product.name}
• *Quantity:* ${quantity}
• *Selected Sizing:* ${selectedOption}
• *Price each:* $${product.price.toLocaleString()}
• *Total Estimated:* $${totalPrice.toLocaleString()}
• *Image:* ${imageUrl}

Hello! I would like to purchase this luxury bracelet. Please confirm availability and processing details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-zinc-200 bg-zinc-50/80 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-zinc-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
            <span>Back to All Bracelets</span>
          </button>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-zinc-400 uppercase tracking-widest text-[10px] hidden sm:inline">
              Direct Atelier Service
            </span>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-700 font-mono text-[11px] font-medium hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {phoneNumber}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 md:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Full Resolution Large Imagery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full bg-zinc-50 border border-zinc-200 overflow-hidden shadow-xs">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/1.jfif';
                }}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 border border-zinc-200 text-[10px] uppercase tracking-[0.25em] text-zinc-800 font-medium">
                {product.category}
              </div>
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-xs px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white font-mono">
                Authentic High Jewellery
              </div>
            </div>

            {/* Atelier Craftsmanship Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 border border-zinc-200 bg-zinc-50 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-black shrink-0 stroke-[1.5] mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-medium text-black">
                    Solid Platinum / 18K
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-light mt-0.5">
                    Hallmarked & lab certified
                  </p>
                </div>
              </div>

              <div className="p-4 border border-zinc-200 bg-zinc-50 flex items-start gap-3">
                <Truck className="w-5 h-5 text-black shrink-0 stroke-[1.5] mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-medium text-black">
                    Insured Courier
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-light mt-0.5">
                    Direct door-to-door security
                  </p>
                </div>
              </div>

              <div className="p-4 border border-zinc-200 bg-zinc-50 flex items-start gap-3">
                <Award className="w-5 h-5 text-black shrink-0 stroke-[1.5] mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-medium text-black">
                    Authenticity Card
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-light mt-0.5">
                    Included with presentation box
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Sizing, Quantity & Direct WhatsApp Buying */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Product Header */}
              <div className="space-y-2 border-b border-zinc-200 pb-6">
                <span className="text-xs uppercase tracking-[0.28em] text-zinc-400 font-medium">
                  PRISM Collection · {product.category}
                </span>
                <h1 className="text-2xl sm:text-4xl font-serif text-black tracking-tight leading-snug font-normal">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 font-light tracking-wide">
                  {product.subtitle}
                </p>

                {/* Price Display */}
                <div className="pt-4 flex items-baseline gap-4">
                  <span className="text-2xl sm:text-3xl font-mono text-black font-semibold">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-zinc-400">
                    USD · Valuation Verified
                  </span>
                </div>
              </div>

              {/* Short & Detailed Descriptions */}
              <div className="space-y-3">
                <p className="text-sm text-zinc-800 font-light leading-relaxed">
                  {product.shortDescription}
                </p>
                <p className="text-xs text-zinc-500 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Sizing / Options Selector */}
              {product.options && (
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="uppercase tracking-[0.2em] font-medium text-black">
                      {product.options.name}
                    </span>
                    <span className="text-zinc-500 font-light text-[11px]">
                      Selected: {selectedOption}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {product.options.choices.map((choice) => {
                      const isSelected = selectedOption === choice;
                      return (
                        <button
                          key={choice}
                          type="button"
                          onClick={() => setSelectedOption(choice)}
                          className={`p-3 text-xs tracking-wider border transition-all text-left flex items-center justify-between ${
                            isSelected
                              ? 'border-black bg-zinc-900 text-white font-medium'
                              : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                          }`}
                        >
                          <span className="truncate">{choice}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Realtime Total */}
              <div className="pt-4 border-t border-zinc-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-[0.2em] font-medium text-black">
                    Select Quantity
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    Total: <strong className="text-black font-semibold">${totalPrice.toLocaleString()}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center border border-zinc-300 bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="px-4 py-2.5 text-sm font-mono text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-5 py-2.5 text-sm font-mono text-black font-medium min-w-[3rem] text-center border-x border-zinc-200">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-4 py-2.5 text-sm font-mono text-zinc-700 hover:bg-zinc-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-zinc-400 font-light">
                    {quantity === 1 ? '1 Piece' : `${quantity} Pieces`} selected
                  </span>
                </div>
              </div>

              {/* Prominent Direct WhatsApp Order Action */}
              <div className="pt-4 space-y-3">
                <button
                  type="button"
                  onClick={handleWhatsAppBuy}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-[0.22em] font-medium shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20 stroke-white" />
                  <span className="text-sm font-semibold">Buy on WhatsApp ({phoneNumber})</span>
                </button>

                <div className="flex gap-3">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="flex-1 py-3 border border-zinc-300 hover:border-black bg-white text-black text-xs uppercase tracking-[0.16em] font-medium transition-colors flex items-center justify-center gap-2 text-center"
                  >
                    <Phone className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span>Call: {phoneNumber}</span>
                  </a>

                  <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-3 border border-zinc-200 hover:bg-zinc-100 text-zinc-600 text-xs uppercase tracking-[0.16em] transition-colors"
                  >
                    Explore More
                  </button>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-3.5 text-center">
                  <p className="text-[11px] text-emerald-900 font-medium">
                    Instant WhatsApp Checkout: Clicking the button will open WhatsApp with your product details, picture link, and quantity pre-filled.
                  </p>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="pt-6 border-t border-zinc-200 space-y-3">
                <h3 className="text-xs uppercase tracking-[0.24em] font-medium text-black">
                  Material & Gemstone Specifications
                </h3>
                <div className="bg-zinc-50 border border-zinc-200 divide-y divide-zinc-200 text-xs">
                  <div className="grid grid-cols-2 p-3">
                    <span className="text-zinc-500 font-light">Precious Metal</span>
                    <span className="text-black font-medium">{product.specifications.metal}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3">
                    <span className="text-zinc-500 font-light">Gemstone Setting</span>
                    <span className="text-black font-medium">{product.specifications.gemstone}</span>
                  </div>
                  {product.specifications.caratWeight && (
                    <div className="grid grid-cols-2 p-3">
                      <span className="text-zinc-500 font-light">Carat Weight</span>
                      <span className="text-black font-mono font-medium">{product.specifications.caratWeight}</span>
                    </div>
                  )}
                  {product.specifications.clarity && (
                    <div className="grid grid-cols-2 p-3">
                      <span className="text-zinc-500 font-light">Diamond Clarity</span>
                      <span className="text-black font-mono font-medium">{product.specifications.clarity}</span>
                    </div>
                  )}
                  {product.specifications.color && (
                    <div className="grid grid-cols-2 p-3">
                      <span className="text-zinc-500 font-light">Color Grade</span>
                      <span className="text-black font-mono font-medium">{product.specifications.color}</span>
                    </div>
                  )}
                  {product.specifications.dimensions && (
                    <div className="grid grid-cols-2 p-3">
                      <span className="text-zinc-500 font-light">Dimensions</span>
                      <span className="text-black font-medium">{product.specifications.dimensions}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 p-3">
                    <span className="text-zinc-500 font-light">Official Hallmark</span>
                    <span className="text-black font-mono text-[11px] font-medium">{product.specifications.hallmark}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
