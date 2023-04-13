import {
  LoginUserSchemaType,
  UserInputForCreateType,
  UserObjectType,
  UserResponseType,
} from 'trpc-models';
import { appRouter } from '../src/routers';
import { delay } from '../src/utils/utils';
import { Response } from 'express';

describe('Test login route', () => {
  let user: UserObjectType | null = null;
  let userLoggedIn: UserResponseType | null = null;
  const password = '123456';

  const getRes = (): Response => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cookie: (key, token) => {
      expect(key !== undefined && key !== null).toBeTruthy();
      expect(token !== undefined && token !== null).toBeTruthy();
    },
  });

  beforeAll(async () => {
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
  });

  it('Should login successfully', async () => {
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
        res: getRes(),
      })
      .login.loginUser(userToLogin);

    expect(
      userLoggedIn.access_token !== null &&
        userLoggedIn.access_token !== undefined
    ).toBeTruthy();

    expect(userLoggedIn).toEqual(
      expect.objectContaining({
        status: 'success',
        // access_token:
        //   'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNjI2Zjk5Zi0yY2EyLTRmMDgtYmFiYy01ZjZiODBiYWM5MGIiLCJpYXQiOjE2ODEzNzA3MTksImV4cCI6MTY4MTM3MTYxOX0.YIGu0h4k7O5tmshlx_frf28y05Oq_lEUNaEZOlBpmh-0jFehqyzUdk70RacNm0alaNn8VaEwAf8vaOkVzL01354A-QU2clsIaYNgJTrQNovZP3nMjqb61CGX7M0hi2qDZjVK1fnf_RZMWhg8HcB2BFrwBLtL-TUypMDu4QzeD_LrbpnDhO7uIy7eVlnwTtEFBuU098OClyU6hbDHUsH1OQZSEQmASHRE0vLCaGC1pHG1BcxLdk033alN-6r2XjCl4gE_-0-yb5ZOb8GxS5HbrbxcO39OQTlcISt7BCKhaRUG9nKThwoPGZQ1PbZNYcU_ksaVMaJrSAI63qWyoepN5g',
        user: {
          id: user?.id,
          name: user?.name,
          lastName: user?.lastName,
          email: user?.email,
          role: user?.role,
        },
      })
    );
  });

  it('Should refresh token successfully', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await appRouter
      .createCaller({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req: {
          cookies: {
            refresh_token: userLoggedIn?.refresh_token,
          },
        },
        res: getRes(),
      })
      .login.refreshToken();

    expect(
      result.access_token !== null && result.access_token !== undefined
    ).toBeTruthy();

    expect(result.status).toEqual('success');
  });

  it('Should logout successfully', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await appRouter
      .createCaller({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req: {},
        res: getRes(),
      })
      .login.logoutUser();

    expect(result).toMatchObject({ status: 'success' });
  });

  afterAll(async () => {
    if (user) {
      await appRouter
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .createCaller({ req: {}, res: {} })
        .users.deleteUsers([user.id]);

      await delay(500);
    }
  });
});
