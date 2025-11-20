'use client';

import { GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { Button } from '@/components';
import { type PageItem } from '../../pdf';

interface SortableFilePageProps {
	page: PageItem;
}

export default function SortableFilePage({ page }: SortableFilePageProps) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: page.id,
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
			className="flex items-center gap-2 p-2 w-full bg-light border border-muted rounded-lg touch-none">
			<Button
				type="button"
				size="icon-sm"
				variant="ghost"
				className="touch-none"
				{...listeners}
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
				}}>
				<GripVertical className="text-gray-500" />
			</Button>
			<span> Page - {page.order}</span>
		</div>
	);
}
