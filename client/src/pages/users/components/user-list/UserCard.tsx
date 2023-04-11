import { UserObjectType } from 'trpc-models';

type IProp = {
  user: UserObjectType;
  onClick: () => void;
};

export default function UserCard({ user, onClick }: IProp) {
  return (
    <div
      onClick={onClick}
      className="w-full border p-3 border-gray-200 rounded-md hover:bg-zinc-200 cursor-pointer"
    >
      <div>
        {user.name} {user.lastName} ({user.role})
      </div>
      <div className="text-gray-400">{user.email}</div>
    </div>
  );
}
