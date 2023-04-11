import { z } from 'zod';
import * as greetings from './greetings/Greetings';
import * as users from './users/User';

export default {
  greetings,
  users,
};

/**
 * Greeting models
 */
export type SayHelloInputType = z.infer<typeof greetings.SayHelloInput>;

/**
 * Users
 */
export type UserInputType = z.infer<typeof users.UserInput>;
export type UserInputForCreateType = z.infer<typeof users.UserInputForCreate>;
export type UserInputForUpdateType = z.infer<typeof users.UserInputForUpdate>;
export type UserObjectType = z.infer<typeof users.UserObject>;
