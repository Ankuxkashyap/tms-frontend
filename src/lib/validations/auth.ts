import { email, string, z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
    name : string().min(1, 'Username is required'),
    email: email('Please enter a valid email address'),
    password: string().min(6, 'Password must be at least 6 characters'),
})

export type loginSchemaType = z.infer<typeof loginSchema>;
export type signupSchemaType = z.infer<typeof signupSchema>;