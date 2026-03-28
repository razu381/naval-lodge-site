'use client';

import { useEffect } from 'react';
import { useSearchStore, useAuthStore } from '@/store';

/**
 * This component triggers the Zustand persisted stores to rehydrate from
 * localStorage AFTER the client mount, ensuring the server and client render
 * with the same initial default values and avoiding hydration mismatches.
 */
export default function StoreHydrator() {
  useEffect(() => {
    useSearchStore.persist.rehydrate();
    useAuthStore.persist.rehydrate();
  }, []);

  return null;
}
