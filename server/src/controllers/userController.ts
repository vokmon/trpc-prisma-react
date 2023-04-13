import { RoleEnumType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import {
  UserInputForCreateType,
  UserInputForUpdateType,
  UserObjectType,
} from 'trpc-models';
import { prisma } from '../utils/prisma';
import { Context } from '../utils/trpc';

export default {
  createUser: async (
    input: UserInputForCreateType
  ): Promise<UserObjectType> => {
    console.log(`Add log with message ${JSON.stringify(input)}`);

    const hashPassword = await bcrypt.hash(input.password, 12);

    const user = {
      name: input.name,
      lastName: input.lastName,
      email: input.email,
      password: hashPassword,
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
  },

  updateUser: async (
    input: UserInputForUpdateType,
    ctx: Context,
  ): Promise<UserObjectType> => {
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
  },

  getAllUsers: async (): Promise<UserObjectType[]> => {
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
  },

  getUserById: async (input: string): Promise<UserObjectType | null> => {
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
  },

  deleteUsers: async (input: string[]) => {
    const result = await prisma.user.deleteMany({
      where: {
        id: {
          in: input,
        },
      },
    });
    return result;
  }
};
