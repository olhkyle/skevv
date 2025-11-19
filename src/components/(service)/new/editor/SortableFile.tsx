'use client';

import React from 'react';
import { ChevronRight, GripVertical, X } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { Button, ProcessedFileItem, ScrollArea } from '@/components';

interface SortableFileProps {
	file: ProcessedFileItem;
	deleteFile: () => void;
}

export default function SortableFile({ file, deleteFile }: SortableFileProps) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: file.id,
		animateLayoutChanges: () => false,
	});
	const [isFilePagesOpen, setFilePagesOpen] = React.useState(false);

	const transformStyle = {
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		transition,
	};

	const toggleFilePages = async () => {
		setFilePagesOpen(prev => !prev);
	};

	return (
		<div className="flex flex-col justify-end gap-2">
			<div
				ref={setNodeRef}
				{...attributes}
				style={transformStyle}
				className="flex justify-between items-center gap-2 p-2 w-full bg-gray-50 rounded-lg border-[1px] border-muted touch-none sm:cursor-pointer">
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-1">
						<Button type="button" size="icon-sm" variant="ghost" {...listeners}>
							<GripVertical />
						</Button>
						<Button type="button" size="icon-sm" variant="ghost" onClick={toggleFilePages}>
							<ChevronRight className={`${isFilePagesOpen ? 'rotate-90' : 'rotate-0'}`} />
						</Button>
					</div>
					<span className="inline-block font-medium overflow-hidden text-ellipsis">{file.file.name}</span>
				</div>
				<Button
					type="button"
					size="icon-sm"
					variant="ghost"
					className="pointer-events-auto"
					onClick={e => {
						deleteFile();
					}}>
					<X />
				</Button>
			</div>
			<div className="grid grid-cols-10 w-full">
				<div className="grid-col-1 ml-1 h-full w-1.5 bg-muted rounded-full" />
				<ScrollArea
					className={`col-span-9 w-full ${
						isFilePagesOpen ? 'max-h-48' : 'max-h-0'
					} overflow-hidden transition-all duration-150 scrollbar-thin`}>
					<div className="flex flex-col space-y-2">
						{file?.pages?.map(page => (
							<div key={page.id} className="flex items-center gap-2 p-2 w-full bg-gray-50 border border-muted rounded-lg">
								<Button type="button" size="icon-sm" variant="ghost">
									<GripVertical className="text-gray-500" />
								</Button>
								<span> Page - {page.order}</span>
							</div>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
