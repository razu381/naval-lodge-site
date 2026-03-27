import Image from 'next/image';
import { Star } from 'lucide-react';
import { Location } from '@/types/hotel';

interface LocationCardProps {
  location: Location;
  variant?: 'default' | 'featured' | 'compact';
}

export default function LocationCard({ location, variant = 'default' }: LocationCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <div className={`relative overflow-hidden bg-navy-card group ${isFeatured ? 'row-span-2' : ''}`}>
      <Image
        src={location.image}
        alt={location.name}
        fill
        className="object-cover opacity-55 grayscale-[20%] group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-bg/95 via-navy-bg/30 at-60% to-transparent" />

      {location.badge && (
        <div className="absolute top-5 right-5 text-[8px] tracking-[0.2em] uppercase text-navy-bg bg-amber px-2.5 py-1">
          {location.badge}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="text-[8px] tracking-[0.3em] uppercase text-amber mb-1.5">
          {location.code}
        </div>
        <h3 className={`font-syne font-bold text-text ${isFeatured ? 'text-[clamp(22px,2.5vw,30px)]' : 'text-lg'} leading-tight mb-1`}>
          {location.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-text-muted">
            <Star className="w-2.5 h-2.5 text-amber" fill="currentColor" />
            <span className="text-amber">{location.rating}</span>
            <span className="ml-1">{location.location}</span>
          </div>
          <div className={`font-syne font-bold text-text ${isFeatured ? 'text-2xl' : 'text-xl'}`}>
            ${location.price}
            <sub className="text-[10px] font-normal font-jetbrains text-text-muted bottom-0">/night</sub>
          </div>
        </div>
        {isFeatured && (
          <button className="w-full mt-4 bg-transparent border border-amber/40 text-amber font-jetbrains text-[9px] tracking-[0.2em] uppercase py-2.5 hover:bg-amber hover:text-navy-bg transition-colors">
            Book This Lodge →
          </button>
        )}
      </div>
    </div>
  );
}
