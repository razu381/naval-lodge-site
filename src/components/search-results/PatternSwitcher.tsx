'use client';

import React from 'react';
import { LayoutGrid, SlidersHorizontal, Columns } from 'lucide-react';

type Pattern = 'drawer' | 'accordion' | 'split';

interface PatternSwitcherProps {
  current: Pattern;
  onChange: (pattern: Pattern) => void;
}

const patterns = [
  {
    id: 'drawer' as Pattern,
    label: 'Slide-over',
    icon: SlidersHorizontal,
    description: 'Drawer slides from right'
  },
  {
    id: 'accordion' as Pattern,
    label: 'Expandable',
    icon: LayoutGrid,
    description: 'Cards expand in place'
  },
  {
    id: 'split' as Pattern,
    label: 'Split View',
    icon: Columns,
    description: 'Side-by-side layout'
  }
];

export default function PatternSwitcher({ current, onChange }: PatternSwitcherProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-ocean-600 font-medium">View:</span>
      <div className="flex bg-ocean-100 rounded-xl p-1 gap-1">
        {patterns.map((pattern) => {
          const Icon = pattern.icon;
          const isActive = current === pattern.id;

          return (
            <button
              key={pattern.id}
              onClick={() => onChange(pattern.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white text-teal-accent shadow-sm'
                  : 'text-ocean-600 hover:text-ocean-900 hover:bg-white/50'
              }`}
              title={pattern.description}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{pattern.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
