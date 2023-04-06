import { createClient } from 'redis';
import customConfig from '../config/default';

const redisUrl = customConfig.redisUri;
const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('? Redis client connected...');
    redisClient.set(
      'tRPC',
      '??Welcome to tRPC with React.js, Express and Typescript!'
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err.message);
    process.exit(1);
  }
};

connectRedis();

redisClient.on('error', (err) => console.log(err));

export default redisClient;