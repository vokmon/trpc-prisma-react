import bcrypt from 'bcrypt';
import ProjectSchema, { UserResponseType } from 'trpc-models';
import { TRPCError } from '@trpc/server';
import { t } from '../utils/trpc';
import { prisma } from '../utils/prisma';
import {
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  signTokens,
  verifyJwt,
} from '../utils/jwt';
import { RoleEnumType } from '@prisma/client';

export const loginRouter = t.router({
  loginUser: t.procedure
    .input(ProjectSchema.login.LoginUserSchema)
    .mutation<UserResponseType>(async ({ input, ctx }) => {
      // Get the user from the collection
      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      // Check if user exist and password is correct
      if (!user || !(await bcrypt.compare(input.password, user.password))) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid email or password',
        });
      }

      // Create the Access and refresh Tokens
      const { access_token, refresh_token } = await signTokens(user);

      // Send Access Token in Cookie
      const accessTokenCookieOptions = getAccessTokenCookieOptions();
      const refreshTokenCookieOptions = getRefreshTokenCookieOptions();
      ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
      ctx.res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
      ctx.res.cookie('logged_in', true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });

      // Send Access Token
      return {
        status: 'success',
        access_token,
        refresh_token,
        user: {
          id: user.id || '',
          name: user.name || '',
          lastName: user.lastName || '',
          email: user.email || '',
          role: RoleEnumType[user.role!],
        },
      };
    }),

  refreshToken: t.procedure.query<UserResponseType>(async ({ ctx }) => {
    // Get the refresh token from cookie
    const refresh_token = ctx.req.cookies?.refresh_token as string;
    const message = 'Could not refresh access token';
    if (!refresh_token) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }
    // Validate the Refresh token
    const decoded = verifyJwt<{ sub: string }>(
      refresh_token,
      'refreshTokenPublicKey'
    );

    if (!decoded) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }

    // Get the user from the collection
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.sub,
      },
    });

    if (!user) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }

    // Sign new access token
    const { access_token } = await signTokens(user, false);
    // Send the access token as cookie
    const accessTokenCookieOptions = getAccessTokenCookieOptions();
    ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
    ctx.res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send Access Token
    return {
      status: 'success',
      access_token,
    };
  }),
  logoutUser: t.procedure.mutation<UserResponseType>(async ({ ctx }) => {
    ctx.res.cookie('access_token', '', { maxAge: -1 });
    ctx.res.cookie('refresh_token', '', { maxAge: -1 });
    ctx.res.cookie('logged_in', '', {
      maxAge: -1,
    });
    return { status: 'success' };
  }),
});
