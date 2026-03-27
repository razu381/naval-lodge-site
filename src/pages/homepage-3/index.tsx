import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Users, Shield, Star, Menu, X, ChevronRight,
  ArrowRight, Award, Globe, Wallet, Clock, CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DatePicker from '../../DatePicker';
import SearchModal from '../../SearchModal';

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

export default function Homepage4Creative() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showStickyForm, setShowStickyForm] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorRingPos, setCursorRingPos] = useState({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  useEffect(() => {
    if (!checkInDate) setCheckInDate(today);
    if (!checkOutDate) setCheckOutDate(tomorrow);

    const handleScroll = () => {
      setShowStickyForm(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);

    // Custom cursor — only on non-touch
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) {
      const moveCursor = (e: MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', moveCursor);

      // Ring trails with RAF
      const animateRing = () => {
        ringRef.current.x += (cursorPos.x - ringRef.current.x) * 0.12;
        ringRef.current.y += (cursorPos.y - ringRef.current.y) * 0.12;
        setCursorRingPos({ x: ringRef.current.x, y: ringRef.current.y });
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

  // Keep ring chasing the dot properly
  useEffect(() => {
    const animateRing = () => {
      ringRef.current.x += (cursorPos.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (cursorPos.y - ringRef.current.y) * 0.12;
      setCursorRingPos({ ...ringRef.current });
      rafRef.current = requestAnimationFrame(animateRing);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animateRing);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cursorPos]);

  return (
    <>
      {/* ── GOOGLE FONTS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;700&display=swap');

        :root {
          --bg:       #080C14;
          --bg-2:     #0D1220;
          --bg-3:     #121929;
          --bg-card:  #0F1623;
          --amber:    #E8A842;
          --amber-dim:#B07E28;
          --text:     #EBE9E4;
          --muted:    #6B7280;
          --muted-2:  #3D4656;
          --border:   rgba(232,168,66,0.12);
          --border-2: rgba(255,255,255,0.06);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'JetBrains Mono', monospace;
          cursor: none;
          overflow-x: hidden;
        }

        /* ── CURSOR ── */
        .cursor-dot {
          position: fixed;
          width: 8px; height: 8px;
          background: var(--amber);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: none;
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

        /* ── NAV ── */
        .nav {
          position: relative;
          width: 100%;
          background: var(--bg);
          border-bottom: 1px solid var(--border-2);
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 100;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 12px;
          text-decoration: none;
        }
        .nav-logo-mark {
          width: 36px; height: 36px;
          border: 1px solid var(--amber);
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .nav-logo-mark::before {
          content: '';
          position: absolute;
          inset: 3px;
          border: 1px solid rgba(232,168,66,0.3);
        }
        .nav-brand {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.15em;
          color: var(--text);
        }
        .nav-sub {
          display: block;
          font-size: 8px;
          letter-spacing: 0.3em;
          color: var(--amber);
          font-family: 'JetBrains Mono', monospace;
          margin-top: 2px;
        }
        .nav-links {
          display: flex; align-items: center; gap: 0;
          list-style: none;
        }
        .nav-links a {
          font-size: 10px;
          letter-spacing: 0.15em;
          color: var(--muted);
          text-decoration: none;
          padding: 8px 16px;
          text-transform: uppercase;
          transition: color 0.2s;
          font-family: 'JetBrains Mono', monospace;
        }
        .nav-links a:hover { color: var(--text); }
        .nav-links a.active { color: var(--amber); }
        .nav-divider {
          width: 1px; height: 20px;
          background: var(--border-2);
          margin: 0 8px;
        }
        .nav-cta {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--bg);
          background: var(--amber);
          border: none;
          padding: 10px 20px;
          cursor: none;
          transition: opacity 0.2s;
        }
        .nav-cta:hover { opacity: 0.85; }

        /* ── STICKY SEARCH BAR ── */
        .sticky-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          background: var(--bg-2);
          border-bottom: 1px solid var(--border);
          transform: translateY(-100%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sticky-bar.visible {
          transform: translateY(0);
        }
        .sticky-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 10px 2rem;
          display: flex;
          align-items: center;
          gap: 0;
        }
        .sticky-label {
          font-size: 8px;
          letter-spacing: 0.3em;
          color: var(--amber);
          text-transform: uppercase;
          margin-right: 20px;
          white-space: nowrap;
        }
        .sticky-field {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-right: 1px solid var(--border-2);
          min-width: 0;
        }
        .sticky-field:last-of-type { border-right: none; }
        .sticky-icon {
          color: var(--amber);
          width: 12px; height: 12px;
          flex-shrink: 0;
        }
        .sticky-select {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--text);
          cursor: none;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sticky-select option { background: var(--bg-2); color: var(--text); }
        .sticky-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--bg);
          background: var(--amber);
          border: none;
          padding: 10px 20px;
          cursor: none;
          white-space: nowrap;
          flex-shrink: 0;
          margin-left: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: opacity 0.2s;
        }
        .sticky-btn:hover { opacity: 0.85; }

        /* ── HERO ── */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
        }
        .hero-img {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.25;
          filter: grayscale(40%) contrast(1.1);
        }
        /* grain */
        .hero-bg::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }
        .hero-gradient {
          position: absolute; inset: 0;
          background:
            linear-gradient(to right, rgba(8,12,20,0.98) 45%, rgba(8,12,20,0.6) 75%, rgba(8,12,20,0.3) 100%),
            linear-gradient(to bottom, rgba(8,12,20,0.5) 0%, transparent 30%, rgba(8,12,20,0.9) 80%);
        }
        .hero-content {
          position: relative; z-index: 10;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          padding: 120px 2rem 60px;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 40px;
        }
        .eyebrow-line {
          width: 32px; height: 1px;
          background: var(--amber);
        }
        .eyebrow-text {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--amber);
        }
        /* Ghost stroke headline — grid-breaking moment */
        .hero-ghost {
          position: absolute;
          top: 50%; left: -1rem;
          transform: translateY(-60%);
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(80px, 18vw, 280px);
          line-height: 0.88;
          color: transparent;
          -webkit-text-stroke: 1px rgba(232,168,66,0.07);
          pointer-events: none;
          white-space: nowrap;
          z-index: 1;
          user-select: none;
        }
        .hero-headline {
          position: relative; z-index: 2;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(52px, 7.5vw, 110px);
          line-height: 0.9;
          color: var(--text);
          margin-bottom: 28px;
          max-width: 720px;
        }
        .hero-headline .accent { color: var(--amber); }
        .hero-headline .thin {
          font-weight: 300;
          color: rgba(235,233,228,0.45);
        }
        .hero-sub {
          font-size: 13px;
          line-height: 1.8;
          color: var(--muted);
          max-width: 440px;
          margin-bottom: 52px;
          letter-spacing: 0.03em;
        }

        /* ── HERO SEARCH PANEL ── */
        .hero-search {
          position: relative; z-index: 2;
          background: var(--bg-2);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
        }
        .search-header {
          padding: 12px 20px;
          border-bottom: 1px solid var(--border-2);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .search-status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--amber);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .search-header-label {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .search-body {
          display: flex;
          flex-direction: row;
        }
        .search-field {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px 20px;
          border-right: 1px solid var(--border-2);
          cursor: none;
          transition: background 0.2s;
        }
        .search-field:hover { background: rgba(232,168,66,0.04); }
        .search-field:last-of-type { border-right: none; }
        .search-field-label {
          font-size: 8px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--amber);
        }
        .search-select {
          background: transparent;
          border: none;
          outline: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--text);
          cursor: none;
          width: 100%;
        }
        .search-select option { background: var(--bg-2); }
        .search-footer {
          border-top: 1px solid var(--border-2);
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .search-hint {
          font-size: 9px;
          letter-spacing: 0.15em;
          color: var(--muted-2);
        }
        .search-submit {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--bg);
          background: var(--amber);
          border: none;
          padding: 12px 28px;
          cursor: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: opacity 0.2s;
        }
        .search-submit:hover { opacity: 0.85; }

        /* ── STATS BAR ── */
        .stats-bar {
          position: relative; z-index: 10;
          border-top: 1px solid var(--border-2);
          background: rgba(8,12,20,0.6);
          backdrop-filter: blur(8px);
        }
        .stats-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          divide: 1;
        }
        .stat-item {
          padding: 28px 0;
          text-align: center;
          border-right: 1px solid var(--border-2);
          position: relative;
        }
        .stat-item:last-child { border-right: none; }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(24px, 3vw, 36px);
          color: var(--amber);
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-label {
          font-size: 8px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* ── MARQUEE ── */
        .marquee-wrap {
          border-top: 1px solid var(--border-2);
          border-bottom: 1px solid var(--border-2);
          background: var(--bg-2);
          overflow: hidden;
          padding: 14px 0;
        }
        .marquee-track {
          display: flex;
          gap: 40px;
          animation: marquee 35s linear infinite;
          white-space: nowrap;
          width: max-content;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-item {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--muted-2);
          flex-shrink: 0;
        }
        .marquee-item.highlight { color: var(--amber); }

        /* ── LOCATIONS SECTION ── */
        .section {
          padding: 100px 0;
        }
        .section-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 48px;
        }
        .section-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .section-line {
          width: 32px; height: 1px;
          background: var(--amber);
        }
        .section-eyebrow {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--amber);
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(32px, 4vw, 56px);
          color: var(--text);
          line-height: 0.95;
        }
        .section-title .dim {
          color: var(--muted-2);
        }
        .section-link {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
          flex-shrink: 0;
          padding-bottom: 4px;
        }
        .section-link:hover { color: var(--amber); }

        /* asymmetric grid */
        .locations-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr 1fr;
          grid-template-rows: 260px 260px;
          gap: 2px;
        }
        .loc-card {
          position: relative;
          overflow: hidden;
          cursor: none;
          background: var(--bg-card);
        }
        .loc-card:first-child {
          grid-row: span 2;
        }
        .loc-card img {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.55;
          filter: grayscale(20%);
          transition: opacity 0.6s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .loc-card:hover img {
          opacity: 0.7;
          transform: scale(1.04);
        }
        .loc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8,12,20,0.95) 0%, rgba(8,12,20,0.3) 60%, transparent 100%);
        }
        .loc-content {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 24px;
        }
        .loc-code {
          font-size: 8px;
          letter-spacing: 0.3em;
          color: var(--amber);
          margin-bottom: 6px;
          text-transform: uppercase;
        }
        .loc-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: var(--text);
          margin-bottom: 4px;
          line-height: 1.1;
        }
        .loc-card:first-child .loc-name {
          font-size: clamp(22px, 2.5vw, 30px);
          margin-bottom: 12px;
        }
        .loc-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .loc-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--muted);
        }
        .loc-rating span { color: var(--amber); }
        .loc-price {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 22px;
          color: var(--text);
        }
        .loc-card:first-child .loc-price {
          font-size: 32px;
        }
        .loc-price sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 400;
          color: var(--muted);
          bottom: 0;
        }
        .loc-badge {
          position: absolute;
          top: 20px; right: 20px;
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--bg);
          background: var(--amber);
          padding: 5px 10px;
        }
        .loc-book-btn {
          display: block;
          width: 100%;
          margin-top: 16px;
          background: transparent;
          border: 1px solid rgba(232,168,66,0.4);
          color: var(--amber);
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 10px;
          cursor: none;
          transition: background 0.2s, color 0.2s;
          text-align: center;
        }
        .loc-book-btn:hover {
          background: var(--amber);
          color: var(--bg);
        }

        /* ── PROMO BANNER ── */
        .promo {
          border-top: 1px solid var(--border-2);
          border-bottom: 1px solid var(--border-2);
          background: var(--bg-2);
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 480px;
          overflow: hidden;
        }
        .promo-text {
          padding: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .promo-ghost {
          position: absolute;
          top: 50%; right: -20px;
          transform: translateY(-50%);
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 120px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(232,168,66,0.06);
          pointer-events: none;
          line-height: 1;
          user-select: none;
        }
        .promo-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 8px;
          letter-spacing: 0.3em;
          color: var(--amber);
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .promo-tag::before {
          content: '';
          display: block;
          width: 24px; height: 1px;
          background: var(--amber);
        }
        .promo-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(36px, 4vw, 60px);
          line-height: 0.92;
          color: var(--text);
          margin-bottom: 24px;
        }
        .promo-title .highlight { color: var(--amber); }
        .promo-desc {
          font-size: 12px;
          line-height: 1.9;
          color: var(--muted);
          max-width: 380px;
          margin-bottom: 32px;
        }
        .promo-perks {
          list-style: none;
          margin-bottom: 40px;
        }
        .promo-perks li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          letter-spacing: 0.05em;
          color: rgba(235,233,228,0.7);
          padding: 8px 0;
          border-bottom: 1px solid var(--border-2);
        }
        .promo-perks li:first-child { border-top: 1px solid var(--border-2); }
        .perk-dot {
          width: 5px; height: 5px;
          background: var(--amber);
          flex-shrink: 0;
        }
        .promo-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--amber);
          color: var(--bg);
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 14px 28px;
          border: none;
          cursor: none;
          transition: opacity 0.2s;
          align-self: flex-start;
        }
        .promo-btn:hover { opacity: 0.85; }
        .promo-image {
          position: relative;
          overflow: hidden;
        }
        .promo-image img {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.4;
          filter: grayscale(30%) contrast(1.1);
          transition: opacity 0.6s;
        }
        .promo-image:hover img { opacity: 0.55; }
        .promo-image-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, var(--bg-2) 0%, transparent 50%);
        }

        /* ── FEATURES SECTION ── */
        .features-wrap {
          padding: 100px 0;
          background: var(--bg);
          position: relative;
          overflow: hidden;
        }
        .features-ghost {
          position: absolute;
          top: 50%; left: -2rem;
          transform: translateY(-50%);
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(80px, 15vw, 200px);
          color: transparent;
          -webkit-text-stroke: 1px rgba(232,168,66,0.04);
          pointer-events: none;
          user-select: none;
          line-height: 1;
          white-space: nowrap;
        }
        .features-grid {
          position: relative; z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: start;
          gap: 80px;
        }
        .features-left {
          position: sticky;
          top: 100px;
        }
        .features-list {
          display: flex;
          flex-direction: column;
        }
        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 32px 0;
          border-bottom: 1px solid var(--border-2);
          transition: border-color 0.2s;
        }
        .feature-item:first-child { border-top: 1px solid var(--border-2); }
        .feature-item:hover { border-color: rgba(232,168,66,0.2); }
        .feature-num {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 48px;
          color: rgba(232,168,66,0.08);
          line-height: 1;
          flex-shrink: 0;
          width: 56px;
          transition: color 0.3s;
          user-select: none;
        }
        .feature-item:hover .feature-num { color: rgba(232,168,66,0.15); }
        .feature-body { flex: 1; padding-top: 6px; }
        .feature-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }
        .feature-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 17px;
          color: var(--text);
          line-height: 1.2;
        }
        .feature-stat {
          font-size: 8px;
          letter-spacing: 0.2em;
          color: var(--amber);
          background: rgba(232,168,66,0.1);
          border: 1px solid rgba(232,168,66,0.2);
          padding: 4px 10px;
          white-space: nowrap;
          flex-shrink: 0;
          text-transform: uppercase;
        }
        .feature-desc {
          font-size: 11px;
          line-height: 1.85;
          color: var(--muted);
          letter-spacing: 0.02em;
        }

        /* ── ABOUT SECTION ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 0.85fr;
          gap: 80px;
          align-items: center;
        }
        .about-text { order: 1; }
        .about-image-wrap { order: 2; position: relative; }
        .about-image {
          position: relative;
          overflow: hidden;
        }
        .about-image::before {
          content: '';
          display: block;
          padding-top: 125%;
        }
        .about-image img {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.55;
          filter: grayscale(20%) contrast(1.1);
          transition: opacity 0.5s;
        }
        .about-image:hover img { opacity: 0.7; }
        .about-stat-card {
          position: absolute;
          bottom: -24px; left: -32px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          padding: 24px 28px;
          z-index: 2;
        }
        .about-stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 36px;
          color: var(--amber);
          line-height: 1;
          margin-bottom: 6px;
        }
        .about-stat-label {
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--muted);
          max-width: 110px;
          line-height: 1.6;
        }
        .about-perks {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin: 32px 0 40px;
          border: 1px solid var(--border-2);
        }
        .about-perk {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          font-size: 11px;
          letter-spacing: 0.05em;
          color: rgba(235,233,228,0.65);
          border-right: 1px solid var(--border-2);
          border-bottom: 1px solid var(--border-2);
          transition: background 0.2s;
        }
        .about-perk:nth-child(2n) { border-right: none; }
        .about-perk:nth-child(3),
        .about-perk:nth-child(4) { border-bottom: none; }
        .about-perk:hover { background: rgba(232,168,66,0.04); }
        .perk-square {
          width: 5px; height: 5px;
          background: var(--amber);
          flex-shrink: 0;
        }
        .about-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: 1px solid rgba(232,168,66,0.4);
          color: var(--amber);
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 13px 24px;
          cursor: none;
          transition: background 0.2s, color 0.2s;
        }
        .about-btn:hover {
          background: var(--amber);
          color: var(--bg);
        }

        /* ── CTA SECTION ── */
        .cta-wrap {
          position: relative;
          padding: 140px 0;
          overflow: hidden;
          background: var(--bg-2);
          border-top: 1px solid var(--border-2);
        }
        .cta-bg-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.07;
          filter: grayscale(100%);
        }
        .cta-inner {
          position: relative; z-index: 2;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          padding: 0 2rem;
        }
        .cta-tag {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          font-size: 9px;
          letter-spacing: 0.3em;
          color: var(--amber);
          text-transform: uppercase;
          margin-bottom: 36px;
        }
        .cta-tag-line { width: 32px; height: 1px; background: var(--amber); }
        .cta-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(44px, 7vw, 90px);
          line-height: 0.9;
          color: var(--text);
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }
        .cta-title .accent { color: var(--amber); }
        .cta-desc {
          font-size: 12px;
          line-height: 1.9;
          color: var(--muted);
          max-width: 480px;
          margin: 0 auto 48px;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--amber);
          color: var(--bg);
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 18px 40px;
          border: none;
          cursor: none;
          transition: opacity 0.2s;
        }
        .cta-btn:hover { opacity: 0.85; }

        /* ── FOOTER ── */
        .footer {
          background: var(--bg);
          border-top: 1px solid var(--border-2);
          padding: 72px 0 0;
        }
        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 60px;
          border-bottom: 1px solid var(--border-2);
          margin-bottom: 40px;
        }
        .footer-brand-mark {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .footer-mark-box {
          width: 32px; height: 32px;
          border: 1px solid var(--amber);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
        }
        .footer-mark-box::before {
          content: '';
          position: absolute;
          inset: 3px;
          border: 1px solid rgba(232,168,66,0.25);
        }
        .footer-brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 0.15em;
          color: var(--text);
        }
        .footer-desc {
          font-size: 11px;
          line-height: 1.9;
          color: var(--muted);
          margin-bottom: 24px;
          max-width: 260px;
        }
        .footer-socials {
          display: flex;
          gap: 8px;
        }
        .social-btn {
          width: 32px; height: 32px;
          border: 1px solid var(--border-2);
          background: transparent;
          color: var(--muted);
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: none;
          transition: border-color 0.2s, color 0.2s;
          font-family: 'JetBrains Mono', monospace;
        }
        .social-btn:hover {
          border-color: var(--amber);
          color: var(--amber);
        }
        .footer-col-title {
          font-size: 8px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--amber);
          margin-bottom: 20px;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-links a {
          font-size: 11px;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .footer-links a:hover { color: var(--text); }
        .footer-links a::before {
          content: '—';
          font-size: 9px;
          color: var(--muted-2);
        }
        .footer-address {
          font-size: 10px;
          line-height: 1.9;
          color: var(--muted);
          margin-bottom: 12px;
        }
        .footer-tel {
          font-size: 11px;
          color: var(--amber);
          letter-spacing: 0.1em;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          gap: 20px;
          flex-wrap: wrap;
        }
        .footer-copy {
          font-size: 9px;
          letter-spacing: 0.15em;
          color: var(--muted-2);
          text-transform: uppercase;
        }
        .footer-legal {
          display: flex;
          gap: 24px;
        }
        .footer-legal a {
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted-2);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-legal a:hover { color: var(--amber); }
        /* Full-width ghost name at footer bottom */
        .footer-wallname {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(48px, 11vw, 160px);
          color: transparent;
          -webkit-text-stroke: 1px rgba(232,168,66,0.05);
          letter-spacing: -0.02em;
          line-height: 0.9;
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-align: center;
          padding: 20px 0 0;
          user-select: none;
          border-top: 1px solid var(--border-2);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .locations-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
          .loc-card:first-child { grid-row: span 1; }
          .promo { grid-template-columns: 1fr; }
          .promo-image { min-height: 300px; display: none; }
          .about-grid { grid-template-columns: 1fr; gap: 60px; }
          .about-image-wrap { order: -1; }
          .about-stat-card { display: none; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }

        @media (max-width: 768px) {
          .nav { padding: 0 1rem; }
          .nav-links { display: none; }
          .hero-content { padding: 100px 1rem 40px; }
          .search-body { flex-direction: column; }
          .search-field { border-right: none; border-bottom: 1px solid var(--border-2); }
          .search-field:last-of-type { border-bottom: none; }
          .stats-inner { grid-template-columns: repeat(2, 1fr); }
          .stat-item:nth-child(2) { border-right: none; }
          .locations-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }
          .features-grid { grid-template-columns: 1fr; gap: 40px; }
          .features-left { position: static; }
          .promo-text { padding: 48px 24px; }
          .footer-grid { grid-template-columns: 1fr; }
          .section-inner { padding: 0 1rem; }
          .section-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .sticky-inner { gap: 8px; }
          .sticky-label { display: none; }
          .sticky-field { padding: 6px 10px; }
        }

        /* Mobile nav drawer */
        .mobile-menu {
          position: fixed;
          top: 64px; left: 0; right: 0; bottom: 0;
          background: var(--bg-2);
          z-index: 150;
          border-top: 1px solid var(--border-2);
          padding: 32px 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mobile-link {
          display: block;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid var(--border-2);
          transition: color 0.2s;
        }
        .mobile-link:hover, .mobile-link.active { color: var(--amber); }
        .mobile-cta {
          margin-top: 24px;
          display: block;
          background: var(--amber);
          color: var(--bg);
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 14px;
          text-align: center;
          border: none;
          cursor: none;
          width: 100%;
        }
        .mobile-divider {
          height: 1px; background: var(--border-2);
          margin: 16px 0;
        }
        .hamburger {
          background: transparent;
          border: 1px solid var(--border-2);
          color: var(--text);
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          cursor: none;
          flex-shrink: 0;
          transition: border-color 0.2s;
        }
        .hamburger:hover { border-color: var(--amber); }
      `}</style>

      {/* ── CUSTOM CURSOR ── */}
      <div className="cursor-dot" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className="cursor-ring" style={{ left: cursorRingPos.x, top: cursorRingPos.y }} />

      {/* ── STICKY SEARCH BAR ── */}
      <div className={`sticky-bar ${showStickyForm ? 'visible' : ''}`}>
        <div className="sticky-inner">
          <span className="sticky-label">// Search</span>

          <div className="sticky-field">
            <MapPin className="sticky-icon" style={{ width: 12, height: 12, color: 'var(--amber)' }} />
            <select
              className="sticky-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select destination</option>
              {DUMMY_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="sticky-field" style={{ flex: 1.2 }}>
            <DatePicker
              checkIn={checkInDate}
              checkOut={checkOutDate}
              onCheckInChange={setCheckInDate}
              onCheckOutChange={setCheckOutDate}
            />
          </div>

          <div className="sticky-field">
            <Users style={{ width: 12, height: 12, color: 'var(--amber)', flexShrink: 0 }} />
            <select className="sticky-select">
              <option>1 Room, 2 Adults</option>
              <option>1 Room, 1 Adult</option>
              <option>2 Rooms, 4 Adults</option>
              <option>More Options…</option>
            </select>
          </div>

          <button className="sticky-btn" onClick={() => setIsSearchOpen(true)}>
            Search <ArrowRight style={{ width: 12, height: 12 }} />
          </button>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="nav">
        <a className="nav-logo">
          <div className="nav-logo-mark">
            <Star style={{ width: 14, height: 14, color: 'var(--amber)' }} fill="currentColor" />
          </div>
          <div>
            <span className="nav-brand">NAVY LODGE</span>
            <span className="nav-sub">By Nexcom</span>
          </div>
        </a>

        <ul className="nav-links">
          {NAV_VERSIONS.map((v, i) => (
            <li key={v}>
              <Link to={`/homepage-${i + 1}`} className={i === 3 ? 'active' : ''}>
                Home {v}
              </Link>
            </li>
          ))}
          <li><div className="nav-divider" /></li>
          {NAV_LINKS.map((item) => (
            <li key={item}>
              <Link to={`/${item.toLowerCase()}`}>{item}</Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="nav-cta" style={{ display: 'none' }}>Book Now</button>
          <button
            className="hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ display: 'flex' }}
          >
            {isMobileMenuOpen
              ? <X style={{ width: 16, height: 16 }} />
              : <Menu style={{ width: 16, height: 16 }} />
            }
          </button>
        </div>

        <style>{`
          @media (min-width: 768px) {
            .nav .hamburger { display: none !important; }
            .nav .nav-cta { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {NAV_VERSIONS.map((v, i) => (
            <Link key={v} to={`/homepage-${i + 1}`} className={`mobile-link ${i === 3 ? 'active' : ''}`}>
              Home {v}
            </Link>
          ))}
          <div className="mobile-divider" />
          {NAV_LINKS.map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className="mobile-link">
              {item}
            </Link>
          ))}
          <button className="mobile-cta">Book Now</button>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="./beach.jpg"
            alt="Navy Lodge — premium military lodging"
            className="hero-img"
          />
          <div className="hero-gradient" />
        </div>

        {/* Ghost stroke — grid-breaking backdrop text */}
        <span className="hero-ghost">NAVY</span>

        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">
              <Shield style={{ display: 'inline', width: 10, height: 10, marginRight: 6 }} />
              Exclusive Military Lodging — Worldwide
            </span>
          </div>

          <h1 className="hero-headline">
            Comfort<br />
            You Can<br />
            <span className="accent">Trust.</span>
          </h1>

          <p className="hero-sub">
            Premium lodging exclusively for those who serve —<br />
            wherever duty takes you.
          </p>

          {/* Search panel */}
          <div className="hero-search">
            <div className="search-header">
              <div className="search-status-dot" />
              <span className="search-header-label">// Availability Search — Live</span>
            </div>
            <div className="search-body">
              <div className="search-field">
                <span className="search-field-label">Destination</span>
                <select
                  className="search-select"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Select base / location</option>
                  {DUMMY_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="search-field" style={{ flex: 1.3 }}>
                <span className="search-field-label">Dates</span>
                <DatePicker
                  checkIn={checkInDate}
                  checkOut={checkOutDate}
                  onCheckInChange={setCheckInDate}
                  onCheckOutChange={setCheckOutDate}
                />
              </div>
              <div className="search-field">
                <span className="search-field-label">Guests</span>
                <select className="search-select">
                  <option>1 Room, 2 Adults</option>
                  <option>1 Room, 1 Adult</option>
                  <option>2 Rooms, 4 Adults</option>
                  <option>More Options…</option>
                </select>
              </div>
            </div>
            <div className="search-footer">
              <span className="search-hint">200+ locations · Tax-exempt rates</span>
              <button className="search-submit" onClick={() => setIsSearchOpen(true)}>
                Check Availability
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="stats-bar">
          <div className="stats-inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {STATS.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className={`marquee-item ${item === '★' ? 'highlight' : ''}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── LOCATIONS ── */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <div className="section-meta">
                <div className="section-line" />
                <span className="section-eyebrow">Featured</span>
              </div>
              <h2 className="section-title">
                Top <span className="dim">Destinations</span>
              </h2>
            </div>
            <a href="#" className="section-link">
              View all 200+ <ChevronRight style={{ width: 12, height: 12 }} />
            </a>
          </div>

          <div className="locations-grid">
            {LOCATIONS.map((loc, i) => (
              <div key={loc.id} className="loc-card">
                <img src={loc.image} alt={loc.name} />
                <div className="loc-overlay" />
                {loc.badge && <div className="loc-badge">{loc.badge}</div>}
                <div className="loc-content">
                  <div className="loc-code">{loc.code}</div>
                  <div className="loc-name">{loc.name}</div>
                  <div className="loc-meta">
                    <div className="loc-rating">
                      <Star style={{ width: 10, height: 10, color: 'var(--amber)' }} fill="currentColor" />
                      <span>{loc.rating}</span>
                      <span style={{ marginLeft: 4 }}>{loc.location}</span>
                    </div>
                    <div className="loc-price">
                      ${loc.price}
                      <sub>/night</sub>
                    </div>
                  </div>
                  {i === 0 && (
                    <button className="loc-book-btn">Book This Lodge →</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO ── */}
      <div className="promo">
        <div className="promo-text">
          <span className="promo-ghost">15%</span>
          <span className="promo-tag">Limited Offer</span>
          <h2 className="promo-title">
            Save up to<br />
            <span className="highlight">15% off</span><br />
            Extended Stays
          </h2>
          <p className="promo-desc">
            On PCS orders or family vacation? Enjoy exclusive savings
            when you book 7 nights or more at any Navy Lodge worldwide.
          </p>
          <ul className="promo-perks">
            {['Complimentary breakfast daily', 'Free parking included', 'Flexible cancellation policy'].map((item) => (
              <li key={item}>
                <div className="perk-dot" />
                {item}
              </li>
            ))}
          </ul>
          <button className="promo-btn">
            View Offer Details <ArrowRight style={{ width: 14, height: 14 }} />
          </button>
        </div>
        <div className="promo-image">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Luxury pool"
          />
          <div className="promo-image-overlay" />
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div className="features-wrap">
        <span className="features-ghost">DIFFERENCE</span>
        <div className="section-inner">
          <div className="features-grid">
            <div className="features-left">
              <div className="section-meta">
                <div className="section-line" />
                <span className="section-eyebrow">Why Us</span>
              </div>
              <h2 className="section-title" style={{ marginBottom: 20 }}>
                The Navy Lodge<br />
                <span className="dim">Difference.</span>
              </h2>
              <p style={{ fontSize: 11, lineHeight: 1.9, color: 'var(--muted)', maxWidth: 340 }}>
                Built specifically for military members and their families —
                not adapted from a commercial hotel chain.
              </p>
            </div>
            <div className="features-list">
              {FEATURES.map((f) => (
                <div key={f.num} className="feature-item">
                  <span className="feature-num">{f.num}</span>
                  <div className="feature-body">
                    <div className="feature-title-row">
                      <span className="feature-title">{f.title}</span>
                      <span className="feature-stat">{f.stat}</span>
                    </div>
                    <p className="feature-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border-2)' }}>
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-text">
              <div className="section-meta">
                <div className="section-line" />
                <span className="section-eyebrow">Our Story</span>
              </div>
              <h2 className="section-title" style={{ marginBottom: 24 }}>
                Your Home,<br />
                Away from <span style={{ color: 'var(--amber)' }}>Home.</span>
              </h2>
              <p style={{ fontSize: 12, lineHeight: 1.95, color: 'var(--muted)', marginBottom: 16, maxWidth: 460 }}>
                We understand the unique lifestyle of military families. Navy Lodges
                are designed to provide comfortable, welcoming, and secure environments —
                whether you're on PCS orders or taking a well-deserved break.
              </p>
              <p style={{ fontSize: 11, lineHeight: 1.9, color: 'var(--muted-2)', marginBottom: 0, maxWidth: 460 }}>
                Spacious family suites, fully equipped kitchens, and complimentary
                breakfasts at select locations — all with the peace of mind that
                comes from staying on base.
              </p>
              <div className="about-perks">
                {['Spacious Suites', 'Full Kitchens', 'Free Parking', 'Pet-Friendly'].map((a) => (
                  <div key={a} className="about-perk">
                    <div className="perk-square" />
                    {a}
                  </div>
                ))}
              </div>
              <button className="about-btn">
                Learn More About Us <ArrowRight style={{ width: 12, height: 12 }} />
              </button>
            </div>
            <div className="about-image-wrap">
              <div className="about-image">
                <img
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Military family"
                />
              </div>
              <div className="about-stat-card">
                <div className="about-stat-value">500K+</div>
                <div className="about-stat-label">Families served worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-wrap">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="cta-bg-img"
        />
        <div className="cta-inner">
          <div className="cta-tag">
            <div className="cta-tag-line" />
            Get Started
            <div className="cta-tag-line" />
          </div>
          <h2 className="cta-title">
            Ready to Book<br />
            Your <span className="accent">Stay?</span>
          </h2>
          <p className="cta-desc">
            Join hundreds of thousands of military families who trust Navy Lodge
            for their travel and relocation needs.
          </p>
          <button className="cta-btn" onClick={() => setIsSearchOpen(true)}>
            Check Availability <ArrowRight style={{ width: 14, height: 14 }} />
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-brand-mark">
                <div className="footer-mark-box">
                  <Star style={{ width: 12, height: 12, color: 'var(--amber)' }} fill="currentColor" />
                </div>
                <span className="footer-brand-name">NAVY LODGE</span>
              </div>
              <p className="footer-desc">
                Premium, affordable, and secure lodging for military members
                and their families worldwide.
              </p>
              <div className="footer-socials">
                {[{ l: 'Facebook', i: 'f' }, { l: 'Twitter', i: '𝕏' }, { l: 'Instagram', i: 'in' }].map((s) => (
                  <button key={s.l} className="social-btn" aria-label={s.l}>{s.i}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="footer-col-title">Reservations</div>
              <ul className="footer-links">
                {['Book a Room', 'Modify / Cancel', 'Special Offers', 'Group Bookings'].map((item) => (
                  <li key={item}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                {['Our Story', 'Locations', 'Careers', 'NEXCOM'].map((item) => (
                  <li key={item}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Contact</div>
              <p className="footer-address">
                3280 Virginia Beach Blvd.<br />
                Virginia Beach, VA 23452
              </p>
              <div className="footer-tel">1-800-NAVY-INN</div>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copy">
              © {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.
            </span>
            <div className="footer-legal">
              {['Privacy', 'Terms', 'Accessibility'].map((item) => (
                <a key={item} href="#">{item}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Wall-to-wall ghost name */}
        <span className="footer-wallname">NAVY LODGE</span>
      </footer>

      {/* Search modal */}
      <SearchModal
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        location={selectedLocation}
        checkIn={checkInDate}
        checkOut={checkOutDate}
      />
    </>
  );
}