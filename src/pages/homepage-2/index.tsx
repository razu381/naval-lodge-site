import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Users,
  Shield,
  BadgeCheck,
  Award,
  ArrowRight,
  Star,
  Globe,
  Wallet,
  HeartHandshake,
  Clock,
  CheckCircle2,
  Menu,
  X,
  Calendar,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DatePicker from '../../DatePicker';
import { sampleHotels } from '../../SearchResults';
import { format } from 'date-fns';

interface Homepage2Props {
  className?: string;
}

export default function Homepage2({ className }: Homepage2Props) {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  useEffect(() => {
    if (!checkInDate) setCheckInDate(today);
    if (!checkOutDate) setCheckOutDate(tomorrow);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inline Search Results Component
  const InlineSearchResults = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
      if (isOpen) {
        setShouldRender(true);
        // Small delay to allow render before starting animation
        setTimeout(() => setIsVisible(true), 50);
      } else {
        setIsVisible(false);
        // Wait for exit animation to complete before unmounting
        setTimeout(() => setShouldRender(false), 1500);
      }
    }, [isOpen]);

    if (!shouldRender) return null;

    const formatDate = (d?: Date) => (d ? format(d, 'MMM d, yyyy') : 'Any dates');

    return (
      <div
        className={`bg-gradient-to-b from-sand-100 to-sand-50 border-b border-ocean-200 overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isVisible ? 'max-h-[6000px] opacity-100 py-8' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .search-result-card {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-ocean-200">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-display text-2xl font-semibold text-ocean-900">Search Results</h2>
                <span className="bg-teal-accent/20 text-teal-accent px-3 py-1 rounded-full text-sm font-medium">
                  {sampleHotels.length} properties found
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-ocean-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-teal-accent" />
                  {selectedLocation || 'All Locations'}
                </span>
                <span className="text-ocean-300">|</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-teal-accent" />
                  {formatDate(checkInDate)} - {formatDate(checkOutDate)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-ocean-50 border border-ocean-200 rounded-xl text-ocean-700 font-medium transition-all hover:shadow-lg group"
            >
              <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              Close Results
            </button>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleHotels.slice(0, 6).map((hotel, index) => (
              <div
                key={hotel.id}
                className="search-result-card bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-ocean-100 group"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {hotel.discount && (
                    <div className="absolute top-3 left-3 bg-teal-accent text-ocean-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {hotel.discount}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                    <Star className="w-4 h-4 text-teal-accent fill-current" />
                    <span className="font-semibold text-sm">{hotel.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-ocean-900 mb-1 line-clamp-1">{hotel.name}</h3>
                  <p className="text-ocean-500 text-sm mb-3 line-clamp-2">{hotel.description}</p>

                  <div className="flex items-center gap-2 text-sm text-ocean-600 mb-4">
                    <MapPin className="w-4 h-4 text-teal-accent" />
                    <span>{hotel.distance}</span>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-ocean-100">
                    <div>
                      <p className="text-xs text-ocean-500">From</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-ocean-900">{hotel.currency}{hotel.price}</span>
                        <span className="text-xs text-ocean-500">/night</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 bg-teal-accent hover:bg-teal-accent/80 text-ocean-900 px-4 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-lg group/btn cursor-pointer">
                      View
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More */}
          {sampleHotels.length > 6 && (
            <div className="mt-8 text-center">
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-ocean-50 border border-ocean-200 rounded-xl text-ocean-700 font-medium transition-all hover:shadow-lg group cursor-pointer">
                Load More Results
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const dummyLocations = [
    'Naval Base San Diego, CA',
    'Pearl Harbor-Hickam, HI',
    'Oceana / Dam Neck, VA',
    'Naval Air Station Jacksonville, FL',
    'Naval Station Newport, RI',
    'Naval Base Kitsap, WA',
    'Naval Station Norfolk, VA',
    'Naval Air Station Corpus Christi, TX'
  ];

  const locations = [
    { id: 1, name: 'Naval Base San Diego', location: 'California, USA', price: 79, rating: 4.9, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', badge: '★ Most Popular' },
    { id: 2, name: 'Pearl Harbor-Hickam', location: 'Hawaii, USA', price: 95, rating: 4.8, image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Oceana / Dam Neck', location: 'Virginia, USA', price: 72, rating: 4.7, image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Naval Station Norfolk', location: 'Virginia, USA', price: 68, rating: 4.8, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 5, name: 'Naval Base Kitsap', location: 'Washington, USA', price: 74, rating: 4.6, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 6, name: 'Jacksonville NAS', location: 'Florida, USA', price: 65, rating: 4.7, image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ];

  const benefits = [
    { icon: Shield, title: 'Secure Base Access', desc: 'Gated communities with 24/7 security on military installations.' },
    { icon: Wallet, title: 'Tax-Free Savings', desc: 'Save up to 50% compared to commercial hotels.' },
    { icon: HeartHandshake, title: 'Family-Friendly', desc: 'Spacious suites with kitchens and laundry facilities.' },
    { icon: Globe, title: 'Flexible Policies', desc: 'PCS-friendly with extended stay options.' },
    { icon: Award, title: 'Trusted Quality', desc: '4.8/5 guest rating with 500K+ annual stays.' },
    { icon: BadgeCheck, title: 'Simple Booking', desc: 'Book online or call our 24/7 support team.' }
  ];

  return (
    <div className={`min-h-screen bg-sand-50 font-sans text-ocean-900 ${className || ''}`}>
      {/* NAVIGATION */}
      <nav className={`transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-11 h-11 bg-gradient-to-br from-teal-accent to-teal-light rounded-xl flex items-center justify-center shadow-lg shadow-teal-accent/25 group-hover:shadow-teal-accent/40 group-hover:scale-105 transition-all duration-300">
                <Star className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-semibold text-xl tracking-tight leading-none text-ocean-900">NAVY LODGE</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-teal-accent mt-0.5 font-medium">By Nexcom</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <Link to="/homepage-1" className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Home v1</Link>
              <Link to="/homepage-2" className="text-sm font-medium text-teal-accent hover:text-teal-accent/80 hover:bg-teal-accent/10 px-4 py-2 rounded-lg transition-all">Home v2</Link>
              <Link to="/homepage-3" className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Home v3</Link>
              <div className="h-5 w-px bg-ocean-200 mx-2"></div>
              <Link to="/locations" className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Locations</Link>
              <Link to="/offers" className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Offers</Link>
              <Link to="/about" className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">About</Link>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-ocean-600">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-1 shadow-xl border-t border-ocean-100">
            <Link to="/homepage-1" className="block px-3 py-2 text-base font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 rounded-md">Home v1</Link>
            <Link to="/homepage-2" className="block px-3 py-2 text-base font-medium text-teal-accent hover:text-teal-accent/80 hover:bg-teal-50 rounded-md">Home v2</Link>
            <Link to="/homepage-3" className="block px-3 py-2 text-base font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 rounded-md">Home v3</Link>
            <div className="border-t border-ocean-200 my-2"></div>
            <Link to="/locations" className="block px-3 py-2 text-base font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 rounded-md">Locations</Link>
            <Link to="/offers" className="block px-3 py-2 text-base font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 rounded-md">Offers</Link>
            <Link to="/about" className="block px-3 py-2 text-base font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 rounded-md">About</Link>
          </div>
        )}
      </nav>

      {/* BOOKING WIDGET */}
      <div className="sticky top-0 z-40 pt-4">
        <div className="bg-white shadow-lg shadow-ocean-900/5 border-b border-ocean-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              <div className="flex-1 flex items-center gap-3 bg-sand-50 hover:bg-ocean-50 border border-ocean-200 focus-within:border-teal-accent focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-accent/10 rounded-xl px-4 py-3 transition-all">
                <MapPin className="h-5 w-5 text-ocean-400 shrink-0" />
                <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="flex-1 bg-transparent border-0 outline-none text-ocean-900 font-medium cursor-pointer appearance-none pr-8 text-sm">
                  <option value="">Select destination</option>
                  {dummyLocations.map((location) => (<option key={location} value={location}>{location}</option>))}
                </select>
              </div>
              <div className="flex-1"><DatePicker checkIn={checkInDate} checkOut={checkOutDate} onCheckInChange={setCheckInDate} onCheckOutChange={setCheckOutDate} /></div>
              <div className="flex-1 flex items-center gap-3 bg-sand-50 hover:bg-ocean-50 border border-ocean-200 focus-within:border-teal-accent focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-accent/10 rounded-xl px-4 py-3 transition-all">
                <Users className="h-5 w-5 text-ocean-400 shrink-0" />
                <select className="flex-1 bg-transparent border-0 outline-none text-ocean-900 font-medium cursor-pointer appearance-none pr-8 text-sm">
                  <option>1 Room, 2 Adults</option>
                  <option>1 Room, 1 Adult</option>
                  <option>2 Rooms, 4 Adults</option>
                </select>
              </div>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Search</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* INLINE SEARCH RESULTS */}
      <InlineSearchResults isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* HERO SECTION - Modern Split with Floating Elements */}
      <section className="relative pt-8 pb-20 lg:pt-12 lg:pb-32 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 -right-20 w-96 h-96 bg-teal-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-coral-accent/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-teal-accent/10 border border-teal-accent/20 text-teal-accent px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
                <BadgeCheck className="w-4 h-4" />
                Trusted by 500,000+ military families
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-ocean-900 tracking-tight leading-[1.05] animate-slide-up">
                Your Home Away from <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-accent to-teal-light">Home</span>
              </h1>

              <p className="text-lg text-ocean-600 leading-relaxed max-w-xl animate-slide-up stagger-2">
                Premium, affordable lodging exclusively for military members, veterans, and their families. Comfort you can trust wherever duty takes you.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 sm:gap-12 pt-4 animate-slide-up stagger-3">
                <div>
                  <div className="text-4xl font-display font-bold text-ocean-900">200+</div>
                  <div className="text-sm text-ocean-500 mt-1">Worldwide Locations</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-ocean-900">50%</div>
                  <div className="text-sm text-ocean-500 mt-1">Less Than Hotels</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-ocean-900">4.8★</div>
                  <div className="text-sm text-ocean-500 mt-1">Average Rating</div>
                </div>
              </div>
            </div>

            {/* Right: Hero Image Cards */}
            <div className="relative animate-scale-in stagger-4">
              <div className="relative">
                {/* Main image card */}
                <div className="card-floating aspect-[4/5] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Luxury hotel room" 
                    className="w-full h-full object-cover"
                  />
                  {/* Floating badge */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-400 fill-current" />
                      <span className="font-semibold text-ocean-900">4.9 Rating</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating stats card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl hidden md:block animate-float">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-accent/10 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-teal-accent" />
                    </div>
                    <div>
                      <div className="text-lg font-display font-bold text-ocean-900">Safe & Secure</div>
                      <div className="text-sm text-ocean-500">On-base locations</div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-teal-accent/20 rounded-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-10 border-y border-ocean-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Military-Exclusive', desc: 'Verified service members & families' },
              { icon: Globe, title: 'Global Coverage', desc: '200+ locations across 12 countries' },
              { icon: Wallet, title: 'Tax-Free Rates', desc: 'Save up to 50% vs commercial hotels' },
              { icon: Award, title: 'Top Rated', desc: '4.8/5 average guest satisfaction' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 bg-ocean-50 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-teal-accent/10 transition-colors">
                  <item.icon className="w-6 h-6 text-teal-accent" />
                </div>
                <h3 className="font-semibold text-ocean-900 mb-1">{item.title}</h3>
                <p className="text-xs text-ocean-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LOCATIONS - Floating Card Grid */}
      <section className="py-24 lg:py-28 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="label-mono mb-3 block">Explore</span>
              <h2 className="font-display text-4xl font-medium text-ocean-900 tracking-tight mb-3">Popular Destinations</h2>
              <p className="text-ocean-500 text-lg">Discover our most requested locations</p>
            </div>
            <a href="/locations" className="inline-flex items-center gap-2 text-teal-accent font-semibold hover:text-teal-light transition-colors group">
              Explore all locations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((loc, idx) => (
              <div key={loc.id} className="card-floating group cursor-pointer" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {loc.badge && (
                    <div className="absolute top-4 left-4 bg-teal-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {loc.badge}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading text-xl text-ocean-900">{loc.name}</h3>
                    <div className="flex items-center gap-1 text-teal-accent font-semibold">
                      <Star className="w-4 h-4 fill-current" /> {loc.rating}
                    </div>
                  </div>
                  <p className="text-ocean-500 text-sm mb-4 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {loc.location}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-ocean-100">
                    <div>
                      <span className="text-3xl font-display font-bold text-ocean-900">${loc.price}</span>
                      <span className="text-ocean-400 text-sm">/night</span>
                    </div>
                    <button className="px-5 py-2.5 bg-ocean-900 text-white text-sm font-semibold rounded-xl hover:bg-teal-accent transition-colors cursor-pointer">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Split Cards */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="label-mono mb-3 block">Benefits</span>
            <h2 className="font-display text-4xl font-medium text-ocean-900 mb-4">Why Military Families Choose Navy Lodge</h2>
            <p className="text-ocean-500 text-lg max-w-2xl mx-auto">Designed with your needs in mind, offering the perfect blend of comfort, convenience, and value.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="card-editorial p-8 group hover:border-teal-accent/30">
                <div className="w-14 h-14 bg-teal-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-accent transition-all duration-300">
                  <benefit.icon className="w-7 h-7 text-teal-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading text-xl text-ocean-900 mb-3">{benefit.title}</h3>
                <p className="text-ocean-500 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Step Cards */}
      <section className="py-24 lg:py-28 bg-ocean-900 relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-5"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="label-mono text-teal-light mb-3 block">Process</span>
            <h2 className="font-display text-4xl font-medium text-white mb-4">Book in Three Simple Steps</h2>
            <p className="text-ocean-300 text-lg max-w-2xl mx-auto">From search to stay, we've made the process seamless for busy military families.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { num: '01', title: 'Search & Select', desc: 'Choose your destination, dates, and room preferences from our 200+ locations worldwide.' },
              { num: '02', title: 'Verify & Book', desc: 'Provide your military credentials for verification. Quick booking with confirmation in minutes.' },
              { num: '03', title: 'Check In & Relax', desc: 'Arrive at your lodge, show your ID, and enjoy your comfortable, affordable stay.' }
            ].map((step, idx) => (
              <div key={idx} className="text-center relative">
                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-teal-accent/50 to-transparent -translate-x-1/2 ml-4"></div>
                )}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-accent/20 rounded-2xl mb-6">
                  <span className="font-mono text-2xl font-bold text-teal-light">{step.num}</span>
                </div>
                <h3 className="font-heading text-2xl text-white mb-3">{step.title}</h3>
                <p className="text-ocean-400 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button onClick={() => setIsSearchOpen(true)} className="btn-primary inline-flex items-center gap-2 text-lg">
              Start Your Search
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-32 px-4 overflow-hidden bg-gradient-to-br from-teal-accent to-teal-light">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-8 tracking-tight">
            Ready to Book Your Stay?
          </h2>
          <p className="text-white/90 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of military families who trust Navy Lodge for their travel and relocation needs.
          </p>
          <button onClick={() => setIsSearchOpen(true)} className="bg-white text-teal-accent hover:text-teal-accent/80 hover:bg-ocean-50 px-12 py-5 rounded-2xl font-semibold text-lg inline-flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/30 cursor-pointer">
            Check Availability
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ocean-950 text-ocean-400 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-accent to-teal-light rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">NAVY LODGE</span>
          </div>
          <p className="text-ocean-400">&copy; {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-ocean-400 hover:text-teal-accent transition-colors">Privacy</a>
            <a href="#" className="text-ocean-400 hover:text-teal-accent transition-colors">Terms</a>
            <a href="#" className="text-ocean-400 hover:text-teal-accent transition-colors">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
