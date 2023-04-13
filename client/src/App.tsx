import { BrowserRouter as Router } from 'react-router-dom';
import { trpc } from './utils/trpc';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppErrorBoundary from './components/error/AppErrorBoundary';
import { useCheckCookieLogin, useInitTrpc } from './useApp';
import MainContainer from './pages/main/MainContainer';
import './App.css';

function App() {
  const { queryClient, trpcClient } = useInitTrpc();
  useCheckCookieLogin();
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppErrorBoundary>
          <Router>
            <MainContainer />
          </Router>
        </AppErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
