'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, MapPin, Phone, Wifi, Coffee, Utensils, Droplets, Dumbbell, Waves, Car } from 'lucide-react';
import { Hotel } from '@/types/hotel';
import HotelCard from '../HotelCard';
import HotelDetailsContent from '../HotelDetailsContent';
import BookingForm from '../BookingForm';

const amenityIcons: { [key: string]: React.ReactNode } = {
  Pool: <Droplets className="w-5 h-5" />,
  "Free WiFi": <Wifi className="w-5 h-5" />,
  Restaurant: <Utensils className="w-5 h-5" />,
  "Fitness Center": <Dumbbell className="w-5 h-5" />,
  "Coffee Bar": <Coffee className="w-5 h-5" />,
  "Beach Access": <Waves className="w-5 h-5" />,
  Parking: <Car className="w-5 h-5" />
};

interface MasterDetailPatternProps {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  onViewDetails: (hotel: Hotel) => void;
  onCloseDetails: () => void;
  checkIn?: Date;
  checkOut?: Date;
}

const MasterDetailPattern = React.memo(function MasterDetailPattern({
  hotels,
  selectedHotel,
  onViewDetails,
  onCloseDetails,
  checkIn,
  checkOut
}: MasterDetailPatternProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Hotel List - Left Side (60%) */}
        <div className="lg:w-3/5">
          <div className="space-y-6">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                compact={false}
                isSelected={selectedHotel?.id === hotel.id}
                onViewDetails={() => onViewDetails(hotel)}
              />
            ))}
          </div>
        </div>

        {/* Detail Panel - Right Side (40%) */}
        <div className="lg:w-2/5">
          <div className="lg:sticky lg:top-8">
            <AnimatePresence mode="wait">
              {selectedHotel ? (
                <motion.div
                  key={selectedHotel.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] overflow-hidden border border-ocean-100/50"
                >
                  {/* Header Image */}
                  <div className="relative h-56">
                    <img
                      src={selectedHotel.image}
                      alt={selectedHotel.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Close Button */}
                    <button
                      onClick={onCloseDetails}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center transition-colors shadow-lg lg:hidden"
                      aria-label="Close details"
                    >
                      <X className="w-5 h-5 text-ocean-900" />
                    </button>

                    {/* Price Badge */}
                    {selectedHotel.discount && (
                      <div className="absolute bottom-4 left-4 bg-teal-accent text-ocean-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        {selectedHotel.discount}
                      </div>
                    )}
                  </div>

                  {/* Title Section */}
                  <div className="px-6 py-4 border-b border-ocean-100">
                    <h2 className="font-display text-xl font-bold text-ocean-900 mb-2">{selectedHotel.name}</h2>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1 text-ocean-600">
                        <MapPin className="w-4 h-4 text-teal-accent" />
                        <span>{selectedHotel.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(selectedHotel.rating) ? 'text-amber-400 fill-amber-400' : 'text-ocean-200'}`}
                            style={{ width: '14px', height: '14px' }}
                          />
                        ))}
                        <span className="ml-1 font-semibold text-ocean-900">{selectedHotel.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="max-h-[calc(100vh-350px)] overflow-y-auto">
                    <div className="p-6 space-y-5">
                      {/* Description */}
                      <div>
                        <h3 className="font-semibold text-ocean-900 mb-2">About this property</h3>
                        <p className="text-ocean-700 text-sm leading-relaxed">{selectedHotel.description}</p>
                      </div>

                      {/* Amenities */}
                      <div>
                        <h3 className="font-semibold text-ocean-900 mb-3">Amenities</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedHotel.amenities.map((amenity) => (
                            <div
                              key={amenity}
                              className="flex items-center gap-2 p-2 bg-sand-50 rounded-lg"
                            >
                              <div className="text-teal-accent flex-shrink-0">
                                {amenityIcons[amenity] || <Coffee className="w-4 h-4" />}
                              </div>
                              <span className="text-xs font-medium text-ocean-800">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Policies */}
                      <div className="bg-ocean-50 rounded-xl p-4">
                        <h3 className="font-semibold text-ocean-900 mb-2 text-sm">Policies</h3>
                        <div className="space-y-1 text-xs text-ocean-700">
                          <p>• Check-in: 3:00 PM</p>
                          <p>• Check-out: 11:00 AM</p>
                          <p>• Free cancellation up to 24 hours before</p>
                          <p>• Valid military ID required</p>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="bg-teal-accent/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-ocean-900 font-semibold mb-1">
                          <Phone className="w-4 h-4 text-teal-accent" />
                          <span className="text-sm">Contact</span>
                        </div>
                        <p className="text-ocean-700 text-xs">Front desk available 24/7</p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Form */}
                  <div className="border-t border-ocean-100 p-4 bg-white">
                    <BookingForm
                      hotel={selectedHotel}
                      checkIn={checkIn}
                      checkOut={checkOut}
                      onBook={() => console.log('Book', selectedHotel.id)}
                      compact={false}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] p-12 text-center border border-ocean-100/50"
                >
                  <div className="text-ocean-300 mb-6">
                    <svg className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-ocean-900 mb-3">Select a Hotel</h3>
                  <p className="text-ocean-600">
                    Click "View Details" on any hotel to see more information and book your stay.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MasterDetailPattern;
