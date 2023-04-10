import { appRouter } from '../src/routers';
import { UserInputForCreateType } from 'trpc-models';

describe('Test user route', () => {
  let createUserIds: string[] = [];

  beforeAll(async () => {
    const newUsersPromise = [];
    for (let i = 1; i < 5; i++) {
      const newUser: UserInputForCreateType = {
        name: 'John' + i,
        lastName: 'Doe' + i,
        email: i + 'john.doe@test.com',
        role: 'user',
        password: '123456' + i,
        confirmPassword: '123456' + i,
      };
      const promise = appRouter
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .createCaller({ req: {}, res: {} })
        .users.createUser(newUser);
      newUsersPromise.push(promise);
    }
    const result = await Promise.all(newUsersPromise);
    createUserIds = result.map((r) => r.id);
  });
  it('Should create new user successfully', async () => {
    const newUser: UserInputForCreateType = {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      role: 'user',
      password: '123456',
      confirmPassword: '123456',
    };
    const result = await appRouter
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .createCaller({ req: {}, res: {} })
      .users.createUser(newUser);

    createUserIds.push(result.id);
    expect(result).toEqual(
      expect.objectContaining({
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.com',
        role: 'user',
      })
    );
  });

  it('Should get all users successfully', async () => {
    const result = await appRouter
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .createCaller({ req: {}, res: {} })
      .users.getAllUsers();
    expect(result.length).toEqual(5);
  });
  afterAll(async () => {
    await appRouter
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .createCaller({ req: {}, res: {} })
      .users.deleteUsers(createUserIds);
  });
});
