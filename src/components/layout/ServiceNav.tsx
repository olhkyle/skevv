'use client';

import React from 'react';
import { SaveIcon, ScreenShareIcon } from 'lucide-react';
import { Button, FileResetConfirmContext } from '@/components';

interface ServiceNavProps {
	resetFiles: () => void;
}

export default function ServiceNav({ resetFiles }: ServiceNavProps) {
	const [isConfirmContextOpen, setIsConfirmContextOpen] = React.useState(false);

	return (
		<nav className="flex justify-between items-center">
			<FileResetConfirmContext isOpen={isConfirmContextOpen} setIsOpen={setIsConfirmContextOpen} resetFiles={resetFiles} />{' '}
			<div className="flex items-center gap-2">
				<Button type="button" variant="outline" size="icon-lg" className="w-32">
					<SaveIcon size={21} />
					Save Draft
				</Button>
				<Button type="button" variant="secondary" size="icon-lg" className="w-32">
					<ScreenShareIcon size={21} />
					Preview
				</Button>
			</div>
		</nav>
	);
}
