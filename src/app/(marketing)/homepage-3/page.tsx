'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  MapPin, Users, Shield, Star, Menu, X, ChevronRight,
  ArrowRight, Award, Globe, Wallet, Clock, CheckCircle2,
} from 'lucide-react';
import DatePicker from '@/components/shared/DatePicker';
import SearchModal from '@/components/shared/SearchModal';

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_VERSIONS = ['v1', 'v2', 'v3', 'v4'];
const NAV_LINKS = ['Locations', 'Offers', 'About'];

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
    id: 1,
    name: 'Naval Base San Diego',
    location: 'California, USA',
    price: 79,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    badge: 'Most Popular',
    code: 'NSD-CA-01',
  },
  {
    id: 2,
    name: 'Pearl Harbor-Hickam',
    location: 'Hawaii, USA',
    price: 95,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    code: 'PHH-HI-02',
  },
  {
    id: 3,
    name: 'Oceana / Dam Neck',
    location: 'Virginia, USA',
    price: 72,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    code: 'ODN-VA-03',
  },
  {
    id: 4,
    name: 'Naval Station Norfolk',
    location: 'Virginia, USA',
    price: 68,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    code: 'NSN-VA-04',
  },
];

const FEATURES = [
  { num: '01', title: 'Safe & Secure', desc: 'Gated communities on military installations with 24/7 security patrols — no exceptions.', stat: '100% Verified' },
  { num: '02', title: 'Built for Families', desc: 'Spacious suites, pet-friendly options, and family amenities built around military life.', stat: '500K+ Families' },
  { num: '03', title: 'Tax-Free Savings', desc: 'Premium accommodations at rates up to 50% below commercial hotels, completely tax-free.', stat: '50% Less' },
  { num: '04', title: 'Always Available', desc: 'Streamlined online booking with 24/7 customer support whenever you need us.', stat: '24/7 Support' },
];

const STATS = [
  { value: '200+', label: 'Global Locations' },
  { value: '50%', label: 'Below Market Rate' },
  { value: '4.9', label: 'Avg. Rating' },
  { value: '500K+', label: 'Families Served' },
];

