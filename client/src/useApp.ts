import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { getFetch, httpBatchLink, loggerLink } from '@trpc/client';
import { trpc } from './utils/trpc';

export const useInitTrpc = () => {
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
          },
        },
      })
  );

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

  return {
    queryClient,
    trpcClient,
  };
};
