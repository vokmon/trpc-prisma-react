import { Suspense } from 'react';
import './App.css';
import { trpc } from './utils/trpc';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppContent } from './components/app-content/AppContent';
import AppErrorBoundary from './components/error/AppErrorBoundary';
import { useInitTrpc } from './useApp';

function App() {
  const { queryClient, trpcClient } = useInitTrpc();
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={'Loading...'}>
          <AppErrorBoundary>
            <AppContent />
          </AppErrorBoundary>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
