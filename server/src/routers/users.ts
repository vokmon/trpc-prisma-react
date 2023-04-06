import { t } from '../trpc';

export const userRouter = t.router({
  /**
   * Get User
   */
  getUser: t.procedure.query(async () => {
    return { id: 1, name: 'John' };
  }),
});