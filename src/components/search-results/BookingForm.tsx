'use client';

import React, { useState } from 'react';
import { Calendar, Users, ChevronDown, Check, Info } from 'lucide-react';
import { Hotel } from '@/types/hotel';
import DatePicker from '@/components/shared/DatePicker';

interface BookingFormProps {
  hotel: Hotel;
  checkIn?: Date;
  checkOut?: Date;
  onBook?: () => void;
  compact?: boolean;
}

export default function BookingForm({ hotel, checkIn, checkOut, onBook, compact = false }: BookingFormProps) {
  const [localCheckIn, setLocalCheckIn] = useState<Date | undefined>(checkIn);
  const [localCheckOut, setLocalCheckOut] = useState<Date | undefined>(checkOut);
  const [guests, setGuests] = useState(2);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);

  const calculateNights = () => {
    if (!localCheckIn || !localCheckOut) return 0;
    const diffTime = Math.abs(localCheckOut.getTime() - localCheckIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return hotel.price * nights;
  };

  const handleBook = () => {
    if (localCheckIn && localCheckOut && onBook) {
      onBook();
    }
  };

  const isBookable = localCheckIn && localCheckOut && calculateNights() > 0;

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      {compact ? (
        <h3 className="font-semibold text-base text-ocean-900">Book Your Stay</h3>
      ) : (
        <h3 className="font-semibold text-lg text-ocean-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal-accent" />
          Book Your Stay
        </h3>
      )}

      {/* Date Picker */}
      <div>
        <label className="block text-sm font-medium text-ocean-700 mb-1.5">Select Dates</label>
        <DatePicker
          checkIn={localCheckIn}
          checkOut={localCheckOut}
          onCheckInChange={setLocalCheckIn}
          onCheckOutChange={setLocalCheckOut}
        />
      </div>

      {/* Guests Selector */}
      <div className="relative">
        <label className="block text-sm font-medium text-ocean-700 mb-1.5">Number of Guests</label>
        <button
          onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
          className={`w-full flex items-center justify-between bg-white border-2 border-ocean-200 hover:border-teal-accent transition-colors ${compact ? 'px-3 py-2 rounded-lg' : 'px-4 py-3 rounded-xl'}`}
        >
          <div className={`flex items-center gap-2 ${compact ? 'gap-2' : 'gap-3'}`}>
            <div className={`${compact ? 'w-8 h-8' : 'w-10 h-10'} bg-teal-accent/10 rounded-lg flex items-center justify-center`}>
              <Users className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-teal-accent`} />
            </div>
            <span className="text-ocean-900 font-medium text-sm">{guests} Guest{guests > 1 ? 's' : ''}</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-ocean-500 transition-transform ${isGuestDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isGuestDropdownOpen && (
          <div className={`absolute z-20 w-full mt-2 bg-white border-2 border-ocean-200 shadow-lg overflow-hidden ${compact ? 'rounded-lg' : 'rounded-xl'}`}>
            <div className={compact ? 'p-3' : 'p-4'}>
              <div className="flex items-center justify-between">
                <span className="text-ocean-900 font-medium text-sm">Adults</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className={`${compact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-ocean-100 hover:bg-ocean-200 text-ocean-900 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                    disabled={guests <= 1}
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-bold">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                    className={`${compact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-teal-accent hover:bg-teal-accent/80 text-ocean-900 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                    disabled={guests >= 10}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Price Summary */}
      {localCheckIn && localCheckOut && calculateNights() > 0 && (
        <div className={`bg-gradient-to-br from-sand-50 to-ocean-50 ${compact ? 'rounded-lg p-3' : 'rounded-xl p-4'} border border-ocean-100`}>
          {compact ? null : <h4 className="font-semibold text-ocean-900 mb-3">Price Summary</h4>}
          <div className={`space-y-1.5 ${compact ? 'text-xs' : 'text-sm'}`}>
            <div className="flex justify-between text-ocean-700">
              <span>{hotel.currency}{hotel.price} × {calculateNights()} night{calculateNights() > 1 ? 's' : ''}</span>
              <span className="font-semibold">{hotel.currency}{calculateTotal()}</span>
            </div>
            <div className={`flex justify-between text-ocean-600 ${compact ? 'text-[10px]' : 'text-xs'}`}>
              <span>Taxes and fees</span>
              <span>Calculated at checkout</span>
            </div>
            <div className={`border-t border-ocean-200 ${compact ? 'pt-1 mt-1' : 'pt-2 mt-2'}`}>
              <div className={`flex justify-between font-bold text-ocean-900 ${compact ? 'text-base' : 'text-lg'}`}>
                <span>Total</span>
                <span>{hotel.currency}{calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Banner - Hide in compact mode to save space */}
      {!compact && (
        <div className="flex items-start gap-2 p-3 bg-teal-accent/5 rounded-xl border border-teal-accent/20">
          <Info className="w-4 h-4 text-teal-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-ocean-700">
            Military rates require valid ID presentation at check-in.
          </p>
        </div>
      )}

      {/* Book Button */}
      <button
        onClick={handleBook}
        disabled={!isBookable}
        className={`w-full ${compact ? 'py-2.5 rounded-lg text-sm' : 'py-4 rounded-xl text-lg'} font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
          isBookable
            ? 'bg-gradient-to-r from-teal-accent to-teal-accent/90 hover:from-teal-accent/90 hover:to-teal-accent text-ocean-900 shadow-lg shadow-teal-accent/25 hover:shadow-xl hover:shadow-teal-accent/30 hover:-translate-y-0.5'
            : 'bg-ocean-100 text-ocean-400 cursor-not-allowed'
        }`}
      >
        {isBookable ? (
          <>
            {compact ? null : <Check className="w-5 h-5" />}
            Book Now
          </>
        ) : (
          'Select dates to book'
        )}
      </button>

      {/* Cancellation Policy - Hide in compact mode to save space */}
      {!compact && (
        <div className="flex items-center justify-center gap-1 text-xs text-ocean-500">
          <Check className="w-3 h-3 text-teal-accent" />
          <span>Free cancellation up to 24 hours before check-in</span>
        </div>
      )}
    </div>
  );
}
