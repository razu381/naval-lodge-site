'use client';

import React from 'react';
import { MapPin, Star, ChevronRight, Droplets, Wifi, Utensils, Dumbbell, Coffee, Waves, Car, Heart } from 'lucide-react';
import { Hotel } from '@/types/hotel';

const amenityIcons: { [key: string]: React.ReactNode } = {
  Pool: <Droplets className="w-4 h-4" />,
  "Free WiFi": <Wifi className="w-4 h-4" />,
  Restaurant: <Utensils className="w-4 h-4" />,
  "Fitness Center": <Dumbbell className="w-4 h-4" />,
  "Coffee Bar": <Coffee className="w-4 h-4" />,
  "Beach Access": <Waves className="w-4 h-4" />,
  Parking: <Car className="w-4 h-4" />
};

interface HotelCardProps {
  hotel: Hotel;
  compact?: boolean;
  isSelected?: boolean;
  onViewDetails: () => void;
}

const HotelCard = React.memo(function HotelCard({ hotel, compact = false, isSelected = false, onViewDetails }: HotelCardProps) {
  const [isFavorited, setIsFavorited] = React.useState(false);

  return (
    <div
      className={`group bg-white rounded-2xl transition-all duration-300 overflow-hidden border ${
        isSelected
          ? 'shadow-[0_8px_40px_rgb(255,207,1,0.25)] border-teal-accent ring-2 ring-teal-accent/20'
          : 'shadow-[0_4px_20px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] border-ocean-100/50 hover:border-ocean-200'
      }`}
    >
      <div className={`flex flex-col ${compact ? '' : 'md:flex-row'}`}>
        {/* Image */}
        <div className={`relative ${compact ? 'h-48' : 'md:w-2/5 h-64 md:h-auto'} overflow-hidden`}>
          <img
            src={hotel.image}
            alt={hotel.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {hotel.discount && (
              <span className="bg-teal-accent text-ocean-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                {hotel.discount}
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorited(!isFavorited);
            }}
            className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110"
            aria-label="Favorite"
          >
            <Heart className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-ocean-600'}`} />
          </button>
        </div>

        {/* Content */}
        <div className={`flex flex-col ${compact ? '' : 'md:w-3/5'} p-5`}>
          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-display text-xl md:text-2xl font-semibold text-ocean-900 mb-2 group-hover:text-teal-accent transition-colors">
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-ocean-600">
                  <MapPin className="w-4 h-4 text-teal-accent flex-shrink-0" />
                  <span>{hotel.distance}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-br from-amber-50 to-amber-100 px-3 py-1.5 rounded-full border border-amber-200">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-amber-700">{hotel.rating}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-ocean-600 text-sm mb-4 line-clamp-2">{hotel.description}</p>

            {/* Amenity Icons - Show more in non-compact mode */}
            {!compact && (
              <div className="flex flex-wrap gap-3 mb-4">
                {hotel.amenities.slice(0, 4).map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-sand-50 rounded-lg"
                    title={amenity}
                  >
                    <span className="text-teal-accent">{amenityIcons[amenity]}</span>
                    <span className="text-xs font-medium text-ocean-700">{amenity}</span>
                  </div>
                ))}
                {hotel.amenities.length > 4 && (
                  <span className="text-xs text-ocean-500 px-2.5 py-1">+{hotel.amenities.length - 4} more</span>
                )}
              </div>
            )}

            {/* Reviews */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'text-amber-400 fill-amber-400' : 'text-ocean-200'}`}
                  style={{ width: '16px', height: '16px' }}
                />
              ))}
              <span className="text-xs text-ocean-500 ml-2">
                Based on {hotel.reviews} reviews
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-ocean-100 mt-auto">
            <div>
              <p className="text-xs text-ocean-500 mb-1">Starting from</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl md:text-3xl font-bold text-ocean-900">{hotel.currency}{hotel.price}</span>
                <span className="text-sm text-ocean-500">/night</span>
              </div>
            </div>
            <button
              onClick={onViewDetails}
              className="bg-teal-accent hover:bg-teal-accent/80 text-ocean-900 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-accent/20 hover:-translate-y-0.5 flex items-center gap-2 group/btn"
            >
              {compact ? 'Details' : 'View Details'}
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default HotelCard;
