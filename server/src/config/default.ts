import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../.env') });

const customConfig: { port: number; origin: string; redisUri: string, dbUri: string } = {
  port: process.env.PORT as unknown as number,
  origin: process.env.ORIGIN as unknown as string,
  redisUri: process.env.REDIS_URL as unknown as string,
  dbUri: process.env.DATABASE_URL as unknown as string,
};

export default customConfig;