import { useContext } from 'react';
import { UserPageContext } from '../UserPageHooks';
import { useStore } from 'zustand';

export default function UserSearchInput() {
  const userPageContext = useContext(UserPageContext);

  const filterString = useStore(
    userPageContext!.userPageStore!,
    (state) => state.filterString
  );
  const setFilterString = useStore(
    userPageContext!.userPageStore!,
    (state) => state.setFilterString
  );

  // const handleSubmit = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   setFilterString(searchString);
  // };

  return (
    <form className="flex-grow">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Name, Last name, email..."
          value={filterString}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            // setSearchString(e.currentTarget.value);
            setFilterString(e.currentTarget.value);
          }}
        />
      </div>
    </form>
  );
}
