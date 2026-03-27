import React, { useState } from 'react';
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
  HeartHandshake
} from 'lucide-react';
import DatePicker from '../../DatePicker';
import SearchModal from '../../SearchModal';

interface Homepage2Props {
  className?: string;
}

export default function Homepage2({ className }: Homepage2Props) {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  React.useEffect(() => {
    if (!checkInDate) setCheckInDate(today);
    if (!checkOutDate) setCheckOutDate(tomorrow);
  }, []);

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

  return (
    <div className={`min-h-screen bg-[#FAFAFA] font-sans text-slate-800 selection:bg-amber-100 selection:text-slate-900 ${className || ''}`}>
      {/* NAVIGATION - Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Area */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all duration-300">
                <Star className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg tracking-tight leading-none text-slate-900">NAVY LODGE</span>
                <span className="text-[10px] tracking-[0.15em] uppercase text-amber-600 font-medium">By Nexcom</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <a href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-4 py-2 rounded-lg transition-all">Home v1</a>
              <a href="/homepage-2" className="text-sm font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50 px-4 py-2 rounded-lg transition-all">Home v2</a>
              <a href="/locations" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-4 py-2 rounded-lg transition-all">Locations</a>
              <a href="/offers" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-4 py-2 rounded-lg transition-all">Offers</a>
              <a href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-4 py-2 rounded-lg transition-all">About</a>
            </div>
          </div>
        </div>
      </nav>

      {/* STICKY BOOKING WIDGET BAR */}
      <div className="sticky top-20 left-0 right-0 z-40 bg-white shadow-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center">
            
            <div className="flex-1 relative group w-full md:w-auto">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
              </div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-stone-50 hover:bg-stone-100 border border-slate-200 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10 rounded-xl text-slate-900 font-medium appearance-none transition-all outline-none cursor-pointer"
              >
                <option value="">Select destination</option>
                {dummyLocations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 w-full md:w-auto">
              <DatePicker
                checkIn={checkInDate}
                checkOut={checkOutDate}
                onCheckInChange={setCheckInDate}
                onCheckOutChange={setCheckOutDate}
              />
            </div>

            <div className="flex-1 relative group w-full md:w-auto">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
              </div>
              <select className="w-full pl-12 pr-4 py-3 bg-stone-50 hover:bg-stone-100 border border-slate-200 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10 rounded-xl text-slate-900 font-medium appearance-none transition-all outline-none cursor-pointer">
                <option>1 Room, 2 Adults</option>
                <option>1 Room, 1 Adult</option>
                <option>2 Rooms, 4 Adults</option>
                <option>More Options...</option>
              </select>
            </div>

            <button onClick={() => setIsSearchOpen(true)} className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 w-full md:w-auto group whitespace-nowrap">
              Search
              <ArrowRight className="w-5 h-5" />
            </button>

          </div>
        </div>
      </div>

      {/* 1. HERO SECTION - Modern Split */}
      <section className="relative pt-24 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">
                <BadgeCheck className="w-4 h-4" />
                Trusted by 500,000+ military families
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                Your Home Away from <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Home</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                Premium, affordable lodging exclusively for military members, veterans, and their families. Comfort you can trust wherever duty takes you.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 sm:gap-12">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900">200+</div>
                  <div className="text-sm text-slate-500 mt-1">Worldwide Locations</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900">50%</div>
                  <div className="text-sm text-slate-500 mt-1">Less Than Hotels</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900">4.8★</div>
                  <div className="text-sm text-slate-500 mt-1">Average Rating</div>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-3xl aspect-square flex items-center justify-center overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/30 to-transparent"></div>
                  <div className="text-center p-8 relative z-10">
                    <div className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <Star className="w-12 h-12 text-amber-500" fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Premium Comfort</h3>
                    <p className="text-slate-600">Use the search bar above to find your perfect stay</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decor */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-amber-100 to-transparent rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-100 to-transparent rounded-full blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* 2. TRUST BAR - Clean Minimal */}
      <section className="py-16 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Military-Exclusive</h3>
              <p className="text-sm text-slate-500">Verified service members & families only</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                <Globe className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Global Coverage</h3>
              <p className="text-sm text-slate-500">200+ locations across 12 countries</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                <Wallet className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Tax-Free Rates</h3>
              <p className="text-sm text-slate-500">Save up to 50% vs. commercial hotels</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Top Rated</h3>
              <p className="text-sm text-slate-500">4.8/5 average guest satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED LOCATIONS - Modern Grid */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">Popular Destinations</h2>
              <p className="text-slate-600 text-lg">Discover our most requested locations</p>
            </div>
            <a href="/locations" className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors group">
              Explore all locations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Naval Base San Diego"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-amber-700 shadow-sm">
                  ★ Most Popular
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-slate-900">Naval Base San Diego</h3>
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" /> 4.9
                  </div>
                </div>
                <p className="text-slate-500 text-sm mb-4 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" /> California, USA
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-2xl font-bold text-slate-900">$79</span>
                    <span className="text-sm text-slate-500">/night</span>
                  </div>
                  <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Pearl Harbor-Hickam"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-slate-900">Pearl Harbor-Hickam</h3>
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" /> 4.8
                  </div>
                </div>
                <p className="text-slate-500 text-sm mb-4 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" /> Hawaii, USA
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-2xl font-bold text-slate-900">$95</span>
                    <span className="text-sm text-slate-500">/night</span>
                  </div>
                  <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Oceana / Dam Neck"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-slate-900">Oceana / Dam Neck</h3>
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" /> 4.7
                  </div>
                </div>
                <p className="text-slate-500 text-sm mb-4 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" /> Virginia, USA
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-2xl font-bold text-slate-900">$72</span>
                    <span className="text-sm text-slate-500">/night</span>
                  </div>
                  <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US - Clean Benefits */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">Why Military Families Choose Navy Lodge</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Designed with your needs in mind, offering the perfect blend of comfort, convenience, and value.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Secure Base Access</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Safe, gated communities located within military installations with 24/7 security.</p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Tax-Free Savings</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Save up to 50% compared to commercial hotels with our special military-only rates.</p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Family-Friendly</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Spacious suites with kitchens, laundry facilities, and amenities for whole family.</p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Flexible Policies</h3>
                <p className="text-slate-600 text-sm leading-relaxed">PCS-friendly with extended stay options and flexible cancellation terms.</p>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Trusted Quality</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Consistent 4.8/5 guest rating with over 500,000 satisfied stays annually.</p>
              </div>
            </div>

            {/* Benefit 6 */}
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <BadgeCheck className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Simple Booking</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Book online or call our 24/7 support. No hidden fees, ever.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS - Step by Step */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">Book in Three Simple Steps</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">From search to stay, we've made the process seamless for busy military families.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-amber-200 to-transparent -translate-y-1/2 ml-4"></div>
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-3">Search & Select</h3>
              <p className="text-slate-600 text-sm">Choose your destination, dates, and room preferences from our 200+ locations worldwide.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-amber-200 to-transparent -translate-y-1/2 ml-4"></div>
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-3">Verify & Book</h3>
              <p className="text-slate-600 text-sm">Provide your military credentials for verification. Quick booking with confirmation in minutes.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-block mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-3">Check In & Relax</h3>
              <p className="text-slate-600 text-sm">Arrive at your lodge, show your ID, and enjoy your comfortable, affordable stay.</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button onClick={() => setIsSearchOpen(true)} className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20">
              Start Your Search
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA SECTION */}
      <section className="relative py-32 px-4 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Ready to Book Your Stay?</h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of military families who trust Navy Lodge for their travel and relocation needs.
          </p>
          <button onClick={() => setIsSearchOpen(true)} className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-12 py-5 rounded-xl font-semibold text-lg inline-flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/30">
            Check Availability
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* FOOTER - Simple */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </footer>

      <SearchModal
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        location={selectedLocation}
        checkIn={checkInDate}
        checkOut={checkOutDate}
      />
    </div>
  );
}
