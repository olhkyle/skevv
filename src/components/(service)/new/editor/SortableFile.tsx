'use client';

import { ChevronRight, GripVertical, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { FileWithPath } from 'react-dropzone';
import { Button } from '@/components';

interface SortableFileProps {
	id: string;
	file: FileWithPath;
	deleteFile: () => void;
}

export default function SortableFile({ id, file, deleteFile }: SortableFileProps) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id,
		animateLayoutChanges: () => false,
	});

	const transformStyle = {
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={transformStyle}
			className="flex justify-between items-center gap-2 p-2 w-full bg-gray-50 rounded-lg border-[1px] border-muted touch-none sm:cursor-pointer">
			<div className="flex items-center gap-2">
				<Button type="button" size="icon-sm" variant="ghost">
					<ChevronRight />
				</Button>
				<span className="inline-block overflow-hidden text-ellipsis">{file.name}</span>
			</div>
			<Button type="button" size="icon-sm" variant="ghost" onClick={deleteFile}>
				<X />
			</Button>
		</div>
	);
}
