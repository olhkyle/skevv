import { z } from 'zod';

type LoginSchema = z.infer<typeof loginSchema>;
type SignUpSchema = z.infer<typeof signUpSchema>;

const loginSchema = z.object({
	email: z.email({ message: 'Email is invalid' }),
	password: z
		.string()
		.min(1, { message: 'Password cannot be blank' })
		.regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,15}$/, {
			message: `Write correct password format`,
		}),
});

const signUpSchema = z.object({
	email: z.email({ message: 'Email is invalid' }),
	password: z
		.string()
		.min(1, { message: 'Password cannot be blank' })
		.regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,15}$/, {
			message: `Write correct password format`,
		}),
	nickname: z.string().min(2, { message: 'Over 2 length of name' }),
});

export type { LoginSchema, SignUpSchema };
export { loginSchema, signUpSchema };
