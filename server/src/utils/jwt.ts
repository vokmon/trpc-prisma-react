import jwt, { SignOptions } from 'jsonwebtoken';
import customConfig from '../config/default';
import { User } from '@prisma/client';
import { CookieOptions } from 'express';

export const signJwt = (
  payload: object,
  key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions = {}
) => {
  const privateKey = Buffer.from(customConfig[key], 'base64').toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  key: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    const publicKey = Buffer.from(customConfig[key], 'base64').toString(
      'ascii'
    );
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const signTokens = async (user: User, withRefreshToken = true) => {
  // 1. Create Access and Refresh tokens
  const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
    expiresIn: `${customConfig.accessTokenExpiresIn}m`,
  });

  const refresh_token = withRefreshToken
    ? signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
        expiresIn: `${customConfig.refreshTokenExpiresIn}m`,
      })
    : undefined;

  return { access_token, refresh_token };
};

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
  ...cookieOptions,
  expires: new Date(Date.now() + customConfig.accessTokenExpiresIn * 60 * 1000),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
  ...cookieOptions,
  expires: new Date(
    Date.now() + customConfig.refreshTokenExpiresIn * 60 * 1000
  ),
});
