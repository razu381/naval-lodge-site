import React from 'react';
import { Link } from 'react-router-dom';
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

export default function Locations() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [favorites, setFavorites] = React.useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-sand-50 font-sans text-ocean-800">
      {/* NAVIGATION */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-ocean-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-accent to-teal-light rounded-xl flex items-center justify-center shadow-lg shadow-teal-accent/25 group-hover:shadow-teal-accent/40 group-hover:scale-105 transition-all duration-300">
                <Star className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg tracking-tight leading-none text-ocean-900">NAVY LODGE</span>
                <span className="text-[10px] tracking-[0.15em] uppercase text-teal-accent font-medium">By Nexcom</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link to="/cabins" className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Cabins</Link>
              <Link to="/inns" className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Inns</Link>
              <Link to="/locations" className="text-sm font-medium text-ocean-900 bg-ocean-50 px-4 py-2 rounded-lg">Locations</Link>
              <div className="w-px h-4 bg-ocean-200 mx-2"></div>
              <Link to="/signin" className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Sign In</Link>
              <Link to="/signup" className="text-sm font-semibold text-white bg-ocean-900 hover:bg-ocean-800 px-5 py-2 rounded-lg transition-all shadow-lg shadow-ocean-900/10">Create Account</Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-ocean-600 hover:text-ocean-900 hover:bg-ocean-100 rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-ocean-100 px-4 pt-2 pb-4 space-y-1 shadow-xl">
            <Link to="/cabins" className="block px-3 py-3 text-sm font-medium text-ocean-700 hover:text-ocean-900 hover:bg-ocean-50 rounded-lg">Cabins</Link>
            <Link to="/inns" className="block px-3 py-3 text-sm font-medium text-ocean-700 hover:text-ocean-900 hover:bg-ocean-50 rounded-lg">Inns</Link>
            <Link to="/locations" className="block px-3 py-3 text-sm font-medium text-ocean-900 bg-ocean-50 rounded-lg">Locations</Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-ocean-900 mb-4">
            Our <span className="text-teal-accent italic">Locations</span>
          </h1>
          <p className="text-lg text-ocean-600 max-w-2xl leading-relaxed mb-8">
            Discover Navy Lodge locations across the United States and worldwide, providing comfortable accommodations for military families.
          </p>
        </div>
      </section>

      {/* LOCATIONS GRID */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <div key={location.id} className="group bg-white rounded-[1.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-ocean-100/50">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button
                    onClick={() => toggleFavorite(location.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${favorites.includes(location.id) ? 'fill-teal-accent text-teal-accent' : 'text-ocean-400'}`}
                    />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-medium text-ocean-900 mb-2">{location.name}</h3>
                  <p className="text-ocean-500 text-sm mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-accent" /> {location.location}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-ocean-600 text-sm">{location.lodges} Lodge{location.lodges > 1 ? 's' : ''}</span>
                    <span className="text-sm text-teal-accent font-medium flex items-center gap-1">
                      <Star className="w-4 h-4 fill-teal-accent" /> {location.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ocean-950 text-ocean-400 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-teal-accent rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-ocean-900" fill="currentColor" />
            </div>
            <span className="font-bold text-lg text-white">NAVY LODGE</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
