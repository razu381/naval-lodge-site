import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Users,
  Search,
  Shield,
  Star,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Award,
  Globe,
  Wallet,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DatePicker from '../../DatePicker';
import SearchModal from '../../SearchModal';

export default function Homepage1() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    {
      id: 1,
      name: 'Naval Base San Diego',
      location: 'California, USA',
      price: 79,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      badge: 'Most Popular'
    },
    {
      id: 2,
      name: 'Pearl Harbor-Hickam',
      location: 'Hawaii, USA',
      price: 95,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      name: 'Oceana / Dam Neck',
      location: 'Virginia, USA',
      price: 72,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 4,
      name: 'Naval Station Norfolk',
      location: 'Virginia, USA',
      price: 68,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const stats = [
    { value: '200+', label: 'Global Locations', icon: Globe },
    { value: '50%', label: 'Less Than Hotels', icon: Wallet },
    { value: '4.9', label: 'Average Rating', icon: Star },
    { value: '500K+', label: 'Happy Families', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-sand-50 font-sans text-ocean-900">
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

            <div className="hidden md:flex items-center space-x-1">
              <Link to="/homepage-1" className="text-sm font-medium tracking-wide text-teal-accent px-4 py-2 rounded-lg hover:text-teal-accent/80 hover:bg-teal-50 transition-all">Home v1</Link>
              <Link to="/homepage-2" className="text-sm font-medium tracking-wide text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Home v2</Link>
              <Link to="/homepage-3" className="text-sm font-medium tracking-wide text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Home v3</Link>
              <div className="h-5 w-px bg-ocean-200 mx-2"></div>
              <Link to="/locations" className="text-sm font-medium tracking-wide text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Locations</Link>
              <Link to="/offers" className="text-sm font-medium tracking-wide text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Offers</Link>
              <Link to="/about" className="text-sm font-medium tracking-wide text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">About</Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-ocean-600 hover:text-ocean-900"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-1 shadow-xl border-t border-ocean-100">
            <Link to="/homepage-1" className="block px-3 py-2 text-base font-medium text-teal-accent hover:text-teal-accent/80 hover:bg-teal-50 rounded-md">Home v1</Link>
            <Link to="/homepage-2" className="block px-3 py-2 text-base font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 rounded-md">Home v2</Link>
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
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="flex-1 bg-transparent border-0 outline-none text-ocean-900 font-medium cursor-pointer appearance-none pr-8 text-sm"
                >
                  <option value="">Select destination</option>
                  {dummyLocations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <DatePicker
                  checkIn={checkInDate}
                  checkOut={checkOutDate}
                  onCheckInChange={setCheckInDate}
                  onCheckOutChange={setCheckOutDate}
                />
              </div>

              <div className="flex-1 flex items-center gap-3 bg-sand-50 hover:bg-ocean-50 border border-ocean-200 focus-within:border-teal-accent focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-accent/10 rounded-xl px-4 py-3 transition-all">
                <Users className="h-5 w-5 text-ocean-400 shrink-0" />
                <select className="flex-1 bg-transparent border-0 outline-none text-ocean-900 font-medium cursor-pointer appearance-none pr-8 text-sm">
                  <option>1 Room, 2 Adults</option>
                  <option>1 Room, 1 Adult</option>
                  <option>2 Rooms, 4 Adults</option>
                  <option>More Options...</option>
                </select>
              </div>

              <button onClick={() => setIsSearchOpen(true)} className="btn-primary cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
                <span>Search</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION - Diagonal Split Design */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-ocean-950 -mt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="./beach.jpg"
            alt="Luxury military lodging"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-950 via-ocean-950/80 to-ocean-950/40"></div>
        </div>

        {/* Diagonal Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-teal-accent/10 border border-teal-accent/20 text-teal-light px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm animate-fade-in">
                <Shield className="w-4 h-4" />
                Exclusive Military Lodging
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.05] animate-slide-up">
                Comfort You Can <span className="text-teal-light italic">Trust</span>
                <br />
                <span className="text-ocean-300">Wherever Duty Takes You</span>
              </h1>
              
              <p className="text-lg text-ocean-200 leading-relaxed max-w-lg animate-slide-up stagger-2">
                Premium, affordable accommodations exclusively for military members, veterans, and their families worldwide.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-8 pt-4 animate-slide-up stagger-3">
                {stats.slice(0, 3).map((stat, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-baseline gap-2">
                      <stat.icon className="w-5 h-5 text-teal-accent" />
                      <span className="text-3xl font-display font-semibold text-white">{stat.value}</span>
                    </div>
                    <span className="text-sm text-ocean-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Floating Card Visual */}
            <div className="hidden lg:block relative animate-scale-in stagger-4">
              <div className="relative">
                {/* Decorative elements behind */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-teal-accent/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-coral-accent/10 rounded-full blur-3xl"></div>
                
                {/* Main floating card */}
                <div className="card-floating p-6 max-w-sm mx-auto bg-ocean-900/80 backdrop-blur-xl border border-ocean-700/50">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Premium suite"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-xl text-white">San Diego Lodge</h3>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium text-white">4.9</span>
                      </div>
                    </div>
                    <p className="text-ocean-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> California, USA
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-ocean-700">
                      <div>
                        <span className="text-2xl font-display font-semibold text-white">$79</span>
                        <span className="text-ocean-400 text-sm">/night</span>
                      </div>
                      <button className="text-teal-light text-sm font-medium hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                        View Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-sand-50 py-12 border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between gap-8">
            {[
              { icon: Shield, text: 'Secure Base Access' },
              { icon: MapPin, text: '200+ Global Locations' },
              { icon: Wallet, text: 'Tax-Free Rates' },
              { icon: Clock, text: '24/7 Support' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 group">
                <div className="p-2.5 bg-ocean-100 rounded-lg group-hover:bg-teal-accent/10 transition-colors">
                  <item.icon className="w-5 h-5 text-teal-accent" />
                </div>
                <span className="font-medium text-sm text-ocean-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LOCATIONS - Architectural Cards */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="label-mono mb-3 block">Discover</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-ocean-900 tracking-tight">Featured Destinations</h2>
            <p className="text-ocean-500 mt-4 text-lg">Explore our most sought-after lodges across the globe.</p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-teal-accent font-semibold hover:text-teal-light transition-colors group">
            View All Locations <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, idx) => (
            <div key={loc.id} className="card-architectural group cursor-pointer" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={loc.image} 
                  alt={loc.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {loc.badge && (
                  <div className="absolute top-4 left-4 bg-teal-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {loc.badge}
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="w-full bg-white text-ocean-900 py-3 rounded-lg font-semibold text-sm hover:bg-teal-accent hover:text-white transition-colors cursor-pointer">
                    Book Now
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading text-lg text-ocean-900">{loc.name}</h3>
                  <div className="flex items-center gap-1 text-teal-accent text-sm font-semibold">
                    <Star className="w-4 h-4 fill-current" /> {loc.rating}
                  </div>
                </div>
                <p className="text-ocean-500 text-sm mb-4 flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {loc.location}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-display font-semibold text-ocean-900">${loc.price}</span>
                  <span className="text-ocean-400 text-sm">/night</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-2 text-teal-accent font-semibold">
            View All Locations <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* PROMO SECTION - Dark Card Design */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-ocean-900 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-5/12 p-10 lg:p-14 flex flex-col justify-center relative overflow-hidden">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-accent/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-coral-accent/5 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <span className="label-mono bg-teal-accent/10 border border-teal-accent/20 px-3 py-1 rounded-full inline-block mb-6 text-teal-light">
                  Limited Offer
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-6 leading-[1.1]">
                  Save up to <span className="text-teal-light">15%</span> on Extended Stays
                </h2>
                <p className="text-ocean-300 text-lg mb-8 leading-relaxed">
                  Whether you're on PCS orders or taking a family vacation, enjoy exclusive savings when you book 7 nights or more.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Complimentary breakfast', 'Free parking', 'Flexible cancellation'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-ocean-200">
                      <CheckCircle2 className="w-5 h-5 text-teal-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="btn-primary cursor-pointer inline-flex items-center gap-2">
                  View Offer Details
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="lg:w-7/12 relative min-h-[350px] lg:min-h-full">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Luxury pool" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Editorial Layout */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Military family" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-ocean-200 border-2 border-white"></div>
                  ))}
                </div>
                <span className="text-sm font-medium text-ocean-900">500K+ Families</span>
              </div>
              <p className="text-ocean-500 text-sm">Trusted by military families worldwide</p>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-teal-accent/30 rounded-lg -z-10"></div>
          </div>
          
          <div>
            <span className="label-mono mb-3 block">Our Story</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-ocean-900 mb-6 leading-[1.1]">
              Your Home Away from <span className="text-teal-accent italic">Home</span>
            </h2>
            <p className="text-ocean-600 text-lg mb-6 leading-relaxed">
              We understand the unique lifestyle of military families. Navy Lodges are designed to provide comfortable, welcoming, and secure environments—whether you're transitioning to a new duty station or taking a well-deserved break.
            </p>
            <p className="text-ocean-600 text-lg mb-8 leading-relaxed">
              Enjoy spacious family suites, fully equipped kitchens, and complimentary breakfasts at select locations—all with the peace of mind that comes from staying on base.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                'Spacious Suites',
                'Kitchens Included',
                'On-Site Parking',
                'Pet-Friendly'
              ].map((amenity, i) => (
                <div key={i} className="flex items-center gap-2 text-ocean-700">
                  <CheckCircle2 className="w-5 h-5 text-teal-accent" />
                  {amenity}
                </div>
              ))}
            </div>
            
            <button className="btn-secondary cursor-pointer inline-flex items-center gap-2">
              Learn More About Us
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Glass Cards */}
      <section className="py-24 px-4 bg-ocean-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="label-mono mb-3 block">Why Choose Us</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-ocean-900 mb-4">The Navy Lodge Difference</h2>
            <p className="text-ocean-500 text-lg max-w-2xl mx-auto">Premium amenities and dedicated service tailored specifically for the military community.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Safe & Secure', desc: 'Gated communities on military installations with 24/7 security.' },
              { icon: Users, title: 'Family Designed', desc: 'Spacious rooms, pet-friendly options, and family amenities.' },
              { icon: Wallet, title: 'Incredible Value', desc: 'Premium accommodations at affordable, tax-free rates.' },
              { icon: Clock, title: 'Easy Booking', desc: 'Streamlined online reservations or 24/7 customer support.' }
            ].map((feature, idx) => (
              <div key={idx} className="card-glass p-8 group hover:bg-white/90 transition-all">
                <div className="w-14 h-14 bg-teal-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-accent transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-teal-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading text-xl text-ocean-900 mb-3">{feature.title}</h3>
                <p className="text-ocean-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-32 px-4 overflow-hidden bg-ocean-900">
        <div className="absolute inset-0 pattern-grid opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-accent/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">
            Ready to Book Your Stay?
          </h2>
          <p className="text-ocean-300 text-lg md:text-xl mb-10 leading-relaxed">
            Join hundreds of thousands of military families who trust Navy Lodge for their travel and relocation needs.
          </p>
          <button onClick={() => setIsSearchOpen(true)} className="btn-primary cursor-pointer inline-flex items-center gap-3 text-lg px-10 py-5">
            Check Availability
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ocean-950 text-ocean-400 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-ocean-800 pb-12">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-accent to-teal-light rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">NAVY LODGE</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Providing premium, affordable, and secure lodging for military members and their families worldwide.
            </p>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'instagram'].map(social => (
                <div key={social} className="w-10 h-10 rounded-lg bg-ocean-900 flex items-center justify-center hover:bg-teal-accent hover:text-white transition-colors cursor-pointer">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-sm"></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Reservations</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-teal-accent transition-colors">Book a Room</a></li>
              <li><a href="#" className="hover:text-teal-accent transition-colors">Modify/Cancel</a></li>
              <li><a href="#" className="hover:text-teal-accent transition-colors">Special Offers</a></li>
              <li><a href="#" className="hover:text-teal-accent transition-colors">Group Bookings</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">About Us</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-teal-accent transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-teal-accent transition-colors">Locations</a></li>
              <li><a href="#" className="hover:text-teal-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-teal-accent transition-colors">NEXCOM</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-ocean-500 shrink-0" />
                <span>3280 Virginia Beach Blvd.<br/>Virginia Beach, VA 23452</span>
              </li>
              <li className="flex items-center gap-3">
                <Search className="w-5 h-5 text-ocean-500 shrink-0" />
                <span>1-800-NAVY-INN</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ocean-400">
          <p>&copy; {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-teal-accent transition-colors">Terms</a>
            <a href="#" className="hover:text-teal-accent transition-colors">Accessibility</a>
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
