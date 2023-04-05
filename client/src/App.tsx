import { useState } from 'react'
import './App.css'
import { trpc } from './utils/trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getFetch, httpBatchLink, loggerLink } from '@trpc/client'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function AppContent() {
  const hello = trpc.users.getUser.useQuery();
  console.log(hello.isLoading)
  return <main className="p-2">{JSON.stringify(hello.data, null, 2)}</main>;
}

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
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
              credentials: "include",
            });
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App
