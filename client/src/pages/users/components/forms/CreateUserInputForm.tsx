import { zodResolver } from '@hookform/resolvers/zod';
import UserInputForm from './UserInputForm';
import ProjectSchema, {
  UserInputForCreateType,
  UserInputType,
} from 'trpc-models';
import { useForm } from 'react-hook-form';

export default function CreateUserInputForm() {
  const formConfig = useForm<UserInputType>({
    mode: 'all',
    resolver: zodResolver(ProjectSchema.users.UserInputForCreate),
  });

  const processForm = async (data: UserInputType) => {
    console.log(data);
    const t = data as UserInputForCreateType;
    console.log(t);
    formConfig.reset();
  };

  return <UserInputForm formConfig={formConfig} onSubmit={processForm} />;
}
