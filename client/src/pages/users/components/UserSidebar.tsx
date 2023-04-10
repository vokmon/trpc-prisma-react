import UserSearchInput from './UserSearchInput';
import GoToCreateUserPageAction from '../actions/GoToCreateUserPageAction';

export default function UserSidebar() {
  return (
    <div className="flex flex-col w-[27rem] bg-slate-500 p-2 box-border">
      <div className="flex justify-start gap-2">
        <UserSearchInput />
        <GoToCreateUserPageAction />
      </div>
      <div className="overflow-y-auto bg-red-300 mt-1 flex-grow">User list</div>
    </div>
  );
}
