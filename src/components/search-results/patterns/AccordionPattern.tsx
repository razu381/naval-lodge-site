'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hotel } from '@/types/hotel';
import HotelCard from '../HotelCard';
import HotelDetailsContent from '../HotelDetailsContent';
import BookingForm from '../BookingForm';

interface AccordionPatternProps {
  hotels: Hotel[];
  expandedHotelId: number | null;
  onViewDetails: (hotel: Hotel) => void;
  checkIn?: Date;
  checkOut?: Date;
}

const AccordionPattern = React.memo(function AccordionPattern({
  hotels,
  expandedHotelId,
  onViewDetails,
  checkIn,
  checkOut
}: AccordionPatternProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {hotels.map((hotel) => {
          const isExpanded = expandedHotelId === hotel.id;

          return (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] overflow-hidden border border-ocean-100/50 transition-shadow"
              style={isExpanded ? { boxShadow: '0 8px 40px rgb(0,0,0,0.12)' } : undefined}
            >
              {/* Hotel Card - Always visible */}
              <div className="p-6">
                <HotelCard
                  hotel={hotel}
                  compact={true}
                  isSelected={isExpanded}
                  onViewDetails={() => onViewDetails(hotel)}
                />
              </div>

              {/* Expandable Details - Using CSS grid for reliable animation */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden min-h-0">
                  <div className="border-t border-ocean-100">
                    <div className="p-6">
                      <HotelDetailsContent
                        hotel={hotel}
                        checkIn={checkIn}
                        checkOut={checkOut}
                      />
                    </div>

                    {/* Booking Form */}
                    <div className="border-t border-ocean-100 p-6 bg-sand-50">
                      <BookingForm
                        hotel={hotel}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        onBook={() => console.log('Book', hotel.id)}                          compact={false}                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default AccordionPattern;
