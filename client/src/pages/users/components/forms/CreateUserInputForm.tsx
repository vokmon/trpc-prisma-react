import { zodResolver } from '@hookform/resolvers/zod';
import UserInputForm from './UserInputForm';
import ProjectSchema, {
  UserInputForCreateType,
  UserInputType,
  UserObjectType,
} from 'trpc-models';
import { UseFormReturn, useForm } from 'react-hook-form';
import { trpc } from '../../../../utils/trpc';

type IProp = {
  onCreateSuccess: (user: UserObjectType) => void;
};

export default function CreateUserInputForm({ onCreateSuccess }: IProp) {
  const formConfig: UseFormReturn<UserInputType> = useForm<UserInputType>({
    mode: 'all',
    resolver: zodResolver(ProjectSchema.users.UserInputForCreate),
  });

  const userMutation = trpc.users.createUser.useMutation();
  const { mutateAsync, isSuccess, isError, error, reset } = userMutation;

  const processForm = async (data: UserInputType) => {
    const user = data as UserInputForCreateType;
    const result = await mutateAsync(user);
    formConfig.reset();
    onCreateSuccess(result);
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
