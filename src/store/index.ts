import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Search Form Store
interface SearchState {
  location: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: string;
  setLocation: (location: string) => void;
  setDates: (checkIn: Date, checkOut: Date) => void;
  setGuests: (guests: string) => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      location: '',
      checkIn: undefined,
      checkOut: undefined,
      guests: '1 Room, 2 Adults',
      setLocation: (location) => set({ location }),
      setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
      setGuests: (guests) => set({ guests }),
      resetSearch: () => set({
        location: '',
        checkIn: undefined,
        checkOut: undefined,
        guests: '1 Room, 2 Adults',
      }),
    }),
    {
      name: 'navy-lodge-search',
      skipHydration: true,
    }
  )
);

// UI State Store
interface UIState {
  isMobileMenuOpen: boolean;
  isSearchModalOpen: boolean;
  toggleMobileMenu: () => void;
  openSearchModal: () => void;
  closeSearchModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isSearchModalOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  openSearchModal: () => set({ isSearchModalOpen: true }),
  closeSearchModal: () => set({ isSearchModalOpen: false }),
}));

// Auth Store (for future use)
interface AuthState {
  user: { email: string; name: string } | null;
  isAuthenticated: boolean;
  login: (user: { email: string; name: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'navy-lodge-auth',
      skipHydration: true,
    }
  )
);
