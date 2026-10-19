/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { ScheduleTourModal } from './components/ScheduleTourModal';
import { ShortlistDrawer } from './components/ShortlistDrawer';
import { ComparisonModal } from './components/ComparisonModal';
import { HomeView } from './views/HomeView';
import { PropertiesView } from './views/PropertiesView';
import { PropertyDetailView } from './views/PropertyDetailView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { PROPERTIES } from './data/properties';
import { Property, Agent } from './types/property';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'properties' | 'about' | 'contact' | 'detail'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Persistent Shortlist (E-commerce wishlist / cart equivalent)
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aura_shortlist');
      return saved ? JSON.parse(saved) : ['prop-the-bel-air-promontory'];
    } catch {
      return ['prop-the-bel-air-promontory'];
    }
  });

  // Compared properties list (2-3 properties)
  const [comparedPropertyIds, setComparedPropertyIds] = useState<string[]>([]);

  // Modals state
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null);
  const [tourProperty, setTourProperty] = useState<Property | null>(null);
  const [isShortlistOpen, setIsShortlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Pre-filters for properties catalog
  const [catalogCategory, setCatalogCategory] = useState<string>('all');
  const [catalogQuery, setCatalogQuery] = useState<string>('');

  // Inquiry form pre-fills
  const [inquiryPreselect, setInquiryPreselect] = useState<{ propertyId?: string; agentId?: string }>({});

  useEffect(() => {
    try {
      localStorage.setItem('aura_shortlist', JSON.stringify(savedPropertyIds));
    } catch {
      // ignore
    }
  }, [savedPropertyIds]);

  const handleToggleSave = (property: Property) => {
    setSavedPropertyIds((prev) =>
      prev.includes(property.id)
        ? prev.filter((id) => id !== property.id)
        : [...prev, property.id]
    );
  };

  const handleToggleCompare = (property: Property) => {
    setComparedPropertyIds((prev) => {
      if (prev.includes(property.id)) {
        return prev.filter((id) => id !== property.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), property.id];
      }
      return [...prev, property.id];
    });
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setActiveView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiryFromProperty = (property: Property, agent: Agent) => {
    setInquiryPreselect({ propertyId: property.id, agentId: agent.id });
    setActiveView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroSearchFilter = (category?: string, query?: string) => {
    if (category) setCatalogCategory(category);
    if (query) setCatalogQuery(query);
    setActiveView('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const savedProperties = PROPERTIES.filter((p) => savedPropertyIds.includes(p.id));
  const comparedProperties = PROPERTIES.filter((p) => comparedPropertyIds.includes(p.id));

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-stone-900 selection:text-white">
      {/* Luxury Estate Announcement Strip */}
      <div className="bg-stone-900 text-stone-300 px-4 py-2 text-xs border-b border-stone-800">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            <span>Private Placement: New off-market architectural acquisitions now available in Malibu, Aspen & Miami Beach.</span>
          </span>
          <button
            onClick={() => {
              setActiveView('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hidden md:inline-flex items-center gap-1 text-amber-300 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
          >
            Schedule Confidential Advisory →
          </button>
        </div>
      </div>

      {/* Header / Navbar */}
      <Navbar
        activeView={activeView === 'detail' ? 'properties' : activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        shortlistCount={savedPropertyIds.length}
        onOpenShortlist={() => setIsShortlistOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HomeView
            properties={PROPERTIES}
            onSelectProperty={handleSelectProperty}
            onQuickView={(p) => setQuickViewProperty(p)}
            savedPropertyIds={savedPropertyIds}
            onToggleSave={handleToggleSave}
            comparedPropertyIds={comparedPropertyIds}
            onToggleCompare={handleToggleCompare}
            onBrowseAll={() => {
              setActiveView('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSearchFilter={handleHeroSearchFilter}
            onScheduleTour={(p) => setTourProperty(p)}
          />
        )}

        {activeView === 'properties' && (
          <PropertiesView
            properties={PROPERTIES}
            onSelectProperty={handleSelectProperty}
            onQuickView={(p) => setQuickViewProperty(p)}
            savedPropertyIds={savedPropertyIds}
            onToggleSave={handleToggleSave}
            comparedPropertyIds={comparedPropertyIds}
            onToggleCompare={handleToggleCompare}
            initialCategory={catalogCategory}
            initialQuery={catalogQuery}
          />
        )}

        {activeView === 'detail' && selectedProperty && (
          <PropertyDetailView
            property={selectedProperty}
            onBack={() => {
              setActiveView('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isSaved={savedPropertyIds.includes(selectedProperty.id)}
            onToggleSave={handleToggleSave}
            onScheduleTour={(p) => setTourProperty(p)}
            onSelectProperty={handleSelectProperty}
            allProperties={PROPERTIES}
            onOpenInquiry={handleOpenInquiryFromProperty}
          />
        )}

        {activeView === 'about' && (
          <AboutView
            onContactClick={() => {
              setActiveView('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreProperties={() => {
              setActiveView('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeView === 'contact' && (
          <ContactView
            properties={PROPERTIES}
            preselectedPropertyId={inquiryPreselect.propertyId}
            preselectedAgentId={inquiryPreselect.agentId}
          />
        )}
      </main>

      {/* Modals & Slide-over Drawers */}
      <QuickViewModal
        property={quickViewProperty}
        onClose={() => setQuickViewProperty(null)}
        onSelectProperty={handleSelectProperty}
        isSaved={quickViewProperty ? savedPropertyIds.includes(quickViewProperty.id) : false}
        onToggleSave={handleToggleSave}
        onScheduleTour={(p) => setTourProperty(p)}
      />

      <ScheduleTourModal
        property={tourProperty}
        onClose={() => setTourProperty(null)}
      />

      <ShortlistDrawer
        isOpen={isShortlistOpen}
        onClose={() => setIsShortlistOpen(false)}
        savedProperties={savedProperties}
        onRemove={(id) => setSavedPropertyIds((prev) => prev.filter((item) => item !== id))}
        onClear={() => setSavedPropertyIds([])}
        onSelectProperty={handleSelectProperty}
        onOpenCompare={() => {
          setComparedPropertyIds(savedPropertyIds.slice(0, 3));
          setIsCompareOpen(true);
        }}
        onInquireAll={() => {
          setActiveView('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBrowseProperties={() => {
          setActiveView('properties');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <ComparisonModal
        isOpen={isCompareOpen}
        properties={comparedProperties.length > 0 ? comparedProperties : savedProperties.slice(0, 3)}
        onClose={() => setIsCompareOpen(false)}
        onSelectProperty={handleSelectProperty}
        onRemoveFromCompare={(id) => setComparedPropertyIds((prev) => prev.filter((p) => p !== id))}
      />

      {/* Floating Compare Notification Bar (when 2+ properties selected) */}
      {comparedPropertyIds.length >= 2 && !isCompareOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-stone-900 text-white px-5 py-3 rounded-full shadow-2xl border border-stone-700 flex items-center gap-4 text-xs">
          <span>
            <strong className="text-amber-300 font-semibold">{comparedPropertyIds.length}</strong> properties selected for comparison
          </span>
          <button
            onClick={() => setIsCompareOpen(true)}
            className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-full transition-colors cursor-pointer"
          >
            Compare Now
          </button>
          <button
            onClick={() => setComparedPropertyIds([])}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
