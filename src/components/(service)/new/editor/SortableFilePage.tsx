'use client';

import React from 'react';
import { GripVertical, SquareMousePointer } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { Button, PagePreviewContext } from '@/components';
import { type PageItem } from '../pdf';
import { useMediaQuery } from '@/hooks';
import { screenSize } from '@/constant';
import { getTransformStyleOnSortableContext } from '@/utils/dndSortable';

interface SortableFilePageProps {
	page: PageItem;
}

export default function SortableFilePage({ page }: SortableFilePageProps) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: page.id,
		animateLayoutChanges: () => false,
	});

	const [isPagePreviewContextOpen, setIsPagePreviewContextOpen] = React.useState(false);
	const isMDDown = useMediaQuery(screenSize.MAX_MD);

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			style={getTransformStyleOnSortableContext(transform, transition)}
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
			{!isMDDown && <PagePreviewContext page={page} isOpen={isPagePreviewContextOpen} toggle={setIsPagePreviewContextOpen} />}
		</div>
	);
}
