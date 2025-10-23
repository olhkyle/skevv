'use client';

import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ServiceNav() {
	return (
		<nav className="hidden justify-between items-center pb-3 md:flex">
			<div className="flex justify-between gap-2">
				<Button type="button" variant="ghost" size="icon-sm">
					<ArrowLeft size={21} />
				</Button>
				<Button type="button" variant="ghost" size="icon-sm">
					<ArrowRight size={21} />
				</Button>
			</div>
		</nav>
	);
}
