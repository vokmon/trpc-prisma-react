import { Navigate } from 'react-router-dom';
import appUtils from '../utils/appUtils';
// import { useStore } from 'zustand';
// import { useUserStore } from '../stores/UserStores';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // To access tokens from store
  // const tokens = useStore(useUserStore, (state) => state.tokens);

  const loggedIn = appUtils.getCookie('logged_in');
  if (loggedIn === 'true') {
    return children;
  }
  return <Navigate to="/login" />;
};
