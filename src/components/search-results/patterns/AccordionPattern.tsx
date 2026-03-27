import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Hotel } from '../../../types/hotel';
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

export default function AccordionPattern({
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
            <motion.div
              key={hotel.id}
              layout
              className="bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] overflow-hidden border border-ocean-100/50"
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

              {/* Expandable Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    layout
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
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
                          onBook={() => console.log('Book', hotel.id)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
