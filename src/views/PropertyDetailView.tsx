import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Calendar, MapPin, Bed, Bath, Maximize2, Shield, Check, Phone, Mail, Award, Clock } from 'lucide-react';
import { Property, Agent } from '../types/property';
import { AGENTS } from '../data/agents';
import { MortgageCalculator } from '../components/MortgageCalculator';

interface PropertyDetailViewProps {
  property: Property;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
  allProperties: Property[];
  onOpenInquiry: (property: Property, agent: Agent) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  onBack,
  isSaved,
  onToggleSave,
  onScheduleTour,
  onSelectProperty,
  allProperties,
  onOpenInquiry,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const agent = AGENTS.find((a) => a.id === property.agentId) || AGENTS[0];
  const pricePerSqft = property.type === 'buy' ? Math.round(property.price / property.specs.sqft) : null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && (p.category === property.category || p.type === property.type))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-left">
      {/* Top Navigation Bar: Back & Actions */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-medium transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{isCopied ? 'Link Copied!' : 'Share Dossier'}</span>
          </button>

          <button
            onClick={() => onToggleSave(property)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded border text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              isSaved
                ? 'border-red-200 bg-red-50 text-red-600'
                : 'border-stone-200 text-stone-800 hover:bg-stone-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
            <span>{isSaved ? 'In Shortlist' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Title & Location Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-widest">
          <span>{property.category}</span>
          <span aria-hidden="true">·</span>
          <span>{property.location.neighborhood}</span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-800 font-semibold">{property.status.replace('-', ' ').toUpperCase()}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          {property.title}
        </h1>
        <p className="flex items-center gap-1.5 text-sm text-stone-500">
          <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
          <span>
            {property.location.address}, {property.location.city}, {property.location.state} {property.location.zip}
          </span>
        </p>
      </div>

      {/* Main PDP Grid: Gallery (Left/Top) + Contiguous Purchase Module (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Gallery & Details (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Main Visual Display */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-stone-100 shadow-md">
              <img
                src={property.images[selectedImageIndex] || property.images[0]}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-sm">
                  {property.type === 'buy' ? 'For Sale' : 'For Lease'}
                </span>
              </div>
            </div>

            {/* Thumbnails row */}
            {property.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-[4/3] rounded overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-stone-900 shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Specifications Grid */}
          <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
            <h3 className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">
              Property Architectural Metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-white rounded border border-stone-100">
                <span className="text-stone-400 block mb-1">Bedrooms</span>
                <span className="text-base font-bold text-stone-900 flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-stone-600" />
                  {property.specs.beds} Suites
                </span>
              </div>

              <div className="p-3 bg-white rounded border border-stone-100">
                <span className="text-stone-400 block mb-1">Bathrooms</span>
                <span className="text-base font-bold text-stone-900 flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-stone-600" />
                  {property.specs.baths} Baths
                </span>
              </div>

              <div className="p-3 bg-white rounded border border-stone-100">
                <span className="text-stone-400 block mb-1">Living Area</span>
                <span className="text-base font-bold text-stone-900 tabular-nums flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-stone-600" />
                  {property.specs.sqft.toLocaleString()} sq ft
                </span>
              </div>

              <div className="p-3 bg-white rounded border border-stone-100">
                <span className="text-stone-400 block mb-1">Year Built</span>
                <span className="text-base font-bold text-stone-900 tabular-nums flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-stone-600" />
                  {property.specs.yearBuilt}
                </span>
              </div>
            </div>

            {/* Secondary specs */}
            <div className="mt-4 pt-4 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-600">
              {property.specs.lotSize && (
                <div>
                  <span className="text-stone-400 block">Lot Dimension</span>
                  <span className="font-semibold text-stone-800">{property.specs.lotSize}</span>
                </div>
              )}
              <div>
                <span className="text-stone-400 block">Covered Parking</span>
                <span className="font-semibold text-stone-800">{property.specs.garageSpaces} Vehicles</span>
              </div>
              {pricePerSqft && (
                <div>
                  <span className="text-stone-400 block">Price / Sq Ft</span>
                  <span className="font-semibold text-stone-800 tabular-nums">${pricePerSqft.toLocaleString()}</span>
                </div>
              )}
              <div>
                <span className="text-stone-400 block">Monthly HOA</span>
                <span className="font-semibold text-stone-800 tabular-nums">${property.hoaMonthly.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Description Prose */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Architectural Ethos & Overview
            </h3>
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base font-normal">
              {property.description}
            </p>
          </div>

          {/* Highlights List */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Curated Architectural Highlights
            </h3>
            <ul className="space-y-2.5">
              {property.architecturalHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                  <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center shrink-0 mt-0.5 text-stone-800 font-serif text-[11px] font-bold">
                    {idx + 1}
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Amenities Checklist */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Estate Amenities & Systems
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded bg-stone-50 border border-stone-100 text-xs text-stone-700 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Integrated Mortgage Simulator */}
          <div className="pt-6">
            <MortgageCalculator
              initialPrice={property.price}
              initialHoa={property.hoaMonthly}
              initialTax={property.estPropertyTaxAnnual}
            />
          </div>

        </div>

        {/* Right Column: Contiguous Purchase / Inquiry Module (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 bg-white rounded-xl border border-stone-200 p-6 sm:p-7 shadow-lg space-y-6 text-left">
            
            {/* Price Box */}
            <div className="pb-5 border-b border-stone-100">
              <span className="text-xs uppercase tracking-wider text-stone-400 block mb-1">
                Offered Price
              </span>
              <div className="text-3xl sm:text-4xl font-bold text-stone-900 tabular-nums">
                {property.priceDisplay}
              </div>
              {pricePerSqft && (
                <span className="text-xs text-stone-500 block mt-1 tabular-nums">
                  Approx. ${pricePerSqft.toLocaleString()} per sq ft
                </span>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => onScheduleTour(property)}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold rounded shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Private Viewing</span>
              </button>

              <button
                onClick={() => onOpenInquiry(property, agent)}
                className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs uppercase tracking-wider font-semibold rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Request Broker Dossier</span>
              </button>
            </div>

            {/* Assigned Listing Broker Card */}
            <div className="pt-5 border-t border-stone-100 space-y-3">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
                Exclusive Listing Agent
              </span>

              <div className="flex items-center gap-3.5">
                <img
                  src={agent.image}
                  alt={agent.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-stone-900">
                    {agent.name}
                  </h4>
                  <p className="text-xs text-stone-500 leading-tight">
                    {agent.role}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    {agent.license}
                  </p>
                </div>
              </div>

              <div className="pt-2 text-xs space-y-1 text-stone-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <a href={`tel:${agent.phone}`} className="hover:text-stone-900 font-medium">
                    {agent.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <a href={`mailto:${agent.email}`} className="hover:text-stone-900 font-medium truncate">
                    {agent.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Assurance */}
            <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verified MLS & Off-Market Architectural Listing. Discretion guaranteed.</span>
            </div>

          </div>
        </div>

      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <div className="pt-12 border-t border-stone-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Complementary Residences
            </h3>
            <span className="text-xs text-stone-500">Similar Architectural Typology</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((simProp) => (
              <div
                key={simProp.id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onSelectProperty(simProp);
                }}
                className="group bg-white rounded-lg border border-stone-200 overflow-hidden cursor-pointer hover:shadow-md transition-all"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img
                    src={simProp.images[0]}
                    alt={simProp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <div className="text-[10px] uppercase tracking-wider text-stone-400">
                    {simProp.category} · {simProp.location.city}
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-stone-900 truncate">
                    {simProp.title}
                  </h4>
                  <div className="text-xs font-bold text-stone-900 tabular-nums pt-1">
                    {simProp.priceDisplay}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
