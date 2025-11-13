import Link from 'next/link';
import { Button } from '@/components';
import { route } from '@/constant';
// import { createClient } from '@/utils/supabase/server';

export default async function HomePage() {
	// const supabase = await createClient();
	// const { data } = await supabase.from('documents').select('*');
	// console.log(data);

	return (
		<div className="justify-items-center min-h-screen gap-24 p-8 pb-20 bg-gray-50 sm:p-20">
			<p>This is a lightweight PDF Editor</p>
			<p>Still Work In Progress ⚡️</p>
			<div className="flex flex-col gap-3 mt-20">
				<Button asChild variant="neutral" size="lg" className="bg-gradient-gray-100 text-white">
					<Link href={route.SERVICE.WRITE}>Merge PDF</Link>
				</Button>
				<Button asChild variant="neutral" size="lg" className="bg-gradient-gray-100 text-white">
					<Link href={route.SERVICE.DOCUMENTS}>Documents</Link>
				</Button>
			</div>
		</div>
	);
}
