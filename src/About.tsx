import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Menu, X, Shield, Users, Globe, Award } from 'lucide-react';

export default function About() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const values = [
    { icon: Shield, title: 'Your Safety First', description: 'All our lodges are located on secure military installations, providing you with peace of mind.' },
    { icon: Users, title: 'Family-Focused', description: 'Spacious accommodations designed with military families in mind, featuring kitchens and laundry facilities.' },
    { icon: Globe, title: 'Worldwide Presence', description: 'Over 200 locations across 12 countries, wherever your service takes you.' },
    { icon: Award, title: 'Trusted Quality', description: 'Serving military families for over 50 years with a 4.8/5 guest satisfaction rating.' }
  ];

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
              <Link to="/locations" className="text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 px-4 py-2 rounded-lg transition-all">Locations</Link>
              <div className="w-px h-4 bg-ocean-200 mx-2"></div>
              <Link to="/about" className="text-sm font-medium text-ocean-900 bg-ocean-50 px-4 py-2 rounded-lg">About</Link>
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
            <Link to="/locations" className="block px-3 py-3 text-sm font-medium text-ocean-700 hover:text-ocean-900 hover:bg-ocean-50 rounded-lg">Locations</Link>
            <Link to="/about" className="block px-3 py-3 text-sm font-medium text-ocean-900 bg-ocean-50 rounded-lg">About</Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-ocean-900 mb-4">
            About <span className="text-teal-accent italic">Navy Lodge</span>
          </h1>
          <p className="text-lg text-ocean-600 max-w-3xl leading-relaxed mb-8">
            Navy Lodge Program provides comfortable, affordable accommodations for authorized patrons including active duty military, retirees, reservists, and their families.
          </p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-medium text-ocean-900 mb-6">Our Mission</h2>
              <p className="text-ocean-600 leading-relaxed mb-4">
                Since 1973, Navy Lodge has been committed to providing quality lodging and hospitality services to the military community. We understand the unique challenges of military life and strive to make your stays comfortable, affordable, and convenient.
              </p>
              <p className="text-ocean-600 leading-relaxed">
                As part of the Navy Exchange Service Command (NEXCOM), we reinvest our profits back into morale, welfare, and recreation programs for service members and their families.
              </p>
            </div>
            <div className="aspect-video rounded-[1.5rem] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
                alt="Navy Lodge"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-16 bg-sand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-medium text-ocean-900 mb-12 text-center">Why Choose Navy Lodge</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-[1.5rem] p-8 text-center hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-teal-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-teal-accent" />
                </div>
                <h3 className="font-serif text-xl font-medium text-ocean-900 mb-3">{value.title}</h3>
                <p className="text-ocean-600 text-sm">{value.description}</p>
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
