import * as trpcExpress from '@trpc/server/adapters/express';
import { TRPCError, inferAsyncReturnType } from '@trpc/server';
import { initTRPC } from '@trpc/server';
import { verifyJwt } from './jwt';

export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    req,
    res,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

const authorizedMiddleware = t.middleware(async ({ ctx, next }) => {
  // Get the token
  let access_token;
  if (
    ctx?.req?.headers?.authorization &&
    ctx?.req?.headers?.authorization?.startsWith('Bearer')
  ) {
    access_token = ctx.req.headers.authorization.split(' ')[1];
  } else if (ctx.req.cookies?.access_token) {
    access_token = ctx.req.cookies.access_token;
  }

  const error = new TRPCError({
    code: 'UNAUTHORIZED',
    message: 'Unauthrorized',
  });
  if (!access_token) {
    throw error;
  }

  // Validate Access Token
  const decoded = verifyJwt<{ sub: string }>(
    access_token,
    'accessTokenPublicKey'
  );

  if (!decoded) {
    throw error;
  }

  // Check if user still exist
  const user = await prisma?.user.findUnique({
    where: {
      id: decoded.sub,
    },
  });

  if (!user) {
    throw error;
  }
  return next({
    ctx: {
      user,
    },
  });
});

export const authorizedProcedure = t.procedure.use(authorizedMiddleware);