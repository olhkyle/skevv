'use client';

import React from 'react';
import { ChevronRight, GripVertical, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { Button, ProcessedFileItem, SortableFilePageList } from '@/components';

interface SortableFileProps {
	file: ProcessedFileItem;
	filePage: { id: string; isOpen: boolean };
	setFiles: React.Dispatch<React.SetStateAction<ProcessedFileItem[]>>;
	toggleFilePages: (fileId: string) => void;
	deleteFile: () => void;
}

export default function SortableFile({ file, filePage, setFiles, toggleFilePages, deleteFile }: SortableFileProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: file.id,
		animateLayoutChanges: () => false,
	});

	const transformStyle = {
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		transition,
	};

	return (
		<div className={`flex flex-col justify-end gap-2 ${filePage?.isOpen ? 'mb-1' : 'mb-0'}`}>
			<div
				ref={setNodeRef}
				{...attributes}
				style={transformStyle}
				className={`flex justify-between items-center gap-2 p-2 bg-white rounded-lg border-[1px] border-muted touch-none ${
					isDragging ? 'opacity-80 border-dashed' : 'opacity-100'
				} sm:cursor-pointer`}>
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-1 shrink-0">
						<Button type="button" size="icon-sm" variant="ghost" {...listeners}>
							<GripVertical />
						</Button>
						<Button type="button" size="icon-sm" variant="ghost" onClick={() => toggleFilePages(file.id)}>
							<ChevronRight className={`${filePage?.isOpen ? 'rotate-90' : 'rotate-0'}`} />
						</Button>
					</div>
					<span className="flex-grow inline-block font-medium  break-all whitespace-normal text-ellipsis">{file.file.name}</span>
				</div>
				<Button type="button" size="icon-sm" variant="ghost" className="shrink-0 pointer-events-auto" onClick={deleteFile}>
					<X />
				</Button>
			</div>
			<SortableFilePageList file={file} isOpen={filePage?.isOpen} setFiles={setFiles} />
		</div>
	);
}
