import { Navigate, Route, Routes } from 'react-router-dom';
import UserSidebar from './components/UserSidebar';
import CreateUserInputForm from './components/forms/CreateUserInputForm';
import UserLandingIndex from './components/UserLandingIndex';
import UpdateUserInputForm from './components/forms/UpdateUserInputForm';
import { UserPageContext, usePrepareUserPage } from './UserPageHooks';

export default function UsersPage() {

  const userPageStoreRef = usePrepareUserPage();

  return (
    <UserPageContext.Provider value={userPageStoreRef.current}>
      <div className="flex flex-row flex-grow h-full">
        <UserSidebar />
        <div className="flex-grow overflow-y-auto">
          <Routes>
            <Route
              path="create-user"
              element={
                <CreateUserInputForm />
              }
            />
            <Route
              path=":userId"
              element={
                <UpdateUserInputForm />
              }
            />
            <Route index element={<UserLandingIndex />} />
            <Route
              path="*"
              caseSensitive={false}
              element={<Navigate to="" replace />}
            />
          </Routes>
        </div>
      </div>
    </UserPageContext.Provider>
  );
}
