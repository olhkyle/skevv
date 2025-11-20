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
		<nav className="flex justify-between items-center p-1.5 bg-white z-10">
			<FileResetConfirmContext isOpen={isConfirmContextOpen} setIsOpen={setIsConfirmContextOpen} resetFiles={resetFiles} />
			<div className="flex items-center gap-2">
				<Button type="button" variant="outline" size="icon-lg" className="sm:w-32">
					<SaveIcon size={21} />
					<span className="hidden sm:inline">Save Draft</span>
				</Button>
				<Button type="button" variant="outline" size="icon-lg" className="sm:w-32">
					<ScreenShareIcon size={21} />
					<span className="hidden sm:inline">Preview</span>
				</Button>
			</div>
		</nav>
	);
}
