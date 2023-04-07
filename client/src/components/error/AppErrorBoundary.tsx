import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

type IAppErrorBoundary = {
  children: JSX.Element;
}

function AppErrorBoundary({ children }: IAppErrorBoundary) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              There was an error!
              <p>{error.message}</p>
              <button
                className="bg-ct-yellow-600 px-4 py-2 rounded-xl"
                onClick={() => resetErrorBoundary()}
              >
                Try again
              </button>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default AppErrorBoundary;
