export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			documents: {
				Row: {
					// the data expected from .select()
					id: string;
					user_id: string;
					name: string;
					pages: number;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id: string;
					user_id: string;
					name: string;
					pages: number;
					created_at: string;
					updated_at: string;
				};
				Update: {
					id: string;
					user_id: string;
					name: string;
					pages: number;
					updated_at: string;
				};
				Delete: {
					id: never;
					user_id: string;
				};
			};
		};
	};
}
