import ProjectSchema, { UserObjectType } from 'trpc-models';
import { t } from '../utils/trpc';
import { z } from 'zod';
import userController from '../controllers/userController';

export const userRouter = t.router({
  createUser: t.procedure
    .input(ProjectSchema.users.UserInputForCreate)
    .mutation<UserObjectType>(async ({ input }) => {
      return userController.createUser(input);
    }),
  updateUser: t.procedure
    .input(ProjectSchema.users.UserInputForUpdate)
    .mutation<UserObjectType>(async ({ input, ctx }) => {
      return userController.updateUser(input, ctx);
    }),
  getAllUsers: t.procedure.query(async () => {
    return userController.getAllUsers();
  }),
  getUserById: t.procedure.input(z.string().uuid()).query(async ({ input }) => {
    return userController.getUserById(input);
  }),
  deleteUsers: t.procedure
    .input(z.string().array())
    .mutation(async ({ input }) => {
      return userController.deleteUsers(input);
    }),
});
