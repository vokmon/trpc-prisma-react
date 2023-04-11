import { useParams } from 'react-router-dom';
import { trpc } from '../../../../utils/trpc';
import { UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import UserInputForm from './UserInputForm';
import ProjectSchema, {
  UserInputForUpdateType,
  UserInputType,
  UserObjectType,
} from 'trpc-models';

const usePrepareData = (userId: string) => {
  // const { userId } = useParams();
  const userQuery = trpc.users.getUserById.useQuery(userId, {
    cacheTime: 0,
    queryKey: ['users.getUserById', userId],
  });

  const formConfig: UseFormReturn<UserInputType> = useForm<UserInputType>({
    mode: 'all',
    resolver: zodResolver(ProjectSchema.users.UserInputForUpdate),
    values: userQuery.data as UserInputType,
  });

  return {
    userQuery,
    formConfig,
  };
};

type IProp = {
  onUpdateSuccess: (user: UserObjectType) => void;
};

export default function UpdateUserInputForm({ onUpdateSuccess }: IProp) {
  const { userId } = useParams();
  const { userQuery, formConfig } = usePrepareData(userId || '');

  const userMutation = trpc.users.updateUser.useMutation();
  const { mutateAsync, isSuccess, isError, error, reset } = userMutation;

  if (userQuery.isFetching) {
    return <p>Loading...</p>;
  }

  const processForm = async (data: UserInputType) => {
    const user = data as UserInputForUpdateType;
    const result = await mutateAsync({ ...user, id: userId || '' });
    formConfig.reset();
    userQuery.refetch();
    onUpdateSuccess(result);
    setTimeout(() => {
      reset();
    }, 3000);
  };

  return (
    <div>
      <UserInputForm formConfig={formConfig} onSubmit={processForm} />
      {isSuccess && (
        <div className="mt-10 text-center text-green-500">Save success</div>
      )}
      {isError && (
        <div className="mt-10 text-center text-red-500">{error.message}</div>
      )}
    </div>
  );
}
