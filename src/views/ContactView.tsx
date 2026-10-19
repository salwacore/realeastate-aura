import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Shield, Clock, Building2 } from 'lucide-react';
import { AGENTS } from '../data/agents';
import { Property, Agent } from '../types/property';

interface ContactViewProps {
  properties: Property[];
  preselectedPropertyId?: string;
  preselectedAgentId?: string;
}

export const ContactView: React.FC<ContactViewProps> = ({
  properties,
  preselectedPropertyId,
  preselectedAgentId,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Purchasing an Estate');
  const [selectedPropertyId, setSelectedPropertyId] = useState(preselectedPropertyId || '');
  const [selectedAgentId, setSelectedAgentId] = useState(preselectedAgentId || 'any');
  const [budgetRange, setBudgetRange] = useState('$15,000,000 – $25,000,000');
  const [timeline, setTimeline] = useState('1 to 3 Months');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setMessage('');
  };

  const chosenAgent = AGENTS.find((a) => a.id === selectedAgentId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-left">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6 max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold block mb-1">
          Private Client Services & Inquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Agent Advisory & Estate Inquiries
        </h1>
        <p className="text-stone-600 text-sm mt-2 leading-relaxed">
          Connect directly with our senior managing partners for confidential representations, acquisitions, private off-market listings, and architectural appraisals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Comprehensive Agent Inquiry Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-900 mb-1">
                  Confidential Inquiry Form
                </h2>
                <p className="text-xs text-stone-500">
                  Every communication is treated with utmost discretion and governed by client confidentiality standards.
                </p>
              </div>

              {/* Inquiry Type Tabs */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Nature of Advisory
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    'Purchasing an Estate',
                    'Listing Property',
                    'High-End Lease',
                    'Architectural Advisory',
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setInquiryType(type)}
                      className={`py-2 px-2 text-center text-xs font-medium rounded border transition-colors cursor-pointer ${
                        inquiryType === type
                          ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@familyoffice.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Direct Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Property of Interest & Preferred Agent */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Specific Residence (Optional)
                  </label>
                  <select
                    value={selectedPropertyId}
                    onChange={(e) => setSelectedPropertyId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded bg-white focus:border-stone-900 focus:ring-1 focus:ring-stone-900 cursor-pointer"
                  >
                    <option value="">General Portfolio Inquiry</option>
                    {properties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.priceDisplay})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Preferred Agent Representative
                  </label>
                  <select
                    value={selectedAgentId}
                    onChange={(e) => setSelectedAgentId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded bg-white focus:border-stone-900 focus:ring-1 focus:ring-stone-900 cursor-pointer"
                  >
                    <option value="any">First Available Senior Partner</option>
                    {AGENTS.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.role.split('&')[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Anticipated Budget Bracket
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded bg-white focus:border-stone-900 focus:ring-1 focus:ring-stone-900 cursor-pointer"
                  >
                    <option value="$5,000,000 – $10,000,000">$5,000,000 – $10,000,000</option>
                    <option value="$10,000,000 – $20,000,000">$10,000,000 – $20,000,000</option>
                    <option value="$20,000,000 – $35,000,000">$20,000,000 – $35,000,000</option>
                    <option value="$35,000,000+">$35,000,000+ (Ultra-Prime)</option>
                    <option value="Lease: $25k – $50k / mo">Lease: $25,000 – $50,000 / mo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Timeline Horizon
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded bg-white focus:border-stone-900 focus:ring-1 focus:ring-stone-900 cursor-pointer"
                  >
                    <option value="Immediate (30 Days)">Immediate (Within 30 Days)</option>
                    <option value="1 to 3 Months">1 to 3 Months</option>
                    <option value="3 to 6 Months">3 to 6 Months</option>
                    <option value="Confidential Exploratory">Confidential Exploratory</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Confidential Message & Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please specify specific architectural typologies, acreage requirements, privacy considerations, or off-market search criteria..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded focus:border-stone-900 focus:ring-1 focus:ring-stone-900 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs uppercase tracking-widest rounded shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Encrypting & Dispatching...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Client Inquiry</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-[11px] text-stone-400 justify-center">
                <Shield className="w-3.5 h-3.5 text-stone-400" />
                <span>Protected by Attorney-Broker Confidentiality Standards. No spam.</span>
              </div>
            </form>
          ) : (
            /* Success confirmation screen */
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Inquiry Successfully Dispatched
              </h2>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-stone-900">{fullName}</span>. Your inquiry regarding{' '}
                <span className="font-semibold text-stone-900">{inquiryType}</span> has been assigned to{' '}
                <span className="font-semibold text-stone-900">{chosenAgent?.name || 'our Senior Managing Partner'}</span>.
              </p>
              <div className="p-4 bg-stone-50 rounded-lg max-w-md mx-auto text-left text-xs space-y-2 border border-stone-200">
                <div>
                  <span className="text-stone-500">Advisory Reference:</span>
                  <span className="font-mono font-semibold text-stone-800 ml-2">AUR-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div>
                  <span className="text-stone-500">Direct Contact:</span>
                  <span className="font-semibold text-stone-800 ml-2">{email} · {phone}</span>
                </div>
                <div>
                  <span className="text-stone-500">Target Response Time:</span>
                  <span className="font-semibold text-stone-800 ml-2">Under 2 hours during market hours</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="mt-6 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded cursor-pointer transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Senior Brokers Directory & Atelier Offices (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Senior Broker Quick Contacts */}
          <div className="bg-stone-100 rounded-xl p-6 border border-stone-200 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Senior Managing Brokers
            </h3>

            <div className="space-y-4">
              {AGENTS.map((agent) => (
                <div key={agent.id} className="p-3.5 bg-white rounded-lg border border-stone-200/80 shadow-xs flex items-center gap-3.5">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-bold text-stone-900 truncate">
                      {agent.name}
                    </h4>
                    <p className="text-stone-500 truncate">{agent.specialty.split('&')[0]}</p>
                    <div className="flex items-center gap-3 pt-1 text-stone-600">
                      <a href={`tel:${agent.phone}`} className="hover:text-stone-950 font-medium">
                        {agent.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Ateliers */}
          <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-800" />
              <h3 className="font-serif text-base font-bold text-stone-900">
                Regional Private Ateliers
              </h3>
            </div>

            <div className="space-y-3 text-xs text-stone-600 divide-y divide-stone-100">
              <div className="pt-2">
                <span className="font-semibold text-stone-900 block">Beverly Hills Flagship</span>
                <span>9460 Wilshire Blvd, Suite 800 · Beverly Hills, CA 90212</span>
                <span className="block text-stone-400 mt-0.5">+1 (310) 849-2200</span>
              </div>
              <div className="pt-2">
                <span className="font-semibold text-stone-900 block">Manhattan Salon</span>
                <span>590 Madison Avenue, 28th Floor · New York, NY 10022</span>
                <span className="block text-stone-400 mt-0.5">+1 (212) 670-3900</span>
              </div>
              <div className="pt-2">
                <span className="font-semibold text-stone-900 block">Miami Beach Waterfront</span>
                <span>1111 Lincoln Road, Penthouse 7 · Miami Beach, FL 33139</span>
                <span className="block text-stone-400 mt-0.5">+1 (305) 540-1200</span>
              </div>
            </div>
          </div>

          {/* Advisory Hours */}
          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-900 block">Atelier Consultation Hours</span>
              <span>Monday – Saturday: 9:00 AM – 7:00 PM (Local Time)</span>
              <span className="block text-stone-500 mt-0.5">Private off-market viewings by advance appointment only.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
