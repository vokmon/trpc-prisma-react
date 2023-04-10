import ProjectSchema, { UserObjectType } from 'trpc-models';
import { t } from '../trpc';

export const userRouter = t.router({
  /**
   * Get User
   */
  getUser: t.procedure.query(async () => {
    return { id: 1, name: 'John' };
  }),
  createUser: t.procedure
    .input(ProjectSchema.users.UserInput)
    .mutation<UserObjectType>((req) => {
      console.log(`Add log with message ${req.input}`);
      return {
        name: 'string',
        email: 'string',
        verified: false,
        password: 'string',
        role: 'user',
        id: 'string',
      };
    }),
});
