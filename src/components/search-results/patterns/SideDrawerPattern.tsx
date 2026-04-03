'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Hotel } from '@/types/hotel';
import HotelCard from '../HotelCard';
import HotelDetailsContent from '../HotelDetailsContent';
import BookingForm from '../BookingForm';

interface SideDrawerPatternProps {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  onViewDetails: (hotel: Hotel) => void;
  onCloseDetails: () => void;
  checkIn?: Date;
  checkOut?: Date;
}

export default function SideDrawerPattern({
  hotels,
  selectedHotel,
  onViewDetails,
  onCloseDetails,
  checkIn,
  checkOut
}: SideDrawerPatternProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedHotel) {
        onCloseDetails();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedHotel, onCloseDetails]);

  useEffect(() => {
    if (selectedHotel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedHotel]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
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

      <AnimatePresence>
        {selectedHotel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onCloseDetails}
              className="fixed inset-0 bg-black/40 z-50"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-150 h-full bg-white shadow-2xl z-70 flex flex-col"
            >
              <div className="shrink-0 flex items-center justify-between px-4 py-3 md:py-4 border-b border-ocean-100">
                <h2 className="font-display text-lg md:text-xl font-semibold text-ocean-900">Hotel Details</h2>
                <button
                  onClick={onCloseDetails}
                  className="p-2 hover:bg-ocean-100 rounded-full transition-colors"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-ocean-600" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-4 md:p-6">
                  <HotelDetailsContent hotel={selectedHotel} checkIn={checkIn} checkOut={checkOut} />
                </div>
              </div>

              <div className="shrink-0 border-t border-ocean-100 p-4 bg-white">
                <BookingForm hotel={selectedHotel} checkIn={checkIn} checkOut={checkOut} onBook={() => console.log('Book', selectedHotel.id)} compact={true} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
