import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Lock, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('');

  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury transaction clearance
    setTimeout(() => {
      const randomOrder = `PRISM-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrderNumber(randomOrder);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onOrderCompleted();
    }, 1200);
  };

  const handleCloseAndReset = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 md:p-8">
      <div
        className="relative bg-white w-full max-w-3xl border border-zinc-200 shadow-2xl p-6 md:p-10 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleCloseAndReset}
          className="absolute top-6 right-6 text-zinc-400 hover:text-black transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {orderConfirmed ? (
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 border-2 border-black flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-black stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-400 font-medium">
                Order Acquisition Confirmed
              </p>
              <h2 className="text-3xl font-serif text-black">
                Thank You for Choosing PRISM
              </h2>
              <p className="text-sm font-mono text-zinc-600 tracking-wider">
                Reference ID: <span className="text-black font-semibold">{confirmedOrderNumber}</span>
              </p>
            </div>

            <div className="max-w-md mx-auto text-xs text-zinc-500 font-light leading-relaxed border-t border-b border-zinc-200 py-4 text-left space-y-2">
              <p>
                An official acquisition dossier and certificate of appraisal have been dispatched to{' '}
                <strong className="text-black font-medium">{formData.email || 'your email'}</strong>.
              </p>
              <p>
                Your jewellery is undergoing final ultrasonic purification and white-glove inspection prior to armored express dispatch.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseAndReset}
              className="px-8 py-3.5 bg-black text-white hover:bg-zinc-800 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
            >
              Return to Atelier Collection
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-zinc-200 pb-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>Private & Encrypted Acquisition</span>
              </div>
              <h2 className="text-2xl font-serif text-black mt-1">
                Order Verification & Dispatch
              </h2>
            </div>

            {/* Quick Order Overview */}
            <div className="bg-zinc-50 p-4 border border-zinc-200 space-y-2">
              <div className="flex justify-between text-xs text-zinc-600">
                <span>Selected Pieces ({items.reduce((a, b) => a + b.quantity, 0)})</span>
                <span className="font-mono tabular-nums font-medium text-black">
                  ${total.toLocaleString()} USD
                </span>
              </div>
              <div className="flex justify-between text-xs text-zinc-600">
                <span>Armored Courier & Valuation Guarantee</span>
                <span className="font-medium text-emerald-700">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm font-serif font-medium text-black pt-2 border-t border-zinc-200">
                <span>Acquisition Total</span>
                <span className="font-mono tabular-nums">
                  ${total.toLocaleString()} USD
                </span>
              </div>
            </div>

            {/* Contact & Shipping Details */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.18em] font-medium text-black">
                1. Delivery Destination
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-500 mb-1 uppercase tracking-wider text-[11px]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-white border border-zinc-300 p-2.5 text-zinc-900 focus:outline-none focus:border-black rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 mb-1 uppercase tracking-wider text-[11px]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="eleanor@example.com"
                    className="w-full bg-white border border-zinc-300 p-2.5 text-zinc-900 focus:outline-none focus:border-black rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 mb-1 uppercase tracking-wider text-[11px]">
                    Contact Telephone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 012-3456"
                    className="w-full bg-white border border-zinc-300 p-2.5 text-zinc-900 focus:outline-none focus:border-black rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 mb-1 uppercase tracking-wider text-[11px]">
                    Country / Territory *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-white border border-zinc-300 p-2.5 text-zinc-900 focus:outline-none focus:border-black rounded-none"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="France">France</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-zinc-500 mb-1 uppercase tracking-wider text-[11px]">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street address, apartment or suite"
                    className="w-full bg-white border border-zinc-300 p-2.5 text-zinc-900 focus:outline-none focus:border-black rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 mb-1 uppercase tracking-wider text-[11px]">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="New York"
                    className="w-full bg-white border border-zinc-300 p-2.5 text-zinc-900 focus:outline-none focus:border-black rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 mb-1 uppercase tracking-wider text-[11px]">
                    Postal / Zip Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="10022"
                    className="w-full bg-white border border-zinc-300 p-2.5 text-zinc-900 focus:outline-none focus:border-black rounded-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs uppercase tracking-[0.18em] font-medium text-black">
                2. Method of Payment
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <label
                  className={`p-3 border flex flex-col gap-1 cursor-pointer transition-colors ${
                    formData.paymentMethod === 'card'
                      ? 'border-black bg-zinc-50'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-black">Credit / Debit Card</span>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="accent-black"
                    />
                  </div>
                  <span className="text-[11px] text-zinc-500">Amex, Visa, Mastercard</span>
                </label>

                <label
                  className={`p-3 border flex flex-col gap-1 cursor-pointer transition-colors ${
                    formData.paymentMethod === 'wire'
                      ? 'border-black bg-zinc-50'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-black">Private Wire / Concierge</span>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wire"
                      checked={formData.paymentMethod === 'wire'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'wire' })}
                      className="accent-black"
                    />
                  </div>
                  <span className="text-[11px] text-zinc-500">Invoice via atelier desk</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="text-xs uppercase tracking-[0.16em] text-zinc-500 hover:text-black flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Bag</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 bg-black text-white hover:bg-zinc-800 text-xs uppercase tracking-[0.2em] font-medium transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Clearing Acquisition...' : `Authorize & Purchase · $${total.toLocaleString()} USD`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
