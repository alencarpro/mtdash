import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UIState {
  isAdmin: boolean;
  isKiosk: boolean;
  selectedEnvironmentId?: string;
  setAdmin: (isAdmin: boolean) => void;
  setKiosk: (isKiosk: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isAdmin: false,
      isKiosk: true,
      setAdmin: (isAdmin) => set({ isAdmin }),
      setKiosk: (isKiosk) => set({ isKiosk }),
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
