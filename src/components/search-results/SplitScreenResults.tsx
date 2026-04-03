'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Hotel } from '@/types/hotel';
import HotelCard from './HotelCard';

interface SplitScreenResultsProps {
  isOpen: boolean;
  onClose: () => void;
  hotels: Hotel[];
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  onViewDetails: (hotel: Hotel) => void;
}

export default function SplitScreenResults({
  isOpen,
  onClose,
  hotels,
  location,
  checkIn,
  checkOut,
  onViewDetails
}: SplitScreenResultsProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-sand-50 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="bg-white border-b border-ocean-100 px-6 py-4 flex items-center justify-between">
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

      {/* Split Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Hotel List */}
        <div className="w-1/2 overflow-y-auto p-6">
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

        {/* Right: Details Panel (placeholder for now) */}
        <div className="w-1/2 bg-white border-l border-ocean-100 p-6 flex items-center justify-center">
          <div className="text-center text-ocean-400">
            <p className="text-lg">Select a hotel to view details</p>
            <p className="text-sm mt-2">Click "View Details" on any hotel</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
