import React, { useState } from 'react';
import { X, Calendar, Clock, Video, MapPin, CheckCircle2 } from 'lucide-react';
import { Property, Agent } from '../types/property';
import { AGENTS } from '../data/agents';

interface ScheduleTourModalProps {
  property: Property | null;
  onClose: () => void;
}

export const ScheduleTourModal: React.FC<ScheduleTourModalProps> = ({ property, onClose }) => {
  const [tourType, setTourType] = useState<'in-person' | 'virtual'>('in-person');
  const [selectedDate, setSelectedDate] = useState('2026-10-24');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSubmitted(false);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!property) return null;

  const agent: Agent = AGENTS.find(a => a.id === property.agentId) || AGENTS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const timeSlots = [
    '10:00 AM',
    '11:30 AM',
    '2:00 PM',
    '4:00 PM',
    '5:30 PM (Twilight Viewing)',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleModalClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg shadow-2xl max-w-xl w-full p-6 sm:p-8 text-left max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={handleModalClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2.5 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer rounded-full hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold block mb-1">
                Private Viewing Invitation
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Schedule a Tour
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                Experience {property.title} in {property.location.city}.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Tour Format Segmented Control */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Viewing Format
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setTourType('in-person')}
                    className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      tourType === 'in-person'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>In-Person Walkthrough</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTourType('virtual')}
                    className={`flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      tourType === 'virtual'
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Live 3D Video Tour</span>
                  </button>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    Time Window
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:border-stone-900 focus:ring-1 focus:ring-stone-900 text-stone-800"
                  >
                    {timeSlots.map((time, idx) => (
                      <option key={idx} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@luxury.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Special Inquiries or Architectural Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Any specific architectural aspects, financing inquiries, or confidentiality requests..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded focus:border-stone-900 focus:ring-1 focus:ring-stone-900 resize-none"
                  />
                </div>
              </div>

              {/* Agent Representative Card */}
              <div className="flex items-center gap-3 p-3 bg-stone-50 rounded border border-stone-200/60">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="text-xs">
                  <span className="font-semibold text-stone-900 block">{agent.name}</span>
                  <span className="text-stone-500">{agent.role} · {agent.phone}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs uppercase tracking-widest rounded shadow-md transition-colors cursor-pointer"
              >
                Confirm Viewing Appointment
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Tour Reserved
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              Thank you, <span className="font-semibold text-stone-900">{fullName || 'Esteemed Client'}</span>. Your {tourType} appointment for{' '}
              <span className="font-semibold text-stone-900">{property.title}</span> has been tentatively confirmed for{' '}
              <span className="font-semibold text-stone-900">{selectedDate}</span> at{' '}
              <span className="font-semibold text-stone-900">{selectedTime}</span>.
            </p>

            <div className="p-4 bg-stone-50 rounded-lg max-w-sm mx-auto text-left text-xs space-y-1.5 border border-stone-200">
              <div className="text-stone-500">Representative Broker:</div>
              <div className="font-semibold text-stone-900">{agent.name}</div>
              <div className="text-stone-500 pt-1">Direct Confirmation Sent To:</div>
              <div className="font-medium text-stone-900">{email || 'your email'}</div>
            </div>

            <button
              type="button"
              onClick={handleModalClose}
              className="mt-6 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold rounded cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
