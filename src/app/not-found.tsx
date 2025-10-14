import route from '@/constant/route';
import Link from 'next/link';

export default async function NotFound() {
	return (
		<div className="flex flex-1 justify-center items-center h-screen">
			<Link href={route.SERVICE.ROOT} className="p-4 bg-black text-white rounded-lg">
				Go To Home
			</Link>
		</div>
	);
}
