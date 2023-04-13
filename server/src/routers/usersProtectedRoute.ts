import ProjectSchema, { UserObjectType } from 'trpc-models';
import { authorizedProcedure, t } from '../utils/trpc';
import { z } from 'zod';
import userController from '../controllers/userController';

export const userRouter = t.router({
  createUser: authorizedProcedure
    .input(ProjectSchema.users.UserInputForCreate)
    .mutation<UserObjectType>(async ({ input }) => {
      return userController.createUser(input);
    }),
  updateUser: authorizedProcedure
    .input(ProjectSchema.users.UserInputForUpdate)
    .mutation<UserObjectType>(async ({ input, ctx }) => {
      return userController.updateUser(input, ctx);
    }),
  getAllUsers: authorizedProcedure.query(async () => {
    return userController.getAllUsers();
  }),
  getUserById: authorizedProcedure.input(z.string().uuid()).query(async ({ input }) => {
    return userController.getUserById(input);
  }),
  deleteUsers: authorizedProcedure
    .input(z.string().array())
    .mutation(async ({ input }) => {
      return userController.deleteUsers(input);
    }),
});
