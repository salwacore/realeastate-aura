import React from 'react';
import { X, Check, Minus, Bed, Bath, Maximize2, Calendar, DollarSign } from 'lucide-react';
import { Property } from '../types/property';

interface ComparisonModalProps {
  isOpen: boolean;
  properties: Property[];
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
  onRemoveFromCompare: (id: string) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  properties,
  onClose,
  onSelectProperty,
  onRemoveFromCompare,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen || properties.length === 0) return null;

  const allAmenities = Array.from(
    new Set(properties.flatMap((p) => p.amenities))
  ).slice(0, 8);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden text-left"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900">
              Side-by-Side Property Comparison
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Compare architectural metrics, square footage, and property amenities.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-auto p-5 sm:p-6">
          <div className="min-w-[640px]">
            {/* Properties Top Row (Cards) */}
            <div className="grid grid-cols-4 gap-4 pb-6 border-b border-stone-200">
              <div className="col-span-1 pt-6 text-xs uppercase tracking-wider text-stone-400 font-semibold">
                Estates Overview
              </div>
              {properties.map((prop) => (
                <div key={prop.id} className="col-span-1 space-y-2">
                  <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-stone-100">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => onRemoveFromCompare(prop.id)}
                      className="absolute top-2 right-2 p-1 bg-stone-900/80 hover:bg-stone-900 text-white rounded-full text-xs"
                      title="Remove from comparison"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-stone-900 truncate">
                    {prop.title}
                  </h4>
                  <div className="text-base font-bold text-stone-900 tabular-nums">
                    {prop.priceDisplay}
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectProperty(prop);
                    }}
                    className="w-full py-1.5 px-2 bg-stone-900 hover:bg-stone-800 text-white text-[11px] uppercase tracking-wider font-semibold rounded cursor-pointer transition-colors"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {/* Metric Rows */}
            <div className="divide-y divide-stone-100 text-xs">
              {/* Location */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-medium text-stone-500">Location</span>
                {properties.map((p) => (
                  <span key={p.id} className="text-stone-800 font-medium">
                    {p.location.city}, {p.location.state}
                  </span>
                ))}
              </div>

              {/* Price per sq ft */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-medium text-stone-500">Price / Sq Ft</span>
                {properties.map((p) => {
                  const ppsqft = p.type === 'buy' ? Math.round(p.price / p.specs.sqft) : '-';
                  return (
                    <span key={p.id} className="text-stone-900 font-semibold tabular-nums">
                      {typeof ppsqft === 'number' ? `$${ppsqft.toLocaleString()}` : ppsqft}
                    </span>
                  );
                })}
              </div>

              {/* Bedrooms */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-medium text-stone-500">Bedrooms</span>
                {properties.map((p) => (
                  <span key={p.id} className="text-stone-800 tabular-nums">
                    {p.specs.beds} Beds
                  </span>
                ))}
              </div>

              {/* Bathrooms */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-medium text-stone-500">Bathrooms</span>
                {properties.map((p) => (
                  <span key={p.id} className="text-stone-800 tabular-nums">
                    {p.specs.baths} Baths
                  </span>
                ))}
              </div>

              {/* Living Area */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-medium text-stone-500">Living Area</span>
                {properties.map((p) => (
                  <span key={p.id} className="text-stone-900 font-semibold tabular-nums">
                    {p.specs.sqft.toLocaleString()} sq ft
                  </span>
                ))}
              </div>

              {/* Year Built */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-medium text-stone-500">Year Built</span>
                {properties.map((p) => (
                  <span key={p.id} className="text-stone-800 tabular-nums">
                    {p.specs.yearBuilt}
                  </span>
                ))}
              </div>

              {/* Garage / Parking */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-medium text-stone-500">Garage Spaces</span>
                {properties.map((p) => (
                  <span key={p.id} className="text-stone-800 tabular-nums">
                    {p.specs.garageSpaces} Vehicles
                  </span>
                ))}
              </div>

              {/* Amenities Breakdown */}
              <div className="pt-4 pb-2">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                  Amenities Matrix
                </span>
              </div>
              {allAmenities.map((amenity) => (
                <div key={amenity} className="grid grid-cols-4 gap-4 py-2.5 items-center">
                  <span className="text-stone-600">{amenity}</span>
                  {properties.map((p) => {
                    const hasAmenity = p.amenities.includes(amenity);
                    return (
                      <span key={p.id} className="flex items-center">
                        {hasAmenity ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Minus className="w-4 h-4 text-stone-300" />
                        )}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
