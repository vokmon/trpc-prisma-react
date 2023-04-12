import { useNavigate } from 'react-router-dom';
import { trpc } from '../../../../utils/trpc';
import UserCard from './UserCard';
import { UserPageContext } from '../../UserPageHooks';
import { useContext, useDeferredValue } from 'react';
import { useStore } from 'zustand';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const x = (filterData: any = []) => {
  const result: any = [];
  for (let i = 0; i < 1000; i++) {
    filterData.forEach((f: any) => {
      result.push(f);
    });
  }
  return result;
};

export default function UserList() {
  const users = trpc.users.getAllUsers.useQuery(undefined, {
    // staleTime: 1000 * 5,
    // suspense: true,
    cacheTime: 0,
  });
  const navigate = useNavigate();

  const userPageContext = useContext(UserPageContext);
  const filterString = useStore(
    userPageContext!.userPageStore!,
    (state) => state.filterString
  );

  const filterData = users?.data?.filter((user) => {
    const name = `${user.name} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const filterStringLowerCase = filterString.toLocaleLowerCase();
    return (
      name.includes(filterStringLowerCase) ||
      email.includes(filterStringLowerCase)
    );
  });

  // uncomment this to test useDefferedValue
  // const result = x(filterData);
  // const deferredValue = useDeferredValue(result);

  const deferredValue = useDeferredValue(filterData);

  if (users.isFetching) {
    return <p>Loading...</p>;
  }

  if (users?.data?.length === 0) {
    return (
      <div className="mt-1 flex-grow items-center text-center pt-32">
        No user.
      </div>
    );
  }

  if (filterData?.length === 0) {
    return (
      <div className="mt-1 flex-grow items-center text-center pt-32">
        No matched user.
      </div>
    );
  }
  return (
    <div className="flex flex-col overflow-y-auto mt-1 flex-grow gap-2">
      {deferredValue?.map((user: any, index: number) => (
        <UserCard
          key={`${user.id}-${index}`}
          user={user}
          onClick={() => {
            navigate(user.id);
          }}
        />
      ))}
    </div>
  );
}
