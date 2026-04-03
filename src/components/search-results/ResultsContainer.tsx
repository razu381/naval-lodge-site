'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hotel, sampleHotels } from '@/types/hotel';
import SideDrawerResults from './SideDrawerResults';
import InlineAccordionResults from './InlineAccordionResults';
import SplitScreenResults from './SplitScreenResults';
import DisplayMethodSwitcher, { DisplayMethod } from './DisplayMethodSwitcher';
import SearchModal from '@/components/shared/SearchModal';

interface ResultsContainerProps {
  isOpen: boolean;
  onClose: () => void;
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  onViewDetails: (hotel: Hotel) => void;
}

export default function ResultsContainer({
  isOpen,
  onClose,
  location,
  checkIn,
  checkOut,
  onViewDetails
}: ResultsContainerProps) {
  const [displayMethod, setDisplayMethod] = useState<DisplayMethod>(() => {
    const saved = localStorage.getItem('search-results-display-method');
    return (saved && ['modal', 'drawer', 'inline', 'split'].includes(saved)) ? saved as DisplayMethod : 'modal';
  });

  // Save display method preference
  useEffect(() => {
    localStorage.setItem('search-results-display-method', displayMethod);
  }, [displayMethod]);

  const handleDisplayMethodChange = (method: DisplayMethod) => {
    setDisplayMethod(method);
  };

  // Render based on display method
  const renderResults = () => {
    const commonProps = {
      isOpen,
      onClose,
      hotels: sampleHotels,
      location,
      checkIn,
      checkOut,
      onViewDetails
    };

    switch (displayMethod) {
      case 'modal':
        return <SearchModal {...commonProps} open={isOpen} onClose={onClose} />;

      case 'drawer':
        return <SideDrawerResults {...commonProps} />;

      case 'inline':
        return <InlineAccordionResults {...commonProps} />;

      case 'split':
        return <SplitScreenResults {...commonProps} />;

      default:
        return <SearchModal {...commonProps} open={isOpen} onClose={onClose} />;
    }
  };

  return (
    <>
      {/* Display Method Switcher - always visible when results are open */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-20 right-4 z-[70] bg-white rounded-2xl shadow-lg p-4 border border-ocean-100"
        >
          <DisplayMethodSwitcher
            current={displayMethod}
            onChange={handleDisplayMethodChange}
          />
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {renderResults()}
      </AnimatePresence>
    </>
  );
}
