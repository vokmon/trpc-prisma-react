import { useNavigate } from 'react-router-dom';
import { trpc } from '../../../../utils/trpc';
import UserCard from './UserCard';

export default function UserList() {
  const users = trpc.users.getAllUsers.useQuery(undefined, {
    // staleTime: 1000 * 5,
    // suspense: true,
    cacheTime: 0,
  });
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col overflow-y-auto mt-1 flex-grow gap-2">
      {users?.data?.length === 0 && <div></div>}
      {users?.data?.map((user) => (
        <UserCard
          key={`${user.id}`}
          user={user}
          onClick={() => {
            navigate(user.id);
          }}
        />
      ))}
    </div>
  );
}
