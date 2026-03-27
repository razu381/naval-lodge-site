import React, { useState } from 'react';
import {
  MapPin,
  Users,
  Search,
  ShieldCheck,
  Heart,
  BadgeDollarSign,
  Clock,
  ChevronRight,
  Star,
  Menu,
  X
} from 'lucide-react';
import { Routes, Route, Link } from 'react-router-dom';
import DatePicker from '../../DatePicker';
import SearchModal from '../../SearchModal';
import NotFound from '../../NotFound';

export default function Homepage1() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-stone-50 font-sans text-slate-800 selection:bg-amber-200 selection:text-slate-900">
      {/* STICKY NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100/50 text-white transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                <Star className="w-5 h-5 text-slate-900" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-semibold text-xl tracking-tight leading-none text-slate-900">NAVY LODGE</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-amber-600 mt-1 font-medium">By Nexcom</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/homepage-1" className="text-sm font-medium tracking-wide text-amber-600 hover:text-amber-700 transition-colors">Home v1</Link>
              <Link to="/homepage-2" className="text-sm font-medium tracking-wide text-slate-600 hover:text-slate-900 transition-colors">Home v2</Link>
              <div className="h-5 w-px bg-slate-200"></div>
              <Link to="/locations" className="text-sm font-medium tracking-wide text-slate-600 hover:text-slate-900 transition-colors">Locations</Link>
              <Link to="/offers" className="text-sm font-medium tracking-wide text-slate-600 hover:text-slate-900 transition-colors">Offers</Link>
              <Link to="/about" className="text-sm font-medium tracking-wide text-slate-600 hover:text-slate-900 transition-colors">About</Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-1 shadow-xl border-t border-slate-100">
            <Link to="/homepage-1" className="block px-3 py-2 text-base font-medium text-amber-600 hover:bg-amber-50 rounded-md">Home v1</Link>
            <Link to="/homepage-2" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-md">Home v2</Link>
            <div className="border-t border-slate-200 my-2"></div>
            <Link to="/locations" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-md">Locations</Link>
            <Link to="/offers" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-md">Offers</Link>
            <Link to="/about" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-md">About</Link>
          </div>
        )}
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
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

          </div>
        </div>
      </div>

      <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="./beach.jpg"
            alt="Family relaxing in a premium hotel room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto pt-20">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight mb-8 drop-shadow-2xl leading-[1.1]">
            Comfort You Can Trust <br className="hidden md:block" />
            <span className="text-amber-400 italic">Wherever Duty Takes You</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/95 font-light max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
            Exclusive, premium lodging for military members, veterans, and their families worldwide.
          </p>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-16 px-4 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between gap-10 text-center md:text-left">
          <div className="flex items-center gap-4 group">
            <div className="p-3 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <span className="font-medium text-sm md:text-base tracking-wide text-slate-200">Exclusively for Military & Families</span>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="p-3 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
              <MapPin className="w-6 h-6 text-amber-400" />
            </div>
            <span className="font-medium text-sm md:text-base tracking-wide text-slate-200">Secure Base Locations</span>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="p-3 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
              <BadgeDollarSign className="w-6 h-6 text-amber-400" />
            </div>
            <span className="font-medium text-sm md:text-base tracking-wide text-slate-200">Affordable, Tax-Free Rates</span>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="p-3 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
              <Star className="w-6 h-6 text-amber-400" />
            </div>
            <span className="font-medium text-sm md:text-base tracking-wide text-slate-200">Trusted by Service Members</span>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-slate-900 tracking-tight mb-4">Featured Destinations</h2>
            <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed">Discover our most popular lodges across the globe, offering unparalleled comfort and convenience.</p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors group">
            View All Locations <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="group rounded-[2rem] overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-stone-100/50 flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="San Diego Beach" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                POPULAR
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="font-serif text-2xl font-medium text-slate-900 mb-2">Naval Base San Diego</h3>
              <p className="text-slate-500 mb-8 flex items-center gap-2 text-sm font-medium">
                <MapPin className="w-4 h-4 text-amber-500" /> California, USA
              </p>
              <button className="mt-auto w-full py-4 bg-stone-50 text-slate-900 font-semibold rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                Book Now
              </button>
            </div>
          </div>

          <div className="group rounded-[2rem] overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-stone-100/50 flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Hawaii Resort" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="font-serif text-2xl font-medium text-slate-900 mb-2">Pearl Harbor-Hickam</h3>
              <p className="text-slate-500 mb-8 flex items-center gap-2 text-sm font-medium">
                <MapPin className="w-4 h-4 text-amber-500" /> Hawaii, USA
              </p>
              <button className="mt-auto w-full py-4 bg-stone-50 text-slate-900 font-semibold rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                Book Now
              </button>
            </div>
          </div>

          <div className="group rounded-[2rem] overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-stone-100/50 flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Virginia Beach" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="font-serif text-2xl font-medium text-slate-900 mb-2">Oceana / Dam Neck</h3>
              <p className="text-slate-500 mb-8 flex items-center gap-2 text-sm font-medium">
                <MapPin className="w-4 h-4 text-amber-500" /> Virginia, USA
              </p>
              <button className="mt-auto w-full py-4 bg-stone-50 text-slate-900 font-semibold rounded-xl hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                Book Now
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors group">
            View All Locations <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
            <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              <div className="relative z-10">
                <div className="inline-block bg-amber-500/10 text-amber-400 font-bold px-5 py-2 rounded-full text-xs tracking-widest uppercase mb-8 w-max border border-amber-500/20">
                  Special Offer
                </div>
                <h2 className="font-serif text-4xl md:text-6xl font-medium text-white mb-6 leading-[1.1]">
                  Save up to 15% on Extended Stays
                </h2>
                <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-md font-light leading-relaxed">
                  Whether you're on PCS orders or taking a well-deserved family vacation, enjoy significant savings when you book 7 nights or more.
                </p>
                <button className="bg-white text-slate-900 hover:bg-stone-100 px-8 py-4 rounded-2xl font-semibold w-max transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  View Offer Details
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Luxury hotel pool" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-20">
          <div className="md:w-1/2 relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Military family reuniting" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-amber-100 rounded-[3rem] -z-0"></div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-slate-100 rounded-full -z-0"></div>
          </div>
          
          <div className="md:w-1/2">
            <h2 className="font-serif text-4xl md:text-6xl font-medium text-slate-900 mb-8 leading-[1.1] tracking-tight">
              Your Home Away <br/> From Home.
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-6 font-light leading-relaxed">
              We understand the unique lifestyle of military families. That's why Navy Lodges are designed to provide a comfortable, welcoming, and secure environment, whether you are transitioning to a new duty station or simply taking a break.
            </p>
            <p className="text-lg md:text-xl text-slate-600 mb-10 font-light leading-relaxed">
              Enjoy spacious family suites, fully equipped kitchens, and complimentary breakfasts at select locations—all with the peace of mind that comes from staying on base.
            </p>
            <div className="flex items-center gap-5 bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                <Heart className="w-7 h-7 text-amber-500" />
              </div>
              <span className="font-serif text-xl font-medium text-slate-900">Proudly serving those who serve.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-32 px-4 border-t border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-slate-900 tracking-tight mb-6">The Navy Lodge Difference</h2>
            <p className="text-slate-500 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">Experience premium amenities and dedicated service tailored specifically for the military community.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-stone-50/50 p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-stone-100/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-slate-900 mb-4">Safe & Secure</h3>
              <p className="text-slate-600 font-light leading-relaxed">Located on secure military installations, providing peace of mind for you and your family.</p>
            </div>

            <div className="bg-stone-50/50 p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-stone-100/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-slate-900 mb-4">Family Designed</h3>
              <p className="text-slate-600 font-light leading-relaxed">Spacious rooms, pet-friendly options, and amenities built with military families in mind.</p>
            </div>

            <div className="bg-stone-50/50 p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-stone-100/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <BadgeDollarSign className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-slate-900 mb-4">Incredible Value</h3>
              <p className="text-slate-600 font-light leading-relaxed">Enjoy premium accommodations at affordable, tax-free rates exclusive to authorized patrons.</p>
            </div>

            <div className="bg-stone-50/50 p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] border border-stone-100/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-slate-900 mb-4">Easy Booking</h3>
              <p className="text-slate-600 font-light leading-relaxed">Streamlined reservation process online or via our dedicated 24/7 customer service team.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-40 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-5xl md:text-6xl font-medium text-white mb-8 tracking-tight">Ready to Book Your Stay?</h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join thousands of military families who trust Navy Lodge for their travel and relocation needs.
          </p>
          <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-12 py-5 rounded-2xl font-semibold text-lg inline-flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/30 group">
            Check Availability <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-400 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
          
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-slate-900" fill="currentColor" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">NAVY LODGE</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Providing premium, affordable, and secure lodging for military members and their families worldwide.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors cursor-pointer">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-colors cursor-pointer">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Reservations</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Book a Room</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Modify/Cancel Reservation</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Special Offers</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Group Bookings</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">About Us</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Locations Directory</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">NEXCOM Enterprise</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-500 shrink-0" />
                <span>3280 Virginia Beach Blvd.<br/>Virginia Beach, VA 23452</span>
              </li>
              <li className="flex items-center gap-3">
                <Search className="w-5 h-5 text-slate-500 shrink-0" />
                <span>1-800-NAVY-INN</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.</p>
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
