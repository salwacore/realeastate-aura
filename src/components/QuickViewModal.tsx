import React, { useState } from 'react';
import { X, Heart, Bed, Bath, Maximize2, Calendar, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Property } from '../types/property';

interface QuickViewModalProps {
  property: Property | null;
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
  isSaved: boolean;
  onToggleSave: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  property,
  onClose,
  onSelectProperty,
  isSaved,
  onToggleSave,
  onScheduleTour,
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!property) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 overflow-hidden text-left"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2.5 bg-stone-900/90 hover:bg-stone-900 text-white rounded-full shadow-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image Gallery */}
        <div className="bg-stone-100 flex flex-col">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <img
              src={property.images[activeImgIndex] || property.images[0]}
              alt={property.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-sm">
                {property.type === 'buy' ? 'For Sale' : 'For Lease'}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {property.images.length > 1 && (
            <div className="p-3 grid grid-cols-4 gap-2 bg-stone-900/5">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`aspect-[4/3] rounded overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImgIndex === idx ? 'border-amber-600 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Details & Actions */}
        <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div>
            {/* Metadata */}
            <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider mb-1.5">
              <span>{property.category}</span>
              <span aria-hidden="true">·</span>
              <span>{property.location.city}, {property.location.state}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-medium">Verified Exclusive</span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
              {property.title}
            </h2>
            <p className="text-sm text-stone-500 mb-4">{property.tagline}</p>

            {/* Price */}
            <div className="mb-6 pb-4 border-b border-stone-100">
              <span className="text-xs uppercase tracking-wider text-stone-400 block font-sans">
                Offered At
              </span>
              <div className="text-3xl font-bold text-stone-900 tabular-nums">
                {property.priceDisplay}
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-stone-50 rounded-lg text-stone-800 text-xs mb-6">
              <div>
                <span className="text-stone-400 block mb-0.5">Bedrooms</span>
                <span className="font-semibold text-sm flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-stone-500" /> {property.specs.beds}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Bathrooms</span>
                <span className="font-semibold text-sm flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-stone-500" /> {property.specs.baths}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Total Area</span>
                <span className="font-semibold text-sm tabular-nums flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-stone-500" /> {property.specs.sqft.toLocaleString()} sq ft
                </span>
              </div>
            </div>

            {/* Key Amenities preview */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Residence Highlights
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-stone-600">
                {property.amenities.slice(0, 4).map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onClose();
                  onScheduleTour(property);
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Tour</span>
              </button>

              <button
                onClick={() => onToggleSave(property)}
                className={`flex items-center justify-center gap-2 py-3 px-4 border text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer ${
                  isSaved
                    ? 'border-red-200 bg-red-50 text-red-600'
                    : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{isSaved ? 'In Shortlist' : 'Save'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                onSelectProperty(property);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs text-stone-600 hover:text-stone-900 font-medium transition-colors cursor-pointer"
            >
              <span>View Full Dossier & Mortgage Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
