import { z } from 'zod';
import * as greetings from './greetings/Greetings';

export default {
  greetings,
};

/**
 * Greeting models
 */
export type SayHelloInputType = z.infer<typeof greetings.SayHelloInput>;
