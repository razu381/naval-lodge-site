'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, X } from 'lucide-react';
import { Hotel } from '@/types/hotel';
import HotelCard from './HotelCard';

interface InlineAccordionResultsProps {
  isOpen: boolean;
  onClose: () => void;
  hotels: Hotel[];
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  onViewDetails: (hotel: Hotel) => void;
}

export default function InlineAccordionResults({
  isOpen,
  onClose,
  hotels,
  location,
  checkIn,
  checkOut,
  onViewDetails
}: InlineAccordionResultsProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white border-t border-ocean-200 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-ocean-100 z-10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-ocean-900">Search Results</h2>
            <p className="text-sm text-ocean-500 mt-1">
              {location || 'All Locations'} • {hotels.length} hotels found
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-ocean-100 rounded-full transition-colors"
            aria-label="Close results"
          >
            <X className="w-5 h-5 text-ocean-600" />
          </button>
        </div>
      </div>

      {/* Results List */}
      <div className="px-6 py-4 space-y-4">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            compact={true}
            onViewDetails={() => onViewDetails(hotel)}
          />
        ))}
      </div>
    </motion.div>
  );
}
