import { Navigate, Route, Routes } from 'react-router-dom';
import TopNavigator from '../../components/nav/TopNavigator';
import { AppContent } from '../app-content/AppContent';
import UsersPage from '../users/UsersPage';
import LoginPage from '../login/LoginPage';
import { ProtectedRoute } from '../../routes/ProtectedRoute';
import TestUseQuery from '../test-usequrey/TestUseQuery';
import IframeParent from '../iframe-route/IframeParent';
import IframeChid from '../iframe-route/IframeChid';

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
  { title: 'Test Iframe', url: '/test-iframe', element: <IframeParent /> },
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
          <Route path="/iframe-children" element={<IframeChid />} />
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
