import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeView: 'home' | 'properties' | 'about' | 'contact';
  onNavigate: (view: 'home' | 'properties' | 'about' | 'contact') => void;
  shortlistCount: number;
  onOpenShortlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  shortlistCount,
  onOpenShortlist,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'properties' | 'about' | 'contact') => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract: Brand - 4 Nav Links - 1 Action */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer focus:outline-none"
            aria-label="AURA Real Estate Homepage"
          >
            <span className="font-serif text-2xl tracking-[0.25em] font-semibold text-stone-100 group-hover:text-amber-200 transition-colors whitespace-nowrap shrink-0">
              AURA
            </span>
            <span className="block text-[10px] tracking-[0.3em] uppercase text-stone-400 font-sans -mt-1">
              Architectural Estates
            </span>
          </button>

          {/* Zone 2: Clean 4 Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeView === 'home'
                  ? 'text-white border-b-2 border-amber-400'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => handleNavClick('properties')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeView === 'properties'
                  ? 'text-white border-b-2 border-amber-400'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeView === 'about'
                  ? 'text-white border-b-2 border-amber-400'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              About AURA
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                activeView === 'contact'
                  ? 'text-white border-b-2 border-amber-400'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Agents & Contact
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (Shortlist Drawer) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenShortlist}
              className="relative flex items-center gap-2.5 px-4 py-2.5 text-xs uppercase tracking-wider font-medium text-stone-900 bg-stone-100 hover:bg-amber-100 rounded-sm transition-all duration-200 cursor-pointer shadow-sm"
              aria-label={`View saved properties (${shortlistCount})`}
            >
              <Heart
                className={`w-4 h-4 transition-transform duration-200 ${
                  shortlistCount > 0 ? 'fill-red-500 text-red-500 scale-110' : 'text-stone-700'
                }`}
              />
              <span className="hidden sm:inline">Shortlist</span>
              <span className="tabular-nums font-semibold px-1.5 py-0.2 text-[11px] bg-stone-200 text-stone-800 rounded">
                {shortlistCount}
              </span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-950 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left py-2.5 px-3 rounded text-sm font-medium ${
              activeView === 'home' ? 'bg-stone-800 text-white' : 'text-stone-300'
            }`}
          >
            Explore
          </button>
          <button
            onClick={() => handleNavClick('properties')}
            className={`block w-full text-left py-2.5 px-3 rounded text-sm font-medium ${
              activeView === 'properties' ? 'bg-stone-800 text-white' : 'text-stone-300'
            }`}
          >
            Properties Catalog
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`block w-full text-left py-2.5 px-3 rounded text-sm font-medium ${
              activeView === 'about' ? 'bg-stone-800 text-white' : 'text-stone-300'
            }`}
          >
            About AURA
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`block w-full text-left py-2.5 px-3 rounded text-sm font-medium ${
              activeView === 'contact' ? 'bg-stone-800 text-white' : 'text-stone-300'
            }`}
          >
            Agents & Contact
          </button>
        </div>
      )}
    </header>
  );
};
