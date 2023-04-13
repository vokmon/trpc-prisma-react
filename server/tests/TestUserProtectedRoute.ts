import { appRouter } from '../src/routers';
import {
  LoginUserSchemaType,
  UserInputForCreateType,
  UserInputForUpdateType,
  UserObjectType,
  UserResponseType,
} from 'trpc-models';
import { delay } from '../src/utils/utils';

describe('Test user route', () => {
  let createUserIds: string[] = [];

  let user: UserObjectType | null = null;
  let userLoggedIn: UserResponseType | null = null;
  const password = '123456';

  const getReq = (): Request => {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cookies: {
        access_token: userLoggedIn?.access_token,
      },
    };
  };

  const getRes = (): Response => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cookie: (key, token) => {
      expect(key !== undefined && key !== null).toBeTruthy();
      expect(token !== undefined && token !== null).toBeTruthy();
    },
  });

  beforeAll(async () => {
    // Setup data for testing
    const newUsersPromise = [];
    for (let i = 1; i < 5; i++) {
      const newUser: UserInputForCreateType = {
        name: 'John' + i,
        lastName: 'Doe' + i,
        email: i + 'john.doe.protected.route@test.com',
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

    /**-----------  ---------------**/
    // Create a new user for login
    const timeStamp = new Date().getTime();
    const newUser: UserInputForCreateType = {
      name: `Name${timeStamp}`,
      lastName: `LastName${timeStamp}`,
      email: `${timeStamp}@test.com`,
      role: 'user',
      password: password,
      confirmPassword: password,
    };

    user = await appRouter
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .createCaller({ req: {}, res: {} })
      .users.createUser(newUser);
    createUserIds.push(user.id);

    const userToLogin: LoginUserSchemaType = {
      email: user?.email || '',
      password: password,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userLoggedIn = await appRouter
      .createCaller({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req: {},
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        res: getRes(),
      })
      .login.loginUser(userToLogin);
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
      .createCaller({ req: getReq(), res: {} })
      .usersProtected.createUser(newUser);

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
      .createCaller({ req: getReq(), res: {} })
      .usersProtected.getAllUsers();
    expect(result.length).toBeGreaterThan(5);
  });

  it('Should get user by id successfully', async () => {
    const result = await appRouter
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .createCaller({ req: getReq(), res: {} })
      .usersProtected.getUserById(createUserIds[0]);

    expect(result).toEqual(
      expect.objectContaining({
        name: 'John1',
        lastName: 'Doe1',
        email: '1john.doe.protected.route@test.com',
        role: 'user',
      })
    );
  });

  it('Should update user successfully without password', async () => {
    const updateUser: UserInputForUpdateType = {
      id: createUserIds[0],
      name: 'John',
      lastName: 'Doe',
      email: '11john.doe.protected.route@test.com',
      role: 'user',
    };

    const result = await appRouter
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .createCaller({ req: getReq(), res: {} })
      .users.updateUser(updateUser);

    expect(result).toEqual(
      expect.objectContaining({
        name: 'John',
        lastName: 'Doe',
        email: '11john.doe.protected.route@test.com',
        role: 'user',
      })
    );
  });

  it('Should update user successfully with password', async () => {
    const updateUser: UserInputForUpdateType = {
      id: createUserIds[0],
      name: 'John',
      lastName: 'Doe',
      email: '11john.doe.protected.route@test.com',
      role: 'user',
      password: '111111',
      confirmPassword: '111111',
    };

    const result = await appRouter
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .createCaller({ req: getReq(), includePassword: true })
      .usersProtected.updateUser(updateUser);

    expect(result).toEqual(
      expect.objectContaining({
        name: 'John',
        lastName: 'Doe',
        email: '11john.doe.protected.route@test.com',
        role: 'user',
        password: '111111',
      })
    );
  });

  afterAll(async () => {
    await appRouter
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .createCaller({ req: {}, res: {} })
      .users.deleteUsers(createUserIds);

    await delay(500);
  });
});
