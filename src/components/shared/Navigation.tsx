'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Star, Menu, X } from 'lucide-react';
import { useUIStore } from '@/store';
import { NAV_LINKS, NAV_VERSIONS } from '@/data/constants';

export default function Navigation() {
  const pathname = usePathname();
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border-2 bg-navy-bg">
      <div className="mx-auto max-w-7xl px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 border border-amber flex items-center justify-center relative">
            <div className="absolute inset-0.5 border border-amber/30" />
            <Star className="w-3.5 h-3.5 text-amber" fill="currentColor" />
          </div>
          <div>
            <span className="font-syne font-extrabold text-sm tracking-widest text-text">
              NAVY LODGE
            </span>
            <span className="block text-[8px] tracking-[0.3em] text-amber font-jetbrains">
              by NEXCOM Hospitality Group
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-0">
          {NAV_VERSIONS.map((v, i) => (
            <li key={v}>
              <Link
                href={`/homepage-${i + 1}`}
                className={`text-[10px] tracking-[0.15em] uppercase px-4 py-2 transition-colors font-jetbrains ${
                  pathname === `/homepage-${i + 1}`
                    ? 'text-amber'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                Home {v}
              </Link>
            </li>
          ))}
          <li className="w-px h-5 bg-border-2 mx-2" />
          {NAV_LINKS.map((item) => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="text-[10px] tracking-[0.15em] uppercase px-4 py-2 text-text-muted hover:text-text transition-colors font-jetbrains"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button className="hidden lg:block bg-amber text-navy-bg font-jetbrains text-[10px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 hover:opacity-85 transition-opacity">
            Book Now
          </button>
          <button
            onClick={toggleMobileMenu}
            className="lg:flex w-9 h-9 border border-border-2 text-text hover:border-amber transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-navy-bg-2 border-t border-border-2 p-8 flex flex-col gap-1">
          {NAV_VERSIONS.map((v, i) => (
            <Link
              key={v}
              href={`/homepage-${i + 1}`}
              onClick={toggleMobileMenu}
              className={`text-[11px] tracking-[0.2em] uppercase py-3.5 border-b border-border-2 font-jetbrains transition-colors ${
                pathname === `/homepage-${i + 1}` ? 'text-amber' : 'text-text-muted'
              }`}
            >
              Home {v}
            </Link>
          ))}
          <div className="h-px bg-border-2 my-4" />
          {NAV_LINKS.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              onClick={toggleMobileMenu}
              className="text-[11px] tracking-[0.2em] uppercase py-3.5 border-b border-border-2 text-text-muted font-jetbrains"
            >
              {item}
            </Link>
          ))}
          <button className="mt-6 w-full bg-amber text-navy-bg font-jetbrains text-[10px] font-bold tracking-[0.2em] uppercase py-3.5">
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
}
