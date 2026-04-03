'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
import DatePicker from '@/components/shared/DatePicker';

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

export default function Homepage2() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    setCheckInDate((prev) => prev || today);
    setCheckOutDate((prev) => prev || tomorrow);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (heroRef.current && !statsAnimated) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setStatsAnimated(true);
          // Trigger counter animations
          const counters = document.querySelectorAll('.stat-counter');
          counters.forEach((counter, index) => {
            setTimeout(() => {
              counter.classList.add('animate');
            }, index * 150);
          });
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Counter animation effect
  useEffect(() => {
    if (statsAnimated) {
      const counters = document.querySelectorAll('[data-count]');
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-count') || '0');
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        const isDecimal = target % 1 !== 0;

        const animateCount = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const current = start + (target - start) * easeOutQuart;

          if (counter instanceof HTMLElement) {
            counter.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toString();
          }

          if (progress < 1) {
            requestAnimationFrame(animateCount);
          } else {
            if (counter instanceof HTMLElement) {
              counter.textContent = isDecimal ? target.toFixed(1) : target.toString();
            }
          }
        };

        requestAnimationFrame(animateCount);
      });
    }
  }, [statsAnimated]);

  return (
    <div className="min-h-screen font-sans text-ocean-900">
      {/* NAVIGATION - Premium Navy with Yellow Top Border */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#002B5C]/95 backdrop-blur-xl shadow-sm py-3' : 'bg-[#002B5C] py-5'
      }`}>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFCF01] to-transparent opacity-0 transition-opacity duration-300"></div>
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-[#FFCF01] transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-60'}`}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-11 h-11 bg-gradient-to-br from-[#FFCF01] to-[#FFD84D] rounded-xl flex items-center justify-center shadow-lg shadow-[#FFCF01]/25 group-hover:shadow-[#FFCF01]/40 group-hover:scale-105 transition-all duration-300">
                <Star className="w-5 h-5 text-[#002B5C]" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight leading-none text-white">NAVY LODGE</span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#FFCF01] mt-0.5 font-semibold">by NEXCOM Hospitality Group</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link href="/homepage-1" className="text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 px-4 py-2 rounded-lg transition-all relative">
                Home v1
                {scrolled && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent"></span>}
              </Link>
              <Link href="/homepage-2" className="text-sm font-bold text-[#FFCF01] hover:text-[#FFCF01]/90 hover:bg-white/10 px-4 py-2 rounded-lg transition-all relative">
                Home v2
                <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-[#FFCF01]"></span>
              </Link>
              <Link href="/homepage-3" className="text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 px-4 py-2 rounded-lg transition-all">Home v3</Link>
              <Link href="/homepage-4" className="text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 px-4 py-2 rounded-lg transition-all">Home v4</Link>
              <div className="h-5 w-px bg-white/20 mx-2"></div>
              <Link href="/locations" className="text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 px-4 py-2 rounded-lg transition-all">Locations</Link>
              <Link href="/offers" className="text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 px-4 py-2 rounded-lg transition-all">Offers</Link>
              <Link href="/about" className="text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 px-4 py-2 rounded-lg transition-all">About</Link>
            </div>

            <div className="md:hidden">
              <button type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white cursor-pointer">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#002B5C] px-4 pt-2 pb-4 space-y-1 shadow-xl border-t border-white/10 animate-fade-in">
            <Link href="/homepage-1" className="block px-3 py-2 text-base font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 rounded-md">Home v1</Link>
            <Link href="/homepage-2" className="block px-3 py-2 text-base font-bold text-[#FFCF01] hover:text-[#FFCF01]/90 hover:bg-white/10 rounded-md">Home v2</Link>
            <Link href="/homepage-3" className="block px-3 py-2 text-base font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 rounded-md">Home v3</Link>
            <Link href="/homepage-4" className="block px-3 py-2 text-base font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 rounded-md">Home v4</Link>
            <div className="border-t border-white/20 my-2"></div>
            <Link href="/locations" className="block px-3 py-2 text-base font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 rounded-md">Locations</Link>
            <Link href="/offers" className="block px-3 py-2 text-base font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 rounded-md">Offers</Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 rounded-md">About</Link>
          </div>
        )}
      </nav>

      {/* BOOKING WIDGET - Frosted Glass Premium */}
      <div className="sticky top-0 z-40 pt-20">
        <div className="bg-white/90 backdrop-blur-xl shadow-xl shadow-[#002B5C]/10 border-b border-[#C7C8CA]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              <div className="flex-1 flex items-center gap-3 bg-white hover:bg-[#002B5C]/5 border border-[#C7C8CA] focus-within:border-[#FFCF01] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#FFCF01]/10 rounded-xl px-4 py-3 transition-all">
                <MapPin className="h-5 w-5 text-[#505759] shrink-0" />
                <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="flex-1 bg-transparent border-0 outline-none text-[#002B5C] font-semibold cursor-pointer appearance-none pr-8 text-sm">
                  <option value="">Select destination</option>
                  {dummyLocations.map((location) => (<option key={location} value={location}>{location}</option>))}
                </select>
              </div>
              <div className="flex-1 min-w-[300px]">
                <DatePicker checkIn={checkInDate} checkOut={checkOutDate} onCheckInChange={setCheckInDate} onCheckOutChange={setCheckOutDate} />
              </div>
              <div className="flex-1 flex items-center gap-3 bg-white hover:bg-[#002B5C]/5 border border-[#C7C8CA] focus-within:border-[#FFCF01] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#FFCF01]/10 rounded-xl px-4 py-3 transition-all">
                <Users className="h-5 w-5 text-[#505759] shrink-0" />
                <select className="flex-1 bg-transparent border-0 outline-none text-[#002B5C] font-semibold cursor-pointer appearance-none pr-8 text-sm">
                  <option>1 Room, 2 Adults</option>
                  <option>1 Room, 1 Adult</option>
                  <option>2 Rooms, 4 Adults</option>
                </select>
              </div>
              <button
                onClick={() => setIsSearchOpen(true)}
                type="button"
                className="cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap px-8 py-3 rounded-xl bg-[#002B5C] hover:bg-[#002B5C]/90 text-white font-bold transition-all shadow-lg shadow-[#002B5C]/20 hover:shadow-[#002B5C]/30"
              >
                <span>Search</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH RESULTS - Dummy modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ocean-900/40 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-scale-in text-center">
            <div className="w-16 h-16 bg-teal-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-teal-accent" />
            </div>
            <h3 className="font-display text-3xl font-medium text-ocean-900 mb-2">Searching Availability</h3>
            <p className="text-ocean-500 mb-8">Looking up rooms in {selectedLocation || 'all regions'}...</p>
            <button 
              type="button"
              onClick={() => setIsSearchOpen(false)} 
              className="px-8 py-3 bg-ocean-100 hover:bg-ocean-200 text-ocean-900 rounded-xl font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION - Premium Split with Navy Background & Glassmorphism */}
      <section ref={heroRef} className="relative pt-8 pb-20 lg:pt-12 lg:pb-32 overflow-hidden bg-[#002B5C]">
        {/* Navy-to-transparent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002B5C] via-[#002B5C]/95 to-[#002B5C]/80"></div>
        
        {/* Subtle nautical grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-8 text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-[#FFCF01] px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide animate-fade-in">
                <BadgeCheck className="w-4 h-4" />
                Trusted by 500,000+ military families
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] animate-slide-up">
                Your <span className="text-[#FFCF01] text-[1.15em]">Home</span> Away from Home
              </h1>

              <p className="text-lg text-white/80 leading-relaxed max-w-xl animate-slide-up stagger-2">
                Premium, affordable lodging exclusively for military members, veterans, and their families. Comfort you can trust wherever duty takes you.
              </p>

              {/* Stats - Animated */}
              <div className="flex flex-wrap gap-10 sm:gap-14 pt-6 animate-slide-up stagger-3">
                <div className="stat-counter">
                  <div className="text-4xl md:text-5xl font-display font-bold text-white" data-count="200">0</div>
                  <div className="text-sm text-white/60 mt-1 font-medium tracking-wide">Worldwide Locations</div>
                </div>
                <div className="stat-counter">
                  <div className="text-4xl md:text-5xl font-display font-bold text-white" data-count="50">0</div>
                  <div className="text-sm text-white/60 mt-1 font-medium tracking-wide">% Less Than Hotels</div>
                </div>
                <div className="stat-counter">
                  <div className="text-4xl md:text-5xl font-display font-bold text-white" data-count="4.8">0</div>
                  <div className="text-sm text-white/60 mt-1 font-medium tracking-wide">Average Rating</div>
                </div>
              </div>
            </div>

            {/* Right: Hero Image with Parallax */}
            <div className="relative animate-scale-in stagger-4">
              <div className="relative">
                {/* Main image card - bleeding edge */}
                <div className="card-floating aspect-[4/5] overflow-hidden shadow-2xl rounded-3xl relative">
                  <img 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Luxury hotel room" 
                    className="w-full h-full object-cover parallax-image"
                  />
                  
                  {/* Glassmorphism floating badge */}
                  <div className="absolute top-6 right-6 bg-white/15 backdrop-blur-xl border border-white/30 px-5 py-3 rounded-2xl shadow-2xl">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-[#FFCF01] fill-current" />
                      <span className="font-bold text-white">4.9 Rating</span>
                    </div>
                  </div>
                </div>
                
                {/* Glassmorphism Safe & Secure card */}
                <div className="absolute -bottom-8 -left-8 bg-white/15 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-2xl hidden md:block animate-float">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#FFCF01]/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-[#FFCF01]/30">
                      <Shield className="w-7 h-7 text-[#FFCF01]" />
                    </div>
                    <div>
                      <div className="text-lg font-display font-bold text-white">Safe & Secure</div>
                      <div className="text-sm text-white/70">On-base locations</div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-[#FFCF01]/20 rounded-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR - Premium White */}
      <section className="py-12 border-y border-[#C7C8CA]/50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { icon: Shield, title: 'Military-Exclusive', desc: 'Verified service members & families' },
              { icon: Globe, title: 'Global Coverage', desc: '200+ locations across 12 countries' },
              { icon: Wallet, title: 'Tax-Free Rates', desc: 'Save up to 50% vs commercial hotels' },
              { icon: Award, title: 'Top Rated', desc: '4.8/5 average guest satisfaction' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-[#002B5C]/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#FFCF01]/10 transition-colors">
                  <item.icon className="w-7 h-7 text-[#002B5C] group-hover:text-[#FFCF01] transition-colors" />
                </div>
                <h3 className="font-display font-bold text-[#002B5C] mb-1">{item.title}</h3>
                <p className="text-xs text-[#505759] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LOCATIONS - Premium Card Grid with Hover Effects */}
      <section className="py-24 lg:py-28 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="label-mono mb-4 block text-xs font-bold tracking-[0.25em] text-[#FFCF01] uppercase">Explore</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#002B5C] tracking-tight mb-4">Popular Destinations</h2>
              <p className="text-[#505759] text-lg">Discover our most requested locations</p>
            </div>
            <Link href="/locations" className="inline-flex items-center gap-2 text-[#002B5C] font-bold hover:text-[#FFCF01] transition-colors group">
              Explore all locations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((loc, idx) => (
              <div key={loc.id} className="group cursor-pointer transition-all duration-400 hover:-translate-y-2" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="bg-white rounded-[20px] shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(0,43,92,0.3)] transition-all duration-400 overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={loc.image} alt={loc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    {loc.badge && (
                      <div className="absolute top-4 left-4 bg-[#002B5C] text-[#FFCF01] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg">
                        {loc.badge}
                      </div>
                    )}
                    {/* Navy overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002B5C] via-[#002B5C]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                    
                    {/* View button that slides up */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                      <button type="button" className="w-full py-3 px-6 bg-[#002B5C] text-[#FFCF01] font-bold rounded-xl hover:bg-[#FFCF01] hover:text-[#002B5C] transition-colors text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-heading text-xl font-bold text-[#002B5C]">{loc.name}</h3>
                      <div className="flex items-center gap-1 text-[#FFCF01] font-bold">
                        <Star className="w-5 h-5 fill-current" /> {loc.rating}
                      </div>
                    </div>
                    <p className="text-[#505759] text-sm mb-4 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {loc.location}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#C7C8CA]">
                      <div>
                        <span className="text-3xl font-display font-bold text-[#002B5C]">${loc.price}</span>
                        <span className="text-[#C7C8CA] text-sm font-semibold">/night</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Dark Navy with Yellow Accents */}
      <section className="py-24 lg:py-28 bg-[#002B5C] relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="label-mono mb-4 block text-xs font-bold tracking-[0.25em] text-[#FFCF01] uppercase">Benefits</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Why Military Families Choose Navy Lodge</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">Designed with your needs in mind, offering the perfect blend of comfort, convenience, and value.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-[#FFCF01]/30 transition-all duration-400 hover:shadow-2xl hover:shadow-[#FFCF01]/5">
                {/* Yellow accent bar */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FFCF01] to-[#FFD84D] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                
                <div className="w-16 h-16 bg-[#FFCF01]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FFCF01] transition-all duration-400">
                  <benefit.icon className="w-8 h-8 text-[#FFCF01] group-hover:text-[#002B5C] transition-colors" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-[#FFCF01] transition-colors">{benefit.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Large Outlined Numerals with Connector */}
      <section className="py-24 lg:py-28 bg-[#001B4D] relative overflow-hidden">
        {/* Subtle nautical compass watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at center, transparent 0%, transparent 70%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0.05) 72%, transparent 72%), conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.05) 45deg, transparent 90deg, rgba(255,255,255,0.05) 135deg, transparent 180deg, rgba(255,255,255,0.05) 225deg, transparent 270deg, rgba(255,255,255,0.05) 315deg, transparent 360deg)`,
          borderRadius: '50%'
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="label-mono mb-4 block text-xs font-bold tracking-[0.25em] text-[#FFCF01] uppercase">Process</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Book in Three Simple Steps</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">From search to stay, we've made the process seamless for busy military families.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative">
            {/* Connector line with animated fill */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-transparent via-[#FFCF01]/50 to-[#FFCF01]/50">
              <div className="absolute inset-0 bg-[#FFCF01] origin-left scale-x-0 connector-fill"></div>
            </div>

            {[
              { num: '01', title: 'Search & Select', desc: 'Choose your destination, dates, and room preferences from our 200+ locations worldwide.' },
              { num: '02', title: 'Verify & Book', desc: 'Provide your military credentials for verification. Quick booking with confirmation in minutes.' },
              { num: '03', title: 'Check In & Relax', desc: 'Arrive at your lodge, show your ID, and enjoy your comfortable, affordable stay.' }
            ].map((step, idx) => (
              <div key={idx} className="text-center relative z-10">
                {/* Large outlined numeral */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
                  {/* Semi-transparent navy overlay */}
                  <div className="absolute inset-0 bg-[#002B5C]/50 backdrop-blur-sm rounded-2xl"></div>
                  {/* Outline border */}
                  <div className="absolute inset-0 border-2 border-[#FFCF01]/30 rounded-2xl"></div>
                  <span className="relative font-display text-5xl font-bold text-[#FFCF01]/40">{step.num}</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button 
              type="button" 
              onClick={() => setIsSearchOpen(true)} 
              className="inline-flex items-center gap-3 text-lg bg-[#FFCF01] hover:bg-[#FFD84D] text-[#002B5C] px-10 py-4 rounded-xl font-bold transition-all duration-300 shadow-xl shadow-[#FFCF01]/20 hover:shadow-[#FFCF01]/30 hover:-translate-y-1"
            >
              Start Your Search
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA SECTION - Navy Blue with Watermark */}
      <section className="relative py-28 lg:py-36 px-4 overflow-hidden bg-[#002B5C]">
        {/* Nautical anchor watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.06]" style={{
          backgroundImage: `radial-gradient(circle at 50% 40%, transparent 15%, transparent 20%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 22%, transparent 22%), conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.08) 30deg, transparent 60deg, rgba(255,255,255,0.08) 120deg, transparent 150deg, rgba(255,255,255,0.08) 210deg, transparent 240deg, rgba(255,255,255,0.08) 300deg, transparent 330deg)`,
          borderRadius: '50%'
        }}></div>
        
        {/* Compass rose watermark */}
        <div className="absolute top-10 right-20 w-[300px] h-[300px] opacity-[0.04]" style={{
          backgroundImage: `conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.08) 10deg, transparent 20deg, rgba(255,255,255,0.08) 100deg, transparent 110deg, rgba(255,255,255,0.08) 190deg, transparent 200deg, rgba(255,255,255,0.08) 280deg, transparent 290deg)`,
          borderRadius: '50%'
        }}></div>
        
        {/* Subtle diagonal texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 70px)`
        }}></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
            Ready to Book Your Stay?
          </h2>
          <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of military families who trust Navy Lodge by NEXCOM Hospitality Group for their travel and relocation needs.
          </p>
          <button 
            type="button" 
            onClick={() => setIsSearchOpen(true)} 
            className="bg-transparent border-2 border-white text-white hover:bg-[#FFCF01] hover:text-[#002B5C] hover:border-[#FFCF01] px-14 py-5 rounded-2xl font-bold text-lg inline-flex items-center gap-3 transition-all duration-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FFCF01]/20 cursor-pointer"
          >
            Check Availability
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* FOOTER - Premium Navy */}
      <footer className="bg-[#001233] text-white/80 py-16 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FFCF01] to-[#FFD84D] rounded-xl flex items-center justify-center shadow-lg shadow-[#FFCF01]/20">
              <Star className="w-5 h-5 text-[#002B5C]" fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-white tracking-tight">NAVY LODGE</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#FFCF01] mt-0.5 font-semibold">by NEXCOM Hospitality Group</span>
            </div>
          </div>
          <p className="text-white/50 text-sm">© {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/" className="text-white/60 hover:text-[#FFCF01] transition-colors text-sm font-medium">Privacy</Link>
            <Link href="/" className="text-white/60 hover:text-[#FFCF01] transition-colors text-sm font-medium">Terms</Link>
            <Link href="/" className="text-white/60 hover:text-[#FFCF01] transition-colors text-sm font-medium">Accessibility</Link>
          </div>
        </div>
      </footer>

      {/* Custom CSS Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes connectorFill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .connector-fill {
          animation: connectorFill 1.5s ease-out forwards;
          animation-delay: 0.5s;
        }
        
        .stagger-2 {
          animation-delay: 0.1s;
        }
        
        .stagger-3 {
          animation-delay: 0.2s;
        }
        
        .stagger-4 {
          animation-delay: 0.3s;
        }
        
        .card-floating {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-editorial {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .parallax-image {
          transition: transform 0.1s ease-out;
        }
        
        .stat-counter {
          opacity: 0;
        }
        
        .stat-counter.animate {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        /* Glassmorphism effect */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* Scroll-triggered animations */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
