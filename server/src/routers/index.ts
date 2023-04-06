import { t } from '../trpc';
import { userRouter } from './users';

const delay = (duration: number) => {
  if (!duration) {
    return Promise.resolve();
  }
  return new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, duration);
  });
};

export const appRouter = t.router({
  sayHello: t.procedure.query(async () => {
    // For React suspend testing
    await delay(3000);
    return 'Hello';
  }),
  log: t.procedure.input(v => {
    if (typeof v === 'string') return v;
    throw new Error('Invalid input: Expected string');
  }).mutation(req => {
    console.log(`Add log with message ${req.input}`);
    return true;
  }),
  users: userRouter,
});