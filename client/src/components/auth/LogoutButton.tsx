import { useStore } from 'zustand';
import { trpc } from '../../utils/trpc';
import { useUserStore } from '../../stores/UserStores';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const userMutation = trpc.login.logoutUser.useMutation();
  const { mutateAsync } = userMutation;

  const resetStore = useStore(useUserStore, (state) => state.resetStore);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await mutateAsync();
    resetStore();
    navigate('/login');
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-blue-900 hover:bg-blue-700 text-white rounded-md py-2 px-4"
    >
      Logout
    </button>
  );
}
