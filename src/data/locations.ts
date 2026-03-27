import { Location } from '@/types/hotel';

export const LOCATIONS: Location[] = [
  {
    id: 1,
    name: 'Naval Base San Diego',
    location: 'California, USA',
    price: 79,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    badge: 'Most Popular',
    code: 'NSD-CA-01',
  },
  {
    id: 2,
    name: 'Pearl Harbor-Hickam',
    location: 'Hawaii, USA',
    price: 95,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    code: 'PHH-HI-02',
  },
  {
    id: 3,
    name: 'Oceana / Dam Neck',
    location: 'Virginia, USA',
    price: 72,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    code: 'ODN-VA-03',
  },
  {
    id: 4,
    name: 'Naval Station Norfolk',
    location: 'Virginia, USA',
    price: 68,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    code: 'NSN-VA-04',
  },
];
