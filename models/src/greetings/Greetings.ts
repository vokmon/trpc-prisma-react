import { z } from 'zod';

export const SayHelloInput = z.object({ name: z.string() });

