import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Menu, X, ArrowRight, Calendar } from 'lucide-react';

const offers = [
  {
    id: 1,
    title: 'Extended Stay Discount',
    description: 'Save up to 15% when you book 7 nights or more. Perfect for PCS moves and extended training.',
    discount: '15% OFF',
    valid: 'Valid year-round',
    icon: Calendar,
    color: 'amber'
  },
  {
    id: 2,
    title: 'Military Appreciation',
    description: 'Special rates for active duty, veterans, and retirees. Thank you for your service.',
    discount: '10% OFF',
    valid: 'Valid year-round',
    icon: Star,
    color: 'blue'
  },
  {
    id: 3,
    title: 'Book Early & Save',
    description: 'Reserve 30 days in advance and enjoy exclusive savings on your stay.',
    discount: '10% OFF',
    valid: 'Book by Mar 31',
    icon: Calendar,
    color: 'green'
  }
];

export default function Offers() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-sand-50 font-sans text-ocean-800">
      {/* NAVIGATION */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-ocean-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-accent to-teal-light rounded-xl flex items-center justify-center shadow-lg shadow-teal-accent/25 group-hover:shadow-teal-accent/40 group-hover:scale-105 transition-all duration-300">
                <Star className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg tracking-tight leading-none text-ocean-900">NAVY LODGE</span>
                <span className="text-[10px] tracking-[0.15em] uppercase text-teal-accent font-medium">By Nexcom</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link to="/cabins" className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Cabins</Link>
              <Link to="/inns" className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Inns</Link>
              <Link to="/locations" className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Locations</Link>
              <div className="w-px h-4 bg-ocean-200 mx-2"></div>
              <Link to="/offers" className="text-sm font-medium text-ocean-900 bg-ocean-50 px-4 py-2 rounded-lg">Offers</Link>
              <Link to="/signin" className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Sign In</Link>
              <Link to="/signup" className="text-sm font-semibold text-white bg-ocean-900 hover:bg-ocean-800 px-5 py-2 rounded-lg transition-all shadow-lg shadow-ocean-900/10">Create Account</Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-ocean-600 hover:text-ocean-900 hover:bg-ocean-100 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-ocean-100 px-4 pt-2 pb-4 space-y-1 shadow-xl">
            <Link to="/cabins" className="block px-3 py-3 text-sm font-medium text-ocean-700 hover:text-ocean-900 hover:bg-ocean-50 rounded-lg">Cabins</Link>
            <Link to="/inns" className="block px-3 py-3 text-sm font-medium text-ocean-700 hover:text-ocean-900 hover:bg-ocean-50 rounded-lg">Inns</Link>
            <Link to="/locations" className="block px-3 py-3 text-sm font-medium text-ocean-700 hover:text-ocean-900 hover:bg-ocean-50 rounded-lg">Locations</Link>
            <Link to="/offers" className="block px-3 py-3 text-sm font-medium text-ocean-900 bg-ocean-50 rounded-lg">Offers</Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-ocean-900 mb-4">
            Special <span className="text-teal-accent italic">Offers</span>
          </h1>
          <p className="text-lg text-ocean-600 max-w-2xl leading-relaxed mb-8">
            Take advantage of our exclusive discounts and special promotions designed for military families.
          </p>
        </div>
      </section>

      {/* OFFERS LIST */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-2xl p-8 border border-ocean-100 hover:shadow-lg transition-all">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                    offer.color === 'amber' ? 'bg-teal-accent/10' :
                    offer.color === 'blue' ? 'bg-teal-accent/10' : 'bg-teal-accent/10'
                  }`}>
                    <offer.icon className={`w-8 h-8 ${
                      offer.color === 'amber' ? 'text-teal-accent' :
                      offer.color === 'blue' ? 'text-teal-accent' : 'text-teal-accent'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-serif text-2xl font-medium text-ocean-900">{offer.title}</h3>
                      <span className={`text-lg font-bold ${
                        offer.color === 'amber' ? 'text-teal-accent' :
                        offer.color === 'blue' ? 'text-teal-accent' : 'text-teal-accent'
                      }`}>{offer.discount}</span>
                    </div>
                    <p className="text-ocean-600 mb-4">{offer.description}</p>
                    <p className="text-sm text-ocean-500">{offer.valid}</p>
                  </div>
                  <button className="px-6 py-3 bg-ocean-900 text-white font-semibold rounded-xl hover:bg-ocean-800 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer">
                    Book Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ocean-950 text-ocean-400 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-teal-accent rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-ocean-900" fill="currentColor" />
            </div>
            <span className="font-bold text-lg text-white">NAVY LODGE</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
