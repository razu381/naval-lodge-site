import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Hotel } from '../../types/hotel';
import HotelCard from './HotelCard';

interface SideDrawerResultsProps {
  isOpen: boolean;
  onClose: () => void;
  hotels: Hotel[];
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  onViewDetails: (hotel: Hotel) => void;
}

export default function SideDrawerResults({
  isOpen,
  onClose,
  hotels,
  location,
  checkIn,
  checkOut,
  onViewDetails
}: SideDrawerResultsProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[700px] bg-white shadow-2xl z-[60] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-ocean-100">
              <div>
                <h2 className="font-display text-2xl font-semibold text-ocean-900">Search Results</h2>
                <p className="text-sm text-ocean-500 mt-1">
                  {location || 'All Locations'} • {hotels.length} hotels found
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-ocean-100 rounded-full transition-colors"
                aria-label="Close results"
              >
                <X className="w-6 h-6 text-ocean-600" />
              </button>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {hotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    compact={true}
                    onViewDetails={() => onViewDetails(hotel)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
