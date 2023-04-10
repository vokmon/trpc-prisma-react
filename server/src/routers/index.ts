import { t } from '../utils/trpc';
import { userRouter } from './usersRoute';
import { helloRouter } from './helloRoute';

export const appRouter = t.router({
  hello: helloRouter,
  users: userRouter,
});
