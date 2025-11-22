'use client';

import { GripVertical, SquareMousePointer } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { Button } from '@/components';
import { type PageItem } from '../pdf';
import { useFileScrollIntoView, useMediaQuery } from '@/hooks';
import { screenSize } from '@/constant';

interface SortableFilePageProps {
	page: PageItem;
}

export default function SortableFilePage({ page }: SortableFilePageProps) {
	const { setTargetId } = useFileScrollIntoView();
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: page.id,
		animateLayoutChanges: () => false,
	});

	const isLessThanMD = useMediaQuery(screenSize.MAX_MD);

	const transformStyle = {
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			style={transformStyle}
			className="flex justify-between items-center gap-2 p-2 w-full bg-light border border-muted rounded-lg cursor-pointer">
			<div className="ui-flex-center gap-2">
				<Button
					type="button"
					size="icon-sm"
					variant="ghost"
					{...listeners}
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
					}}>
					<GripVertical className="text-gray-500" />
				</Button>
				<span> Page {page.order}</span>
			</div>
			{!isLessThanMD && (
				<Button
					type="button"
					size="icon-sm"
					variant="ghost"
					onClick={() => {
						if (isLessThanMD) return;
						setTargetId(page.id);
					}}>
					<SquareMousePointer className="text-gray-500" />
				</Button>
			)}
		</div>
	);
}
