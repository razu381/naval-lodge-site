'use client';

import { MapPin, Users, Calendar, ArrowRight } from 'lucide-react';
import { useSearchStore, useUIStore } from '@/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DUMMY_LOCATIONS } from '@/data/constants';

interface SearchWidgetProps {
  variant?: 'full' | 'compact' | 'sticky';
}

export default function SearchWidget({ variant = 'full' }: SearchWidgetProps) {
  const { location, setLocation, guests, setGuests } = useSearchStore();
  const { openSearchModal } = useUIStore();

  if (variant === 'sticky') {
    return (
      <div className="sticky top-16 z-40 bg-navy-bg-2 border-b border-border transition-transform">
        <div className="mx-auto max-w-7xl px-8 py-2.5 flex items-center gap-0">
          {/* Location */}
          <div className="flex items-center gap-2 px-4 py-2 border-r border-border-2 flex-1">
            <MapPin className="w-3 h-3 text-amber flex-shrink-0" />
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="border-0 bg-transparent p-0 h-auto text-[11px] font-jetbrains text-text shadow-none">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent className="bg-navy-bg-2 border border-border text-text">
                {DUMMY_LOCATIONS.map((loc) => (
                  <SelectItem key={loc} value={loc} className="font-jetbrains text-[11px]">
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Guests */}
          <div className="flex items-center gap-2 px-4 py-2 flex-1">
            <Users className="w-3 h-3 text-amber flex-shrink-0" />
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="border-0 bg-transparent p-0 h-auto text-[11px] font-jetbrains text-text shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-navy-bg-2 border border-border text-text">
                {['1 Room, 2 Adults', '1 Room, 1 Adult', '2 Rooms, 4 Adults'].map((g) => (
                  <SelectItem key={g} value={g} className="font-jetbrains text-[11px]">
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <button
            onClick={openSearchModal}
            className="bg-amber text-navy-bg font-jetbrains text-[10px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 flex items-center gap-1.5 hover:opacity-85 transition-opacity ml-4 flex-shrink-0"
          >
            Search <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-navy-bg-2 border border-border flex flex-col">
      {/* Header */}
      <div className="px-5 py-3 border-b border-border-2 flex items-center gap-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-text-muted font-jetbrains">
          // Availability Search — Live
        </span>
      </div>

      {/* Fields */}
      <div className="flex flex-row sm:flex-row">
        {/* Location */}
        <div className="flex-1 flex flex-col gap-1 px-5 py-4 border-r border-border-2 hover:bg-amber/[0.04] transition-colors">
          <span className="text-[8px] tracking-[0.25em] uppercase text-amber font-jetbrains">
            Destination
          </span>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="border-0 bg-transparent p-0 h-auto text-[12px] font-jetbrains text-text shadow-none">
              <SelectValue placeholder="Select base / location" />
            </SelectTrigger>
            <SelectContent className="bg-navy-bg-2 border border-border text-text">
              {DUMMY_LOCATIONS.map((loc) => (
                <SelectItem key={loc} value={loc} className="font-jetbrains text-[12px]">
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dates */}
        <div className="flex-[1.3] flex flex-col gap-1 px-5 py-4 border-r border-border-2 hover:bg-amber/[0.04] transition-colors">
          <span className="text-[8px] tracking-[0.25em] uppercase text-amber font-jetbrains">
            Dates
          </span>
          <div className="flex items-center gap-2 text-text-muted">
            <Calendar className="w-4 h-4" />
            <span className="text-[12px] font-jetbrains">Select dates</span>
          </div>
        </div>

        {/* Guests */}
        <div className="flex-1 flex flex-col gap-1 px-5 py-4 hover:bg-amber/[0.04] transition-colors">
          <span className="text-[8px] tracking-[0.25em] uppercase text-amber font-jetbrains">
            Guests
          </span>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="border-0 bg-transparent p-0 h-auto text-[12px] font-jetbrains text-text shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-navy-bg-2 border border-border text-text">
              {['1 Room, 2 Adults', '1 Room, 1 Adult', '2 Rooms, 4 Adults'].map((g) => (
                <SelectItem key={g} value={g} className="font-jetbrains text-[12px]">
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border-2 px-5 py-3 flex justify-between items-center">
        <span className="text-[9px] tracking-[0.15em] text-text-muted-2 font-jetbrains">
          200+ locations · Tax-exempt rates
        </span>
        <button
          onClick={openSearchModal}
          className="bg-amber text-navy-bg font-jetbrains text-[10px] font-bold tracking-[0.2em] uppercase px-7 py-3 flex items-center gap-2 hover:opacity-85 transition-opacity"
        >
          Check Availability <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
