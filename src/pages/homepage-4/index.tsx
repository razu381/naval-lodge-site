import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Users,
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
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DatePicker from '../../DatePicker';
import SearchModal from '../../SearchModal';

export default function Homepage4() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showStickyForm, setShowStickyForm] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  useEffect(() => {
    if (!checkInDate) setCheckInDate(today);
    if (!checkOutDate) setCheckOutDate(tomorrow);
    const handleScroll = () => {
      setShowStickyForm(window.scrollY > window.innerHeight * 1);
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
    'Naval Air Station Corpus Christi, TX',
  ];

  const locations = [
    {
      id: 1,
      name: 'Naval Base San Diego',
      location: 'California, USA',
      price: 79,
      rating: 4.9,
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      badge: 'Most Popular',
    },
    {
      id: 2,
      name: 'Pearl Harbor-Hickam',
      location: 'Hawaii, USA',
      price: 95,
      rating: 4.8,
      image:
        'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      name: 'Oceana / Dam Neck',
      location: 'Virginia, USA',
      price: 72,
      rating: 4.7,
      image:
        'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      name: 'Naval Station Norfolk',
      location: 'Virginia, USA',
      price: 68,
      rating: 4.8,
      image:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ];

  const features = [
    {
      num: '01',
      icon: Shield,
      title: 'Safe & Secure',
      desc: 'Gated communities on military installations with 24/7 security patrols — no exceptions.',
      stat: '100% Verified',
    },
    {
      num: '02',
      icon: Users,
      title: 'Designed for Families',
      desc: 'Spacious suites, pet-friendly options, and family amenities built around military life.',
      stat: '500K+ Families',
    },
    {
      num: '03',
      icon: Wallet,
      title: 'Tax-Free Savings',
      desc: 'Premium accommodations at rates up to 50% below commercial hotels, tax-free.',
      stat: '50% Less',
    },
    {
      num: '04',
      icon: Clock,
      title: 'Always Available',
      desc: 'Streamlined online booking with 24/7 customer support whenever you need us.',
      stat: '24/7 Support',
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-ocean-900">

      {/* ── FIXED NAVIGATION ─────────────────────────────────────── */}
      <nav className="relative w-full bg-white border-b border-ocean-100 py-4 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 bg-teal-accent rounded-lg flex items-center justify-center shadow-md shadow-teal-accent/30">
                <Star className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <div>
                <span className="font-display font-bold text-lg tracking-tight leading-none text-ocean-900">
                  NAVY LODGE
                </span>
                <span className="block text-[9px] tracking-[0.25em] uppercase text-teal-accent font-semibold mt-0.5">
                  By Nexcom
                </span>
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/homepage-1"
                className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all"
              >
                Home v1
              </Link>
              <Link
                to="/homepage-2"
                className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all"
              >
                Home v2
              </Link>
              <Link
                to="/homepage-3"
                className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all"
              >
                Home v3
              </Link>
              <Link
                to="/homepage-4"
                className="text-sm font-medium px-4 py-2 rounded-lg text-teal-accent"
              >
                Home v4
              </Link>

              <div className="h-4 w-px bg-ocean-200 mx-2" />

              {['Locations', 'Offers', 'About'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all"
                >
                  {item}
                </Link>
              ))}

              <button className="ml-3 bg-teal-accent hover:bg-teal-accent/90 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-sm shadow-teal-accent/20">
                Book Now
              </button>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 transition-colors text-ocean-900"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white px-4 pt-3 pb-5 space-y-1 shadow-xl border-t border-ocean-100">
            {['Home v1', 'Home v2', 'Home v3', 'Home v4'].map((item, i) => (
              <Link
                key={item}
                to={`/homepage-${i + 1}`}
                className={`block px-3 py-2.5 text-sm font-medium rounded-lg ${
                  i === 3
                    ? 'text-teal-accent bg-teal-accent/5'
                    : 'text-ocean-600 hover:bg-ocean-50'
                }`}
              >
                {item}
              </Link>
            ))}
            <div className="border-t border-ocean-100 my-2" />
            {['Locations', 'Offers', 'About'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="block px-3 py-2.5 text-sm font-medium text-ocean-600 hover:bg-ocean-50 rounded-lg"
              >
                {item}
              </Link>
            ))}
            <div className="pt-2">
              <button className="w-full bg-teal-accent text-white text-sm font-semibold px-4 py-3 rounded-lg">
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── STICKY SEARCH BAR ─────────────────────────────────────── */}
      {/*
        Slides down from above the viewport when the user scrolls past the hero
        (showStickyForm = true). Uses the same fields as the hero search form.
        z-50 keeps it above all page content. The nav sits at relative position
        so the sticky bar overlays on top of it cleanly when visible.
      */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-ocean-100 shadow-lg shadow-ocean-900/8 transition-transform duration-300 ease-in-out ${
          showStickyForm ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row items-center gap-2">

            {/* Location */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-ocean-50 hover:bg-ocean-100/70 rounded-xl transition-colors border border-ocean-100">
              <MapPin className="h-4 w-4 text-teal-accent shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-none text-ocean-900 font-medium text-sm cursor-pointer appearance-none"
              >
                <option value="">Select destination</option>
                {dummyLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden md:block w-px bg-ocean-200 self-stretch my-1" />

            {/* Date picker */}
            <div className="flex-1 border border-ocean-100 rounded-xl overflow-hidden">
              <DatePicker
                checkIn={checkInDate}
                checkOut={checkOutDate}
                onCheckInChange={setCheckInDate}
                onCheckOutChange={setCheckOutDate}
              />
            </div>

            <div className="hidden md:block w-px bg-ocean-200 self-stretch my-1" />

            {/* Guests */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-ocean-50 hover:bg-ocean-100/70 rounded-xl transition-colors border border-ocean-100">
              <Users className="h-4 w-4 text-teal-accent shrink-0" />
              <select className="flex-1 bg-transparent border-0 outline-none text-ocean-900 font-medium text-sm cursor-pointer appearance-none">
                <option>1 Room, 2 Adults</option>
                <option>1 Room, 1 Adult</option>
                <option>2 Rooms, 4 Adults</option>
                <option>More Options…</option>
              </select>
            </div>

            {/* Search button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="bg-teal-accent hover:bg-teal-accent/90 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md shadow-teal-accent/25"
            >
              Search <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── HERO — CINEMATIC FULL VIEWPORT ───────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="./beach.jpg"
            alt="Navy Lodge — premium military lodging"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/85 via-ocean-950/60 to-ocean-950/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/40 via-transparent to-ocean-950/80" />
        </div>

        {/* Main hero content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-12">
          {/* Text content */}
          <div className="max-w-2xl mb-12">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-8">
              <Shield className="w-3.5 h-3.5 text-teal-accent" />
              Exclusive Military Lodging — Worldwide
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-white leading-[0.95] mb-6">
              <span className="block text-5xl sm:text-6xl lg:text-[5.5rem]">Comfort</span>
              <span className="block text-5xl sm:text-6xl lg:text-[5.5rem]">
                You Can{' '}
                <span className="text-teal-light italic font-medium">Trust.</span>
              </span>
            </h1>

            <p className="text-white/65 text-lg md:text-xl max-w-lg leading-relaxed">
              Premium lodging exclusively for those who serve — wherever duty takes you.
            </p>
          </div>

          {/* ── SEARCH BAR EMBEDDED IN HERO ── */}
          <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-ocean-950/40 p-2 flex flex-col md:flex-row gap-2">
            {/* Location */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-ocean-50/50 rounded-xl transition-colors">
              <MapPin className="h-4 w-4 text-teal-accent shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-none text-ocean-900 font-medium text-sm cursor-pointer appearance-none"
              >
                <option value="">Select destination</option>
                {dummyLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden md:block w-px bg-ocean-100 my-2" />

            {/* Date picker */}
            <div className="flex-1">
              <DatePicker
                checkIn={checkInDate}
                checkOut={checkOutDate}
                onCheckInChange={setCheckInDate}
                onCheckOutChange={setCheckOutDate}
              />
            </div>

            <div className="hidden md:block w-px bg-ocean-100 my-2" />

            {/* Guests */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-ocean-50/50 rounded-xl transition-colors">
              <Users className="h-4 w-4 text-teal-accent shrink-0" />
              <select className="flex-1 bg-transparent border-0 outline-none text-ocean-900 font-medium text-sm cursor-pointer appearance-none">
                <option>1 Room, 2 Adults</option>
                <option>1 Room, 1 Adult</option>
                <option>2 Rooms, 4 Adults</option>
                <option>More Options…</option>
              </select>
            </div>

            {/* Search button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="bg-teal-accent hover:bg-teal-accent/90 text-white font-semibold px-7 py-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md shadow-teal-accent/30"
            >
              Search <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── STATS BAR — anchored at bottom of hero ── */}
        <div className="relative z-1 border-t border-white/10 bg-ocean-950/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
              {[
                { value: '200+', label: 'Global Locations', icon: Globe },
                { value: '50%', label: 'Less Than Hotels', icon: Wallet },
                { value: '4.9★', label: 'Average Rating', icon: Star },
                { value: '500K+', label: 'Happy Families', icon: Award },
              ].map((stat, i) => (
                <div key={i} className="text-center md:px-8 first:pl-0 last:pr-0">
                  <div className="text-2xl md:text-3xl font-display font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/45 mt-1 tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED LOCATIONS — ASYMMETRIC MAGAZINE GRID ─────────── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-teal-accent" />
                <span className="text-teal-accent text-[10px] font-bold tracking-[0.25em] uppercase">
                  Featured
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ocean-900 tracking-tight">
                Top Destinations
              </h2>
              <p className="text-ocean-400 mt-3 text-base">
                Our most sought-after lodges across the globe.
              </p>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 text-ocean-500 hover:text-ocean-900 font-medium text-sm transition-colors group shrink-0"
            >
              View all 200+ locations
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-5">
            {/* Featured large card (left column, full height) */}
            <div
              className="md:col-span-1 md:row-span-2 group cursor-pointer relative overflow-hidden rounded-2xl"
              style={{ minHeight: 500 }}
            >
              <img
                src={locations[0].image}
                alt={locations[0].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/20 to-transparent" />

              {locations[0].badge && (
                <div className="absolute top-5 left-5 bg-teal-accent text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  {locations[0].badge}
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/50 text-xs tracking-wide">
                    {locations[0].location}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    <span className="text-white text-sm font-semibold">
                      {locations[0].rating}
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  {locations[0].name}
                </h3>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-display font-bold text-white">
                      ${locations[0].price}
                    </span>
                    <span className="text-white/40 text-sm ml-1">/night</span>
                  </div>
                  <button className="bg-white text-ocean-900 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-teal-accent hover:text-white transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary cards (right 2 columns, 2 rows) */}
            {locations.slice(1).map((loc) => (
              <div
                key={loc.id}
                className="group cursor-pointer relative overflow-hidden rounded-2xl"
                style={{ height: 230 }}
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/90 via-ocean-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/50 text-[11px] tracking-wide">
                      {loc.location}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-white text-xs font-semibold">{loc.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <h3 className="font-display text-lg font-bold text-white">{loc.name}</h3>
                    <div className="text-right">
                      <span className="text-xl font-display font-bold text-white">${loc.price}</span>
                      <span className="text-white/40 text-xs ml-1">/night</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ─────────────────────────────────────────────── */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-ocean-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            {/* Text side */}
            <div className="lg:w-[48%] p-10 lg:p-14 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-teal-accent/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-teal-accent/15 border border-teal-accent/25 text-teal-light px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                  Limited Offer
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 leading-[1.05]">
                  Save up to{' '}
                  <span className="text-teal-light">15%</span>
                  <br />
                  on Extended Stays
                </h2>
                <p className="text-ocean-300 text-base mb-8 leading-relaxed max-w-sm">
                  On PCS orders or family vacation? Enjoy exclusive savings
                  when you book 7 nights or more at any Navy Lodge worldwide.
                </p>
                <ul className="space-y-3 mb-10">
                  {[
                    'Complimentary breakfast daily',
                    'Free parking included',
                    'Flexible cancellation policy',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-ocean-200 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-teal-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="bg-teal-accent hover:bg-teal-accent/90 text-white font-semibold px-8 py-4 rounded-xl inline-flex items-center gap-2 transition-all shadow-lg shadow-teal-accent/20 cursor-pointer">
                  View Offer Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Image side */}
            <div className="lg:w-[52%] relative min-h-[320px] lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Luxury pool"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES — EDITORIAL NUMBERED LIST ───────────────────── */}
      <section className="py-24 px-4 bg-sand-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Sticky label + heading */}
            <div className="md:sticky md:top-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-teal-accent" />
                <span className="text-teal-accent text-[10px] font-bold tracking-[0.25em] uppercase">
                  Why Us
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ocean-900 leading-[1.05]">
                The Navy Lodge
                <br />
                <span className="text-ocean-300">Difference.</span>
              </h2>
              <p className="text-ocean-500 mt-5 text-base leading-relaxed max-w-sm">
                Built specifically for military members and their families —
                not adapted from a commercial hotel chain.
              </p>
            </div>

            {/* Numbered editorial list */}
            <div className="divide-y divide-ocean-150">
              {features.map((f) => (
                <div key={f.num} className="group py-9 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-5">
                    <span className="font-display text-6xl font-bold text-ocean-100 group-hover:text-teal-accent/15 transition-colors leading-none shrink-0 select-none">
                      {f.num}
                    </span>
                    <div className="flex-1 pt-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-display text-xl font-bold text-ocean-900">
                          {f.title}
                        </h3>
                        <span className="shrink-0 text-[10px] font-bold text-teal-accent bg-teal-accent/10 px-3 py-1.5 rounded-full tracking-wide">
                          {f.stat}
                        </span>
                      </div>
                      <p className="text-ocean-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT — EDITORIAL SPLIT ──────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-teal-accent" />
                <span className="text-teal-accent text-[10px] font-bold tracking-[0.25em] uppercase">
                  Our Story
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ocean-900 mb-6 leading-[1.05]">
                Your Home,<br />
                Away from{' '}
                <span className="text-teal-accent italic font-medium">Home.</span>
              </h2>
              <p className="text-ocean-600 text-lg mb-5 leading-relaxed">
                We understand the unique lifestyle of military families. Navy
                Lodges are designed to provide comfortable, welcoming, and secure
                environments — whether you're on PCS orders or taking a
                well-deserved break.
              </p>
              <p className="text-ocean-500 mb-8 leading-relaxed">
                Spacious family suites, fully equipped kitchens, and
                complimentary breakfasts at select locations — all with the
                peace of mind that comes from staying on base.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {['Spacious Suites', 'Full Kitchens', 'Free Parking', 'Pet-Friendly'].map(
                  (a) => (
                    <div key={a} className="flex items-center gap-2 text-ocean-700 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-teal-accent shrink-0" />
                      {a}
                    </div>
                  )
                )}
              </div>
              <button className="btn-secondary cursor-pointer inline-flex items-center gap-2">
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Image + stat callout */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Military family"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-ocean-900 text-white p-7 rounded-2xl shadow-xl hidden md:block">
                <div className="text-4xl font-display font-bold text-teal-accent leading-none">
                  500K+
                </div>
                <div className="text-xs text-ocean-300 mt-2 leading-relaxed max-w-[120px]">
                  Families served worldwide
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="relative py-36 px-4 overflow-hidden bg-ocean-950">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-ocean-950/60" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-10 bg-teal-accent" />
            <span className="text-teal-accent text-[10px] font-bold tracking-[0.25em] uppercase">
              Get Started
            </span>
            <div className="h-px w-10 bg-teal-accent" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.0]">
            Ready to Book<br />Your Stay?
          </h2>
          <p className="text-ocean-300 text-lg mb-10 leading-relaxed">
            Join hundreds of thousands of military families who trust Navy Lodge
            for their travel and relocation needs.
          </p>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="bg-teal-accent hover:bg-teal-accent/90 text-white font-semibold px-10 py-5 rounded-xl inline-flex items-center gap-3 text-base transition-all shadow-xl shadow-teal-accent/20 cursor-pointer"
          >
            Check Availability
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="bg-ocean-950 text-ocean-400 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-ocean-800 pb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-teal-accent rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                NAVY LODGE
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Premium, affordable, and secure lodging for military members and
              their families worldwide.
            </p>
            <div className="flex gap-2.5">
              {[
                { label: 'Facebook', initial: 'f' },
                { label: 'Twitter / X', initial: '𝕏' },
                { label: 'Instagram', initial: 'in' },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-ocean-800 hover:bg-teal-accent flex items-center justify-center text-ocean-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  {s.initial}
                </button>
              ))}
            </div>
          </div>

          {/* Reservations */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs tracking-widest uppercase">
              Reservations
            </h4>
            <ul className="space-y-3 text-sm">
              {['Book a Room', 'Modify / Cancel', 'Special Offers', 'Group Bookings'].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-teal-accent transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs tracking-widest uppercase">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {['Our Story', 'Locations', 'Careers', 'NEXCOM'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-teal-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs tracking-widest uppercase">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-ocean-500 shrink-0 mt-0.5" />
                <span>
                  3280 Virginia Beach Blvd.
                  <br />
                  Virginia Beach, VA 23452
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-4 h-4 shrink-0 text-ocean-500 text-center text-xs">☎</span>
                <span>1-800-NAVY-INN</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ocean-500">
          <p>
            &copy; {new Date().getFullYear()} Navy Exchange Service Command. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Accessibility'].map((item) => (
              <a key={item} href="#" className="hover:text-teal-accent transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Search modal */}
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