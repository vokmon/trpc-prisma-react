import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { delay } from '../../utils/utils';

const AutoQueryWhenTextChange = () => {
  const [searchText, setSearchText] = useState('');
  const testQuery = useQuery({
    queryKey: ['testQuery', searchText],
    queryFn: async (data) => {
      // console.log(data);
      return `Result of : ${data.queryKey[1]}`;
    },
    enabled: Boolean(searchText),
  });

  return (
    <>
      <div>
        <label
          htmlFor="text"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search
        </label>
        <input
          type="text"
          id="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </div>

      <div className="mt-10">{testQuery.data}</div>
    </>
  );
};

const FireQueryWhenSubmit = () => {
  const [searchText, setSearchText] = useState('');
  const [searchPayload, setSearchPayload] = useState({
    text: '',
    others: undefined,
  });

  const queryClient = useQueryClient();

  const testQuery = useQuery({
    queryKey: ['testQuery', searchPayload],
    queryFn: async (data) => {
      if (!data.queryKey[1]) {
        return '';
      }
      // console.log(data);
      await delay(1000);
      return `Result of : ${JSON.stringify(searchPayload)}`;
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In case the user click submit button without changing search criteria.
    queryClient.invalidateQueries({
      queryKey: ['testQuery'],
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setSearchPayload({ others: undefined, text: searchText });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Search
          </label>
          <input
            type="text"
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </form>

      {testQuery.isLoading && 'Loading...'}

      {testQuery.isFetching && 'Fetching...'}
      <div className="mt-10">{testQuery.data}</div>
    </>
  );
};

export default function TestUseQuery() {
  return (
    <>
      <AutoQueryWhenTextChange />
      <br /> <br /> <br /> <br />
      <FireQueryWhenSubmit />
    </>
  );
}
