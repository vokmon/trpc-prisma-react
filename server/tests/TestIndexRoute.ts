import { appRouter } from '../src/routers';

describe('Test index route', () => {
  it('Test say hello with name', async () => {
    const result = await appRouter
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .createCaller({ req: {}, res: {} })
      .hello.sayHello({ name: 'View' });
    console.log(result);
    expect(result.startsWith('Hello View')).toBeTruthy();
  });
});
