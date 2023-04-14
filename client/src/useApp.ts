import { useEffect, useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import {
  getFetch,
  httpBatchLink,
  loggerLink,
} from '@trpc/client';
import { trpc } from './utils/trpc';
import { useStore } from 'zustand';
import { useUserStore } from './stores/UserStores';
import appUtils from './utils/appUtils';

export const useInitTrpc = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink(),
        httpBatchLink({
          url: import.meta.env.VITE_API_URL,
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: 'include',
            });
          },
        }),
      ],
    })
  );

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // staleTime: 1000 * 60 * 5, // default for staleTime is set to zero, React Query will consider our request as stale (or not fresh) and trigger the second call in the background
            // suspense: true,
            cacheTime: 0, // React Query will always cache your request responses for up to 5 minutes by default
            useErrorBoundary: true,
            // refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  return {
    queryClient,
    trpcClient,
  };
};

export const useCheckCookieLogin = () => {
  const setTokens = useStore(useUserStore, (state) => state.setTokens);
  useEffect(() => {
    const accessToken = appUtils.getCookie('access_token');
    const refreshToken = appUtils.getCookie('refresh_token');
    if (accessToken && refreshToken) {
      setTokens({
        accessToken,
        refreshToken,
      });
    }
  }, []);
};
