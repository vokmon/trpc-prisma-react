import { Navigate, Route, Routes } from 'react-router-dom';
import TopNavigator from '../../components/nav/TopNavigator';
import { AppContent } from '../app-content/AppContent';
import UsersPage from '../users/UsersPage';

const menuItems = [
  { title: 'Home', url: '/', index: true, element: <AppContent /> },
  { title: 'Users', url: '/users', element: <UsersPage />, hasChildren: true },
];

export default function MainContainer() {
  return (
    <div className="flex flex-col h-screen">
      <TopNavigator menuItems={menuItems} />
      <div className="flex-grow overflow-y-auto">
        <Routes>
          {menuItems.map((m, index) => (
            <Route
              key={`menu-${index}`}
              path={`${m.url}${m.hasChildren ? '/*' : ''}`}
              index={m.index}
              element={m.element}
            />
          ))}
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
