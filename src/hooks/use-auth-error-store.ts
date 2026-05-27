import { create } from 'zustand';

interface AuthErrorState {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

export const useAuthErrorStore = create<AuthErrorState>((set) => ({
  showLoginModal: false,
  setShowLoginModal: (show) => set({ showLoginModal: show }),
}));
