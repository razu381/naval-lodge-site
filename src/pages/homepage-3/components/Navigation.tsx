import React, { useState, useEffect } from 'react';
import { Home, MapPin, Award, User, Menu, X, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  scrollProgress: number;
}

export default function Navigation({ scrollProgress }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();

  const navItems = [
    { id: 'hero', icon: Home, label: 'HOME', to: '/homepage-3' },
    { id: 'locations', icon: MapPin, label: 'LOCATIONS', to: '/locations' },
    { id: 'benefits', icon: Award, label: 'BENEFITS', to: '/homepage-3#benefits' },
    { id: 'about', icon: User, label: 'ABOUT', to: '/about' },
  ];

  useEffect(() => {
    // Track active section based on scroll
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const htmlElement = section as HTMLElement;
        const sectionTop = htmlElement.offsetTop;
        const sectionHeight = htmlElement.offsetHeight;
        if (scrollY >= sectionTop - 200 && scrollY < sectionTop + sectionHeight - 200) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* VERTICAL SPINE NAVIGATION - Desktop */}
      <nav className="vertical-nav fixed left-0 top-0 w-[60px] h-full bg-[#0C0A07] border-r border-white/5 z-50 flex flex-col items-center py-6">
        {/* Logo */}
        <Link to="/homepage-3" className="mb-12 group">
          <div className="w-10 h-10 bg-[#0D9488] flex items-center justify-center group-hover:bg-[#14B8A6] transition-colors">
            <Star className="w-5 h-5 text-[#0C0A07]" fill="currentColor" />
          </div>
        </Link>

        {/* Navigation Items */}
        <div className="flex-1 flex flex-col gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id || location.pathname === item.to;
            return (
              <Link
                key={item.id}
                to={item.to}
                className="relative group flex items-center"
              >
                <div className={`
                  w-10 h-10 flex items-center justify-center transition-all duration-300
                  ${isActive ? 'bg-[#0D9488]/10' : 'hover:bg-white/5'}
                `}>
                  <item.icon
                    className={`
                      w-5 h-5 transition-colors
                      ${isActive ? 'text-[#0D9488]' : 'text-[#8A8070] group-hover:text-[#F0F0F0]'}
                    `}
                  />
                </div>

                {/* Rotated Label */}
                <span
                  className={`
                    absolute left-14 text-[10px] tracking-[0.2em] uppercase
                    transition-all duration-300 whitespace-nowrap origin-left
                    ${isActive ? 'text-[#0D9488]' : 'text-[#666] group-hover:text-[#F0F0F0]'}
                  `}
                  style={{
                    left: 'calc(100% + 16px)',
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'left center',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {item.label}
                </span>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#0D9488]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
          <div
            className="h-full bg-[#0D9488] transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </nav>

      {/* MOBILE MENU TOGGLE */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-[#0C0A07] border border-white/10"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6 text-[#F0F0F0]" /> : <Menu className="w-6 h-6 text-[#F0F0F0]" />}
      </button>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#0C0A07] z-40 flex items-center justify-center">
          <div className="flex flex-col gap-8 text-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.id || location.pathname === item.to;
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    text-2xl font-medium tracking-tight transition-colors
                    ${isActive ? 'text-[#0D9488]' : 'text-[#F0F0F0] hover:text-[#0D9488]'}
                  `}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
