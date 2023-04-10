import { Navigate, Route, Routes } from 'react-router-dom';
import UserSidebar from './components/UserSidebar';
import CreateUserInputForm from './components/forms/CreateUserInputForm';

export default function UsersPage() {
  return (
    <div className="flex flex-row flex-grow h-full">
      <UserSidebar />
      <div className="flex-grow overflow-y-auto">
        <Routes>
          <Route
            path="create-user"
            element={
              <CreateUserInputForm
                
              />
            }
          />
          <Route index element={<div>Index page</div>} />
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
