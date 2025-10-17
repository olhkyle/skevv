import Link from 'next/link';
import { Button } from '@/components';
import route from '@/constant/route';
// import { createClient } from '@/utils/supabase/server';

export default async function HomePage() {
	// const supabase = await createClient();
	// const { data } = await supabase.from('documents').select('*');
	// console.log(data);

	return (
		<div className="justify-items-center min-h-screen p-8 pb-20 gap-24 sm:p-20">
			<p>This is a lightweight PDF Executor</p>
			<p>Still Work In Progress ⚡️</p>
			<div className="flex gap-2 mt-10">
				<Button asChild variant="link" className="bg-black text-white">
					<Link href={route.SERVICE.WRITE}>Merge PDF</Link>
				</Button>
				<Button asChild variant="link" className="bg-black text-white">
					<Link href={route.SERVICE.DOCUMENTS}>Documents</Link>
				</Button>
			</div>
		</div>
	);
}
