import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'properties' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-850 pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-850">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-[0.25em] font-semibold text-white block">
              AURA
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Curating spaces of quiet permanence and peerless provenance. Representing the world's most distinguished modernist estates, coastal sanctuaries, and skyline penthouses.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <div>Beverly Hills Atelier · 9460 Wilshire Blvd</div>
              <div>Manhattan Salon · 590 Madison Ave</div>
              <div>Miami Beach Waterfront · 1111 Lincoln Rd</div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Featured Estates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('properties')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Browse Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Agent Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Confidential Advisory
                </button>
              </li>
            </ul>
          </div>

          {/* Portfolio Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-200">
              Curated Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Modernist Glass Pavilions</li>
              <li>Oceanfront & Deepwater Estates</li>
              <li>Manhattan Skyline Penthouses</li>
              <li>Mid-Century Architectural Landmarks</li>
              <li>Alpine Ski-In Sanctuaries</li>
            </ul>
          </div>

          {/* Private Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-stone-200">
              Off-Market Dispatch
            </h4>
            <p className="text-xs text-stone-400">
              Receive confidential off-market briefings prior to public catalog release.
            </p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter private email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 text-stone-100 placeholder-stone-500 text-xs px-3 py-2.5 rounded focus:border-amber-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-stone-800 hover:bg-stone-700 text-white rounded text-xs transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-stone-900 p-2.5 rounded border border-stone-800">
                <Check className="w-4 h-4 shrink-0" />
                <span>Subscribed to private briefings</span>
              </div>
            )}
          </div>

        </div>

        {/* Legal & Compliance Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} AURA Architectural Estates LLC. All rights reserved. Equal Housing Opportunity.
          </div>
          <div className="flex items-center gap-6">
            <span>DRE #01928471</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Advisory</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
