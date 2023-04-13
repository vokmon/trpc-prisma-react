import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../.env') });

const customConfig: {
  port: number;
  origin: string;
  redisUri: string;
  dbUri: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  accessTokenPrivateKey: string;
  accessTokenPublicKey: string;
  refreshTokenPrivateKey: string;
  refreshTokenPublicKey: string;
} = {
  port: process.env.PORT as unknown as number,
  origin: process.env.ORIGIN as unknown as string,
  redisUri: process.env.REDIS_URL as unknown as string,
  dbUri: process.env.DATABASE_URL as unknown as string,
  accessTokenExpiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN || 0),
  refreshTokenExpiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN || 0),
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY as string,
};

export default customConfig;
