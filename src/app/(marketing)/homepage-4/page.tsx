'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
import DatePicker from '@/components/shared/DatePicker';

export default function Homepage4() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showStickyForm, setShowStickyForm] = useState(false);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    setCheckInDate((prev) => prev || today);
    setCheckOutDate((prev) => prev || tomorrow);

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
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
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
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/homepage-1"
                className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all"
              >
                Home v1
              </Link>
              <Link
                href="/homepage-2"
                className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all"
              >
                Home v2
              </Link>
              <Link
                href="/homepage-3"
                className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all"
              >
                Home v3
              </Link>
              <Link
                href="/homepage-4"
                className="text-sm font-medium px-4 py-2 rounded-lg text-teal-accent"
              >
                Home v4
              </Link>

              <div className="h-4 w-px bg-ocean-200 mx-2" />

              {['Locations', 'Offers', 'About'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all"
                >
                  {item}
                </Link>
              ))}

              <button className="ml-3 bg-teal-accent hover:bg-teal-accent/90 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-sm shadow-teal-accent/20 cursor-pointer">
                Book Now
              </button>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 transition-colors text-ocean-900 cursor-pointer"
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
          <div className="md:hidden bg-white px-4 pt-3 pb-5 space-y-1 shadow-xl border-t border-ocean-100 animate-fade-in relative z-50">
            {['Home v1', 'Home v2', 'Home v3', 'Home v4'].map((item, i) => (
              <Link
                key={item}
                href={`/homepage-${i + 1}`}
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
                href={`/${item.toLowerCase()}`}
                className="block px-3 py-2.5 text-sm font-medium text-ocean-600 hover:bg-ocean-50 rounded-lg"
              >
                {item}
              </Link>
            ))}
            <div className="pt-2">
              <button className="w-full bg-teal-accent text-white text-sm font-semibold px-4 py-3 rounded-lg cursor-pointer">
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── STICKY SEARCH BAR ─────────────────────────────────────── */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-ocean-100 shadow-lg shadow-ocean-900/5 transition-transform duration-300 ease-in-out ${
          showStickyForm ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row items-center gap-2">

            {/* Location */}
            <div className="flex-1 flex w-full items-center gap-3 px-4 py-2.5 bg-ocean-50 hover:bg-ocean-100/70 rounded-xl transition-colors border border-ocean-100">
              <MapPin className="h-4 w-4 text-teal-accent shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-none text-ocean-900 font-medium text-sm cursor-pointer appearance-none truncate"
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
            <div className="flex-[1.2] w-full border border-ocean-100 rounded-xl overflow-hidden min-w-[280px]">
              <DatePicker
                checkIn={checkInDate}
                checkOut={checkOutDate}
                onCheckInChange={setCheckInDate}
                onCheckOutChange={setCheckOutDate}
              />
            </div>

            <div className="hidden md:block w-px bg-ocean-200 self-stretch my-1" />

            {/* Guests */}
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2.5 bg-ocean-50 hover:bg-ocean-100/70 rounded-xl transition-colors border border-ocean-100">
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
              className="w-full md:w-auto mt-2 md:mt-0 bg-teal-accent hover:bg-teal-accent/90 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md shadow-teal-accent/25 cursor-pointer"
            >
              Search <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── HERO — CINEMATIC FULL VIEWPORT ───────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Navy Lodge — premium military lodging"
            className="w-full h-full object-cover grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/90 via-ocean-950/60 to-ocean-950/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/40 via-transparent to-ocean-950/90" />
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
          <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl shadow-ocean-950/40 p-2 flex flex-col md:flex-row gap-2 max-w-5xl">
            {/* Location */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-ocean-50/50 rounded-2xl transition-colors">
              <MapPin className="h-5 w-5 text-teal-accent shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-none text-ocean-900 font-medium text-sm md:text-base cursor-pointer appearance-none truncate"
              >
                <option value="">Select destination</option>
                {dummyLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden md:block w-px bg-ocean-100 my-3" />

            {/* Date picker */}
            <div className="flex-[1.2] flex-shrink-0 min-w-[280px]">
              <DatePicker
                checkIn={checkInDate}
                checkOut={checkOutDate}
                onCheckInChange={setCheckInDate}
                onCheckOutChange={setCheckOutDate}
              />
            </div>

            <div className="hidden md:block w-px bg-ocean-100 my-3" />

            {/* Guests */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 hover:bg-ocean-50/50 rounded-2xl transition-colors">
              <Users className="h-5 w-5 text-teal-accent shrink-0" />
              <select className="flex-1 bg-transparent border-0 outline-none text-ocean-900 font-medium text-sm md:text-base cursor-pointer appearance-none">
                <option>1 Room, 2 Adults</option>
                <option>1 Room, 1 Adult</option>
                <option>2 Rooms, 4 Adults</option>
                <option>More Options…</option>
              </select>
            </div>

            {/* Search button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="bg-teal-accent hover:bg-teal-accent/90 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-teal-accent/30 cursor-pointer"
            >
              Search <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── STATS BAR — anchored at bottom of hero ── */}
        <div className="relative z-10 border-t border-white/10 bg-ocean-950/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
              {[
                { value: '200+', label: 'Global Locations', icon: Globe },
                { value: '50%', label: 'Less Than Hotels', icon: Wallet },
                { value: '4.9★', label: 'Average Rating', icon: Star },
                { value: '500K+', label: 'Happy Families', icon: Award },
              ].map((stat, i) => (
                <div key={i} className="text-center md:px-8 first:pl-0 last:pr-0">
                  <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs text-white/50 tracking-widest uppercase font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED LOCATIONS — ASYMMETRIC MAGAZINE GRID ─────────── */}
      <section className="py-24 px-4 bg-sand-50">
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
              <p className="text-ocean-500 mt-3 text-lg max-w-lg">
                Our most sought-after lodges across the globe, designed to offer premium comfort.
              </p>
            </div>
            <Link
              href="/locations"
              className="flex items-center gap-2 text-ocean-600 hover:text-teal-accent font-semibold text-sm transition-colors group shrink-0"
            >
              View all 200+ locations
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-[18px]">
            {/* Featured large card (left column, full height) */}
            <div
              className="md:col-span-1 md:row-span-2 group cursor-pointer relative overflow-hidden rounded-3xl"
              style={{ minHeight: 520 }}
            >
              <img
                src={locations[0].image}
                alt={locations[0].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/30 to-transparent" />

              {locations[0].badge && (
                <div className="absolute top-6 left-6 bg-teal-accent text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg">
                  {locations[0].badge}
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/60 text-xs tracking-wider uppercase font-semibold">
                    {locations[0].location}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    <span className="text-white text-sm font-semibold">
                      {locations[0].rating}
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-3xl font-bold text-white mb-6 leading-tight">
                  {locations[0].name}
                </h3>
                <div className="flex items-end justify-between border-t border-white/10 pt-5 mt-5">
                  <div>
                    <span className="text-4xl font-display font-bold text-white">
                      ${locations[0].price}
                    </span>
                    <span className="text-white/40 text-sm ml-1 font-medium">/night</span>
                  </div>
                  <button className="bg-white text-ocean-900 text-sm font-bold px-6 py-3 rounded-xl hover:bg-teal-accent hover:text-white transition-colors shadow-lg cursor-pointer">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary cards (right 2 columns, 2 rows) */}
            {locations.slice(1).map((loc) => (
              <div
                key={loc.id}
                className="group cursor-pointer relative overflow-hidden rounded-3xl"
                style={{ height: 250 }}
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/90 via-ocean-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 justify-between mb-2">
                    <span className="text-white/60 text-[10px] tracking-wider uppercase font-semibold truncate">
                      {loc.location}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-white text-xs font-semibold">{loc.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <h3 className="font-display text-xl font-bold text-white truncate pr-4">{loc.name}</h3>
                    <div className="text-right shrink-0">
                      <span className="text-2xl font-display font-bold text-white">${loc.price}</span>
                      <span className="text-white/50 text-[10px] ml-0.5 font-medium">/nt</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-ocean-950 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] opacity-[0.03] bg-cover pointer-events-none"></div>
            
            {/* Text side */}
            <div className="lg:w-[55%] p-10 md:p-16 lg:p-20 flex flex-col justify-center relative z-10">
              <div className="absolute -top-16 -right-16 w-80 h-80 bg-teal-accent/20 rounded-full blur-3xl pointer-events-none mix-blend-screen" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-teal-accent/10 border border-teal-light/20 text-teal-light px-5 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
                  <Award className="w-3.5 h-3.5" />
                  Limited Offer
                </div>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
                  Save up to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-light to-teal-accent">15%</span>
                  <br />
                  on Extended Stays
                </h2>
                <p className="text-ocean-300 text-lg mb-10 leading-relaxed max-w-md">
                  On PCS orders or family vacation? Enjoy exclusive savings
                  when you book 7 nights or more at any Navy Lodge worldwide.
                </p>
                <ul className="space-y-4 mb-12 border-t border-ocean-800/50 pt-8 max-w-sm">
                  {[
                    'Complimentary breakfast daily',
                    'Free parking included',
                    'Flexible cancellation policy',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-ocean-100 text-sm font-medium">
                      <CheckCircle2 className="w-5 h-5 text-teal-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="bg-teal-accent hover:bg-teal-light text-ocean-950 font-bold px-8 py-4 rounded-xl inline-flex items-center gap-2 transition-all shadow-lg shadow-teal-accent/20 cursor-pointer text-sm tracking-wide">
                  View Offer Details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Image side */}
            <div className="lg:w-[45%] relative min-h-[400px] lg:min-h-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Luxury pool"
                className="absolute inset-0 w-full h-full object-cover grayscale-[10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ocean-950 via-ocean-950/20 to-transparent lg:via-ocean-950/40" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES — EDITORIAL NUMBERED LIST ───────────────────── */}
      <section className="py-24 px-4 bg-white border-t border-ocean-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            {/* Sticky label + heading */}
            <div className="md:sticky md:top-32">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-12 bg-teal-accent" />
                <span className="text-teal-accent text-[10px] font-bold tracking-[0.25em] uppercase">
                  Why Us
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ocean-900 leading-[1.05] tracking-tight">
                The Navy Lodge
                <br />
                <span className="text-ocean-400">Difference.</span>
              </h2>
              <p className="text-ocean-600 mt-6 text-lg leading-relaxed max-w-sm">
                Built specifically for military members and their families —
                not adapted from a commercial hotel chain.
              </p>
            </div>

            {/* Numbered editorial list */}
            <div className="flex flex-col border-t border-ocean-100 mt-10 md:mt-0">
              {features.map((f) => (
                <div key={f.num} className="group py-10 border-b border-ocean-100 relative overflow-hidden">
                  {/* Subtle hover background effect */}
                  <div className="absolute inset-0 bg-ocean-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />
                  
                  <div className="flex items-start gap-6 relative z-10">
                    <span className="font-display text-5xl sm:text-6xl font-bold text-ocean-150 group-hover:text-teal-accent/20 transition-colors leading-[0.8] shrink-0 select-none">
                      {f.num}
                    </span>
                    <div className="flex-1 pt-1">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                        <h3 className="font-display text-2xl font-bold text-ocean-900">
                          {f.title}
                        </h3>
                        <span className="shrink-0 text-[9px] font-bold text-ocean-900 bg-ocean-100 px-3 py-1.5 rounded-full tracking-widest uppercase border border-ocean-200">
                          {f.stat}
                        </span>
                      </div>
                      <p className="text-ocean-500 text-base leading-relaxed max-w-sm">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT — EDITORIAL SPLIT ──────────────────────────────── */}
      <section className="py-24 px-4 bg-sand-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_0.85fr] gap-16 lg:gap-24 items-center">
            {/* Text */}
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-teal-accent" />
                <span className="text-teal-accent text-[10px] font-bold tracking-[0.25em] uppercase">
                  Our Story
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ocean-900 mb-8 leading-[1.05] tracking-tight">
                Your Home,
                <br />
                Away from{' '}
                <span className="text-teal-accent italic font-medium">Home.</span>
              </h2>
              <p className="text-ocean-600 text-lg mb-6 leading-relaxed">
                We understand the unique lifestyle of military families. Navy
                Lodges are designed to provide comfortable, welcoming, and secure
                environments — whether you're on PCS orders or taking a
                well-deserved break.
              </p>
              <p className="text-ocean-500 mb-10 text-base leading-relaxed">
                Spacious family suites, fully equipped kitchens, and
                complimentary breakfasts at select locations — all with the
                peace of mind that comes from staying on base.
              </p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-12 max-w-md bg-white p-6 rounded-2xl shadow-sm border border-ocean-100">
                {['Spacious Suites', 'Full Kitchens', 'Free Parking', 'Pet-Friendly'].map(
                  (a) => (
                    <div key={a} className="flex items-center gap-3 text-ocean-800 text-sm font-semibold">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-accent shrink-0"></div>
                      {a}
                    </div>
                  )
                )}
              </div>
              
              <button className="text-teal-accent hover:text-ocean-900 font-bold tracking-widest uppercase text-xs inline-flex items-center gap-3 transition-colors border-b-2 border-teal-accent hover:border-ocean-900 pb-1 cursor-pointer">
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Image + stat callout */}
            <div className="relative order-1 md:order-2">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Military family"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-ocean-950 text-white p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] hidden lg:block border border-white/10 z-10 w-64">
                <div className="text-5xl font-display font-bold text-teal-accent leading-none mb-3">
                  500K+
                </div>
                <div className="text-[10px] text-ocean-200 uppercase tracking-[0.2em] font-bold leading-relaxed">
                  Families served worldwide annually
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="relative py-40 px-4 overflow-hidden bg-ocean-950 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="w-full h-full object-cover opacity-[0.12] grayscale transition-transform duration-[10s] hover:scale-110 ease-linear"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/80 to-ocean-950" />
        </div>

        <div className="absolute w-[600px] h-[600px] bg-teal-accent/10 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-1"></div>

        <div className="relative z-10 max-w-3xl mx-auto w-full">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-teal-accent" />
            <span className="text-teal-accent text-[10px] font-bold tracking-[0.25em] uppercase shadow-sm">
              Ready to Book?
            </span>
            <div className="h-px w-12 bg-teal-accent" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 leading-[0.95] tracking-tight">
            Start Your <span className="text-teal-light">Journey</span><br /> With Us.
          </h2>
          <p className="text-ocean-200 text-lg md:text-xl md:px-12 mb-12 leading-relaxed">
            Join hundreds of thousands of military families who trust Navy Lodge
            for their travel and relocation needs.
          </p>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="bg-teal-accent hover:bg-white text-ocean-950 font-bold px-12 py-5 rounded-xl inline-flex items-center gap-3 text-base transition-all duration-300 shadow-2xl shadow-teal-accent/20 cursor-pointer overflow-hidden group"
          >
            <span className="relative z-10">Check Availability</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="bg-ocean-950 text-ocean-400 py-20 px-4 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            {/* Brand - takes 4 cols */}
            <div className="lg:col-span-4 lg:pr-10">
              <Link href="/" className="flex items-center gap-3 mb-6 group inline-flex">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-accent to-teal-light rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105">
                  <Star className="w-5 h-5 text-ocean-950" fill="currentColor" />
                </div>
                <div>
                  <span className="font-display font-bold text-2xl text-white tracking-tight leading-none block">
                    NAVY LODGE
                  </span>
                  <span className="text-[9px] tracking-[0.3em] font-semibold text-teal-accent uppercase block mt-1">
                    By Nexcom
                  </span>
                </div>
              </Link>
              <p className="text-sm leading-relaxed mb-8 text-ocean-400 max-w-xs">
                Premium, affordable, and secure lodging for military members and
                their families worldwide.
              </p>
              <div className="flex gap-3">
                {[
                  { label: 'Facebook', initial: 'f' },
                  { label: 'Twitter / X', initial: '𝕏' },
                  { label: 'Instagram', initial: 'in' },
                ].map((s) => (
                  <button
                    key={s.label}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full border border-ocean-800 bg-ocean-900/50 hover:bg-teal-accent hover:border-teal-accent flex items-center justify-center text-ocean-300 hover:text-ocean-950 text-xs font-bold transition-all cursor-pointer"
                  >
                    {s.initial}
                  </button>
                ))}
              </div>
            </div>

            {/* Empty space for layout balance */}
            <div className="hidden lg:block lg:col-span-1"></div>

            {/* Reservations - takes 2 cols */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-bold mb-6 text-[10px] tracking-[0.2em] uppercase">
                Reservations
              </h4>
              <ul className="space-y-4">
                {['Book a Room', 'Modify / Cancel', 'Special Offers', 'Group Bookings'].map(
                  (item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm text-ocean-400 hover:text-white transition-colors block">
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Company - takes 2 cols */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-bold mb-6 text-[10px] tracking-[0.2em] uppercase">
                Company
              </h4>
              <ul className="space-y-4">
                {['Our Story', 'Locations', 'Careers', 'NEXCOM'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-ocean-400 hover:text-white transition-colors block">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact - takes 3 cols */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-bold mb-6 text-[10px] tracking-[0.2em] uppercase">
                Contact
              </h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-4 text-ocean-400 group">
                  <div className="w-8 h-8 rounded-full bg-ocean-900 flex items-center justify-center shrink-0 border border-ocean-800 group-hover:border-teal-accent/50 transition-colors">
                    <MapPin className="w-3.5 h-3.5 text-teal-accent" />
                  </div>
                  <span className="text-sm leading-relaxed pt-1">
                    3280 Virginia Beach Blvd.<br />
                    Virginia Beach, VA 23452
                  </span>
                </li>
                <li className="flex items-center gap-4 text-ocean-400 group">
                  <div className="w-8 h-8 rounded-full bg-ocean-900 flex items-center justify-center shrink-0 border border-ocean-800 group-hover:border-teal-accent/50 transition-colors">
                    <span className="text-teal-accent text-xs">☎</span>
                  </div>
                  <span className="text-sm font-semibold pt-0.5">1-800-NAVY-INN</span>
                </li>
              </ul>
            </div>
            
          </div>

          <div className="border-t border-ocean-800" />

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] text-ocean-500 tracking-wide">
              &copy; {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {['Privacy', 'Terms', 'Accessibility'].map((item) => (
                <Link key={item} href="#" className="text-[11px] text-ocean-500 uppercase tracking-widest font-semibold hover:text-teal-accent transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── SEARCH MODAL DUMMY OVERLAY ── */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ocean-950/80 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)}></div>
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full text-center z-10 shadow-2xl animate-fade-in">
            <div className="w-16 h-16 mx-auto bg-ocean-50 rounded-full flex items-center justify-center mb-5">
              <MapPin className="text-teal-accent w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-ocean-900 text-2xl mb-2">Searching Availability</h3>
            <p className="text-ocean-500 text-sm mb-6 leading-relaxed">
              Looking up rooms for<br />
              <span className="text-ocean-900 font-semibold mt-1 block">{selectedLocation || 'all regions'}</span>
            </p>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="bg-ocean-100 text-ocean-900 font-bold px-6 py-3 rounded-xl hover:bg-ocean-200 transition-colors cursor-pointer w-full text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
