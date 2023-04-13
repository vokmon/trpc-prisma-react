import { t } from '../utils/trpc';
import ProjectSchema, { SayHelloInputType } from 'trpc-models';
import { delay } from '../utils/utils';

export const helloRouter = t.router({
  sayHello: t.procedure
    .input(ProjectSchema.greetings.SayHelloInput)
    .query<string>(async (req) => {
      console.log(`Add log with message ${req.input}`);
      // For React suspend testing
      await delay(1000);

      const input: SayHelloInputType = req.input;
      return `Hello ${input.name} ${new Date()}`;
    }),
  log: t.procedure
    .input((v) => {
      if (typeof v === 'string') return v;
      throw new Error('Invalid input: Expected string');
    })
    .mutation((req) => {
      console.log(`Add log with message ${req.input}`);
      return true;
    }),
});
