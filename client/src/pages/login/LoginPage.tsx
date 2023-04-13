import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import ProjectSchema, {
  LoginUserSchemaType,
  // UserResponseType,
} from 'trpc-models';
import { trpc } from '../../utils/trpc';
import { UserTokensType, useUserStore } from '../../stores/UserStores';
import { useStore } from 'zustand';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset: formReset,
  }: UseFormReturn<LoginUserSchemaType> = useForm<LoginUserSchemaType>({
    mode: 'all',
    resolver: zodResolver(ProjectSchema.login.LoginUserSchema),
  });

  const userMutation = trpc.login.loginUser.useMutation();
  const { mutateAsync, isError, error } = userMutation;

  const setTokens = useStore(useUserStore, (state) => state.setTokens);
  const navigate = useNavigate();

  const handleSubmitForm = async (data: LoginUserSchemaType) => {
    const result = await mutateAsync(data);
    const tokens: UserTokensType = {
      accessToken: result.access_token || '',
      refreshToken: result.refresh_token || '',
    };
    setTokens(tokens);
    formReset();
    navigate('/users');
  };

  // console.log(document.cookie.logged_in);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center px-6 py-8 mx-auto mt-20 md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleSubmit(handleSubmitForm)}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="jane.doe@test.com"
                  required
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">
                    {' '}
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {' '}
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={!isValid}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      {isError && (
        <div className="mt-10 text-center text-red-500">{error.message}</div>
      )}
    </section>
  );
}
