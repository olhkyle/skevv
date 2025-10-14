import { createClient } from '@/utils/supabase/server';

export default async function HomePage() {
	const supabase = await createClient();
	const { data } = await supabase.from('statement').select('*');
	console.log(data);

	const {
		data: { user },
	} = await supabase.auth.getUser();
	console.log(user);

	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<button
				onClick={async () => {
					'use server';
					await fetch('../(auth)/auth/signout/api', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						credentials: 'include',
					});
				}}>
				Sign out
			</button>
		</div>
	);
}
