import { Navigate, Route, Routes } from 'react-router-dom';
import TopNavigator from '../../components/nav/TopNavigator';
import { AppContent } from '../app-content/AppContent';
import UsersPage from '../users/UsersPage';
import LoginPage from '../login/LoginPage';
import { ProtectedRoute } from '../../routes/ProtectedRoute';
import TestUseQuery from '../test-usequrey/TestUseQuery';

const menuItems = [
  { title: 'Home', url: '/', index: true, element: <AppContent /> },
  { title: 'Login', url: '/login', element: <LoginPage /> },
  {
    title: 'Users',
    url: '/users',
    element: (
      <ProtectedRoute>
        <UsersPage />
      </ProtectedRoute>
    ),
    hasChildren: true,
    isProtectedRoute: true,
  },
  { title: 'Test', url: '/test', element: <TestUseQuery /> },
];

export default function MainContainer() {
  return (
    <div className="flex flex-col h-screen">
      <TopNavigator menuItems={menuItems} />
      <div className="flex-grow overflow-y-auto">
        <Routes>
          {menuItems.map((m, index) => {
            return (
              <Route
                key={`menu-${index}`}
                path={`${m.url}${m.hasChildren ? '/*' : ''}`}
                index={m.index}
                element={m.element}
              />
            );
          })}
          <Route
            path="*"
            caseSensitive={false}
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </div>
  );
}
