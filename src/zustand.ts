import axios from 'axios';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './models/User';

interface AuthState {
  user: User | null;
  login: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user: User | null) => set({ user }),
    }),
    { name: 'auth' }
  )
);

axios.defaults.headers.common['Authorization'] = 'Bearer ' + useAuthStore.getState().user?.token;
