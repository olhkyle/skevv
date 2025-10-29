'use client';

import { Button } from '../ui';
import { ArrowLeft, ArrowRight, SaveIcon, ScreenShareIcon } from 'lucide-react';

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
			<div className="flex items-center gap-2">
				<Button type="button" variant="outline" size="icon-lg" className="w-32">
					<SaveIcon />
					Save Draft
				</Button>
				<Button type="button" variant="secondary" size="icon-lg" className="w-32">
					<ScreenShareIcon />
					Preview
				</Button>
			</div>
		</nav>
	);
}