const MARQUEE_ITEMS = [
  'NAVAL BASE SAN DIEGO', '★', 'PEARL HARBOR', '★', 'NORFOLK', '★',
  'JACKSONVILLE', '★', 'KITSAP', '★', 'CORPUS CHRISTI', '★',
  'NEWPORT', '★', 'DAM NECK', '★',
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Homepage3() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showStickyForm, setShowStickyForm] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    setCheckInDate((prev) => prev || today);
    setCheckOutDate((prev) => prev || tomorrow);

    const handleScroll = () => {
      setShowStickyForm(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);

    // Custom cursor — only on non-touch
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) {
      const moveCursor = (e: MouseEvent) => {
        mousePos.current.x = e.clientX;
        mousePos.current.y = e.clientY;
        if (cursorDotRef.current) {
          cursorDotRef.current.style.left = `${e.clientX}px`;
          cursorDotRef.current.style.top = `${e.clientY}px`;
        }
      };
      window.addEventListener('mousemove', moveCursor);

      // Ring trails with RAF — using refs only, no React state
      const animateRing = () => {
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
        if (cursorRingRef.current) {
          cursorRingRef.current.style.left = `${ringPos.current.x}px`;
          cursorRingRef.current.style.top = `${ringPos.current.y}px`;
        }
        rafRef.current = requestAnimationFrame(animateRing);
      };
      rafRef.current = requestAnimationFrame(animateRing);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', moveCursor);
        cancelAnimationFrame(rafRef.current);
      };
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#001233] text-[#EBE9E4] font-['JetBrains_Mono',monospace] min-h-screen overflow-x-hidden cursor-none selection:bg-[#FFCF01]/30 selection:text-white">
      {/* ── STYLES THAT CAN'T BE TAILWIND EASILY ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;700&display=swap');

        .cursor-dot {
          position: fixed;
          width: 8px; height: 8px;
          background: #FFCF01;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
        }
        .cursor-ring {
          position: fixed;
          width: 36px; height: 36px;
          border: 1px solid rgba(232,168,66,0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
        }

        .text-stroke-ghost {
          -webkit-text-stroke: 1px rgba(232,168,66,0.07);
          color: transparent;
        }

        .grain-overlay::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }

        select option {
          background: #001B4D;
          color: #EBE9E4;
        }

        /* Hide scrollbar for the grid but allow scrolling */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ── CUSTOM CURSOR ── */}
      <div ref={cursorDotRef} className="cursor-dot hidden md:block" style={{ left: -100, top: -100 }} />
      <div ref={cursorRingRef} className="cursor-ring hidden md:block" style={{ left: -100, top: -100 }} />

      {/* ── STICKY SEARCH BAR ── */}
      <div className={`fixed top-0 left-0 right-0 z-[200] bg-[#001B4D] border-b border-[#FFCF01]/10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${showStickyForm ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 md:py-2.5 flex flex-col md:flex-row items-center gap-2 md:gap-0">
          <span className="hidden md:inline-block text-[8px] uppercase tracking-[0.3em] color-[#FFCF01] text-[#FFCF01] mr-5 whitespace-nowrap">
            // Search
          </span>

          <div className="flex-1 flex items-center gap-2 px-3 md:px-4 py-2 border-r-0 md:border-r border-white/5 w-full md:w-auto min-w-0">
            <MapPin className="text-[#FFCF01] w-3 h-3 shrink-0" />
            <select
              className="flex-1 bg-transparent border-none outline-none text-[11px] text-[#EBE9E4] font-['JetBrains_Mono',monospace] cursor-none min-w-0 truncate"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select destination</option>
              {DUMMY_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="flex-[1.2] flex items-center gap-2 px-3 md:px-4 py-2 border-r-0 md:border-r border-white/5 w-full md:w-auto min-w-0">
            <DatePicker
              checkIn={checkInDate}
              checkOut={checkOutDate}
              onCheckInChange={setCheckInDate}
              onCheckOutChange={setCheckOutDate}
            />
          </div>

          <div className="flex-1 flex items-center gap-2 px-3 md:px-4 py-2 border-r-0 border-white/5 w-full md:w-auto min-w-0">
            <Users className="text-[#FFCF01] w-3 h-3 shrink-0" />
            <select className="flex-1 bg-transparent border-none outline-none text-[11px] text-[#EBE9E4] font-['JetBrains_Mono',monospace] cursor-none min-w-0">
              <option>1 Room, 2 Adults</option>
              <option>1 Room, 1 Adult</option>
              <option>2 Rooms, 4 Adults</option>
              <option>More Options…</option>
            </select>
          </div>

          <button onClick={() => setIsSearchOpen(true)} className="mt-2 md:mt-0 ml-0 md:ml-4 bg-[#FFCF01] text-[#001233] text-[10px] uppercase font-bold tracking-[0.15em] px-5 py-2.5 flex items-center justify-center gap-1.5 hover:opacity-85 transition-opacity cursor-none whitespace-nowrap w-full md:w-auto shrink-0">
            Search <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="relative w-full bg-[#001233] border-b border-white/5 px-4 md:px-8 h-16 flex items-center justify-between z-[100]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 border border-[#FFCF01] flex items-center justify-center relative">
            <div className="absolute inset-[3px] border border-[#FFCF01]/30"></div>
            <Star className="w-3.5 h-3.5 text-[#FFCF01]" fill="currentColor" />
          </div>
          <div>
            <span className="font-['Syne',sans-serif] font-extrabold text-sm tracking-[0.15em] text-[#EBE9E4] block leading-tight">NAVY LODGE</span>
            <span className="text-[8px] tracking-[0.3em] font-['JetBrains_Mono',monospace] text-[#FFCF01] uppercase block mt-[2px]">by NEXCOM Hospitality Group</span>
          </div>
        </Link>

        <ul className="hidden md:flex items-center m-0 p-0 list-none">
          {NAV_VERSIONS.map((v, i) => (
            <li key={v}>
              <Link href={`/homepage-${i + 1}`} className={`text-[10px] tracking-[0.15em] uppercase px-4 py-2 transition-colors font-['JetBrains_Mono',monospace] hover:text-[#EBE9E4] cursor-none ${i === 2 ? 'text-[#FFCF01]' : 'text-gray-500'}`}>
                Home {v}
              </Link>
            </li>
          ))}
          <li>
            <div className="w-px h-5 bg-white/5 mx-2"></div>
          </li>
          {NAV_LINKS.map((item) => (
            <li key={item}>
              <Link href={`/${item.toLowerCase()}`} className="text-[10px] tracking-[0.15em] text-gray-500 uppercase px-4 py-2 transition-colors font-['JetBrains_Mono',monospace] hover:text-[#EBE9E4] cursor-none">
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button className="hidden md:flex bg-[#FFCF01] text-[#001233] text-[10px] uppercase font-bold tracking-[0.15em] px-5 py-2.5 hover:opacity-85 transition-opacity cursor-none">
            Book Now
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center border border-white/5 text-[#EBE9E4] hover:border-[#FFCF01] transition-colors bg-transparent"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-[#001B4D] z-[150] border-t border-white/5 flex flex-col p-6 animate-fade-in">
          {NAV_VERSIONS.map((v, i) => (
            <Link key={v} href={`/homepage-${i + 1}`} className={`block py-3.5 border-b border-white/5 text-[11px] tracking-[0.2em] uppercase transition-colors ${i === 2 ? 'text-[#FFCF01]' : 'text-gray-500 hover:text-[#FFCF01]'}`}>
              Home {v}
            </Link>
          ))}
          <div className="my-4 h-px bg-white/5 border-none"></div>
          {NAV_LINKS.map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="block py-3.5 border-b border-white/5 text-[11px] tracking-[0.2em] text-gray-500 uppercase transition-colors hover:text-[#FFCF01]">
              {item}
            </Link>
          ))}
          <button className="mt-6 w-full bg-[#FFCF01] text-[#001233] text-[10px] uppercase font-bold tracking-[0.2em] p-3.5">
            Book Now
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0 bg-[#001233] grain-overlay">
          <img
            src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Navy Lodge — premium military lodging"
            className="w-full h-full object-cover opacity-25 grayscale-[40%] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001233]/95 via-[#001233]/60 to-[#001233]/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#001233]/50 via-transparent to-[#001233]/90"></div>
        </div>

        {/* Ghost stroke — grid-breaking backdrop text */}
        <span className="absolute top-1/2 -left-4 -translate-y-[60%] font-['Syne',sans-serif] font-extrabold text-[clamp(80px,18vw,280px)] leading-[0.88] whitespace-nowrap z-[1] select-none text-stroke-ghost pointer-events-none">
          NAVY
        </span>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 md:px-8 pt-32 pb-16">
          <div className="inline-flex items-center gap-2.5 mb-10">
            <div className="w-8 h-px bg-[#FFCF01]"></div>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#FFCF01] flex items-center">
              <Shield className="w-2.5 h-2.5 mr-1.5" />
              Exclusive Military Lodging — Worldwide
            </span>
          </div>

          <h1 className="font-['Syne',sans-serif] font-extrabold text-[clamp(52px,7.5vw,110px)] leading-[0.9] text-[#EBE9E4] mb-7 max-w-3xl">
            Comfort<br />
            You Can<br />
            <span className="text-[#FFCF01]">Trust.</span>
          </h1>

          <p className="text-[13px] leading-[1.8] text-gray-500 max-w-md mb-12 flex-shrink-0 tracking-[0.03em]">
            Premium lodging exclusively for those who serve —<br />
            wherever duty takes you.
          </p>

          {/* Search panel */}
          <div className="relative z-10 bg-[#001B4D] border border-[#FFCF01]/10 flex flex-col w-full">
            <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFCF01] animate-pulse"></div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-gray-500">
                // Availability Search — Live
              </span>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 flex flex-col gap-1 px-5 py-4 border-b md:border-b-0 md:border-r border-white/5 hover:bg-[#FFCF01]/[0.04] transition-colors cursor-none">
                <span className="text-[8px] tracking-[0.25em] uppercase text-[#FFCF01]">Destination</span>
                <select
                  className="w-full bg-transparent border-none outline-none text-xs text-[#EBE9E4] font-['JetBrains_Mono',monospace] cursor-none"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Select base / location</option>
                  {DUMMY_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="flex-[1.3] flex flex-col gap-1 px-5 py-4 border-b md:border-b-0 md:border-r border-white/5 hover:bg-[#FFCF01]/[0.04] transition-colors cursor-none">
                <span className="text-[8px] tracking-[0.25em] uppercase text-[#FFCF01]">Dates</span>
                <DatePicker
                  checkIn={checkInDate}
                  checkOut={checkOutDate}
                  onCheckInChange={setCheckInDate}
                  onCheckOutChange={setCheckOutDate}
                />
              </div>
              <div className="flex-1 flex flex-col gap-1 px-5 py-4 hover:bg-[#FFCF01]/[0.04] transition-colors cursor-none">
                <span className="text-[8px] tracking-[0.25em] uppercase text-[#FFCF01]">Guests</span>
                <select className="w-full bg-transparent border-none outline-none text-xs text-[#EBE9E4] font-['JetBrains_Mono',monospace] cursor-none">
                  <option>1 Room, 2 Adults</option>
                  <option>1 Room, 1 Adult</option>
                  <option>2 Rooms, 4 Adults</option>
                  <option>More Options…</option>
                </select>
              </div>
            </div>
            <div className="border-t border-white/5 px-5 py-3 flex justify-between items-center">
              <span className="hidden md:block text-[9px] tracking-[0.15em] text-[#3D4656]">200+ locations · Tax-exempt rates</span>
              <button onClick={() => setIsSearchOpen(true)} className="w-full md:w-auto font-['JetBrains_Mono',monospace] text-[10px] uppercase font-bold tracking-[0.2em] text-[#001233] bg-[#FFCF01] px-7 py-3 flex items-center justify-center gap-2 hover:opacity-85 transition-opacity cursor-none">
                Check Availability <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 border-t border-white/5 bg-[#001233]/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {STATS.map((s, i) => (
              <div key={i} className="py-7 text-center border-b md:border-b-0 border-white/5 last:border-b-0">
                <div className="font-['Syne',sans-serif] font-extrabold text-[clamp(24px,3vw,36px)] text-[#FFCF01] leading-none mb-1.5">{s.value}</div>
                <div className="text-[8px] tracking-[0.25em] uppercase text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-white/5 bg-[#001B4D] overflow-hidden py-3.5 flex">
        <div className="flex gap-10 animate-marquee whitespace-nowrap w-max">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className={`text-[10px] tracking-[0.3em] uppercase shrink-0 ${item === '★' ? 'text-[#FFCF01]' : 'text-[#3D4656]'}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── LOCATIONS ── */}
      <section className="py-24 md:py-28 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-[#FFCF01]"></div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#FFCF01]">Featured</span>
            </div>
            <h2 className="font-['Syne',sans-serif] font-extrabold text-[clamp(32px,4vw,56px)] leading-[0.95] text-[#EBE9E4]">
              Top <span className="text-[#3D4656]">Destinations</span>
            </h2>
          </div>
          <Link href="/locations" className="text-[10px] tracking-[0.2em] uppercase text-gray-500 flex items-center gap-1.5 hover:text-[#FFCF01] transition-colors pb-1 shrink-0 cursor-none">
            View all 200+ <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr] gap-[2px] auto-rows-[auto] lg:grid-rows-[260px_260px]">
          {LOCATIONS.map((loc, i) => (
            <div key={loc.id} className={`relative overflow-hidden cursor-none bg-[#001845] group ${i === 0 ? 'lg:row-span-2' : ''}`}>
              <img src={loc.image} alt={loc.name} className="w-full h-full object-cover opacity-55 grayscale-[20%] transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-70 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001233]/95 via-[#001233]/30 to-transparent"></div>
              {loc.badge && (
                <div className="absolute top-5 right-5 text-[8px] tracking-[0.2em] uppercase bg-[#FFCF01] text-[#001233] px-2.5 py-1 z-10">
                  {loc.badge}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="text-[8px] tracking-[0.3em] text-[#FFCF01] mb-1.5 uppercase">{loc.code}</div>
                <div className={`font-['Syne',sans-serif] font-bold text-[#EBE9E4] leading-[1.1] ${i === 0 ? 'text-[clamp(22px,2.5vw,30px)] mb-3' : 'text-lg mb-1'}`}>
                  {loc.name}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <Star className="w-2.5 h-2.5 text-[#FFCF01]" fill="currentColor" />
                    <span className="text-[#FFCF01]">{loc.rating}</span>
                    <span className="ml-1">{loc.location}</span>
                  </div>
                  <div className={`font-['Syne',sans-serif] font-bold text-[#EBE9E4] ${i === 0 ? 'text-[32px]' : 'text-[22px]'}`}>
                    ${loc.price}
                    <sub className="font-['JetBrains_Mono',monospace] text-[10px] font-normal text-gray-500 ml-0.5">/night</sub>
                  </div>
                </div>
                {i === 0 && (
                  <button className="block w-full mt-4 bg-transparent border border-[#FFCF01]/40 text-[#FFCF01] font-['JetBrains_Mono',monospace] text-[9px] tracking-[0.2em] uppercase p-2.5 text-center transition-colors group-hover:bg-[#FFCF01] group-hover:text-[#001233] cursor-none">
                    Book This Lodge <ArrowRight className="w-3 h-3 inline ml-1 align-text-bottom" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROMO ── */}
      <div className="border-y border-white/5 bg-[#001B4D] grid grid-cols-1 lg:grid-cols-2 min-h-[480px] overflow-hidden">
        <div className="p-12 md:p-20 flex flex-col justify-center relative overflow-hidden">
          <span className="absolute top-1/2 -right-5 -translate-y-1/2 font-['Syne',sans-serif] font-extrabold text-[120px] leading-none text-stroke-ghost select-none opacity-50 lg:opacity-100">
            15%
          </span>
          <span className="inline-flex items-center gap-2 text-[8px] tracking-[0.3em] text-[#FFCF01] uppercase mb-7 before:content-[''] before:block before:w-6 before:h-px before:bg-[#FFCF01] relative z-10">
            Limited Offer
          </span>
          <h2 className="font-['Syne',sans-serif] font-extrabold text-[clamp(36px,4vw,60px)] leading-[0.92] text-[#EBE9E4] mb-6 relative z-10">
            Save up to<br />
            <span className="text-[#FFCF01]">15% off</span><br />
            Extended Stays
          </h2>
          <p className="text-xs leading-[1.9] text-gray-500 max-w-[380px] mb-8 relative z-10">
            On PCS orders or family vacation? Enjoy exclusive savings
            when you book 7 nights or more at any Navy Lodge worldwide.
          </p>
          <ul className="list-none mb-10 relative z-10 border-t border-white/5 max-w-sm">
            {['Complimentary breakfast daily', 'Free parking included', 'Flexible cancellation policy'].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[11px] tracking-[0.05em] text-[#EBE9E4]/70 py-2 border-b border-white/5">
                <div className="w-1.5 h-1.5 bg-[#FFCF01] shrink-0"></div>
                {item}
              </li>
            ))}
          </ul>
          <button className="self-start inline-flex items-center gap-2.5 bg-[#FFCF01] text-[#001233] font-['JetBrains_Mono',monospace] text-[10px] font-bold tracking-[0.2em] uppercase px-7 py-3.5 hover:opacity-85 transition-opacity cursor-none relative z-10">
            View Offer Details <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="relative overflow-hidden hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Luxury pool"
            className="w-full h-full object-cover opacity-40 grayscale-[30%] contrast-110 hover:opacity-55 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001B4D] via-transparent to-transparent"></div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div className="py-24 md:py-28 bg-[#001233] relative overflow-hidden">
        <span className="absolute top-1/2 -left-8 -translate-y-1/2 font-['Syne',sans-serif] font-extrabold text-[clamp(80px,15vw,200px)] leading-none text-stroke-ghost whitespace-nowrap select-none">
          DIFFERENCE
        </span>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-10 lg:gap-20">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-[#FFCF01]"></div>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#FFCF01]">Why Us</span>
              </div>
              <h2 className="font-['Syne',sans-serif] font-extrabold text-[clamp(32px,4vw,56px)] leading-[0.95] text-[#EBE9E4] mb-5">
                The Navy Lodge<br />
                <span className="text-[#3D4656]">Difference.</span>
              </h2>
              <p className="text-[11px] leading-[1.9] text-gray-500 max-w-[340px]">
                Built specifically for military members and their families —
                not adapted from a commercial hotel chain.
              </p>
            </div>
            <div className="flex flex-col border-t border-white/5">
              {FEATURES.map((f) => (
                <div key={f.num} className="flex items-start gap-5 py-8 border-b border-white/5 hover:border-[#FFCF01]/20 transition-colors group">
                  <span className="font-['Syne',sans-serif] font-extrabold text-[48px] leading-none text-[#FFCF01]/10 w-14 shrink-0 transition-colors group-hover:text-[#FFCF01]/20 select-none">
                    {f.num}
                  </span>
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <span className="font-['Syne',sans-serif] font-bold text-[17px] text-[#EBE9E4] leading-[1.2]">{f.title}</span>
                      <span className="text-[8px] tracking-[0.2em] text-[#FFCF01] bg-[#FFCF01]/10 border border-[#FFCF01]/20 px-2.5 py-1 whitespace-nowrap uppercase shrink-0">
                        {f.stat}
                      </span>
                    </div>
                    <p className="text-[11px] leading-[1.85] text-gray-500 tracking-[0.02em]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="bg-[#001B4D] border-t border-white/5 py-24 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-16 lg:gap-20 items-center">
            <div className="order-1 lg:order-none">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-[#FFCF01]"></div>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#FFCF01]">Our Story</span>
              </div>
              <h2 className="font-['Syne',sans-serif] font-extrabold text-[clamp(32px,4vw,56px)] leading-[0.95] text-[#EBE9E4] mb-6">
                Your Home,<br />
                Away from <span className="text-[#FFCF01]">Home.</span>
              </h2>
              <p className="text-xs leading-[1.95] text-gray-500 mb-4 max-w-[460px]">
                We understand the unique lifestyle of military families. Navy Lodges
                are designed to provide comfortable, welcoming, and secure environments —
                whether you're on PCS orders or taking a well-deserved break.
              </p>
              <p className="text-[11px] leading-[1.9] text-[#3D4656] mb-0 max-w-[460px]">
                Spacious family suites, fully equipped kitchens, and complimentary
                breakfasts at select locations — all with the peace of mind that
                comes from staying on base.
              </p>
              <div className="grid grid-cols-2 border border-white/5 my-8 sm:my-10 max-w-[460px]">
                {['Spacious Suites', 'Full Kitchens', 'Free Parking', 'Pet-Friendly'].map((a, i) => (
                  <div key={a} className={`flex items-center gap-2.5 px-4 py-3.5 text-[11px] tracking-[0.05em] text-[#EBE9E4]/65 hover:bg-[#FFCF01]/[0.04] transition-colors border-white/5 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b' : ''}`}>
                    <div className="w-1.5 h-1.5 bg-[#FFCF01] shrink-0"></div>
                    {a}
                  </div>
                ))}
              </div>
              <button className="inline-flex items-center gap-2.5 bg-transparent border border-[#FFCF01]/40 text-[#FFCF01] font-['JetBrains_Mono',monospace] text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-3 hover:bg-[#FFCF01] hover:text-[#001233] transition-colors cursor-none">
                Learn More About Us <ArrowRight className="w-3 h-3 inline align-baseline" />
              </button>
            </div>
            <div className="relative lg:order-none">
              <div className="relative overflow-hidden aspect-[4/5] bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Military family"
                  className="absolute inset-0 w-full h-full object-cover opacity-55 grayscale-[20%] contrast-110 hover:opacity-70 transition-opacity duration-500"
                />
              </div>
              <div className="hidden lg:block absolute -bottom-6 -left-8 bg-[#001B4D] border border-[#FFCF01]/10 px-7 py-6 z-10">
                <div className="font-['Syne',sans-serif] font-extrabold text-4xl text-[#FFCF01] leading-none mb-1.5">500K+</div>
                <div className="text-[9px] tracking-[0.25em] uppercase text-gray-500 max-w-[110px] leading-[1.6]">Families served worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="relative py-36 bg-[#001B4D] border-t border-white/5 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.07] grayscale"
        />
        <div className="relative z-10 max-w-[800px] mx-auto px-8 text-center">
          <div className="inline-flex items-center gap-4 text-[9px] tracking-[0.3em] text-[#FFCF01] uppercase mb-9">
            <div className="w-8 h-px bg-[#FFCF01]"></div>
            Get Started
            <div className="w-8 h-px bg-[#FFCF01]"></div>
          </div>
          <h2 className="font-['Syne',sans-serif] font-extrabold text-[clamp(44px,7vw,90px)] leading-[0.9] text-[#EBE9E4] mb-6 tracking-[-0.02em]">
            Ready to Book<br />
            Your <span className="text-[#FFCF01]">Stay?</span>
          </h2>
          <p className="text-xs leading-[1.9] text-gray-500 max-w-lg mx-auto mb-12">
            Join hundreds of thousands of military families who trust Navy Lodge by NEXCOM Hospitality Group
            for their travel and relocation needs.
          </p>
          <button onClick={() => setIsSearchOpen(true)} className="inline-flex items-center gap-3 bg-[#FFCF01] text-[#001233] font-['JetBrains_Mono',monospace] text-[11px] font-bold tracking-[0.2em] uppercase px-10 py-4 hover:opacity-85 transition-opacity cursor-none">
            Check Availability <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-[#001233] border-t border-white/5 pt-16 md:pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 pb-16 border-b border-white/5 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 border border-[#FFCF01] flex items-center justify-center relative shrink-0">
                  <div className="absolute inset-[3px] border border-[#FFCF01]/25"></div>
                  <Star className="w-3 h-3 text-[#FFCF01]" fill="currentColor" />
                </div>
                <span className="font-['Syne',sans-serif] font-extrabold text-[13px] tracking-[0.15em] text-[#EBE9E4]">NAVY LODGE</span>
              </div>
              <p className="text-[11px] leading-[1.9] text-gray-500 mb-6 max-w-[260px]">
                Award-winning hospitality. High-quality accommodations at the best value worldwide for military members and their families.
              </p>
              <div className="flex gap-2">
                {[{ l: 'Facebook', i: 'f' }, { l: 'Twitter', i: '𝕏' }, { l: 'Instagram', i: 'in' }].map((s) => (
                  <button key={s.l} className="w-8 h-8 flex items-center justify-center border border-white/5 bg-transparent text-gray-500 font-['JetBrains_Mono',monospace] font-bold text-[10px] hover:border-[#FFCF01] hover:text-[#FFCF01] transition-colors cursor-none" aria-label={s.l}>{s.i}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[8px] tracking-[0.3em] uppercase text-[#FFCF01] mb-5">Reservations</div>
              <ul className="list-none flex flex-col gap-3">
                {['Book a Room', 'Modify / Cancel', 'Special Offers', 'Group Bookings'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-[11px] text-gray-500 tracking-[0.05em] hover:text-[#EBE9E4] transition-colors flex items-center gap-1.5 cursor-none">
                      <span className="text-[9px] text-[#3D4656]">—</span> {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[8px] tracking-[0.3em] uppercase text-[#FFCF01] mb-5">Company</div>
              <ul className="list-none flex flex-col gap-3">
                {['Our Story', 'Locations', 'Careers', 'NEXCOM Hospitality Group'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-[11px] text-gray-500 tracking-[0.05em] hover:text-[#EBE9E4] transition-colors flex items-center gap-1.5 cursor-none">
                      <span className="text-[9px] text-[#3D4656]">—</span> {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[8px] tracking-[0.3em] uppercase text-[#FFCF01] mb-5">Contact</div>
              <p className="text-[10px] leading-[1.9] text-gray-500 mb-3">
                3280 Virginia Beach Blvd.<br />
                Virginia Beach, VA 23452
              </p>
              <div className="text-[11px] font-['JetBrains_Mono',monospace] text-[#FFCF01] tracking-[0.1em]">1-800-NAVY-INN</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center py-5 gap-5">
            <span className="text-[9px] tracking-[0.15em] text-[#3D4656] uppercase text-center md:text-left">
              © {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.
            </span>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Accessibility'].map((item) => (
                <Link key={item} href="#" className="text-[9px] tracking-[0.15em] uppercase text-[#3D4656] hover:text-[#FFCF01] transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Wall-to-wall ghost name */}
        <span className="block border-t border-white/5 font-['Syne',sans-serif] font-extrabold text-[clamp(48px,11vw,160px)] text-stroke-ghost tracking-[-0.02em] leading-[0.9] text-center pt-5 select-none overflow-hidden whitespace-nowrap opacity-100">
          NAVY LODGE
        </span>
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
