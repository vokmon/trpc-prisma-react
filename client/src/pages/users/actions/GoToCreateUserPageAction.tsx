import { useNavigate } from 'react-router-dom';

export default function GoToCreateUserPageAction() {
  const navigate = useNavigate();
  return (
    <button
      type="submit"
      className="text-white bg-teal-700 hover:bg-teal-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-teal-600 dark:hover:bg-teal-700"
      onClick={() => {
        navigate('create-user');
      }}
    >
      New User
    </button>
  );
}
