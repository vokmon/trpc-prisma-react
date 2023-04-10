import ProjectSchema, { UserObjectType } from 'trpc-models';
import { t } from '../utils/trpc';
import { prisma } from '../utils/prisma';
import { RoleEnumType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const userRouter = t.router({
  /**
   * Get User
   */
  getUser: t.procedure.query(async () => {
    return { id: 1, name: 'John' };
  }),
  createUser: t.procedure
    .input(ProjectSchema.users.UserInputForCreate)
    .mutation<UserObjectType>(async ({ input }) => {
      console.log(`Add log with message ${JSON.stringify(input)}`);
      const user = {
        name: input.name,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
        role: RoleEnumType[input.role],
      };

      const newUser = await prisma?.user.create({
        data: user,
      });
      if (newUser) {
        return {
          id: newUser.id || '',
          name: newUser.name || '',
          lastName: newUser.lastName || '',
          email: newUser.email || '',
          role: RoleEnumType[input.role],
        };
      }
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }),

  getAllUsers: t.procedure.query(async () => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        role: true,
      },
      orderBy: [
        {
          name: 'asc',
        },
        {
          lastName: 'asc',
        }
      ],
    });

    if (users) {
      const result: UserObjectType[] = users.map((user) => ({
        id: user.id || '',
        name: user.name || '',
        lastName: user.lastName || '',
        email: user.email || '',
        role: RoleEnumType[user.role!],
      }));
      return result;
    }
    return [];
  }),
  deleteUsers: t.procedure
    .input(z.string().array())
    .mutation(async ({ input }) => {
      const result = await prisma.user.deleteMany({
        where: {
          id: {
            in: input,
          },
        },
      });
      return result;
    }),
});
