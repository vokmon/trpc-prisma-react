import { z } from 'zod';

export const LoginUserSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Must be atleast 6 characters'),
});
