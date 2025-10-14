export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			statement: {
				Row: {
					// the data expected from .select()
					id: string;
					user_id: string;
					title: string;
					writer: string;
					total_amount: number;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id: string;
					user_id: string;
					title: string;
					writer: string;
					total_amount: number;
					created_at: string;
					updated_at: string;
				};
				Update: {
					id: string;
					user_id: string;
					title: string;
					writer: string;
					total_amount: number;
					updated_at: string;
				};
				Delete: {
					id: never;
					user_id: never;
				};
			};
		};
	};
}
