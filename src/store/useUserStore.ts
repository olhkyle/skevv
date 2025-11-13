import { create } from 'zustand';

// TODO: connect Supabase Auth
interface User {
	id: string;
	user_metadata: {
		email: string;
		nickname: string;
	};
}

interface Session {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	expires_at?: number;
	token_type: string;
	user: User;
}

interface UserState {
	userState: Session | null;
	setUserState: (data: Session | null) => void;
	resetUserState: () => void;
}

const useUserStore = create<UserState>(set => ({
	userState: null,
	setUserState(data) {
		set(() => ({
			userState: data,
		}));
	},
	resetUserState() {
		set(() => ({
			userState: null,
		}));
	},
}));

export default useUserStore;
