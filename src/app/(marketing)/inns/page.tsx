'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Star,
  Menu,
  X,
  MapPin,
  Heart,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Wifi,
  PawPrint,
  Waves,
  Coffee,
  Users,
  Flame,
  Building2,
  Calendar,
  Utensils
} from 'lucide-react';
import SearchModal from '@/components/shared/SearchModal';

const innsData = {
  featured: [
    { id: 1, title: "Navy Lodge Virginia Beach", location: "Virginia Beach, VA", price: 95, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", rating: 4.9, distance: "2.3 miles from base" },
    { id: 2, title: "Naval Station Norfolk Inn", location: "Norfolk, VA", price: 89, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80", rating: 4.8, distance: "1.5 miles from base" },
    { id: 3, title: "San Diego Naval Lodge", location: "San Diego, CA", price: 109, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", rating: 4.7, distance: "3.1 miles from base" },
  ],
  eastCoast: [
    { id: 4, title: "Naval Station Mayport", location: "Jacksonville, FL", price: 85, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80", rating: 4.9, distance: "1.8 miles from base" },
    { id: 5, title: "Charleston Navy Lodge", location: "Charleston, SC", price: 92, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80", rating: 4.8, distance: "2.0 miles from base" },
    { id: 6, title: "Naval Air Station Pensacola", location: "Pensacola, FL", price: 88, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", rating: 4.7, distance: "1.2 miles from base" },
  ],
  westCoast: [
    { id: 7, title: "Bremerton Navy Lodge", location: "Bremerton, WA", price: 99, image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80", rating: 4.9, distance: "2.5 miles from base" },
    { id: 8, title: "Naval Base San Diego Inn", location: "San Diego, CA", price: 104, image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80", rating: 4.8, distance: "2.8 miles from base" },
    { id: 9, title: "Whidbey Island Lodge", location: "Oak Harbor, WA", price: 87, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", rating: 4.6, distance: "1.9 miles from base" },
  ],
  midwest: [
    { id: 10, title: "Great Lakes Naval Lodge", location: "Great Lakes, IL", price: 79, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", rating: 4.8, distance: "0.5 miles from base" },
    { id: 11, title: "Fort Meade Navy Lodge", location: "Fort Meade, MD", price: 95, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80", rating: 4.7, distance: "1.3 miles from base" },
    { id: 12, title: "Columbus Navy Lodge", location: "Columbus, OH", price: 82, image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&q=80", rating: 4.9, distance: "2.1 miles from base" },
  ],
  south: [
    { id: 13, title: "Corpus Christi Navy Lodge", location: "Corpus Christi, TX", price: 86, image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80", rating: 4.8, distance: "1.6 miles from base" },
    { id: 14, title: "Kings Bay Naval Lodge", location: "Kings Bay, GA", price: 83, image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80", rating: 4.7, distance: "1.4 miles from base" },
    { id: 15, title: "Millington Navy Lodge", location: "Millington, TN", price: 78, image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", rating: 4.6, distance: "1.1 miles from base" },
  ],
};

const amenities = [
  { icon: Wifi, label: "Free WiFi" },
  { icon: Coffee, label: "Continental Breakfast" },
  { icon: Utensils, label: "Kitchen" },
  { icon: Building2, label: "Laundry" },
  { icon: Flame, label: "Pet Friendly" },
];

export default function InnsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);

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

  const InnCard = ({ inn }: { inn: typeof innsData.featured[0] }) => (
    <div className="group bg-white rounded-[20px] shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(0,43,92,0.3)] transition-all duration-400 overflow-hidden border border-transparent hover:border-[#FFCF01]/20">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={inn.image} 
          alt={inn.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Navy overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#002B5C] via-[#002B5C]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
        
        <button 
          onClick={() => toggleFavorite(inn.id)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-10 border border-white/20"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${favorites.includes(inn.id) ? 'fill-[#FFCF01] text-[#FFCF01]' : 'text-[#505759]'}`} 
          />
        </button>
        
        {/* Base badge */}
        <div className="absolute top-4 left-4 bg-[#002B5C]/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <span className="text-xs font-bold text-[#FFCF01] uppercase tracking-wider">Navy Lodge</span>
        </div>
        
        {/* View button that slides up */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-10">
          <button type="button" className="w-full py-3 px-6 bg-[#002B5C] text-[#FFCF01] font-bold rounded-xl hover:bg-[#FFCF01] hover:text-[#002B5C] transition-colors text-sm">
            View Details
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-[#002B5C] mb-2">{inn.title}</h3>
        <p className="text-[#505759] text-sm mb-1 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#FFCF01]" /> {inn.location}
        </p>
        <p className="text-[#C7C8CA] text-sm mb-4 flex items-center gap-2">
          <Building2 className="w-3.5 h-3.5" /> {inn.distance}
        </p>
        <div className="flex justify-between items-center pt-4 border-t border-[#C7C8CA]">
          <div>
            <span className="text-3xl font-display font-bold text-[#002B5C]">${inn.price}</span>
            <span className="text-[#C7C8CA] text-sm font-semibold">/night</span>
          </div>
          <span className="text-sm text-[#FFCF01] font-bold flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#FFCF01]" /> {inn.rating}
          </span>
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({ title, showViewMore = true }: { title: string; showViewMore?: boolean }) => (
    <div className="flex justify-between items-end mb-8">
      <h2 className="font-display text-3xl font-bold text-[#002B5C]">{title}</h2>
      {showViewMore && (
        <button className="text-[#002B5C] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
          View More <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans text-[#002B5C]">
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
              <Link href="/inns" className="text-sm font-bold text-[#FFCF01] bg-white/10 px-4 py-2 rounded-lg relative">
                Inns
                <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-[#FFCF01]"></span>
              </Link>
              <Link href="/locations" className="text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 px-4 py-2 rounded-lg transition-all relative">Locations</Link>
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
            <Link href="/inns" className="block px-3 py-3 text-sm font-bold text-[#FFCF01] bg-white/10 rounded-lg">Inns</Link>
            <Link href="/locations" className="block px-3 py-3 text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 rounded-lg">Locations</Link>
            <div className="border-t border-white/20 my-2"></div>
            <Link href="/(auth)/signin" className="block px-3 py-3 text-sm font-medium text-white hover:text-[#FFCF01] hover:bg-white/10 rounded-lg">Sign In</Link>
            <Link href="/(auth)/signup" className="block px-3 py-3 text-sm font-semibold text-[#002B5C] bg-[#FFCF01] rounded-lg">Create Account</Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION - Premium Navy */}
      <section className="relative pt-20 pb-16 bg-[#002B5C] overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="label-mono mb-4 block text-xs font-bold tracking-[0.25em] text-[#FFCF01] uppercase">Official Lodging</span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                Navy Lodge <span className="text-[#FFCF01]">Stays</span>
              </h1>
              <p className="text-lg text-white/80 max-w-md leading-relaxed mb-8">
                Convenient, affordable lodging near naval bases worldwide. Perfect for TDY, PCS, and family visits.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <amenity.icon className="w-4 h-4 text-[#FFCF01]" />
                    <span className="text-sm text-white font-medium">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" 
                  alt="Navy Lodge"
                  className="w-full h-[400px] object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white/15 backdrop-blur-xl p-6 rounded-2xl border border-white/30 shadow-2xl">
                  <div className="text-3xl font-bold text-white">150+</div>
                  <div className="text-sm text-white/80 font-medium">Locations Worldwide</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-mono mb-4 block text-xs font-bold tracking-[0.25em] text-[#FFCF01] uppercase">Featured</span>
          <SectionHeader title="Featured Navy Lodge Properties" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {innsData.featured.map(inn => (
              <InnCard key={inn.id} inn={inn} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-12">
            <button className="w-10 h-10 rounded-full border border-[#C7C8CA] flex items-center justify-center text-[#505759] hover:border-[#FFCF01] hover:text-[#FFCF01] transition-all cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFCF01]"></span>
              <span className="w-2 h-2 rounded-full bg-[#C7C8CA]"></span>
              <span className="w-2 h-2 rounded-full bg-[#C7C8CA]"></span>
            </div>
            <button className="w-10 h-10 rounded-full border border-[#C7C8CA] flex items-center justify-center text-[#505759] hover:border-[#FFCF01] hover:text-[#FFCF01] transition-all cursor-pointer">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* EAST COAST SECTION */}
      <section className="py-16 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-mono mb-4 block text-xs font-bold tracking-[0.25em] text-[#FFCF01] uppercase">East Coast</span>
          <SectionHeader title="East Coast Navy Lodges" />
          <div className="grid md:grid-cols-3 gap-8">
            {innsData.eastCoast.map(inn => (
              <InnCard key={inn.id} inn={inn} />
            ))}
          </div>
        </div>
      </section>

      {/* WEST COAST SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-mono mb-4 block text-xs font-bold tracking-[0.25em] text-[#FFCF01] uppercase">West Coast</span>
          <SectionHeader title="West Coast Navy Lodges" />
          <div className="grid md:grid-cols-3 gap-8">
            {innsData.westCoast.map(inn => (
              <InnCard key={inn.id} inn={inn} />
            ))}
          </div>
        </div>
      </section>

      {/* MIDWEST SECTION */}
      <section className="py-16 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-mono mb-4 block text-xs font-bold tracking-[0.25em] text-[#FFCF01] uppercase">Midwest</span>
          <SectionHeader title="Midwest Navy Lodges" />
          <div className="grid md:grid-cols-3 gap-8">
            {innsData.midwest.map(inn => (
              <InnCard key={inn.id} inn={inn} />
            ))}
          </div>
        </div>
      </section>

      {/* SOUTH SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="label-mono mb-4 block text-xs font-bold tracking-[0.25em] text-[#FFCF01] uppercase">South</span>
          <SectionHeader title="Southern Navy Lodges" />
          <div className="grid md:grid-cols-3 gap-8">
            {innsData.south.map(inn => (
              <InnCard key={inn.id} inn={inn} />
            ))}
          </div>
        </div>
      </section>

      {/* TDY TRAVELER BANNER */}
      <section className="py-16 px-4 bg-[#002B5C] relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-[20px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-white/10">
            <div className="md:w-2/5">
              <img 
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80" 
                alt="TDY Travel"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="md:w-3/5">
              <span className="label-mono block text-xs font-bold tracking-[0.25em] text-[#FFCF01] uppercase mb-4">For TDY Travelers</span>
              <h2 className="font-display text-3xl font-bold text-white mb-4">Government Per Diem Rates</h2>
              <p className="text-white/80 mb-6 leading-relaxed">Our Navy Lodge locations accept TDY reservations at government per diem rates. Book with your government travel card for easy processing.</p>
              <div className="flex gap-4">
                <button className="bg-[#FFCF01] hover:bg-[#FFD84D] text-[#002B5C] px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#FFCF01]/20 hover:shadow-[#FFCF01]/30">
                  Book TDY Stay
                </button>
                <button className="border-2 border-white/30 hover:border-[#FFCF01] text-white hover:text-[#FFCF01] px-8 py-4 rounded-xl font-bold transition-all">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - Premium Navy */}
      <footer className="bg-[#001233] text-white/80 py-16 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-white/10 pb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFCF01] to-[#FFD84D] rounded-xl flex items-center justify-center shadow-lg shadow-[#FFCF01]/20">
                <Star className="w-5 h-5 text-[#002B5C]" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-xl text-white">NAVY LODGE</span>
            </div>
            <p className="text-white/60 text-sm">Premium lodging for military families worldwide.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-[0.2em]">Reservations</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-[#FFCF01] transition-colors">Book a Room</Link></li>
              <li><Link href="#" className="hover:text-[#FFCF01] transition-colors">TDY Information</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-[0.2em]">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-[#FFCF01] transition-colors">Our Story</Link></li>
              <li><Link href="/locations" className="hover:text-[#FFCF01] transition-colors">Locations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-[0.2em]">Contact</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>1-800-NAVY-INN</li>
              <li>Virginia Beach, VA</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-xs text-center">
          <p className="text-white/50">© {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.</p>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx global>{`
        .label-mono {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>

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
