import React, { useState } from 'react';
import { Heart, Eye, ArrowRight, Bed, Bath, Maximize2, Compass } from 'lucide-react';
import { Property } from '../types/property';

interface PropertyCardProps {
  property: Property;
  onSelectProperty: (property: Property) => void;
  onQuickView: (property: Property) => void;
  isSaved: boolean;
  onToggleSave: (property: Property) => void;
  isCompared?: boolean;
  onToggleCompare?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelectProperty,
  onQuickView,
  isSaved,
  onToggleSave,
  isCompared = false,
  onToggleCompare,
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const formatPrice = (price: number, type: 'buy' | 'rent') => {
    if (type === 'rent') {
      return `$${price.toLocaleString()} / mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <article className="group bg-white rounded-lg border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden text-left">
      {/* Imagery Container (65-70% height emphasis) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={property.images[activeImgIndex] || property.images[0]}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Dark Gradient Scrim for crisp readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-sm">
            {property.type === 'buy' ? 'For Sale' : 'For Lease'}
          </span>

          <div className="flex items-center gap-1.5">
            {onToggleCompare && (
              <label
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer text-[10px] tracking-wider uppercase font-medium bg-black/60 backdrop-blur-md text-stone-200 hover:text-white px-2 py-1 rounded-sm flex items-center gap-1.5 transition-colors"
                title="Add to side-by-side comparison"
              >
                <input
                  type="checkbox"
                  checked={isCompared}
                  onChange={() => onToggleCompare(property)}
                  className="rounded text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer w-3 h-3"
                />
                <span>Compare</span>
              </label>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(property);
              }}
              aria-label={isSaved ? 'Remove from shortlist' : 'Save to shortlist'}
              className="p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-red-500 shadow-sm backdrop-blur-xs transition-all duration-200 cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 transition-transform duration-200 ${
                  isSaved ? 'fill-red-500 text-red-500 scale-110' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Quick View Button on Hover (E-commerce convention) */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(property);
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-stone-900/90 hover:bg-stone-900 text-white text-xs font-medium tracking-wide uppercase rounded-sm shadow-md backdrop-blur-xs transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Image slider indicators (if multiple images) */}
        {property.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 group-hover:opacity-0 transition-opacity">
            {property.images.slice(0, 4).map((_, idx) => (
              <span
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeImgIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata (Zero-Pill Rule) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider mb-1.5">
            <span>{property.category}</span>
            <span aria-hidden="true">·</span>
            <span>{property.location.neighborhood}</span>
            {property.status === 'exclusive' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-700 font-medium">AURA Exclusive</span>
              </>
            )}
          </div>

          {/* Primary Title */}
          <h3
            onClick={() => onSelectProperty(property)}
            className="font-serif text-lg font-semibold text-stone-900 group-hover:text-stone-700 transition-colors cursor-pointer line-clamp-1 mb-1"
          >
            {property.title}
          </h3>

          {/* Address */}
          <p className="text-xs text-stone-500 line-clamp-1 mb-3">
            {property.location.address}, {property.location.city}, {property.location.state}
          </p>

          {/* Key Specs: Clean unboxed metadata with icons */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-stone-700 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-stone-400" />
              <span>{property.specs.beds} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-stone-400" />
              <span>{property.specs.baths} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
              <span className="tabular-nums">{property.specs.sqft.toLocaleString()} sq ft</span>
            </div>
          </div>
        </div>

        {/* Footer: Price & Primary CTA */}
        <div className="pt-4 mt-1 flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-sans">
              Asking Price
            </span>
            <span className="text-lg font-semibold text-stone-900 tabular-nums">
              {formatPrice(property.price, property.type)}
            </span>
          </div>

          <button
            onClick={() => onSelectProperty(property)}
            className="flex items-center gap-1 text-xs font-semibold text-stone-900 hover:text-amber-700 transition-colors cursor-pointer group/btn"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
};
