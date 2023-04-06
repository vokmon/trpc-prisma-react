import { Suspense, useState } from 'react';
import './App.css';
import { trpc } from './utils/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getFetch, httpBatchLink, loggerLink } from '@trpc/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

function AppContent() {
  const hello = trpc.sayHello.useQuery();
  // Test error boundary
  // const a: any = [];
  // a[0].xx;
  return (
    <div className="container mx-auto bg-ct-dark-200 rounded-xl shadow border p-8 m-10">
      <p className="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
      <p className="text-ct-blue-600 text-lg">{hello.data}</p>
    </div>
  );
}

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
            suspense: true,
            useErrorBoundary: true,
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

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={'Loading...'}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary }) => (
                  <div>
                    There was an error!
                    <button onClick={() => resetErrorBoundary()}>
                      Try again
                    </button>
                  </div>
                )}
              >
                <AppContent />
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
