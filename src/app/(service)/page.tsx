import Link from 'next/link';
import { Button } from '@/components';
import { route } from '@/constant';
import { ArrowUpRight } from 'lucide-react';
// import { createClient } from '@/utils/supabase/server';

export default async function HomePage() {
	// const supabase = await createClient();
	// const { data } = await supabase.from('documents').select('*');
	// console.log(data);

	return (
		<div className="flex flex-col justify-items-center min-h-screen gap-3 p-8 pb-20 bg-white sm:p-16">
			<div className="p-12 text-white font-semibold bg-gradient-gray-100 rounded-lg">
				<p>This is a lightweight PDF Editor</p>
				<p>Still Work In Progress ⚡️</p>
			</div>
			<div className="flex flex-col gap-3 w-full">
				<Button asChild variant="secondary" size="icon-lg" className="w-full">
					<Link href={route.SERVICE.WRITE}>
						<ArrowUpRight size={18} />
						Merge PDF
					</Link>
				</Button>
				<Button asChild variant="secondary" size="icon-lg" className="w-full">
					<Link href={route.SERVICE.DOCUMENTS}>
						<ArrowUpRight size={18} />
						Documents
					</Link>
				</Button>
			</div>
		</div>
	);
}
