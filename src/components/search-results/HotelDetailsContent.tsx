import React from 'react';
import { MapPin, Star, Droplets, Wifi, Utensils, Dumbbell, Coffee, Waves, Car, Phone } from 'lucide-react';
import { Hotel } from '../../types/hotel';

const amenityIcons: { [key: string]: React.ReactNode } = {
  Pool: <Droplets className="w-6 h-6" />,
  "Free WiFi": <Wifi className="w-6 h-6" />,
  Restaurant: <Utensils className="w-6 h-6" />,
  "Fitness Center": <Dumbbell className="w-6 h-6" />,
  "Coffee Bar": <Coffee className="w-6 h-6" />,
  "Beach Access": <Waves className="w-6 h-6" />,
  Parking: <Car className="w-6 h-6" />
};

interface HotelDetailsContentProps {
  hotel: Hotel;
  checkIn?: Date;
  checkOut?: Date;
}

export default function HotelDetailsContent({ hotel, checkIn, checkOut }: HotelDetailsContentProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-3xl font-bold text-ocean-900 mb-2">{hotel.name}</h2>
        <div className="flex items-center gap-2 text-ocean-600 mb-3">
          <MapPin className="w-5 h-5 text-teal-accent" />
          <span>{hotel.distance}</span>
        </div>
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < Math.floor(hotel.rating) ? 'text-teal-accent fill-teal-accent' : 'text-ocean-300'}`}
            />
          ))}
          <span className="ml-2 text-lg font-semibold text-ocean-900">{hotel.rating}</span>
          <span className="text-ocean-500">({hotel.reviews} reviews)</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="rounded-2xl overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Description */}
      <div>
        <h3 className="font-semibold text-xl text-ocean-900 mb-3">About this property</h3>
        <p className="text-ocean-700 leading-relaxed">{hotel.description}</p>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-semibold text-xl text-ocean-900 mb-4">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {hotel.amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-3 p-3 bg-sand-50 rounded-xl">
              <div className="text-teal-accent">
                {amenityIcons[amenity] || <Coffee className="w-6 h-6" />}
              </div>
              <span className="text-ocean-800 font-medium">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Policies */}
      <div>
        <h3 className="font-semibold text-xl text-ocean-900 mb-3">Policies</h3>
        <div className="space-y-2 text-ocean-700">
          <p>• Check-in: 3:00 PM</p>
          <p>• Check-out: 11:00 AM</p>
          <p>• Free cancellation up to 24 hours before check-in</p>
          <p>• Valid military ID required</p>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-ocean-50 rounded-xl p-4">
        <div className="flex items-center gap-2 text-ocean-900 font-semibold mb-2">
          <Phone className="w-5 h-5 text-teal-accent" />
          <span>Contact Information</span>
        </div>
        <p className="text-ocean-700">Front desk available 24/7</p>
        <p className="text-ocean-700 text-sm mt-1">Military rates available for eligible personnel</p>
      </div>

      {/* Price Summary */}
      {checkIn && checkOut && (
        <div className="bg-teal-accent/10 rounded-xl p-4">
          <h3 className="font-semibold text-lg text-ocean-900 mb-2">Price Summary</h3>
          <div className="space-y-1 text-ocean-700">
            <div className="flex justify-between">
              <span>{hotel.currency}{hotel.price} per night</span>
            </div>
            <p className="text-sm text-ocean-600 mt-2">Taxes and fees may apply</p>
          </div>
        </div>
      )}
    </div>
  );
}
