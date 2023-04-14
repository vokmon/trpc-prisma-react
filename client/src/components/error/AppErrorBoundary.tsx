import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { trpc } from '../../utils/trpc';

type IAppErrorBoundary = {
  children: JSX.Element;
};

function AppErrorBoundary({ children }: IAppErrorBoundary) {
  const refreshQuery = trpc.login.refreshToken.useQuery(undefined, {
    enabled: false,
  });

  return (
    <QueryErrorResetBoundary>
      {({ reset, clearReset }) => (
        <ErrorBoundary
          onReset={reset}
          onError={async (error) => {
            if (error.message === 'Unauthrorized') {
              await refreshQuery.refetch();
              reset();
              clearReset();
            }
          }}
          fallbackRender={({ error, resetErrorBoundary }) => {
            if (error.message === 'Unauthrorized') {
              setTimeout(() => {
                resetErrorBoundary();
              });
            }
            return (
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
            );
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default AppErrorBoundary;
