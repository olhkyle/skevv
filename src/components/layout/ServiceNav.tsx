'use client';

import { Button } from '../ui';
import { ArrowLeft, ArrowRight, ScreenShareIcon } from 'lucide-react';

export default function ServiceNav() {
	return (
		<nav className="flex justify-between items-center">
			<div className="flex justify-between gap-2">
				<Button type="button" variant="ghost" size="icon-sm">
					<ArrowLeft size={21} />
				</Button>
				<Button type="button" variant="ghost" size="icon-sm">
					<ArrowRight size={21} />
				</Button>
			</div>
			<Button type="button" variant="secondary" size="icon-lg" className="w-32">
				<ScreenShareIcon />
				Preview
			</Button>
		</nav>
	);
}
