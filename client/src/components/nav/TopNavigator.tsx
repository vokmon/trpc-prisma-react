import { NavLink } from 'react-router-dom';
import { useStore } from 'zustand';
import { useUserStore } from '../../stores/UserStores';
import LogoutButton from '../auth/LogoutButton';

type MenuItem = {
  title: string;
  url: string;
};
type ITopNavigator = {
  menuItems: MenuItem[];
};
export default function TopNavigator({ menuItems }: ITopNavigator) {
  const isLoggedInFromStore = useStore(useUserStore, (state) => state.isLoggedIn);
  return (
    <div className="w-screen mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center bg-slate-400">
      <div className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center max-sm:flex-col">
        {menuItems.map((m, index) => (
          <div className="mr-5" key={`menu-${index}`}>
            <NavLink
              className={({ isActive }) =>
                `mr-5 ${isActive ? 'underline' : ''}`
              }
              to={m.url}
            >
              {m.title}
            </NavLink>
          </div>
        ))}
      </div>

      {(isLoggedInFromStore) && (
        <LogoutButton />
      )}
    </div>
  );
}
