import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './models/auth/User';

interface AuthState {
  user: User | null;
  login: (user: User | null) => void;
}

export enum Language{
  PL = "pl",
  EN = "en"
}

interface LanguageState {
  language: Language;
  changeLanguage: (language: Language) => void;
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

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: Language.PL,
      changeLanguage: (language: Language) => set({ language }),
    }),
    { name: 'auth' }
  )
);


axios.defaults.headers.common['Authorization'] = 'Bearer ' + useAuthStore.getState().user?.token;
