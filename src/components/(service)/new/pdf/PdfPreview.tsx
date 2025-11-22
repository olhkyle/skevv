'use client';

import React from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useInView } from 'react-intersection-observer';
import { PageItem, PdfPreviewSkeleton } from '@/components';
import { useFileScrollIntoView } from '@/hooks';

if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
	pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface PdfPreviewProps {
	file: File;
	pages: PageItem[];
	startPageNumber?: number;
	containerWidth: number;
	containerHeight: number;
}

interface VirtualPageProps {
	page: PageItem;
	style: React.CSSProperties;
	pageNumber: number;
	startPageNumber: number;
	containerWidth: number;
	setRef: (id: string, el: HTMLCanvasElement | null) => void;
}

function VirtualPage({ page, style, pageNumber, startPageNumber, containerWidth, setRef }: VirtualPageProps) {
	const { ref, inView } = useInView({
		rootMargin: '200px 0px',
	});

	return (
		<div ref={ref} style={style} id={page.id} className="relative">
			<span className="absolute top-2 right-2 ui-flex-center w-[24px] h-[24px] bg-gray-200 text-sm text-gray-600 rounded-full z-10">
				{startPageNumber + (page.order - 1)}
			</span>

			{inView ? (
				<Page
					devicePixelRatio={2}
					pageNumber={pageNumber}
					width={containerWidth}
					renderTextLayer={false}
					renderAnnotationLayer={false}
					className="ui-flex-center w-full border border-gray-200"
					canvasRef={el => {
						console.log('here');
						setRef(page.id, el);
					}}
				/>
			) : (
				<PdfPreviewSkeleton pageCount={1} />
			)}
		</div>
	);
}

function DocumentErrorMessage() {
	return <p className="p-3 w-full bg-red-100 text-red-400 rounded-full">Error happened to get a file</p>;
}

export default function PdfPreview({ file, pages, startPageNumber = 1, containerWidth, containerHeight }: PdfPreviewProps) {
	const sortedPages = React.useMemo(() => [...pages].sort((prev, curr) => prev.order - curr.order), [pages]);

	const { setRef } = useFileScrollIntoView<HTMLCanvasElement>();
	const parentRef = React.useRef<HTMLDivElement>(null);

	/**  페이지 가상 스크롤 설정 */
	const rowVirtualizer = useVirtualizer({
		count: sortedPages.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => containerHeight * 1.414 + 24, // when parentRef is vertical Srcoll -> must be height / horizontal scroll -> must be width | PDF ratio + padding
		overscan: 2,
	});

	if (!file) {
		return <p className="p-3 w-full bg-muted rounded-full">Invalid File</p>;
	}

	//the purpose of using Document's onLoadSuccess on React-PDF
	// 1. get to know totalPages
	// 2. after page's loading, execute other logic
	return (
		<div ref={parentRef} className={`w-full overflow-y-auto`} style={{ height: containerHeight }}>
			<Document file={file} loading={<PdfPreviewSkeleton pageCount={pages.length} />} error={DocumentErrorMessage} className="relative">
				<div
					className={`relative w-full`}
					style={{
						position: 'relative',
						height: rowVirtualizer.getTotalSize(),
						width: '100%',
					}}>
					{rowVirtualizer.getVirtualItems().map(virtualRow => {
						const index = virtualRow.index;
						const page = sortedPages[index];
						const pageNumber = +page.id.split('-page-')[1];

						return (
							<VirtualPage
								key={page.id}
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									transform: `translateY(${virtualRow.start}px)`,
								}}
								page={page}
								pageNumber={pageNumber}
								startPageNumber={startPageNumber}
								containerWidth={containerWidth}
								setRef={setRef}
							/>
						);
					})}
				</div>
			</Document>
		</div>
	);
}
