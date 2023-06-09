import UserSearchInput from './UserSearchInput';
import GoToCreateUserPageAction from '../actions/GoToCreateUserPageAction';
import UserList from './user-list/UserList';
import AppErrorBoundary from '../../../components/error/AppErrorBoundary';

export default function UserSidebar() {
  return (
    <div className="flex flex-col w-[27rem] p-2 box-border border-r-2">
      <div className="flex justify-start gap-2">
        <UserSearchInput />
        <GoToCreateUserPageAction />
      </div>
      <AppErrorBoundary>
        <UserList />
      </AppErrorBoundary>
    </div>
  );
}
