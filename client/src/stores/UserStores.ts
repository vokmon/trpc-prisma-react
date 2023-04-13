import { createStore /* useStore */ } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserTokensType = {
  accessToken: string;
  refreshToken: string;
};

// define the initial state
const initialState = {
  tokens: null,
  isLoggedIn: false,
};

const userStore = persist<{
  tokens: UserTokensType | null;
  isLoggedIn: boolean;
  setTokens: (tokens: UserTokensType) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  resetStore: () => void;
}>(
  (set) => ({
    tokens: null,
    isLoggedIn: false,
    setTokens: ({ accessToken, refreshToken }: UserTokensType) =>
      set({
        isLoggedIn: true,
        tokens: {
          accessToken,
          refreshToken,
        },
      }),
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    resetStore: () => set(initialState),
  }),
  {
    name: 'user-store', // name of item in the storage (must be unique)
    storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
  }
);

export const useUserStore = createStore(userStore);
