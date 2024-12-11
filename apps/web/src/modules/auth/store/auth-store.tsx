import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      loading: false,
      setUser: user => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      partialize: state => ({ user: state.user }),
    },
  ),
);
