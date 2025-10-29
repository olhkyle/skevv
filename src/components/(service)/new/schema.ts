import { z } from 'zod';

type FileNameSchema = z.infer<typeof fileNameSchema>;

const fileNameSchema = z.object({
	fileName: z.string().min(2, { message: 'Over 2 length of name' }),
});

export type { FileNameSchema };
export { fileNameSchema };
