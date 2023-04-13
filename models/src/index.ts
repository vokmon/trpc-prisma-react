import { z } from 'zod';
import * as greetings from './greetings/Greetings';
import * as users from './users/User';
import * as login from './login/Login';

export default {
  greetings,
  users,
  login,
};

/**
 * Greeting models
 */
export type SayHelloInputType = z.infer<typeof greetings.SayHelloInput>;

/**
 * Login models
 */
export type LoginUserSchemaType = z.infer<typeof login.LoginUserSchema>;
export type UserResponseType = {
  status: string;
  access_token?: string;
  refresh_token?: string;
  user?: UserObjectType;
};
/**
 * Users
 */
export type UserInputType = z.infer<typeof users.UserInput>;
export type UserInputForCreateType = z.infer<typeof users.UserInputForCreate>;
export type UserInputForUpdateType = z.infer<typeof users.UserInputForUpdate>;
export type UserObjectType = z.infer<typeof users.UserObject>;
