import { Property } from '../types/property';
import heroVillaImg from '../assets/images/hero_luxury_villa_1792441054086.jpg';
import penthouseImg from '../assets/images/property_penthouse_skyline_1792441053745.jpg';
import coastalMansionImg from '../assets/images/property_coastal_mansion_1792441054006.jpg';
import modernistImg from '../assets/images/property_modernist_residence_1792441055153.jpg';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-the-bel-air-promontory',
    title: 'The Promontory at Pacific Ridge',
    tagline: 'Cantilevered architectural masterpiece with infinity edge ocean vistas',
    price: 18500000,
    priceDisplay: '$18,500,000',
    type: 'buy',
    category: 'villa',
    location: {
      address: '24880 Pacific Horizon Way',
      city: 'Malibu',
      state: 'CA',
      zip: '90265',
      neighborhood: 'Pacific Palisades / Point Dume'
    },
    specs: {
      beds: 6,
      baths: 8,
      sqft: 9800,
      lotSize: '1.45 Acres',
      yearBuilt: 2024,
      garageSpaces: 4
    },
    featured: true,
    status: 'exclusive',
    images: [heroVillaImg, coastalMansionImg, penthouseImg, modernistImg],
    description: 'Carved with cinematic precision into the cliffs of Malibu, The Promontory represents the apex of coastal California architecture. Featuring seamless 60-foot motorized pocketing glass walls, an 80-foot suspended infinity pool that merges with the Pacific horizon, and hand-selected French limestone terraces. Designed for seamless indoor-outdoor galas and restorative oceanfront seclusion.',
    architecturalHighlights: [
      'Engineered cantilevered master suite with 270-degree ocean panoramas',
      'Dual chef and catering kitchens with custom Poliform cabinetry & Sub-Zero refrigeration',
      'Temperature-controlled 950-bottle sommelier glass wine gallery',
      'Zero-edge horizon pool with recessed fire pit lounge and integrated spa',
      'Crestron Home Automation with biometric architectural security'
    ],
    amenities: [
      'Infinity Pool',
      'Oceanfront Terrace',
      'Smart Home Automation',
      'Wine Cellar',
      'Private Spa & Sauna',
      'EV Charging Station',
      'Private Elevator',
      'Outdoor Kitchen & Fireplace'
    ],
    hoaMonthly: 1250,
    estPropertyTaxAnnual: 185000,
    agentId: 'agent-elena-vance',
    virtualTourAvailable: true,
    daysOnMarket: 8
  },
  {
    id: 'prop-the-soho-skyline-penthouse',
    title: 'The Crown Penthouse at 520 Park',
    tagline: 'Triplex penthouse with private terrace and panoramic Manhattan skyline',
    price: 24750000,
    priceDisplay: '$24,750,000',
    type: 'buy',
    category: 'penthouse',
    location: {
      address: '520 Park Avenue, PH 48',
      city: 'New York',
      state: 'NY',
      zip: '10065',
      neighborhood: 'Upper East Side'
    },
    specs: {
      beds: 5,
      baths: 6,
      sqft: 7650,
      lotSize: 'N/A (2,100 sq ft wrap terrace)',
      yearBuilt: 2023,
      garageSpaces: 2
    },
    featured: true,
    status: 'new-listing',
    images: [penthouseImg, heroVillaImg, modernistImg, coastalMansionImg],
    description: 'An unmatched urban sanctuary rising nearly 600 feet above Central Park. This triplex penthouse boasts 14-foot ceiling volumes, bespoke Statuario marble sculptural hearths, private rooftop plunge pool, and continuous 360-degree glass perimeter framing iconic sunrise and sunset city views.',
    architecturalHighlights: [
      'Private key-locked high-speed elevator opening directly into sculptural gallery foyer',
      'Floating bronze cantilever staircase designed by renowned studio',
      'Primary retreat featuring dual spa baths with heated Calacatta marble slabs',
      'Rooftop outdoor sky pavilion with heated granite decking and outdoor shower',
      'Acoustically isolated private cinema and executive study'
    ],
    amenities: [
      'Panoramic Skyline Views',
      'Private Rooftop Plunge Pool',
      'Doorman & 24/7 Concierge',
      'Wine Cellar',
      'Private Elevator',
      'Marble Fireplaces',
      'Fitness & Wellness Center',
      'Valet Parking'
    ],
    hoaMonthly: 4600,
    estPropertyTaxAnnual: 247000,
    agentId: 'agent-julian-sterling',
    virtualTourAvailable: true,
    daysOnMarket: 14
  },
  {
    id: 'prop-coastal-limestone-mansion',
    title: 'The Bellaria Waterfront Estate',
    tagline: 'Modern limestone residence with deepwater dock and tranquil reflection pool',
    price: 15900000,
    priceDisplay: '$15,900,000',
    type: 'buy',
    category: 'estate',
    location: {
      address: '1420 Biscayne Island Blvd',
      city: 'Miami Beach',
      state: 'FL',
      zip: '33139',
      neighborhood: 'Venetian Islands'
    },
    specs: {
      beds: 7,
      baths: 8,
      sqft: 8900,
      lotSize: '0.62 Acres',
      yearBuilt: 2024,
      garageSpaces: 3
    },
    featured: true,
    status: 'exclusive',
    images: [coastalMansionImg, heroVillaImg, modernistImg, penthouseImg],
    description: 'Commanding over 120 feet of pristine deepwater frontage accommodating up to an 85-foot luxury yacht. Crafted with honed Portuguese limestone, custom bronze fins, and floor-to-ceiling hurricane-rated low-iron glazing. Seamlessly merges resort-style waterfront relaxation with metropolitan elegance.',
    architecturalHighlights: [
      '120 feet of private deepwater dockage with high-capacity shore power',
      'Oversized dark basalt reflection pool and sunken seating lounge',
      'Bespoke Italian Boffi kitchen with dual islands and butler pantry',
      'Separate two-bedroom guest carriage house with private terrace',
      'LEED Gold compliant solar array and microgrid battery backup'
    ],
    amenities: [
      'Private Boat Dock',
      'Deepwater Frontage',
      'Infinity Reflection Pool',
      'Guest House',
      'Smart Home Automation',
      'Outdoor Summer Kitchen',
      'EV Charging Station',
      'Private Gated Entry'
    ],
    hoaMonthly: 850,
    estPropertyTaxAnnual: 162000,
    agentId: 'agent-elena-vance',
    virtualTourAvailable: true,
    daysOnMarket: 19
  },
  {
    id: 'prop-modernist-zen-pavilion',
    title: 'The Kanso Glass Pavilion',
    tagline: 'Serene minimalist sanctuary embraced by Japanese gardens and pine forest',
    price: 9400000,
    priceDisplay: '$9,400,000',
    type: 'buy',
    category: 'modernist',
    location: {
      address: '7100 Skyline Crest Drive',
      city: 'Carmel-by-the-Sea',
      state: 'CA',
      zip: '93923',
      neighborhood: 'Carmel Highlands'
    },
    specs: {
      beds: 4,
      baths: 4,
      sqft: 5200,
      lotSize: '2.1 Acres',
      yearBuilt: 2023,
      garageSpaces: 2
    },
    featured: true,
    status: 'available',
    images: [modernistImg, heroVillaImg, coastalMansionImg, penthouseImg],
    description: 'Inspired by Japanese sukiya-zukuri architecture and mid-century minimalism, The Kanso Pavilion rests effortlessly on a 2-acre natural cedar and pine knoll. Raked gravel zen gardens, koi ponds, and broad overhangs blur the distinction between interior living sanctuaries and untamed coastal forest.',
    architecturalHighlights: [
      'Hand-charred Shou Sugi Ban cedar siding and custom blackened steel framing',
      'Radiant heated terrazzo flooring throughout entire pavilion level',
      'Master suite overlooking private koi pond with traditional Hinoki wood soaking tub',
      'Geothermal climate regulation system with near-net-zero footprint',
      'Quiet tea pavilion and outdoor cedar meditation deck'
    ],
    amenities: [
      'Zen Garden & Koi Pond',
      'Floor-to-Ceiling Glass',
      'Hinoki Soaking Tub',
      'Geothermal Heating',
      'EV Charging Station',
      'Acoustic Studio',
      'Gated Grounds'
    ],
    hoaMonthly: 0,
    estPropertyTaxAnnual: 98000,
    agentId: 'agent-marcus-chen',
    virtualTourAvailable: true,
    daysOnMarket: 27
  },
  {
    id: 'prop-tribeca-cast-iron-loft',
    title: 'The Franklin Cast Iron Atelier',
    tagline: 'Museum-caliber historic architectural loft with original Corinthian columns',
    price: 32000,
    priceDisplay: '$32,000 / mo',
    type: 'rent',
    category: 'loft',
    location: {
      address: '88 Franklin Street, 4th Floor',
      city: 'New York',
      state: 'NY',
      zip: '10013',
      neighborhood: 'Tribeca Historic District'
    },
    specs: {
      beds: 3,
      baths: 3,
      sqft: 4300,
      yearBuilt: 1910,
      garageSpaces: 1
    },
    featured: false,
    status: 'available',
    images: [penthouseImg, modernistImg, heroVillaImg, coastalMansionImg],
    description: 'Occupying an entire private floor of an iconic 1890s Tribeca landmark. Features museum-scale gallery proportions, exposed brick limewashed in warm alabaster, original fluted cast-iron columns, and custom double-glazed acoustic sash windows framing historic cobblestone views.',
    architecturalHighlights: [
      'Private key-coded elevator directly into 65-foot wide grand corner great room',
      '13.5-foot ceilings with exposed timber beams and museum track lighting',
      'Bulthaup custom kitchen in matte graphite with Gaggenau 400 series suite',
      'Primary suite wing with custom walnut dressing room and steam shower',
      'Dedicated wine room holding 400 bottles'
    ],
    amenities: [
      'Private Keyed Elevator',
      'Original Cast Iron Details',
      'Wine Room',
      'High Ceilings',
      'Doorman Service',
      'Smart Home Controls'
    ],
    hoaMonthly: 0,
    estPropertyTaxAnnual: 0,
    agentId: 'agent-julian-sterling',
    virtualTourAvailable: true,
    daysOnMarket: 5
  },
  {
    id: 'prop-aspen-alpine-residence',
    title: 'Red Mountain Alpine Sanctuary',
    tagline: 'Ski-in / ski-out architectural refuge with heated slate decks and mountain views',
    price: 21500000,
    priceDisplay: '$21,500,000',
    type: 'buy',
    category: 'estate',
    location: {
      address: '320 Willoughby Way',
      city: 'Aspen',
      state: 'CO',
      zip: '81611',
      neighborhood: 'Red Mountain'
    },
    specs: {
      beds: 6,
      baths: 7,
      sqft: 8600,
      lotSize: '1.8 Acres',
      yearBuilt: 2022,
      garageSpaces: 3
    },
    featured: false,
    status: 'available',
    images: [modernistImg, heroVillaImg, penthouseImg, coastalMansionImg],
    description: 'Overlooking Ajax Mountain and the Roaring Fork Valley, this Colorado masterpiece integrates Colorado buff sandstone, zinc standing seam roofs, and glass curtain walls. Includes heated driveways, ski locker with boot warmers, and year-round indoor/outdoor heated hydrotherapy pool.',
    architecturalHighlights: [
      'Direct private ski-trail access connecting to Aspen Mountain groomers',
      'Heated motor court and hydronic heated stone exterior terraces',
      'Two-story dry-stacked native stone hearth anchoring double-height great room',
      'Wellness spa featuring Finnish sauna, cold plunge, and infrared treatment zone'
    ],
    amenities: [
      'Ski-in / Ski-out',
      'Heated Outdoor Pool & Spa',
      'Finnish Sauna & Cold Plunge',
      'Heated Motor Court',
      'Wine Tasting Room',
      'Smart Home Security'
    ],
    hoaMonthly: 900,
    estPropertyTaxAnnual: 210000,
    agentId: 'agent-marcus-chen',
    virtualTourAvailable: true,
    daysOnMarket: 33
  },
  {
    id: 'prop-beverly-hills-trousdale-estate',
    title: 'The Trousdale Mid-Century Pavilion',
    tagline: 'Restored mid-century landmark with city-to-ocean panoramic vistas',
    price: 45000,
    priceDisplay: '$45,000 / mo',
    type: 'rent',
    category: 'villa',
    location: {
      address: '1044 Loma Vista Drive',
      city: 'Beverly Hills',
      state: 'CA',
      zip: '90210',
      neighborhood: 'Trousdale Estates'
    },
    specs: {
      beds: 4,
      baths: 5,
      sqft: 5900,
      lotSize: '0.85 Acres',
      yearBuilt: 2021,
      garageSpaces: 2
    },
    featured: false,
    status: 'available',
    images: [heroVillaImg, modernistImg, coastalMansionImg, penthouseImg],
    description: 'An architectural tribute to California mid-century modernism in iconic Trousdale Estates. Featuring post-and-beam construction, expansive terrazzo galleries, floating outdoor dining pavilion, and dramatic sunset vistas stretching from Downtown Los Angeles to Santa Monica bay.',
    architecturalHighlights: [
      'Pristine post-and-beam architecture with floor-to-ceiling glass sliding walls',
      'Terrazzo floors flowing seamlessly from interior salon to pool deck',
      'Custom bar in bookmatched walnut with automated mood lighting scenes',
      'Heated lap pool with integrated underwater sound system'
    ],
    amenities: [
      'City & Ocean Views',
      'Terrazzo Floors',
      'Heated Pool & Spa',
      'Wine Storage',
      'Gated Motor Court',
      'Furnished by Cassina & Minotti'
    ],
    hoaMonthly: 600,
    estPropertyTaxAnnual: 0,
    agentId: 'agent-elena-vance',
    virtualTourAvailable: true,
    daysOnMarket: 12
  },
  {
    id: 'prop-austin-lake-modern',
    title: 'Lake Austin Contemporary Bluff',
    tagline: 'Waterfront limestone estate with private tramway to boat slip',
    price: 12800000,
    priceDisplay: '$12,800,000',
    type: 'buy',
    category: 'estate',
    location: {
      address: '4612 Westlake Drive',
      city: 'Austin',
      state: 'TX',
      zip: '78746',
      neighborhood: 'West Lake Hills'
    },
    specs: {
      beds: 5,
      baths: 6,
      sqft: 7100,
      lotSize: '1.2 Acres',
      yearBuilt: 2024,
      garageSpaces: 3
    },
    featured: false,
    status: 'new-listing',
    images: [coastalMansionImg, modernistImg, heroVillaImg, penthouseImg],
    description: 'Nestled into the limestone bluffs of Lake Austin, this architectural retreat offers a scenic hillside funicular descending to a private two-slip hydraulic boat dock. Warm Texas limestone, exposed blackened steel, and floor-to-ceiling glass evoke modern Hill Country luxury.',
    architecturalHighlights: [
      'Private glass funicular hill tram descending directly to waterfront dock',
      'Two-story primary suite with cantilevered screened sleeping porch',
      'Dual-zone 600-bottle wine room with tasting salon',
      'Negative-edge pool cantilevered 40 feet over native cedar tree canopy'
    ],
    amenities: [
      'Lake Frontage',
      'Private Boat Dock & Funicular',
      'Cantilever Infinity Pool',
      'Wine Room',
      'Outdoor Kitchen',
      'Gated Community'
    ],
    hoaMonthly: 450,
    estPropertyTaxAnnual: 148000,
    agentId: 'agent-marcus-chen',
    virtualTourAvailable: true,
    daysOnMarket: 3
  }
];
