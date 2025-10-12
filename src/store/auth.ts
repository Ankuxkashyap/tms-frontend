import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User | null, token: string | null) => void;
  getUser: () => User | null;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      login: (user, token) => {
        set({ user, token });
      },
      logout: () => {
        set({ user: null, token: null });
      },
      setUser: (user, token) => {
        set({ user, token });
      },
      getUser: () => get().user,
    }),
    {
      name: "auth-storage", 
      partialize: (state) => ({ user: state.user, token: state.token }), // optional (only save these)
    }
  )
);

export default useAuthStore;
