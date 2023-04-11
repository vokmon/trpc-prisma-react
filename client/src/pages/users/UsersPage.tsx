import { Navigate, Route, Routes } from 'react-router-dom';
import UserSidebar from './components/UserSidebar';
import CreateUserInputForm from './components/forms/CreateUserInputForm';
import UserLandingIndex from './components/UserLandingIndex';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { trpc } from '../../utils/trpc';
import UpdateUserInputForm from './components/forms/UpdateUserInputForm';

export default function UsersPage() {
  const queryClient = useQueryClient();
  return (
    <div className="flex flex-row flex-grow h-full">
      <UserSidebar />
      <div className="flex-grow overflow-y-auto">
        <Routes>
          <Route
            path="create-user"
            element={
              <CreateUserInputForm
                onCreateSuccess={() => {
                  queryClient.refetchQueries(
                    getQueryKey(trpc.users.getAllUsers)
                  );
                }}
              />
            }
          />
          <Route
            path=":userId"
            element={
              <UpdateUserInputForm
                onUpdateSuccess={() => {
                  queryClient.refetchQueries(
                    getQueryKey(trpc.users.getAllUsers)
                  );
                }}
              />
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
  );
}
