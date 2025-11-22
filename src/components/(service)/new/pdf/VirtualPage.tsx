'use client';

import { useInView } from 'react-intersection-observer';
import { Page } from 'react-pdf';
import { type PageItem, PdfPreviewSkeleton } from '@/components';
import { useMergedRefs } from '@/hooks';

interface VirtualPageProps {
	page: PageItem;
	style: React.CSSProperties;
	pageNumber: number;
	startPageNumber: number;
	targetId: string;
	containerWidth: number;
	setRef: (id: string, el: HTMLDivElement | null) => void;
}

export default function VirtualPage({ page, style, pageNumber, startPageNumber, targetId, containerWidth, setRef }: VirtualPageProps) {
	const { ref: inViewRef, inView } = useInView({
		rootMargin: '300px 0px',
	});

	const combinedRef = useMergedRefs<HTMLDivElement>(inViewRef, (el: HTMLDivElement) => setRef(targetId, el));

	return (
		<div ref={combinedRef} style={style} id={page.id} className="relative">
			<span className="absolute top-2 right-2 ui-flex-center w-[24px] h-[24px] bg-gray-200 text-sm text-gray-600 rounded-full z-10">
				{startPageNumber + (page.order - 1)}
			</span>

			{inView ? (
				<Page
					devicePixelRatio={2.5}
					pageNumber={pageNumber}
					width={containerWidth}
					renderTextLayer={false}
					renderAnnotationLayer={false}
					className="ui-flex-center w-full border border-gray-200"
				/>
			) : (
				<PdfPreviewSkeleton pageCount={1} />
			)}
		</div>
	);
}
