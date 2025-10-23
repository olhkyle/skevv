import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '../ui';
import route from '@/constant/route';

export default function Nav() {
	return (
		<nav className="fixed top-3 left-[50%] flex min-h-[60px] px-4 py-3 w-[calc(100%-2*var(--global-layout-padding))] items-center justify-between border-[1px] border-muted bg-white rounded-full backdrop-blur-lg z-40 translate-x-[-50%] md:hidden">
			<div className="flex justify-between items-center flex-1">
				<h1 className="text-xl font-black">
					<Link href={route.SERVICE.ROOT}>SKEVV</Link>
				</h1>
				<Button type="button" variant="secondary">
					<Menu />
				</Button>
			</div>
		</nav>
	);
}
