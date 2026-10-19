import React, { useState } from 'react';
import { ArrowRight, Search, MapPin, Building2, SlidersHorizontal, Shield, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { Property } from '../types/property';
import { PropertyCard } from '../components/PropertyCard';
import { MortgageCalculator } from '../components/MortgageCalculator';
import heroVillaImg from '../assets/images/hero_luxury_villa_1792441054086.jpg';

interface HomeViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onQuickView: (property: Property) => void;
  savedPropertyIds: string[];
  onToggleSave: (property: Property) => void;
  comparedPropertyIds: string[];
  onToggleCompare: (property: Property) => void;
  onBrowseAll: () => void;
  onSearchFilter: (category?: string, query?: string) => void;
  onScheduleTour: (property: Property) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  properties,
  onSelectProperty,
  onQuickView,
  savedPropertyIds,
  onToggleSave,
  comparedPropertyIds,
  onToggleCompare,
  onBrowseAll,
  onSearchFilter,
  onScheduleTour,
}) => {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('all');
  const [quickLocation, setQuickLocation] = useState<string>('');
  const [quickCategory, setQuickCategory] = useState<string>('all');

  const filteredFeatured = properties.filter((p) => {
    if (selectedCategoryTab === 'all') return true;
    return p.category === selectedCategoryTab;
  });

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchFilter(quickCategory !== 'all' ? quickCategory : undefined, quickLocation || undefined);
  };

  const heroFeaturedProperty = properties[0];

  return (
    <div className="space-y-20 pb-20 text-left">
      {/* 1. Hero Campaign Showcase (16:9 dominant visual anchor) */}
      <section className="relative min-h-[580px] lg:h-[720px] flex items-end overflow-hidden bg-stone-950 text-white">
        {/* Background Image */}
        <img
          src={heroVillaImg}
          alt="Luxury architectural villa overlooking ocean"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-1000 scale-100"
        />

        {/* Measured Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-14 pt-28">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold">
              <span>Curated Architectural Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>2026 Collection</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance">
              Architectural Sanctuaries of Distinction.
            </h1>

            <p className="text-sm sm:text-base text-stone-200 font-normal leading-relaxed max-w-xl text-balance">
              Representing irreplaceable coastal estates, cantilevered modernist pavilions, and panoramic penthouses across the world's most coveted enclaves.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectProperty(heroFeaturedProperty)}
                className="px-6 py-3.5 bg-white hover:bg-stone-100 text-stone-950 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-200 cursor-pointer shadow-lg"
              >
                Explore The Promontory
              </button>
              <button
                onClick={onBrowseAll}
                className="px-6 py-3.5 bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-200 cursor-pointer"
              >
                View All Listings
              </button>
            </div>
          </div>

          {/* Quick Filter Search Bar */}
          <div className="mt-10 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-lg shadow-2xl border border-stone-200/50 max-w-4xl text-stone-900">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 items-center">
              <div className="relative">
                <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">
                  Location / City
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-stone-100 rounded text-xs">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Malibu, NY, Miami, Carmel..."
                    value={quickLocation}
                    onChange={(e) => setQuickLocation(e.target.value)}
                    className="w-full bg-transparent border-0 p-0 text-stone-900 focus:ring-0 text-xs placeholder-stone-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">
                  Estate Style
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-stone-100 rounded text-xs">
                  <Building2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <select
                    value={quickCategory}
                    onChange={(e) => setQuickCategory(e.target.value)}
                    className="w-full bg-transparent border-0 p-0 text-stone-900 focus:ring-0 text-xs cursor-pointer"
                  >
                    <option value="all">All Styles</option>
                    <option value="villa">Hillside & Oceanfront Villas</option>
                    <option value="penthouse">Skyline Penthouses</option>
                    <option value="estate">Waterfront Estates</option>
                    <option value="modernist">Modernist Pavilions</option>
                    <option value="loft">Historic Lofts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">
                  Acquisition Tier
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-stone-100 rounded text-xs">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <select
                    className="w-full bg-transparent border-0 p-0 text-stone-900 focus:ring-0 text-xs cursor-pointer"
                    onChange={(e) => {
                      if (e.target.value === 'rent') {
                        onBrowseAll();
                      }
                    }}
                  >
                    <option value="all">Any Price</option>
                    <option value="5-15m">$5,000,000 – $15,000,000</option>
                    <option value="15-25m">$15,000,000 – $25,000,000</option>
                    <option value="25m+">$25,000,000+</option>
                    <option value="rent">Luxury Lease</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3 lg:col-span-1 pt-1 sm:pt-0">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm mt-3 sm:mt-0"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Explore Estates</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 2. Quantitative Trust Strip (Adjacency to Hero Claim) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 bg-stone-100/80 rounded-xl border border-stone-200/80">
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              $1.2B+
            </span>
            <span className="text-xs text-stone-600 font-medium mt-1 block">
              Brokered Volume in 24 Months
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              14 Days
            </span>
            <span className="text-xs text-stone-600 font-medium mt-1 block">
              Median Time to Offer
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              99.4%
            </span>
            <span className="text-xs text-stone-600 font-medium mt-1 block">
              List-to-Sale Price Ratio
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              100%
            </span>
            <span className="text-xs text-stone-600 font-medium mt-1 block">
              Strict Buyer Confidentiality
            </span>
          </div>
        </div>
      </section>

      {/* 3. Featured Collection Grid (E-commerce storefront presentation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold block mb-1">
              Curated Catalog
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Featured Architectural Residences
            </h2>
          </div>

          {/* Interactive Filter Tabs (Buttons with click handlers) */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto">
            <button
              onClick={() => setSelectedCategoryTab('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategoryTab === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Styles
            </button>
            <button
              onClick={() => setSelectedCategoryTab('villa')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategoryTab === 'villa'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Villas
            </button>
            <button
              onClick={() => setSelectedCategoryTab('penthouse')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategoryTab === 'penthouse'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Penthouses
            </button>
            <button
              onClick={() => setSelectedCategoryTab('estate')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategoryTab === 'estate'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Waterfront Estates
            </button>
            <button
              onClick={() => setSelectedCategoryTab('modernist')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategoryTab === 'modernist'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Modernist
            </button>
          </div>
        </div>

        {/* 3-Column Grid with generous spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatured.slice(0, 6).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelectProperty={onSelectProperty}
              onQuickView={onQuickView}
              isSaved={savedPropertyIds.includes(property.id)}
              onToggleSave={onToggleSave}
              isCompared={comparedPropertyIds.includes(property.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>

        {/* Secondary collection link */}
        <div className="pt-6 text-center">
          <button
            onClick={onBrowseAll}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded shadow-sm transition-colors cursor-pointer"
          >
            <span>View Complete Property Catalog ({properties.length} Available)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. Interactive Mortgage & Financial Simulator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MortgageCalculator
          initialPrice={heroFeaturedProperty.price}
          initialHoa={heroFeaturedProperty.hoaMonthly}
          initialTax={heroFeaturedProperty.estPropertyTaxAnnual}
        />
      </section>

      {/* 5. Attributable Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100 rounded-xl p-8 sm:p-12 border border-stone-200">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block mb-1">
              Client Provenance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Trusted by Discerning Collectors & Visionaries
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 sm:p-7 rounded-lg border border-stone-200/80 shadow-xs flex flex-col justify-between">
              <p className="text-stone-700 text-sm italic leading-relaxed mb-6 font-serif">
                "AURA navigated the off-market acquisition of our Malibu promontory with absolute architectural literacy and unyielding privacy. Their deep understanding of structural provenance is rare in luxury brokerage."
              </p>
              <div className="pt-4 border-t border-stone-100 text-xs">
                <span className="font-semibold text-stone-900 block">David & Claire Montgomery</span>
                <span className="text-stone-500">Private Equity Founder & Architect · Malibu, California</span>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-lg border border-stone-200/80 shadow-xs flex flex-col justify-between">
              <p className="text-stone-700 text-sm italic leading-relaxed mb-6 font-serif">
                "Finding a penthouse that balances gallery ceiling heights with true residential warmth seemed impossible until AURA presented the 520 Park triplex. The negotiation and closing was flawless."
              </p>
              <div className="pt-4 border-t border-stone-100 text-xs">
                <span className="font-semibold text-stone-900 block">Harrison Bennett</span>
                <span className="text-stone-500">Contemporary Art Patron · Manhattan, New York</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
