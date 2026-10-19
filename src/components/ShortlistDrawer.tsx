import React from 'react';
import { X, Trash2, ArrowRight, Heart, Scale, Mail } from 'lucide-react';
import { Property } from '../types/property';

interface ShortlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProperties: Property[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onSelectProperty: (property: Property) => void;
  onOpenCompare: () => void;
  onInquireAll: () => void;
  onBrowseProperties: () => void;
}

export const ShortlistDrawer: React.FC<ShortlistDrawerProps> = ({
  isOpen,
  onClose,
  savedProperties,
  onRemove,
  onClear,
  onSelectProperty,
  onOpenCompare,
  onInquireAll,
  onBrowseProperties,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const totalValue = savedProperties.reduce((acc, p) => acc + (p.type === 'buy' ? p.price : 0), 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col text-left animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h2 className="font-serif text-lg font-bold text-stone-900">
              Shortlist ({savedProperties.length})
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {savedProperties.length > 0 && (
              <button
                onClick={onClear}
                className="text-xs text-stone-400 hover:text-stone-700 underline transition-colors cursor-pointer mr-2"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="p-2 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-200/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {savedProperties.length === 0 ? (
            <div className="py-16 text-center text-stone-500 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-semibold text-stone-800">
                Your shortlist is empty
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our curated collection of architectural estates and click the heart icon to curate your bespoke portfolio.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowseProperties();
                }}
                className="mt-4 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded cursor-pointer transition-colors"
              >
                Browse Estates
              </button>
            </div>
          ) : (
            savedProperties.map((prop) => (
              <div
                key={prop.id}
                className="flex gap-4 p-3 bg-stone-50 rounded-lg border border-stone-200/70 hover:border-stone-300 transition-all group"
              >
                <div
                  onClick={() => {
                    onClose();
                    onSelectProperty(prop);
                  }}
                  className="w-24 h-20 rounded overflow-hidden bg-stone-200 shrink-0 cursor-pointer"
                >
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                        {prop.category}
                      </span>
                      <button
                        onClick={() => onRemove(prop.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                        title="Remove from shortlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="font-serif text-sm font-semibold text-stone-900 hover:text-amber-800 truncate cursor-pointer"
                    >
                      {prop.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate">
                      {prop.location.city}, {prop.location.state}
                    </p>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-xs font-bold text-stone-900 tabular-nums">
                      {prop.priceDisplay}
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="text-[11px] font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with actions */}
        {savedProperties.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-stone-200 bg-stone-50 space-y-3">
            {totalValue > 0 && (
              <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200">
                <span className="text-stone-500 uppercase tracking-wider">
                  Total Portfolio Value
                </span>
                <span className="text-base font-bold text-stone-900 tabular-nums">
                  ${totalValue.toLocaleString()}
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenCompare();
                }}
                disabled={savedProperties.length < 2}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                  savedProperties.length >= 2
                    ? 'border-stone-300 text-stone-800 hover:bg-stone-100 bg-white'
                    : 'border-stone-200 text-stone-400 bg-stone-100 cursor-not-allowed'
                }`}
                title={savedProperties.length < 2 ? 'Save at least 2 properties to compare' : 'Compare saved properties'}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare ({savedProperties.length})</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onInquireAll();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded text-xs font-semibold uppercase tracking-wider bg-stone-900 hover:bg-stone-800 text-white transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Inquire All</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
