'use client';

import { closestCenter, DndContext, DragEndEvent, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ScrollArea, SortableFilePage } from '@/components';
import { type ProcessedFileItem } from '../../pdf';

interface SortableFilePagesProps {
	file: ProcessedFileItem;
	isOpen: boolean;
	setFiles: React.Dispatch<React.SetStateAction<ProcessedFileItem[]>>;
}

export default function SortableFilePageList({ file, isOpen, setFiles }: SortableFilePagesProps) {
	const pageSensors = useSensors(
		useSensor(PointerSensor),
		useSensor(MouseSensor),
		useSensor(TouchSensor, {
			activationConstraint: {
				distance: 5, // prevent mal-function of finger touch
			},
		}),
	);

	const sortedPages = [...file.pages].sort((a, b) => a.order - b.order);

	const handlePageDragEnd = (event: DragEndEvent, fileId: string) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		setFiles(prevFiles =>
			prevFiles.map(file => {
				if (file.id !== fileId) return file;

				const oldIndex = file.pages.findIndex(page => page.id === active.id);
				const newIndex = file.pages.findIndex(page => page.id === over.id);

				const newPages = arrayMove(file.pages, oldIndex, newIndex);

				return {
					...file,
					pages: newPages.map((page, idx) => ({ ...page, order: idx + 1 })),
				};
			}),
		);
	};

	return (
		<div className="grid grid-cols-12 w-full">
			<div className="col-span-1 ml-1 h-full w-1.5 bg-muted rounded-full" />
			<DndContext
				sensors={pageSensors}
				collisionDetection={closestCenter}
				onDragEnd={(event: DragEndEvent) => handlePageDragEnd(event, file.id)}>
				<SortableContext items={sortedPages.map(page => page.id)} strategy={verticalListSortingStrategy}>
					<ScrollArea
						className={`col-span-11 w-full ${isOpen ? 'max-h-48' : 'max-h-0'} overflow-hidden transition-all duration-150 scrollbar-thin`}>
						<div className="flex flex-col space-y-2">
							{sortedPages.map(page => (
								<SortableFilePage key={page.id} page={page} />
							))}
						</div>
					</ScrollArea>
				</SortableContext>
			</DndContext>
		</div>
	);
}
