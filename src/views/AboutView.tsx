import React from 'react';
import { Award, Compass, Shield, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AGENTS } from '../data/agents';
import heroVillaImg from '../assets/images/hero_luxury_villa_1792441054086.jpg';

interface AboutViewProps {
  onContactClick: () => void;
  onExploreProperties: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onContactClick, onExploreProperties }) => {
  return (
    <div className="space-y-20 pb-20 text-left">
      {/* 1. Header Hero Banner */}
      <section className="relative py-20 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-semibold block">
            About AURA Architectural Estates
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold max-w-2xl text-balance leading-tight">
            Curating Spaces of Quiet Permanence.
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl leading-relaxed text-balance">
            Founded on the conviction that exceptional architecture is a timeless store of wealth and human wellbeing, AURA represents iconic residences and estates worldwide.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-stone-900/40 pointer-events-none" />
      </section>

      {/* 2. Editorial Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold block">
              The AURA Manifesto
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
              Beyond Square Footage: Architecture as High Art & Capital Preservation.
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Standard real estate transactions reduce homes to simple price-per-square-foot ratios. At AURA, we evaluate properties through the disciplined lens of architectural significance, structural integrity, light orientation, and historical permanence.
            </p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              From cantilevered glass pavilions in Carmel to restored Gilded Age triplexes on Park Avenue, every residence in our portfolio represents the highest tier of design craftsmanship and discreet private stewardship.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onExploreProperties}
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
              >
                Explore Current Collection
              </button>
              <button
                onClick={onContactClick}
                className="px-6 py-3 border border-stone-300 hover:border-stone-900 text-stone-900 text-xs uppercase tracking-wider font-semibold rounded transition-colors cursor-pointer"
              >
                Inquire with an Advisor
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-stone-200">
              <img
                src={heroVillaImg}
                alt="AURA Architectural Design Philosophy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-stone-950/20" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md rounded-lg border border-stone-200/60 text-xs text-stone-800">
                <span className="font-bold text-stone-900 block font-serif text-sm mb-0.5">
                  The Principle of Site Integration
                </span>
                "When architecture bows to the natural topography, the structure ceases to be mere shelter and becomes an enduring landmark."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-stone-100 rounded-xl border border-stone-200/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-stone-900 text-white flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Architectural Provenance
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every listing undergoes rigorous vetting for architectural merit, pedigree of design, and master craftsman execution.
            </p>
          </div>

          <div className="p-8 bg-stone-100 rounded-xl border border-stone-200/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-stone-900 text-white flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Absolute Discretion
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Over 40% of our transactional volume transacts off-market through private placement and blind trust arrangements for total privacy.
            </p>
          </div>

          <div className="p-8 bg-stone-100 rounded-xl border border-stone-200/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-stone-900 text-white flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Global Placement
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Direct syndication with premier family offices and high-net-worth architectural collectors across Zurich, London, Tokyo, and New York.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Leadership & Senior Brokers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-stone-200 pb-5">
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold block mb-1">
            Leadership & Advisory
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Senior Managing Partners
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Decades of combined transactional advisory for world-class architectural estates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] w-full bg-stone-100 overflow-hidden relative">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-stone-900/80 text-white px-2 py-1 rounded text-[11px] font-semibold tabular-nums">
                    {agent.soldVolume} Brokered
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {agent.name}
                    </h3>
                    <p className="text-xs text-amber-800 font-medium">
                      {agent.role}
                    </p>
                    <p className="text-[11px] text-stone-400">
                      {agent.license} · {agent.experienceYears} Years Advisory
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {agent.bio}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={onContactClick}
                  className="w-full py-2.5 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-900 text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Contact {agent.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Press & Recognition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-stone-100 rounded-xl border border-stone-200 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">
            Press Recognition & Global Coverage
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-stone-700 font-serif text-base sm:text-lg font-bold items-center opacity-85">
            <div>Architectural Digest</div>
            <div>The Wall Street Journal</div>
            <div>Robb Report</div>
            <div>Financial Times</div>
          </div>
        </div>
      </section>
    </div>
  );
};
