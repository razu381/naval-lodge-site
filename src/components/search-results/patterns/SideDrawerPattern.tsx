import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Hotel } from '../../../types/hotel';
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
  // Handle ESC key to close drawer
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedHotel) {
        onCloseDetails();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedHotel, onCloseDetails]);

  // Prevent body scroll when drawer is open
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
      {/* Hotel List */}
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

      {/* Drawer Overlay */}
      <AnimatePresence>
        {selectedHotel && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onCloseDetails}
              className="fixed inset-0 bg-black/40 z-50"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-white shadow-2xl z-[70] overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-ocean-100">
                <h2 className="font-display text-xl font-semibold text-ocean-900">Hotel Details</h2>
                <button
                  onClick={onCloseDetails}
                  className="p-2 hover:bg-ocean-100 rounded-full transition-colors"
                  aria-label="Close details"
                >
                  <X className="w-6 h-6 text-ocean-600" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  <HotelDetailsContent
                    hotel={selectedHotel}
                    checkIn={checkIn}
                    checkOut={checkOut}
                  />
                </div>
              </div>

              {/* Fixed Bottom Booking Form */}
              <div className="flex-shrink-0 border-t border-ocean-100 p-6 bg-white">
                <BookingForm
                  hotel={selectedHotel}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onBook={() => console.log('Book', selectedHotel.id)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
