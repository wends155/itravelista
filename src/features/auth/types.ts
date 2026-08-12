import { z } from 'zod';

export const authFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
});

export const signUpFormSchema = authFormSchema.extend({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type AuthFormData = z.infer<typeof authFormSchema>;
export type SignUpFormData = z.infer<typeof signUpFormSchema>;

export type AuthProvider = 'google' | 'email' | 'magic_link' | 'guest';

export interface AuthState {
  user: { id: string; email?: string; displayName?: string } | null;
  isLoading: boolean;
  isGuest: boolean;
}
