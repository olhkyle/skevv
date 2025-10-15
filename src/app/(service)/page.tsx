import { Button } from '@/components';
import { createClient } from '@/utils/supabase/server';

export default async function HomePage() {
	const supabase = await createClient();
	const { data } = await supabase.from('documents').select('*');
	// console.log(data);

	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<Button>Sign Out</Button>
		</div>
	);
}
