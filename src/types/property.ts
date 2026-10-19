export type PropertyCategory = 'villa' | 'penthouse' | 'estate' | 'modernist' | 'loft';
export type ListingType = 'buy' | 'rent';
export type PropertyStatus = 'available' | 'under-contract' | 'new-listing' | 'exclusive';

export interface PropertySpecs {
  beds: number;
  baths: number;
  sqft: number;
  lotSize?: string;
  yearBuilt: number;
  garageSpaces: number;
}

export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
  lat?: number;
  lng?: number;
}

export interface Property {
  id: string;
  title: string;
  tagline: string;
  price: number;
  priceDisplay: string;
  type: ListingType;
  category: PropertyCategory;
  location: PropertyLocation;
  specs: PropertySpecs;
  featured: boolean;
  status: PropertyStatus;
  images: string[];
  description: string;
  architecturalHighlights: string[];
  amenities: string[];
  hoaMonthly: number;
  estPropertyTaxAnnual: number;
  agentId: string;
  virtualTourAvailable: boolean;
  daysOnMarket: number;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  license: string;
  experienceYears: number;
  specialty: string;
  bio: string;
  soldVolume: string;
  activeListingsCount: number;
}

export interface FilterState {
  searchQuery: string;
  type: 'all' | ListingType;
  category: 'all' | PropertyCategory;
  minPrice: number;
  maxPrice: number;
  minBeds: number;
  minBaths: number;
  minSqft: number;
  amenities: string[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'sqft-desc';
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  interestType: 'schedule-tour' | 'inquire' | 'make-offer' | 'sell';
  propertyId?: string;
  agentId?: string;
  tourDate?: string;
  tourTime?: string;
  tourType?: 'in-person' | 'virtual';
  budgetRange?: string;
  timeline?: string;
  preferredContact?: 'email' | 'phone' | 'whatsapp';
  message: string;
}
