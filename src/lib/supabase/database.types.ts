export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			archive: {
				Row: {
					// the data expected from .select()
					id: string;
					user_id: string;
					title: string;
					pageCount: number;
					size: number;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id: string;
					user_id: string;
					title: string;
					pageCount: number;
					size: number;
					created_at: string;
					updated_at: string;
				};
				Update: {
					id: string;
					user_id: string;
					title: string;
					pageCount: number;
					size: number;
					updated_at: string;
				};
				Delete: {
					id: never;
					user_id: string;
				};
			};
			project: {
				Row: {
					// the data expected from .select()
					id: string;
					user_id: string;
					title: string;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id: string;
					user_id: string;
					title: string;
					created_at: string;
					updated_at: string;
				};
				Update: {
					id: string;
					user_id: string;
					title: string;
					updated_at: string;
				};
				Delete: {
					id: never;
					user_id: string;
				};
			};
			file: {
				Row: {
					// the data expected from .select()
					id: string;
					project_id: string;
					name: string;
					size: string;
					mime: number;
					page_count: number;
					order: number;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id: string;
					project_id: string;
					name: string;
					size: string;
					mime: number;
					page_count: number;
					order: number;
					created_at: string;
					updated_at: string;
				};
				Update: {
					id: string;
					project_id: string;
					name?: string;
					size?: string;
					mime?: number;
					page_count?: number;
					order?: number;
					updated_at: string;
				};
				Delete: {
					id: never;
					project_id: string;
				};
			};
		};
	};
}
