'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Star,
  Menu,
  X,
  MapPin,
  Heart,
  ChevronRight
} from 'lucide-react';

const locations = [
  {
    id: 1,
    name: 'Naval Base San Diego',
    location: 'California, USA',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    lodges: 5,
    rating: 4.9
  },
  {
    id: 2,
    name: 'Pearl Harbor-Hickam',
    location: 'Hawaii, USA',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80',
    lodges: 3,
    rating: 4.8
  },
  {
    id: 3,
    name: 'Oceana / Dam Neck',
    location: 'Virginia, USA',
    image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800&q=80',
    lodges: 4,
    rating: 4.7
  },
  {
    id: 4,
    name: 'Naval Station Norfolk',
    location: 'Virginia, USA',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    lodges: 6,
    rating: 4.8
  },
  {
    id: 5,
    name: 'Naval Base Kitsap',
    location: 'Washington, USA',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    lodges: 2,
    rating: 4.6
  },
  {
    id: 6,
    name: 'Jacksonville NAS',
    location: 'Florida, USA',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    lodges: 3,
    rating: 4.7
  }
];

export default function LocationsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans text-ocean-900">
      {/* NAVIGATION - Premium Navy with Yellow Top Border */}
      <nav className="sticky top-0 z-50 bg-[#002B5C] backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FFCF01] opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/homepage-2" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-11 h-11 bg-gradient-to-br from-[#FFCF01] to-[#FFD84D] rounded-xl flex items-center justify-center shadow-lg shadow-[#FFCF01]/25 group-hover:shadow-[#FFCF01]/40 group-hover:scale-105 transition-all duration-300">
                <Star className="w-5 h-5 text-[#002B5C]" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight leading-none text-white">NAVY LODGE</span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#FFCF01] mt-0.5 font-semibold">by NEXCOM Hospitality Group</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link href="/cabins" className="text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 px-4 py-2 rounded-lg transition-all relative">Cabins</Link>
              <Link href="/inns" className="text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 px-4 py-2 rounded-lg transition-all relative">Inns</Link>
              <Link href="/locations" className="text-sm font-bold text-[#FFCF01] bg-white/10 px-4 py-2 rounded-lg relative">
                Locations
                <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-[#FFCF01]"></span>
              </Link>
              <div className="w-px h-4 bg-white/20 mx-2"></div>
              <Link href="/(auth)/signin" className="text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 px-4 py-2 rounded-lg transition-all">Sign In</Link>
              <Link href="/(auth)/signup" className="text-sm font-semibold text-[#002B5C] bg-[#FFCF01] hover:bg-[#FFD84D] px-5 py-2 rounded-lg transition-all shadow-lg shadow-[#FFCF01]/20">Create Account</Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:bg-white/10 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#002B5C] backdrop-blur-xl border-t border-white/10 px-4 pt-2 pb-4 space-y-1 shadow-xl">
            <Link href="/cabins" className="block px-3 py-3 text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 rounded-lg">Cabins</Link>
            <Link href="/inns" className="block px-3 py-3 text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 rounded-lg">Inns</Link>
            <Link href="/locations" className="block px-3 py-3 text-sm font-bold text-[#FFCF01] bg-white/10 rounded-lg">Locations</Link>
            <div className="border-t border-white/20 my-2"></div>
            <Link href="/(auth)/signin" className="block px-3 py-3 text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 rounded-lg">Sign In</Link>
            <Link href="/(auth)/signup" className="block px-3 py-3 text-sm font-semibold text-[#002B5C] bg-[#FFCF01] rounded-lg">Create Account</Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION - Premium Navy */}
      <section className="pt-20 pb-16 bg-[#002B5C] relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-mono mb-4 block text-xs font-bold tracking-[0.25em] text-[#FFCF01] uppercase">Discover</span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Our <span className="text-[#FFCF01]">Locations</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
            Discover Navy Lodge locations across the United States and worldwide, providing comfortable, secure accommodations for military families.
          </p>
        </div>
      </section>

      {/* LOCATIONS GRID - Premium Cards */}
      <section className="py-16 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <div key={location.id} className="group bg-white rounded-[20px] shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(0,43,92,0.3)] transition-all duration-400 overflow-hidden border border-transparent hover:border-[#FFCF01]/20">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Navy overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002B5C] via-[#002B5C]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                  
                  <button
                    onClick={() => toggleFavorite(location.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-10 border border-white/20"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${favorites.includes(location.id) ? 'fill-[#FFCF01] text-[#FFCF01]' : 'text-[#505759]'}`}
                    />
                  </button>
                  
                  {/* View button that slides up */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-10">
                    <button type="button" className="w-full py-3 px-6 bg-[#002B5C] text-[#FFCF01] font-bold rounded-xl hover:bg-[#FFCF01] hover:text-[#002B5C] transition-colors text-sm">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-[#002B5C] mb-3">{location.name}</h3>
                  <p className="text-[#505759] text-sm mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FFCF01]" /> {location.location}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-[#C7C8CA]">
                    <span className="text-[#002B5C] text-sm font-medium">{location.lodges} Lodge{location.lodges > 1 ? 's' : ''}</span>
                    <span className="text-sm text-[#FFCF01] font-bold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#FFCF01]" /> {location.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#FFCF01] mt-0.5 font-semibold">by NEXCOM Hospitality Group</span>
            </div>
          </div>
          <p className="text-white/50 text-sm">© {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.</p>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx global>{`
        .label-mono {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </div>
  );
}
