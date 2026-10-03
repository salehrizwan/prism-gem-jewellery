import React, { useState } from 'react';
import { X, MessageSquare, Send, Check } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Open WhatsApp Web/App with pre-filled luxury message
    const encodedMessage = encodeURIComponent(
      `Hello PRISM Gem Jewellery Atelier,\n\nI would like to inquire about a piece: ${message}`
    );
    window.open(`https://wa.me/12125550198?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white w-full max-w-md border border-zinc-200 shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-black transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-black flex items-center justify-center text-black">
              <MessageSquare className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                Direct Atelier WhatsApp
              </p>
              <h3 className="text-lg font-serif text-black font-medium">
                Private Concierge Chat
              </h3>
            </div>
          </div>

          <p className="text-xs text-zinc-600 font-light leading-relaxed">
            Connect directly with our master gemologists for sizing questions, bespoke setting commissions, or high-resolution stone videos.
          </p>

          {isSent ? (
            <div className="p-4 bg-zinc-50 border border-zinc-200 text-center space-y-2">
              <Check className="w-6 h-6 text-black mx-auto" />
              <p className="text-xs uppercase tracking-wider text-black font-medium">
                Opening WhatsApp Session...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-zinc-600 mb-1">
                  How may we assist you?
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Inquiring regarding custom ring sizing for the Verdant Solitaire..."
                  className="w-full bg-zinc-50 border border-zinc-300 p-3 text-xs text-zinc-900 focus:outline-none focus:border-black rounded-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-black text-white hover:bg-zinc-800 text-xs uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>Launch WhatsApp Dialogue</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="text-[10px] text-zinc-400 uppercase tracking-widest text-center pt-1">
            Available Monday – Saturday · 9:00 – 19:00 EST
          </div>
        </div>
      </div>
    </div>
  );
};
