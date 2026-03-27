import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, addDays, isSameDay, isBefore, isAfter } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-day-picker/dist/style.css';
import './DatePicker.css';

interface DatePickerProps {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  onCheckInChange: (date: Date | undefined) => void;
  onCheckOutChange: (date: Date | undefined) => void;
}

export default function DatePicker({ checkIn, checkOut, onCheckInChange, onCheckOutChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const today = new Date();

  const handleDateClick = (date: Date | undefined) => {
    if (!date) return;

    if (!checkIn || (checkIn && checkOut)) {
      // Set check-in date
      onCheckInChange(date);
      onCheckOutChange(undefined);
    } else if (!checkOut) {
      if (isBefore(date, checkIn)) {
        // If date is before check-in, make it new check-in
        onCheckInChange(date);
      } else {
        // Set check-out date
        onCheckOutChange(date);
      }
    }
  };

  const isDateSelected = (date: Date) => {
    if (!checkIn) return false;
    if (isSameDay(date, checkIn) || (checkOut && isSameDay(date, checkOut))) return true;
    if (checkIn && checkOut && isAfter(date, checkIn) && isBefore(date, checkOut)) return true;
    return false;
  };

  const isDateCheckIn = (date: Date) => checkIn && isSameDay(date, checkIn);
  const isDateCheckOut = (date: Date) => checkOut && isSameDay(date, checkOut);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDateDisplay = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full relative group flex items-center gap-2 pl-5 pr-4 py-3 bg-stone-50 hover:bg-stone-100 border border-slate-200 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/10 rounded-xl text-slate-900 font-medium placeholder:text-slate-500 transition-all outline-none cursor-pointer text-left"
      >
        <Calendar className="h-5 w-5 text-slate-400 group-hover:text-amber-500 transition-colors shrink-0" />
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-900">
            {checkIn ? formatDateDisplay(checkIn) : 'Check-in'}
          </span>
          <span className="text-slate-400">-</span>
          <span className={checkOut ? 'text-slate-900' : 'text-slate-500'}>
            {checkOut ? formatDateDisplay(checkOut) : 'Check-out'}
          </span>
        </div>
        {calculateNights() > 0 && (
          <span className="ml-auto text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-1 rounded-full">
            {calculateNights()} night{calculateNights() !== 1 ? 's' : ''}
          </span>
        )}
      </button>

      {/* Calendar Popover */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Calendar Panel */}
          <div className="absolute z-[60] top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-96">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSelectedMonth(addDays(selectedMonth, -30))}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <span className="font-semibold text-lg text-slate-900">
                {format(selectedMonth, 'MMMM yyyy')}
              </span>
              <button
                onClick={() => setSelectedMonth(addDays(selectedMonth, 30))}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Day Picker */}
            <DayPicker
              month={selectedMonth}
              onMonthChange={setSelectedMonth}
              selected={[checkIn, checkOut]}
              onDayClick={handleDateClick}
              disabled={[
                { before: today }
              ]}
              modifiers={{
                selected: (date) => isDateSelected(date),
                checkin: (date) => isDateCheckIn(date),
                checkout: (date) => isDateCheckOut(date),
                range: (date) =>
                  checkIn && checkOut && isAfter(date, checkIn) && isBefore(date, checkOut),
              }}
              modifiersClassNames={{
                selected: 'rdp-selected',
                checkin: 'rdp-checkin',
                checkout: 'rdp-checkout',
                range: 'rdp-range',
              }}
              className="rdp"
            />

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-stone-100">
              <button
                onClick={() => {
                  onCheckInChange(undefined);
                  onCheckOutChange(undefined);
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-stone-100 rounded-xl transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 text-sm font-medium bg-amber-500 text-slate-900 hover:bg-amber-400 rounded-xl transition-colors"
              >
                Done
              </button>
            </div>

            {/* Selection Info */}
            {checkIn && !checkOut && (
              <div className="mt-3 text-center text-sm text-slate-500">
                Select check-out date
              </div>
            )}
            {checkIn && checkOut && (
              <div className="mt-3 text-center">
                <span className="text-sm text-slate-600">{calculateNights()} night{calculateNights() !== 1 ? 's' : ''} selected</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
