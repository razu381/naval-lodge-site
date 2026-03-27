# Multiple Homepages Setup

## Overview
The Navy Lodge application now supports multiple homepage designs with easy navigation between them.

## File Structure
```
src/
├── App.tsx                          # Main router component
├── pages/
│   ├── homepage-1/
│   │   └── index.tsx               # Original homepage design (Dark hero, luxury feel)
│   └── homepage-2/
│       └── index.tsx               # Modern homepage design (Clean, conversion-focused)
└── [shared components...]
```

## Routes
- `/` → Homepage 1 (Default)
- `/homepage-1` → Homepage 1
- `/homepage-2` → Homepage 2 (New design)

## Design Comparison

### Homepage 1 (Original Design)
- **Style**: Luxury, editorial, dramatic
- **Hero**: Full-screen background image with gradient overlay
- **Vibe**: Premium, exclusive, resort-feel
- **Features**:
  - Dark, dramatic hero section
  - Booking form overlaying hero
  - Larger, more rounded cards
  - Serif typography for headings

### Homepage 2 (New Design)
- **Style**: Modern, clean, conversion-focused
- **Hero**: Split layout (text left, booking card right)
- **Vibe**: Trustworthy, accessible, efficient
- **Features**:
  - Clean, minimal hero with stats
  - Glassmorphism navigation
  - Compact, efficient booking form
  - Clear benefits grid
  - Step-by-step "How it works" section
  - Sans-serif typography throughout

## Navigation
Both homepages include navigation links in their header to switch between versions:
- Desktop: Links in the top navigation bar
- Mobile: Links in the dropdown menu

## Technical Notes
- Both pages use the same shared components (DatePicker, SearchModal, etc.)
- React Router handles client-side routing without page reloads
- Development server runs on `http://localhost:3001/` (or available port)
- Tailwind CSS v4 syntax warnings can be ignored (app still works)

## Adding New Homepage Versions
To create a new homepage version:

1. Create new directory: `src/pages/homepage-N/`
2. Create file: `src/pages/homepage-N/index.tsx`
3. Copy structure from existing homepage
4. Add route in `App.tsx`:
   ```tsx
   <Route path="/homepage-N" element={<HomepageN />} />
   ```
5. Add navigation links to other homepages

## Next Steps
Consider creating variations for:
- homepage-3: A/B testing variant
- homepage-4: Mobile-first design
- homepage-5: Minimal landing page
