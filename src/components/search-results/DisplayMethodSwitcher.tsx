'use client';

import React from 'react';
import { Square, RectangleHorizontal, Rows, Columns } from 'lucide-react';

type DisplayMethod = 'modal' | 'drawer' | 'inline' | 'split';

interface DisplayMethodSwitcherProps {
  current: DisplayMethod;
  onChange: (method: DisplayMethod) => void;
}

const methods = [
  {
    id: 'modal' as DisplayMethod,
    label: 'Modal',
    icon: Square,
    description: 'Results in popup overlay'
  },
  {
    id: 'drawer' as DisplayMethod,
    label: 'Drawer',
    icon: RectangleHorizontal,
    description: 'Slide from right'
  },
  {
    id: 'inline' as DisplayMethod,
    label: 'Inline',
    icon: Rows,
    description: 'Expand on page'
  },
  {
    id: 'split' as DisplayMethod,
    label: 'Split',
    icon: Columns,
    description: 'Side-by-side view'
  }
];

export default function DisplayMethodSwitcher({ current, onChange }: DisplayMethodSwitcherProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-ocean-600 font-medium">Results:</span>
      <div className="flex bg-ocean-100 rounded-xl p-1 gap-1">
        {methods.map((method) => {
          const Icon = method.icon;
          const isActive = current === method.id;

          return (
            <button
              key={method.id}
              onClick={() => onChange(method.id)}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white text-teal-accent shadow-sm'
                  : 'text-ocean-600 hover:text-ocean-900 hover:bg-white/50'
              }`}
              title={method.description}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{method.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type { DisplayMethod };
