import { getQueryKey } from '@trpc/react-query';
import { createContext, /* useContext,*/ useRef } from 'react';
import { createStore /* useStore */ } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { trpc } from '../../utils/trpc';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

export const createUserPageStoreWithStorage = (queryClient: QueryClient) => {
  return createStore(
    persist<{
      filterString: string;
      setFilterString: (value: string) => void;
      refreshUsers: () => void;
    }>(
      (set) => ({
        filterString: '',
        setFilterString: (value: string) => set({ filterString: value }),
        refreshUsers: () => {
          queryClient.refetchQueries(getQueryKey(trpc.users.getAllUsers));
        },
      }),
      {
        name: 'user-page-store', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  );
};

const createUserPageStore = (queryClient: QueryClient) => {
  return createStore<{
    filterString: string;
    setFilterString: (value: string) => void;
    refreshUsers: () => void;
  }>((set) => ({
    filterString: '',
    setFilterString: (value: string) => set({ filterString: value }),
    refreshUsers: () => {
      queryClient.refetchQueries(getQueryKey(trpc.users.getAllUsers));
    },
  }));
};

type UserPageStoreType = ReturnType<typeof createUserPageStore> | null;

export const UserPageContext = createContext<{
  userPageStore: UserPageStoreType;
} | null>(null);

export const usePrepareUserPage = () => {
  const queryClient: QueryClient = useQueryClient();
  const userPageStoreRef = useRef({
    userPageStore: createUserPageStore(queryClient),
  });

  return userPageStoreRef;
};
