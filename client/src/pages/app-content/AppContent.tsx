import { Suspense } from 'react';
import { trpc } from '../../utils/trpc';
import { SayHelloInputType } from 'trpc-models';
import AppErrorBoundary from '../../components/error/AppErrorBoundary';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

function AppContent2() {
  const input: SayHelloInputType = { name: 'View' };
  const hello = trpc.sayHello.useQuery(input, {
    // staleTime: 1000 * 5,
    // suspense: true,
    cacheTime: 0,
    // refetchOnMount: true,
    // retry: false,
    // refetchOnMount: false,
    // retryOnMount: false,
    // onSuccess: (data) => {
    //   // add data to state
    //   console.log(data);
    // },
  });

  if (hello.isFetching) {
    return <p>Loading...</p>;
  }
  return <p className="text-ct-blue-600 text-lg">{hello.data}</p>;
}

function AppContent3() {
  const queryClient = useQueryClient();

  return (
    <button
      onClick={() => {
        queryClient.refetchQueries(getQueryKey(trpc.sayHello));
      }}
    >
      Refresh from another component
    </button>
  );
}
export function AppContent() {
  // const hello = trpc.sayHello.useQuery();
  // Test error boundary
  // const a: any = [];
  // a[0].xx;
  return (
    <div className="container mx-auto bg-ct-dark-200 rounded-xl shadow border p-8 m-10">
      <p className="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
      <AppErrorBoundary>
        <Suspense fallback={'Loading...'}>
          <>
            <AppContent2 />
            <AppContent3 />
          </>
        </Suspense>
      </AppErrorBoundary>
    </div>
  );
}
