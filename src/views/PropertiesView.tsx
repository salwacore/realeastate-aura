import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, RotateCcw, LayoutGrid, List, Check, Bed, Bath, Maximize2 } from 'lucide-react';
import { Property, FilterState, PropertyCategory, ListingType } from '../types/property';
import { PropertyCard } from '../components/PropertyCard';

interface PropertiesViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onQuickView: (property: Property) => void;
  savedPropertyIds: string[];
  onToggleSave: (property: Property) => void;
  comparedPropertyIds: string[];
  onToggleCompare: (property: Property) => void;
  initialCategory?: string;
  initialQuery?: string;
}

export const PropertiesView: React.FC<PropertiesViewProps> = ({
  properties,
  onSelectProperty,
  onQuickView,
  savedPropertyIds,
  onToggleSave,
  comparedPropertyIds,
  onToggleCompare,
  initialCategory = 'all',
  initialQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState<'all' | ListingType>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | PropertyCategory>(
    (initialCategory as any) || 'all'
  );
  const [minBeds, setMinBeds] = useState<number>(0);
  const [minBaths, setMinBaths] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(30000000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'sqft-desc' | 'newest'>('featured');
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const availableAmenities = [
    'Infinity Pool',
    'Oceanfront Terrace',
    'Smart Home Automation',
    'Wine Cellar',
    'Private Elevator',
    'EV Charging Station',
    'Private Boat Dock',
  ];

  const handleToggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setMinBeds(0);
    setMinBaths(0);
    setMaxPrice(30000000);
    setSelectedAmenities([]);
    setSortBy('featured');
  };

  const filteredProperties = useMemo(() => {
    return properties
      .filter((item) => {
        // Query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchCity = item.location.city.toLowerCase().includes(q);
          const matchNeigh = item.location.neighborhood.toLowerCase().includes(q);
          const matchState = item.location.state.toLowerCase().includes(q);
          if (!matchTitle && !matchCity && !matchNeigh && !matchState) return false;
        }

        // Type match
        if (typeFilter !== 'all' && item.type !== typeFilter) return false;

        // Category match
        if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;

        // Beds & Baths
        if (item.specs.beds < minBeds) return false;
        if (item.specs.baths < minBaths) return false;

        // Price
        if (item.type === 'buy' && item.price > maxPrice) return false;

        // Amenities
        if (selectedAmenities.length > 0) {
          const hasAll = selectedAmenities.every((a) => item.amenities.includes(a));
          if (!hasAll) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'sqft-desc') return b.specs.sqft - a.specs.sqft;
        if (sortBy === 'newest') return a.daysOnMarket - b.daysOnMarket;
        // Default: featured first
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [
    properties,
    searchQuery,
    typeFilter,
    categoryFilter,
    minBeds,
    minBaths,
    maxPrice,
    selectedAmenities,
    sortBy,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Catalog Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold block mb-1">
            Exclusive Real Estate Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Current Architectural Listings
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Filter by architectural typology, geography, acquisition price, and verified specifications.
          </p>
        </div>

        {/* Search bar inside header */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search address, city, or style..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-100 rounded-lg border border-stone-200 focus:outline-none focus:border-stone-900 text-stone-900 placeholder-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main E-Commerce Grid with Filter Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex items-center justify-between">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 py-2 px-3 bg-stone-100 rounded text-xs font-semibold text-stone-900 border border-stone-200"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{showMobileFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
          <span className="text-xs text-stone-500 tabular-nums">
            {filteredProperties.length} Properties
          </span>
        </div>

        {/* Left Filter Sidebar */}
        <aside
          className={`${
            showMobileFilters ? 'block' : 'hidden'
          } lg:block lg:col-span-1 space-y-6 bg-white p-6 rounded-lg border border-stone-200 shadow-xs h-fit`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Refine Catalog</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Listing Format */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
              Listing Format
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-md">
              <button
                type="button"
                onClick={() => setTypeFilter('all')}
                className={`py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  typeFilter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('buy')}
                className={`py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  typeFilter === 'buy' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                Buy
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('rent')}
                className={`py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  typeFilter === 'rent' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                Rent
              </button>
            </div>
          </div>

          {/* Architectural Typology */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
              Style & Typology
            </label>
            <div className="space-y-1 text-xs text-stone-600">
              {[
                { label: 'All Typologies', val: 'all' },
                { label: 'Hillside & Oceanfront Villas', val: 'villa' },
                { label: 'Skyline Penthouses', val: 'penthouse' },
                { label: 'Waterfront Estates', val: 'estate' },
                { label: 'Modernist Glass Pavilions', val: 'modernist' },
                { label: 'Cast Iron Historic Lofts', val: 'loft' },
              ].map((cat) => (
                <button
                  key={cat.val}
                  type="button"
                  onClick={() => setCategoryFilter(cat.val as any)}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors flex items-center justify-between cursor-pointer ${
                    categoryFilter === cat.val
                      ? 'bg-stone-900 text-white font-medium'
                      : 'hover:bg-stone-100'
                  }`}
                >
                  <span>{cat.label}</span>
                  {categoryFilter === cat.val && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-stone-800 uppercase tracking-wider">
                Max Price
              </label>
              <span className="font-bold text-stone-900 tabular-nums">
                ${maxPrice >= 30000000 ? 'Any' : (maxPrice / 1000000).toFixed(1) + 'M'}
              </span>
            </div>
            <input
              type="range"
              min={5000000}
              max={30000000}
              step={1000000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-stone-900 cursor-pointer"
            />
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <div>
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                Min Bedrooms
              </label>
              <div className="grid grid-cols-4 gap-1 p-1 bg-stone-100 rounded-md text-xs">
                {[0, 3, 4, 5].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setMinBeds(count)}
                    className={`py-1 font-medium rounded transition-colors cursor-pointer ${
                      minBeds === count ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                    }`}
                  >
                    {count === 0 ? 'Any' : `${count}+`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                Min Bathrooms
              </label>
              <div className="grid grid-cols-4 gap-1 p-1 bg-stone-100 rounded-md text-xs">
                {[0, 3, 4, 6].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setMinBaths(count)}
                    className={`py-1 font-medium rounded transition-colors cursor-pointer ${
                      minBaths === count ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                    }`}
                  >
                    {count === 0 ? 'Any' : `${count}+`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Amenities Checklist */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider">
              Luxury Amenities
            </label>
            <div className="space-y-1.5 text-xs text-stone-700">
              {availableAmenities.map((amenity) => {
                const checked = selectedAmenities.includes(amenity);
                return (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 cursor-pointer hover:text-stone-950"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggleAmenity(amenity)}
                      className="rounded text-stone-900 focus:ring-0 cursor-pointer"
                    />
                    <span>{amenity}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Area: Results Grid & Sort Bar */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Top Sort Bar */}
          <div className="bg-white p-3 sm:p-4 rounded-lg border border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-stone-600 font-medium">
              Showing <span className="font-bold text-stone-900 tabular-nums">{filteredProperties.length}</span> verified architectural residences
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 rounded px-2.5 py-1 text-xs text-stone-900 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Curated & Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="sqft-desc">Living Area: Largest First</option>
                  <option value="newest">Newest to Catalog</option>
                </select>
              </div>

              {/* View Layout Toggle */}
              <div className="hidden sm:flex items-center gap-1 p-0.5 bg-stone-100 rounded border border-stone-200">
                <button
                  onClick={() => setViewLayout('grid')}
                  className={`p-1 rounded cursor-pointer ${
                    viewLayout === 'grid' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewLayout('list')}
                  className={`p-1 rounded cursor-pointer ${
                    viewLayout === 'list' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500'
                  }`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Properties Result Set */}
          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-lg border border-stone-200 p-12 text-center space-y-4">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                No matching residences found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try expanding your price range, removing amenity filters, or resetting your search criteria to view our complete portfolio.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded cursor-pointer transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewLayout === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
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
          ) : (
            /* List Layout view */
            <div className="space-y-4">
              {filteredProperties.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => onSelectProperty(prop)}
                  className="bg-white rounded-lg border border-stone-200 p-4 flex flex-col sm:flex-row gap-5 hover:border-stone-400 transition-all cursor-pointer group"
                >
                  <div className="w-full sm:w-64 aspect-[4/3] rounded-md overflow-hidden bg-stone-100 shrink-0 relative">
                    <img
                      src={prop.images[0]}
                      alt={prop.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider font-semibold text-white bg-black/70 px-2 py-0.5 rounded-sm">
                      {prop.type === 'buy' ? 'For Sale' : 'For Lease'}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="text-[11px] text-stone-500 uppercase tracking-wider mb-1">
                        {prop.category} · {prop.location.city}, {prop.location.state}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                        {prop.title}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                        {prop.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-xs text-stone-700">
                        <span className="flex items-center gap-1 font-medium">
                          <Bed className="w-3.5 h-3.5 text-stone-400" /> {prop.specs.beds} Beds
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Bath className="w-3.5 h-3.5 text-stone-400" /> {prop.specs.baths} Baths
                        </span>
                        <span className="flex items-center gap-1 font-medium tabular-nums">
                          <Maximize2 className="w-3.5 h-3.5 text-stone-400" /> {prop.specs.sqft.toLocaleString()} sq ft
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-bold text-stone-900 tabular-nums">
                          {prop.priceDisplay}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
