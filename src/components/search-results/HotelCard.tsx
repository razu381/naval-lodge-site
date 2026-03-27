import React from 'react';
import { MapPin, Star, ChevronRight, Droplets, Wifi, Utensils, Dumbbell, Coffee, Waves, Car } from 'lucide-react';
import { Hotel } from '../../types/hotel';

const amenityIcons: { [key: string]: React.ReactNode } = {
  Pool: <Droplets className="w-5 h-5" />,
  "Free WiFi": <Wifi className="w-5 h-5" />,
  Restaurant: <Utensils className="w-5 h-5" />,
  "Fitness Center": <Dumbbell className="w-5 h-5" />,
  "Coffee Bar": <Coffee className="w-5 h-5" />,
  "Beach Access": <Waves className="w-5 h-5" />,
  Parking: <Car className="w-5 h-5" />
};

interface HotelCardProps {
  hotel: Hotel;
  compact?: boolean;
  isSelected?: boolean;
  onViewDetails: () => void;
}

export default function HotelCard({ hotel, compact = false, isSelected = false, onViewDetails }: HotelCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 overflow-hidden flex flex-col md:flex-row border border-ocean-100/50 ${isSelected ? 'ring-2 ring-teal-accent' : ''}`}
    >
      {/* Image */}
      <div className="md:w-1/3 relative">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-64 md:h-full object-cover"
        />
        {hotel.discount && (
          <div className="absolute top-4 left-4 bg-teal-accent text-ocean-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {hotel.discount}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="md:w-2/3 p-6 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-display text-2xl font-semibold text-ocean-900 mb-2">{hotel.name}</h3>
            <p className="text-ocean-500 mb-3">{hotel.description}</p>
            <div className="flex items-center gap-2 text-sm text-ocean-600">
              <MapPin className="w-4 h-4 text-teal-accent" />
              <span>{hotel.distance}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full">
            <Star className="w-4 h-4 text-teal-accent fill-teal-accent" />
            <span className="font-semibold text-sm">{hotel.rating}</span>
          </div>
        </div>

        {/* Amenity Icons */}
        {!compact && (
          <div className="flex flex-wrap gap-4 mb-4 text-ocean-500">
            {hotel.amenities.slice(0, 5).map((amenity) => (
              <div key={amenity} className="flex items-center gap-1.5 text-xs" title={amenity}>
                {amenityIcons[amenity]}
                <span>{amenity}</span>
              </div>
            ))}
            {hotel.amenities.length > 5 && (
              <span className="text-xs text-ocean-400">+{hotel.amenities.length - 5} more</span>
            )}
          </div>
        )}

        {/* Reviews */}
        <div className="mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'text-teal-accent fill-teal-accent' : 'text-ocean-300'}`}
              />
            ))}
          </div>
          <p className="text-sm text-ocean-500 mt-1">
            Rating: {hotel.rating} out of 5.0 based on {hotel.reviews} reviews
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-ocean-100">
          <div>
            <p className="text-xs text-ocean-500 mb-1">From*</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-ocean-900">{hotel.currency}{hotel.price}</span>
              <span className="text-sm text-ocean-500">/ night</span>
            </div>
            {hotel.discount && (
              <p className="text-xs text-teal-accent mt-1">{hotel.discount}</p>
            )}
          </div>
          <button
            onClick={onViewDetails}
            className="bg-teal-accent hover:bg-teal-accent/80 text-ocean-900 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-teal-accent/20 flex items-center gap-2 group cursor-pointer"
          >
            View Details
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
