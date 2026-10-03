import React from 'react';
import { X, Minus, Plus, Trash2, ShieldCheck, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number, selectedOption?: string) => void;
  onRemoveItem: (productId: string, selectedOption?: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-zinc-200 animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-serif tracking-wider uppercase font-medium text-black">
              Shopping Bag
            </h2>
            <span className="text-xs font-mono text-zinc-500 tabular-nums">
              ({items.reduce((acc, curr) => acc + curr.quantity, 0)})
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-black transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-zinc-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <p className="text-base font-serif text-zinc-800">Your bag is currently empty.</p>
              <p className="text-xs text-zinc-500 max-w-xs font-light">
                Explore our curated permanent collection of handcrafted platinum and gold pieces.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-6 py-3 bg-black text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-zinc-800 transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.selectedOption || 'default'}`} className="py-4 flex gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/1.jfif';
                  }}
                  className="w-20 h-20 object-cover bg-zinc-50 border border-zinc-200 shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-serif font-medium text-black line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id, item.selectedOption)}
                        className="text-zinc-400 hover:text-black p-0.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.selectedOption && (
                      <p className="text-[11px] text-zinc-500">{item.selectedOption}</p>
                    )}

                    <p className="text-xs font-mono tabular-nums text-zinc-800">
                      ${item.product.price.toLocaleString()} USD
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-zinc-200">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, -1, item.selectedOption)}
                        className="p-1 px-2 text-zinc-500 hover:text-black text-xs transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs tabular-nums px-2 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, 1, item.selectedOption)}
                        className="p-1 px-2 text-zinc-500 hover:text-black text-xs transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-mono font-medium text-black tabular-nums">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-200 bg-zinc-50 space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums font-medium text-black">
                  ${subtotal.toLocaleString()} USD
                </span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Armored Courier Delivery</span>
                <span className="font-medium text-zinc-900">Complimentary</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Insurance & Customs Duties</span>
                <span className="font-medium text-zinc-900">Included</span>
              </div>
              <div className="pt-2 border-t border-zinc-200 flex justify-between text-sm font-serif font-medium text-black">
                <span>Total</span>
                <span className="font-mono tabular-nums text-base">
                  ${subtotal.toLocaleString()} USD
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-4 bg-black text-white hover:bg-zinc-800 transition-colors text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>256-Bit SSL Encrypted & Insured</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
