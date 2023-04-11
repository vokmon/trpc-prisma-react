import UserSearchInput from './UserSearchInput';
import GoToCreateUserPageAction from '../actions/GoToCreateUserPageAction';
import UserList from './user-list/UserList';

export default function UserSidebar() {
  return (
    <div className="flex flex-col w-[27rem] p-2 box-border border-r-2">
      <div className="flex justify-start gap-2">
        <UserSearchInput
          onSearchSubmit={(search) => {
            console.log(search);
          }}
        />
        <GoToCreateUserPageAction />
      </div>
      <UserList />
    </div>
  );
}
