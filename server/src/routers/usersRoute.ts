import ProjectSchema, { UserObjectType } from 'trpc-models';
import { t } from '../utils/trpc';
import { prisma } from '../utils/prisma';
import { RoleEnumType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const userRouter = t.router({
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
  updateUser: t.procedure
    .input(ProjectSchema.users.UserInputForUpdate)
    .mutation<UserObjectType>(async ({ input, ctx }) => {
      console.log(`Add log with message ${JSON.stringify(input)}`);
      const user = {
        name: input.name,
        lastName: input.lastName,
        email: input.email,
        password: input.password || undefined,
        role: RoleEnumType[input.role],
      };
      const updatedUser = await prisma.user.update({
        where: {
          id: input.id,
        },
        data: user,
      });

      console.log(ctx);
      if (updatedUser) {
        return {
          id: updatedUser.id || '',
          name: updatedUser.name || '',
          lastName: updatedUser.lastName || '',
          email: updatedUser.email || '',
          role: RoleEnumType[input.role],
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          password: ctx.includePassword ? updatedUser.password : undefined,
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
        },
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
  getUserById: t.procedure.input(z.string().uuid()).query(async ({ input }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: input,
      },
    });

    if (user) {
      return {
        id: user.id || '',
        name: user.name || '',
        lastName: user.lastName || '',
        email: user.email || '',
        role: RoleEnumType[user.role!],
      };
    }
    return null;
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
