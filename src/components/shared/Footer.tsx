import Link from 'next/link';
import { Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-bg border-t border-border-2 pt-18">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-4 gap-12 pb-15 border-b border-border-2 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 border border-amber flex items-center justify-center relative flex-shrink-0">
                <div className="absolute inset-0.5 border border-amber/25" />
                <Star className="w-3 h-3 text-amber" fill="currentColor" />
              </div>
              <span className="font-syne font-extrabold text-xs tracking-widest text-text">
                NAVY LODGE
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-text-muted max-w-[260px] mb-6">
              Award-winning hospitality. High-quality accommodations at the best value worldwide for military members and their families.
            </p>
            <div className="flex gap-2">
              {['f', '𝕏', 'in'].map((s) => (
                <button
                  key={s}
                  className="w-8 h-8 border border-border-2 text-text-muted text-[10px] font-bold hover:border-amber hover:text-amber transition-colors font-jetbrains"
                  aria-label="Social link"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Reservations */}
          <div>
            <h3 className="text-[8px] tracking-[0.3em] uppercase text-amber mb-5">
              Reservations
            </h3>
            <ul className="flex flex-col gap-3">
              {['Book a Room', 'Modify / Cancel', 'Special Offers', 'Group Bookings'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-[11px] text-text-muted hover:text-text transition-colors flex items-center gap-1.5 before:content-['—'] before:text-[9px] before:text-text-muted-2"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[8px] tracking-[0.3em] uppercase text-amber mb-5">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {['Our Story', 'Locations', 'Careers', 'NEXCOM Hospitality Group'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-[11px] text-text-muted hover:text-text transition-colors flex items-center gap-1.5 before:content-['—'] before:text-[9px] before:text-text-muted-2"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[8px] tracking-[0.3em] uppercase text-amber mb-5">
              Contact
            </h3>
            <p className="text-[10px] leading-relaxed text-text-muted mb-3">
              3280 Virginia Beach Blvd.<br />
              Virginia Beach, VA 23452
            </p>
            <div className="text-[11px] text-amber tracking-[0.1em]">
              1-800-NAVY-INN
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center py-5 gap-5 flex-wrap">
          <span className="text-[9px] tracking-[0.15em] uppercase text-text-muted-2">
            © {new Date().getFullYear()} Navy Exchange Service Command. All rights reserved.
          </span>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Accessibility'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[9px] tracking-[0.15em] uppercase text-text-muted-2 hover:text-amber transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Wall Name */}
      <span className="font-syne font-extrabold text-9xl sm:text-8xl text-transparent stroke-amber/[0.05] [-webkit-text-stroke:1px_rgba(255,207,1,0.05)] tracking-[-0.02em] leading-[0.9] block overflow-hidden whitespace-nowrap text-center pt-5 border-t border-border-2">
        NAVY LODGE
      </span>
    </footer>
  );
}
