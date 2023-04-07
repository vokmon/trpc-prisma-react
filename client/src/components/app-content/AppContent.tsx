import { Suspense } from 'react';
import { trpc } from '../../utils/trpc';
import { SayHelloInputType } from 'trpc-models';

function AppContent2() {
  const input: SayHelloInputType = { name: 'View' };
  const hello = trpc.sayHello.useQuery(input);

  return <p className="text-ct-blue-600 text-lg">{hello.data}</p>;
}
export function AppContent() {
  // const hello = trpc.sayHello.useQuery();
  // Test error boundary
  // const a: any = [];
  // a[0].xx;
  return (
    <div className="container mx-auto bg-ct-dark-200 rounded-xl shadow border p-8 m-10">
      <p className="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
      <Suspense fallback={'Loading...'}>
        <AppContent2 />
      </Suspense>
    </div>
  );
}
