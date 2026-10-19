import { Agent } from '../types/property';
import directorImage from '../assets/images/agent_director_portrait_1792441054678.jpg';

export const AGENTS: Agent[] = [
  {
    id: 'agent-elena-vance',
    name: 'Elena Vance-Moreau',
    role: 'Principal Managing Broker & Founder',
    phone: '+1 (310) 849-2201',
    email: 'elena.vance@aurarealestate.com',
    image: directorImage,
    license: 'DRE #01928471',
    experienceYears: 16,
    specialty: 'Ultra-Luxury Coastal Estates & Architectural Landmarks',
    bio: 'Recognized by Architectural Digest as one of the nation\'s premier luxury advisors, Elena has stewarded over $650M in off-market transactions across Beverly Hills, Malibu, and the Pacific Palisades.',
    soldVolume: '$650M+',
    activeListingsCount: 8,
  },
  {
    id: 'agent-julian-sterling',
    name: 'Julian Sterling',
    role: 'Senior Vice President of Penthouse Acquisitions',
    phone: '+1 (212) 670-3944',
    email: 'julian.sterling@aurarealestate.com',
    image: directorImage, // Elegant fallback
    license: 'NY-RE #4920194',
    experienceYears: 12,
    specialty: 'Manhattan & Miami Waterfront Penthouses',
    bio: 'Former architectural preservation consultant turned top producer, Julian bridges architectural provenance with high-yield investment advisory for private family offices and international buyers.',
    soldVolume: '$380M+',
    activeListingsCount: 6,
  },
  {
    id: 'agent-marcus-chen',
    name: 'Marcus Chen',
    role: 'Head of Contemporary & Sustainable Architecture',
    phone: '+1 (415) 923-1188',
    email: 'marcus.chen@aurarealestate.com',
    image: directorImage, // Elegant fallback
    license: 'DRE #02194833',
    experienceYears: 9,
    specialty: 'Modernist Pavilions, Mid-Century Restorations, Smart Estates',
    bio: 'Specializing in LEED Platinum estates, bespoke glass pavilions, and custom hillside structural marvels throughout California and the Pacific Northwest.',
    soldVolume: '$240M+',
    activeListingsCount: 5,
  }
];
