'use client';

import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, addDays, isSameDay, isBefore, isAfter } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-day-picker/dist/style.css';

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
      onCheckInChange(date);
      onCheckOutChange(undefined);
    } else if (!checkOut) {
      if (isBefore(date, checkIn)) {
        onCheckInChange(date);
      } else {
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
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatDateDisplay = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div className="relative w-full">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 bg-sand-50 hover:bg-ocean-50 border border-ocean-200 focus:border-teal-accent focus:bg-white focus:ring-2 focus:ring-teal-accent/10 rounded-xl px-4 py-3 text-ocean-900 font-medium transition-all outline-none cursor-pointer"
        type="button"
      >
        <Calendar className="h-5 w-5 text-ocean-400 shrink-0" />
        <span className="text-sm text-ocean-900 truncate">
          {checkIn ? formatDateDisplay(checkIn) : 'Check-in'}
        </span>
        <span className="text-sm text-ocean-400 shrink-0 mx-1">-</span>
        <span className={`text-sm truncate ${checkOut ? 'text-ocean-900' : 'text-ocean-500'}`}>
          {checkOut ? formatDateDisplay(checkOut) : 'Check-out'}
        </span>
      </button>

      {/* Calendar Popover */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[70]"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute z-[80] top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-ocean-200 p-4 w-auto min-w-[320px]">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setSelectedMonth(addDays(selectedMonth, -30))}
                className="p-2 hover:bg-ocean-50 rounded-full transition-colors group cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-ocean-600 group-hover:text-ocean-900" />
              </button>
              <span className="font-semibold text-base text-ocean-900">
                {format(selectedMonth, 'MMMM yyyy')}
              </span>
              <button
                type="button"
                onClick={() => setSelectedMonth(addDays(selectedMonth, 30))}
                className="p-2 hover:bg-ocean-50 rounded-full transition-colors group cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-ocean-600 group-hover:text-ocean-900" />
              </button>
            </div>

            {/* Day Picker */}
            <div className="rdp-wrapper">
              <DayPicker
                month={selectedMonth}
                onMonthChange={setSelectedMonth}
                selected={[checkIn, checkOut].filter(Boolean) as Date[]}
                onDayClick={handleDateClick}
                disabled={[{ before: today }]}
                modifiers={{
                  selected: (date) => isDateSelected(date),
                  checkin: (date) => isDateCheckIn(date),
                  checkout: (date) => isDateCheckOut(date),
                  range: (date) =>
                    !!(checkIn && checkOut && isAfter(date, checkIn) && isBefore(date, checkOut)),
                }}
                modifiersClassNames={{
                  selected: '!bg-teal-accent !text-white',
                  checkin: '!rounded-l-lg',
                  checkout: '!rounded-r-lg',
                  range: '!bg-teal-accent/15 !text-ocean-900',
                }}
                className="mx-auto"
                classNames={{
                  head_cell: "text-xs font-semibold uppercase text-ocean-500 pb-2 flex-1 text-center",
                  row: "flex w-full mt-1",
                  cell: "flex-1 text-center p-0 m-0 relative focus-within:relative focus-within:z-20",
                  button: "w-9 h-9 mx-auto flex items-center justify-center rounded-lg text-sm transition-colors hover:bg-ocean-50 text-ocean-900 font-medium",
                  table: "w-full border-collapse space-y-1",
                  vhidden: "hidden",
                  months: "w-full",
                  month: "space-y-4",
                  caption: "hidden",
                  nav: "hidden",
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-ocean-100">
              <button
                onClick={() => {
                  onCheckInChange(undefined);
                  onCheckOutChange(undefined);
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-ocean-600 hover:text-ocean-900 hover:bg-ocean-50 rounded-xl transition-colors cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 text-sm font-medium bg-teal-accent text-white hover:bg-teal-accent/90 rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Done
              </button>
            </div>

            {/* Selection Info */}
            {checkIn && !checkOut && (
              <div className="mt-3 text-center text-xs text-ocean-500">
                Select check-out date
              </div>
            )}
            {checkIn && checkOut && (
              <div className="mt-3 text-center text-xs text-ocean-600 font-medium border border-teal-accent/20 bg-teal-accent/5 rounded-lg py-1.5 mx-auto max-w-fit px-3">
                {calculateNights()} night{calculateNights() !== 1 ? 's' : ''} selected
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
