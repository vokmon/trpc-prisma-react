import { t } from '../utils/trpc';
import { userRouter } from './usersRoute';
import { helloRouter } from './helloRoute';
import { loginRouter } from './loginRoute';
export const appRouter = t.router({
  login: loginRouter,
  hello: helloRouter,
  users: userRouter,
});

// export const appRouter = t.mergeRouters(helloRouter, userRouter);