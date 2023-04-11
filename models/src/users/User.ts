import { z } from 'zod';

export const UserInput = z.object({
  name: z.string().min(1, { message: 'Firstname is required' }),
  lastName: z.string().min(1, { message: 'Lastname is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  role: z.enum(['user', 'admin']),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

export const UserInputForCreate = UserInput.extend({
  password: z.string().min(6, { message: 'Must be atleast 6 characters' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Must be atleast 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: "Confirm password don't match",
});

export const UserInputForUpdate = UserInput.extend({
  id: z.string().uuid(),
  password: z.string().optional().refine((p) => !p || p.length >= 6, {
    message: 'Must be atleast 6 characters',
  }),
  confirmPassword: z.string().optional().refine((p) => !p || p.length >= 6, {
    message: 'Must be atleast 6 characters',
  }),
}).refine(
  (data) =>
    (!data.password && !data.confirmPassword) ||
    data.password === data.confirmPassword,
  {
    path: ['confirmPassword'],
    message: "Confirm password don't match",
  }
);

export const UserObject = UserInput.extend({
  id: z.string().uuid(),
});
