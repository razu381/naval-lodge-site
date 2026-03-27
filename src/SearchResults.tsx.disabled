import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Hotel, sampleHotels } from './types/hotel';
import SideDrawerPattern from './components/search-results/patterns/SideDrawerPattern';
import AccordionPattern from './components/search-results/patterns/AccordionPattern';
import MasterDetailPattern from './components/search-results/patterns/MasterDetailPattern';
import PatternSwitcher from './components/search-results/PatternSwitcher';

type Pattern = 'drawer' | 'accordion' | 'split';

interface SearchResultsProps {
  searchLocation?: string;
  checkIn?: Date;
  checkOut?: Date;
}

export default function SearchResults({ searchLocation = "All Locations", checkIn, checkOut }: SearchResultsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pattern, setPattern] = useState<Pattern>(() => {
    const patternParam = searchParams.get('pattern');
    if (patternParam && ['drawer', 'accordion', 'split'].includes(patternParam)) {
      return patternParam as Pattern;
    }
    return 'drawer';
  });

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [expandedHotelId, setExpandedHotelId] = useState<number | null>(null);

  // Load saved pattern preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('preferred-pattern');
    if (saved && ['drawer', 'accordion', 'split'].includes(saved)) {
      setPattern(saved as Pattern);
    }
  }, []);

  // Save pattern preference to localStorage and update URL
  useEffect(() => {
    localStorage.setItem('preferred-pattern', pattern);
    setSearchParams({ pattern });
  }, [pattern, setSearchParams]);

  const handleViewDetails = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    if (pattern === 'accordion') {
      setExpandedHotelId(hotel.id === expandedHotelId ? null : hotel.id);
    }
  };

  const handleCloseDetails = () => {
    setSelectedHotel(null);
    setExpandedHotelId(null);
  };

  const handlePatternChange = (newPattern: Pattern) => {
    setPattern(newPattern);
    // Reset detail states when switching patterns
    setSelectedHotel(null);
    setExpandedHotelId(null);
  };

  const formatDate = (date: Date) => format(date, 'MMM d, yyyy');

  return (
    <div className="min-h-screen bg-sand-50 font-sans text-ocean-800">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-ocean-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Search Info */}
            <div className="flex items-center gap-4 text-sm">
              <span className="text-ocean-500">Searching:</span>
              <span className="font-semibold text-teal-accent">{searchLocation}</span>
              {checkIn && checkOut && (
                <>
                  <span className="text-ocean-400">|</span>
                  <span className="flex items-center gap-1 text-ocean-600">
                    <Calendar className="w-4 h-4" />
                    {formatDate(checkIn)} - {formatDate(checkOut)}
                  </span>
                </>
              )}
              <span className="text-ocean-500">{sampleHotels.length} results found</span>
            </div>

            {/* Pattern Switcher */}
            <PatternSwitcher current={pattern} onChange={handlePatternChange} />
          </div>
        </div>
      </div>

      {/* Pattern-specific rendering */}
      <AnimatePresence mode="wait">
        {pattern === 'drawer' && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SideDrawerPattern
              hotels={sampleHotels}
              selectedHotel={selectedHotel}
              onViewDetails={handleViewDetails}
              onCloseDetails={handleCloseDetails}
              checkIn={checkIn}
              checkOut={checkOut}
            />
          </motion.div>
        )}

        {pattern === 'accordion' && (
          <motion.div
            key="accordion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AccordionPattern
              hotels={sampleHotels}
              expandedHotelId={expandedHotelId}
              onViewDetails={handleViewDetails}
              checkIn={checkIn}
              checkOut={checkOut}
            />
          </motion.div>
        )}

        {pattern === 'split' && (
          <motion.div
            key="split"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MasterDetailPattern
              hotels={sampleHotels}
              selectedHotel={selectedHotel}
              onViewDetails={handleViewDetails}
              onCloseDetails={handleCloseDetails}
              checkIn={checkIn}
              checkOut={checkOut}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
