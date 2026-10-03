import React, { useState } from 'react';
import { Phone, MessageCircle, Instagram, CheckCircle2, Send } from 'lucide-react';

interface ContactProps {
  onOpenWhatsApp?: () => void;
}

export const Contact: React.FC<ContactProps> = () => {
  const phoneNumber = '03035380945';
  const whatsappNumber = '923035380945';

  const [inquiryData, setInquiryData] = useState({
    name: '',
    inquiryType: 'Bracelet Acquisition',
    message: '',
  });

  const [sentViaWhatsApp, setSentViaWhatsApp] = useState(false);

  const handleDirectWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `*New Atelier Inquiry — PRISM Gem Jewellery*

• *Client Name:* ${inquiryData.name || 'Anonymous Client'}
• *Subject:* ${inquiryData.inquiryType}
• *Message:* ${inquiryData.message}

Hello, I am reaching out regarding PRISM luxury bracelets. Please provide details and pricing.`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formatted)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSentViaWhatsApp(true);
    setTimeout(() => setSentViaWhatsApp(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct WhatsApp Contact & Calling Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-zinc-400 font-medium">
                <span>Direct Concierge</span>
                <span aria-hidden="true">·</span>
                <span>Instant Connect</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif text-black font-normal tracking-tight">
                Private Consultation & Orders
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed">
                Connect directly with our master jeweler on WhatsApp or phone for immediate pricing, wrist measurement assistance, and custom orders.
              </p>
            </div>

            {/* Direct WhatsApp Callout Card */}
            <div className="p-6 bg-emerald-50/50 border border-emerald-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-emerald-950">
                  Official WhatsApp Contact
                </span>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                </span>
              </div>
              <p className="text-xs text-emerald-900 font-light leading-relaxed">
                Send an immediate message on WhatsApp to discuss any luxury bracelet piece, request live showcase videos, or place an order.
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello PRISM Gem Jewellery! I am contacting you regarding your luxury bracelet collection.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center gap-2.5 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white/20 stroke-white" />
                <span>Chat on WhatsApp: {phoneNumber}</span>
              </a>
            </div>

            {/* Direct Contact Numbers */}
            <div className="space-y-4 pt-2 text-xs">
              <div className="flex items-start gap-3.5 p-4 border border-zinc-200 bg-zinc-50">
                <Phone className="w-4 h-4 text-black shrink-0 mt-0.5 stroke-[1.5]" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">Direct Telephone & WhatsApp</p>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="text-base font-mono text-zinc-900 hover:text-black font-semibold tracking-wide transition-colors block mt-0.5"
                  >
                    {phoneNumber}
                  </a>
                  <p className="text-[11px] text-zinc-500 font-light mt-0.5">
                    Available 24/7 for order confirmations and consultations
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links - Instagram ONLY as requested */}
            <div className="pt-4 border-t border-zinc-100 space-y-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                Follow The Platform
              </p>
              <div className="flex items-center gap-4 text-zinc-700">
                <a
                  href="https://www.instagram.com/prismgemjewellery?stkn=emUzZ210ZXN4a29q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border border-zinc-200 hover:border-black hover:text-black transition-colors flex items-center gap-2 text-xs"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 stroke-[1.5]" />
                  <span className="font-serif italic text-zinc-800">Instagram: @prismgemjewellery</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct WhatsApp Message Composer (No Email) */}
          <div className="lg:col-span-7 bg-zinc-50 p-8 md:p-12 border border-zinc-200">
            <div className="space-y-2 mb-6">
              <h3 className="text-xl font-serif text-black font-normal">
                Direct WhatsApp Inquiry
              </h3>
              <p className="text-xs text-zinc-500 font-light">
                Fill in your inquiry below to immediately transmit it directly to our master jeweler on WhatsApp ({phoneNumber}).
              </p>
            </div>

            {sentViaWhatsApp ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto stroke-[1.5]" />
                <h4 className="text-xl font-serif text-black">
                  Opening WhatsApp
                </h4>
                <p className="text-xs text-zinc-600 font-light max-w-sm mx-auto leading-relaxed">
                  Your message has been formatted. If WhatsApp did not open automatically, click the WhatsApp button above or message {phoneNumber} directly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDirectWhatsAppInquiry} className="space-y-5 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-[11px] text-zinc-600 mb-1.5 font-medium">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={inquiryData.name}
                    onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-white border border-zinc-300 p-3 text-zinc-900 focus:outline-none focus:border-black rounded-none"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[11px] text-zinc-600 mb-1.5 font-medium">
                    Bracelet Style / Topic
                  </label>
                  <select
                    value={inquiryData.inquiryType}
                    onChange={(e) => setInquiryData({ ...inquiryData, inquiryType: e.target.value })}
                    className="w-full bg-white border border-zinc-300 p-3 text-zinc-900 focus:outline-none focus:border-black rounded-none"
                  >
                    <option value="Tennis Bracelet Acquisition">Tennis Bracelet Acquisition</option>
                    <option value="18K Gold Link Bracelet Inquiry">18K Gold Link Bracelet Inquiry</option>
                    <option value="Emerald & Gemstone Cuff Inquiry">Emerald & Gemstone Cuff Inquiry</option>
                    <option value="Pearl Bracelet Sizing">Akoya Pearl Bracelet Sizing</option>
                    <option value="Bespoke Bracelet Commission">Bespoke Custom Bracelet Order</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[11px] text-zinc-600 mb-1.5 font-medium">
                    Message or Sizing Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    placeholder="Ask about bracelet wrist fit, diamond certification, or delivery schedule..."
                    className="w-full bg-white border border-zinc-300 p-3 text-zinc-900 focus:outline-none focus:border-black rounded-none leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-black text-white hover:bg-zinc-800 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <span>Send via WhatsApp to {phoneNumber}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[11px] text-zinc-400 text-center tracking-wide font-light">
                  Direct connection with master jeweler · No email sign-up required.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
