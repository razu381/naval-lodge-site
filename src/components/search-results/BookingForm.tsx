import React, { useState } from 'react';
import { Calendar, Users, ChevronDown } from 'lucide-react';
import { Hotel } from '../../types/hotel';
import DatePicker from '../../DatePicker';

interface BookingFormProps {
  hotel: Hotel;
  checkIn?: Date;
  checkOut?: Date;
  onBook?: () => void;
}

export default function BookingForm({ hotel, checkIn, checkOut, onBook }: BookingFormProps) {
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
    <div className="bg-ocean-50 rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-xl text-ocean-900">Book Your Stay</h3>

      {/* Date Picker */}
      <div>
        <label className="block text-sm font-medium text-ocean-700 mb-2">Select Dates</label>
        <DatePicker
          checkIn={localCheckIn}
          checkOut={localCheckOut}
          onCheckInChange={setLocalCheckIn}
          onCheckOutChange={setLocalCheckOut}
        />
      </div>

      {/* Guests Selector */}
      <div className="relative">
        <label className="block text-sm font-medium text-ocean-700 mb-2">Guests</label>
        <button
          onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
          className="w-full flex items-center justify-between bg-white border border-ocean-200 rounded-lg px-4 py-3 hover:border-teal-accent transition-colors"
        >
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-ocean-500" />
            <span className="text-ocean-900">{guests} Guest{guests > 1 ? 's' : ''}</span>
          </div>
          <ChevronDown className={`w-5 h-5 text-ocean-500 transition-transform ${isGuestDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isGuestDropdownOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-ocean-200 rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-ocean-700">Adults</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-8 h-8 rounded-full bg-ocean-100 hover:bg-ocean-200 text-ocean-900 font-semibold transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold">{guests}</span>
                <button
                  onClick={() => setGuests(Math.min(10, guests + 1))}
                  className="w-8 h-8 rounded-full bg-ocean-100 hover:bg-ocean-200 text-ocean-900 font-semibold transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Price Summary */}
      {localCheckIn && localCheckOut && calculateNights() > 0 && (
        <div className="bg-white rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-ocean-700">
            <span>{hotel.currency}{hotel.price} × {calculateNights()} night{calculateNights() > 1 ? 's' : ''}</span>
            <span>{hotel.currency}{calculateTotal()}</span>
          </div>
          <div className="flex justify-between text-ocean-700">
            <span>Taxes and fees</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="border-t border-ocean-200 pt-2 mt-2">
            <div className="flex justify-between font-semibold text-ocean-900">
              <span>Total</span>
              <span>{hotel.currency}{calculateTotal()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Book Button */}
      <button
        onClick={handleBook}
        disabled={!isBookable}
        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
          isBookable
            ? 'bg-teal-accent hover:bg-teal-accent/80 text-ocean-900 hover:shadow-lg hover:shadow-teal-accent/20 cursor-pointer'
            : 'bg-ocean-200 text-ocean-400 cursor-not-allowed'
        }`}
      >
        {isBookable ? 'Book Now' : 'Select dates to book'}
      </button>

      {/* Cancellation Policy */}
      <p className="text-xs text-ocean-500 text-center">
        Free cancellation up to 24 hours before check-in
      </p>
    </div>
  );
}
