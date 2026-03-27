import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Hotel } from '../../../types/hotel';
import HotelCard from '../HotelCard';
import HotelDetailsContent from '../HotelDetailsContent';
import BookingForm from '../BookingForm';

interface MasterDetailPatternProps {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  onViewDetails: (hotel: Hotel) => void;
  onCloseDetails: () => void;
  checkIn?: Date;
  checkOut?: Date;
}

export default function MasterDetailPattern({
  hotels,
  selectedHotel,
  onViewDetails,
  onCloseDetails,
  checkIn,
  checkOut
}: MasterDetailPatternProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Hotel List - Left Side (60%) */}
        <div className="lg:w-3/5 space-y-6">
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

        {/* Detail Panel - Right Side (40%) */}
        <div className="lg:w-2/5">
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              {selectedHotel ? (
                <motion.div
                  key={selectedHotel.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] overflow-hidden border border-ocean-100/50"
                >
                  {/* Header with Close Button */}
                  <div className="flex items-center justify-between p-4 border-b border-ocean-100">
                    <h2 className="font-display text-lg font-semibold text-ocean-900">Details</h2>
                    <button
                      onClick={onCloseDetails}
                      className="p-2 hover:bg-ocean-100 rounded-full transition-colors lg:hidden"
                      aria-label="Close details"
                    >
                      <X className="w-5 h-5 text-ocean-600" />
                    </button>
                  </div>

                  {/* Scrollable Content */}
                  <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                    <div className="p-6 space-y-6">
                      <HotelDetailsContent
                        hotel={selectedHotel}
                        checkIn={checkIn}
                        checkOut={checkOut}
                      />

                      {/* Booking Form */}
                      <div className="border-t border-ocean-100 pt-6">
                        <BookingForm
                          hotel={selectedHotel}
                          checkIn={checkIn}
                          checkOut={checkOut}
                          onBook={() => console.log('Book', selectedHotel.id)}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] p-12 text-center border border-ocean-100/50"
                >
                  <div className="text-ocean-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-ocean-900 mb-2">Select a Hotel</h3>
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
}
