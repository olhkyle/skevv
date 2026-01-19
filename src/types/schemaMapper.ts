import { z } from 'zod';
import type { Archive } from '@/lib/supabase';

type ArchiveViewSchema = z.infer<typeof archiveViewSchema>;

const archiveViewSchema: z.ZodType<Archive> = z.object({
	id: z.string(),
	user_id: z.string(),
	title: z.string(),
	pageCount: z.number(),
	size: z.number(),
	created_at: z.string(),
	updated_at: z.string(),
});

const mapArchiveToView = (row: Archive) =>
	archiveViewSchema.parse({
		id: row.id,
		user_id: row.user_id,
		title: row.title,
		pageCount: row.pageCount,
		size: row.size,
		created_at: row.created_at,
		updated_at: row.updated_at,
	});

export type { ArchiveViewSchema };
export { mapArchiveToView };
