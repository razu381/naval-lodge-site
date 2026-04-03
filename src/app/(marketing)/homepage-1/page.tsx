'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MapPin, Users, Shield, Star, Menu, X,
  ArrowRight, Award, Globe, Wallet, Clock, CheckCircle2,
} from 'lucide-react';
import SearchModal from '@/components/shared/SearchModal';
import DatePicker from '@/components/shared/DatePicker';

/* ── Data ─────────────────────────────────────────── */
const DUMMY_LOCATIONS = [
  'Naval Base San Diego, CA',
  'Pearl Harbor-Hickam, HI',
  'Oceana / Dam Neck, VA',
  'Naval Air Station Jacksonville, FL',
  'Naval Station Newport, RI',
  'Naval Base Kitsap, WA',
  'Naval Station Norfolk, VA',
  'Naval Air Station Corpus Christi, TX',
];

const LOCATIONS = [
  {
    id: 1, name: 'Naval Base San Diego', location: 'California, USA',
    price: 79, rating: 4.9, badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2, name: 'Pearl Harbor-Hickam', location: 'Hawaii, USA',
    price: 95, rating: 4.8,
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3, name: 'Oceana / Dam Neck', location: 'Virginia, USA',
    price: 72, rating: 4.7,
    image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4, name: 'Naval Station Norfolk', location: 'Virginia, USA',
    price: 68, rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

const STATS = [
  { value: '200+', label: 'Global Locations', icon: Globe },
  { value: '50%', label: 'Less Than Hotels', icon: Wallet },
  { value: '4.9', label: 'Average Rating', icon: Star },
  { value: '500K+', label: 'Happy Families', icon: Award },
];

const NAV_VERSIONS = ['v1', 'v2', 'v3', 'v4'];
const NAV_LINKS = ['Locations', 'Offers', 'About'];

/* ── Component ────────────────────────────────────── */
export default function Homepage1() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [guests, setGuests] = useState('1 Room, 2 Adults');
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);

  // Initialize dates (today and tomorrow) like homepage 2
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    setCheckInDate((prev) => prev || today);
    setCheckOutDate((prev) => prev || tomorrow);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search - navigate directly to results page with accordion pattern
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedLocation && selectedLocation !== '') params.set('location', selectedLocation);
    if (checkInDate) params.set('checkIn', checkInDate.toISOString());
    if (checkOutDate) params.set('checkOut', checkOutDate.toISOString());
    params.set('pattern', 'accordion'); // Default to accordion pattern

    const queryString = params.toString();
    router.push(`/search-results${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <div className="min-h-screen bg-sand-50 font-sans text-ocean-900">

      {/* ── NAVIGATION ────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#002B5C]/95 backdrop-blur-xl shadow-sm py-3' : 'bg-[#002B5C] py-5'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-[#FFCF01] to-[#FFD84D] rounded-xl flex items-center justify-center shadow-lg shadow-[#FFCF01]/25 group-hover:scale-105 transition-all duration-300">
                <Star className="w-5 h-5 text-[#002B5C]" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-semibold text-xl tracking-tight leading-none text-white">NAVY LODGE</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#FFCF01] mt-0.5 font-medium">by NEXCOM Hospitality Group</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_VERSIONS.map((v, i) => (
                <Link
                  key={v}
                  href={`/homepage-${i + 1}`}
                  className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${i === 0
                      ? 'text-[#FFCF01] bg-white/10'
                      : 'text-white hover:text-[#FFCF01] hover:bg-white/10'
                    }`}
                >
                  Home {v}
                </Link>
              ))}
              <div className="h-5 w-px bg-white/20 mx-2" />
              {NAV_LINKS.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 px-4 py-2 rounded-lg transition-all"
                >
                  {item}
                </Link>
              ))}
              <button className="ml-3 bg-[#FFCF01] hover:bg-[#FFD84D] text-[#002B5C] text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-[#FFCF01]/20">
                Book Now
              </button>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-white">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#002B5C] px-4 pt-2 pb-4 space-y-1 shadow-xl border-t border-white/10">
            {NAV_VERSIONS.map((v, i) => (
              <Link key={v} href={`/homepage-${i + 1}`} onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-medium ${i === 0
                  ? 'text-[#FFCF01] bg-white/10'
                  : 'text-white hover:text-[#FFCF01] hover:bg-white/10'
                } rounded-md`}>Home {v}</Link>
            ))}
            <div className="border-t border-white/20 my-2" />
            {NAV_LINKS.map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 rounded-md">{item}</Link>
            ))}
          </div>
        )}
      </nav>

      {/* ── BOOKING WIDGET ────────────────────────── */}
      <div className="sticky top-0 z-40 pt-20">
        <div className="bg-white shadow-lg shadow-ocean-900/5 border-b border-ocean-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
              {/* Location */}
              <div className="flex-1 flex items-center gap-3 bg-sand-50 hover:bg-ocean-50 border border-ocean-200 focus-within:border-teal-accent focus-within:ring-2 focus-within:ring-teal-accent/10 rounded-xl px-4 py-3 transition-all">
                <MapPin className="h-5 w-5 text-ocean-400 shrink-0" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="flex-1 bg-transparent border-0 outline-none text-ocean-900 font-medium cursor-pointer appearance-none text-sm"
                >
                  <option value="">Select destination</option>
                  {DUMMY_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Date Picker */}
              <div className="flex-1 min-w-[300px]">
                <DatePicker checkIn={checkInDate} checkOut={checkOutDate} onCheckInChange={setCheckInDate} onCheckOutChange={setCheckOutDate} />
              </div>

              {/* Guests */}
              <div className="flex-1 flex items-center gap-3 bg-sand-50 hover:bg-ocean-50 border border-ocean-200 focus-within:border-teal-accent focus-within:ring-2 focus-within:ring-teal-accent/10 rounded-xl px-4 py-3 transition-all">
                <Users className="h-5 w-5 text-ocean-400 shrink-0" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="flex-1 bg-transparent border-0 outline-none text-ocean-900 font-medium cursor-pointer appearance-none text-sm"
                >
                  <option>1 Room, 2 Adults</option>
                  <option>1 Room, 1 Adult</option>
                  <option>2 Rooms, 4 Adults</option>
                  <option>More Options...</option>
                </select>
              </div>

              <button onClick={handleSearch} className="btn-primary cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap">
                <span>Search</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ──────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-ocean-950">
        {/* Background Image */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Luxury military lodging beachfront"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-950 via-ocean-950/80 to-ocean-950/40" />
        </div>

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

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 pt-4 animate-slide-up stagger-3">
                {STATS.slice(0, 3).map((stat, idx) => (
                  <div key={idx}>
                    <div className="flex items-baseline gap-2">
                      <stat.icon className="w-5 h-5 text-teal-accent" />
                      <span className="text-3xl font-display font-semibold text-white">{stat.value}</span>
                    </div>
                    <span className="text-sm text-ocean-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – Floating preview card */}
            <div className="hidden lg:block relative animate-scale-in stagger-4">
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-teal-accent/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-coral-accent/10 rounded-full blur-3xl" />
              <div className="card-floating p-6 max-w-sm mx-auto bg-ocean-900/80 backdrop-blur-xl border border-ocean-700/50">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Premium suite at Naval Station Norfolk"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl text-white">San Diego Lodge</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-amber-400" />
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
      </section>

      {/* ── TRUST BADGES ─────────────────────────── */}
      <section className="bg-sand-50 py-12 border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between gap-8">
            {[
              { icon: Shield, text: 'Secure Base Access' },
              { icon: MapPin, text: '200+ Global Locations' },
              { icon: Wallet, text: 'Tax-Free Rates' },
              { icon: Clock, text: '24/7 Support' },
              { icon: Award, text: 'Military Excellence' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-ocean-600">
                <div className="w-10 h-10 bg-teal-accent/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-teal-accent" />
                </div>
                <span className="font-medium text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED LOCATIONS ───────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="label-mono mb-3 block">Featured Locations</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-ocean-900 mb-4">
              Where Will Duty Take You?
            </h2>
            <p className="text-ocean-500 text-lg max-w-2xl mx-auto">
              From Pacific shores to Atlantic coasts, we have a lodge near every base.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCATIONS.map((loc) => (
              <div key={loc.id} className="card-editorial group cursor-pointer overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  {loc.badge && (
                    <div className="absolute top-3 left-3 z-10 bg-teal-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {loc.badge}
                    </div>
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-heading text-lg text-ocean-900">{loc.name}</h3>
                    <div className="flex items-center gap-1 text-teal-accent font-semibold text-sm shrink-0 ml-2">
                      <Star className="w-4 h-4 fill-current" /> {loc.rating}
                    </div>
                  </div>
                  <p className="text-ocean-500 text-sm mb-4 flex items-center gap-1">
                    <MapPin className="w-4 h-4 shrink-0" /> {loc.location}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-ocean-100">
                    <div>
                      <span className="text-2xl font-display font-bold text-ocean-900">${loc.price}</span>
                      <span className="text-ocean-400 text-sm">/night</span>
                    </div>
                    <button className="px-4 py-2 bg-ocean-900 text-white text-sm font-semibold rounded-xl hover:bg-teal-accent transition-colors cursor-pointer">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAMILY SUITES SECTION ────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Spacious family suite"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stat badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-ocean-100">
                <div className="text-3xl font-display font-bold text-ocean-900">500K+</div>
                <div className="text-sm text-ocean-500 mt-1">Families Served Annually</div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="label-mono mb-4 block">Built for Families</span>
              <h2 className="font-display text-4xl md:text-5xl font-medium text-ocean-900 mb-6 leading-tight">
                More Than a Room — <span className="text-teal-accent italic">A Home Away</span>
              </h2>
              <p className="text-ocean-600 text-lg mb-4 leading-relaxed">
                Navy Lodge understands military life. Our accommodations are built around the unique needs of service members and their families on the move.
              </p>
              <p className="text-ocean-600 text-lg mb-8 leading-relaxed">
                Enjoy spacious family suites, fully equipped kitchens, and complimentary breakfasts at select locations—with the peace of mind that comes from staying on base.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {['Spacious Suites', 'Kitchens Included', 'On-Site Parking', 'Pet-Friendly'].map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-ocean-700">
                    <CheckCircle2 className="w-5 h-5 text-teal-accent shrink-0" />
                    <span className="font-medium text-sm">{amenity}</span>
                  </div>
                ))}
              </div>

              <button className="btn-secondary cursor-pointer inline-flex items-center gap-2">
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION – Glass Cards ──────── */}
      <section className="py-24 px-4 bg-ocean-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="label-mono mb-3 block">Why Choose Us</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-ocean-900 mb-4">
              The Navy Lodge Difference
            </h2>
            <p className="text-ocean-500 text-lg max-w-2xl mx-auto">
              Premium amenities and dedicated service tailored specifically for the military community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Safe & Secure', desc: 'Gated communities on military installations with 24/7 security.' },
              { icon: Users, title: 'Family Designed', desc: 'Spacious rooms, pet-friendly options, and family amenities.' },
              { icon: Wallet, title: 'Incredible Value', desc: 'Premium accommodations at affordable, tax-free rates.' },
              { icon: Clock, title: 'Easy Booking', desc: 'Streamlined online reservations or 24/7 customer support.' },
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

      {/* ── CTA SECTION ──────────────────────────── */}
      <section className="relative py-32 px-4 overflow-hidden bg-ocean-900">
        <div className="absolute inset-0 pattern-grid opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">
            Ready to Book Your Stay?
          </h2>
          <p className="text-ocean-300 text-lg md:text-xl mb-10 leading-relaxed">
            Join hundreds of thousands of military families who trust Navy Lodge by NEXCOM Hospitality Group for their travel and relocation needs.
          </p>
          <button onClick={handleSearch} className="btn-primary cursor-pointer inline-flex items-center gap-3 text-lg px-10 py-5">
            Check Availability
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="bg-ocean-950 text-ocean-400 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-ocean-800 pb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-accent to-teal-light rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">NAVY LODGE</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Award-winning hospitality. High-quality accommodations at the best value worldwide for military members and their families.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Reservations</h4>
            <ul className="space-y-3 text-sm">
              {['Book a Room', 'Modify/Cancel', 'Special Offers', 'Group Bookings'].map((item) => (
                <li key={item}><a href="#" className="hover:text-teal-accent transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">About Us</h4>
            <ul className="space-y-3 text-sm">
              {['Our Story', 'Locations', 'Careers', 'NEXCOM Hospitality Group'].map((item) => (
                <li key={item}><a href="#" className="hover:text-teal-accent transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-ocean-500 shrink-0" />
                <span>3280 Virginia Beach Blvd.<br />Virginia Beach, VA 23452</span>
              </li>
              <li className="text-teal-accent font-medium">1-800-NAVY-INN</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ocean-400">
          <p>© {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Accessibility'].map((item) => (
              <a key={item} href="#" className="hover:text-teal-accent transition-colors">{item}</a>
            ))}
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
