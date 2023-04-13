import { t } from '../utils/trpc';
import { userRouter } from './usersRoute';
import { helloRouter } from './helloRoute';
import { loginRouter } from './loginRoute';
import { usersProtectedRoute } from './usersProtectedRoute';

export const appRouter = t.router({
  login: loginRouter,
  hello: helloRouter,
  users: userRouter,
  usersProtected: usersProtectedRoute,
});

// export const appRouter = t.mergeRouters(helloRouter, userRouter);