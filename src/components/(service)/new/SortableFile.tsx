'use client';

import { GripVertical, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { FileWithPath } from 'react-dropzone';
import { Button } from '@/components/ui';

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
			style={transformStyle}
			className="flex justify-between items-center gap-2 px-3 py-2 w-full bg-gray-50 rounded-lg border-[1px] border-muted touch-none">
			<div className="flex items-center gap-2">
				<Button {...listeners} type="button" size="icon-sm" variant="ghost">
					<GripVertical />
				</Button>
				<span className="inline-block overflow-hidden text-ellipsis">{file.name}</span>
			</div>
			<Button type="button" size="icon-sm" variant="ghost" onClick={deleteFile}>
				<X />
			</Button>
		</div>
	);
}
