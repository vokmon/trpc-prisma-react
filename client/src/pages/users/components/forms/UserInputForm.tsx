import { UseFormReturn } from 'react-hook-form';
import {
  UserInputType,
} from 'trpc-models';

type IProps = {
  formConfig: UseFormReturn<UserInputType>;
  onSubmit: (data: UserInputType) => void;
};
export default function UserInputhtmlForm({ formConfig, onSubmit }: IProps) {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid },
  } = formConfig;

  return (
    <form
      className="w-full mx-auto mt-10 max-w-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Jane"
            {...register('name', { required: true })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">
              {' '}
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Last Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Doe"
            {...register('lastName', { required: true })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs italic">
              {' '}
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="inline-block px-3 relative w-72">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-role"
          >
            User role
          </label>
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-role"
            {...register('role', { required: true })}
          >
            <option value="user">User</option>
            <option value="admin" defaultChecked>
              Admin
            </option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-email"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-email"
            type="email"
            placeholder="abc@test.com"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {' '}
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Password
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="password"
            placeholder="******************"
            {...register('password', { required: true })}
            onBlur={() => {
              trigger('password');
              trigger('confirmPassword');
            }}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {' '}
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-confirm-password"
          >
            Confirm Password
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-confirm-password"
            type="password"
            placeholder="******************"
            {...register('confirmPassword')}
            onBlur={() => {
              trigger('password');
              trigger('confirmPassword');
            }}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs italic">
              {' '}
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-around">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={(!isValid)}
        >
          Save
        </button>
        <button
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          onClick={() => {
            reset();
          }}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
