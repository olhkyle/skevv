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

	// PDF 페이지 별 높이를 저장
	const [pageHeights, setPageHeights] = React.useState<number[]>([]);

	const handleDocumentLoadSuccess = async (pdf: pdfjs.PDFDocumentProxy) => {
		const heights: number[] = [];
		for (let i = 0; i < pdf.numPages; i++) {
			const page = await pdf.getPage(i + 1);
			const viewport = page.getViewport({ scale: 1 });
			// width 기준으로 height 계산
			const height = (viewport.height / viewport.width) * containerWidth + 24; // padding 포함
			heights.push(height);
		}
		setPageHeights(heights);
	};

	// 페이지 수만큼 estimateSize를 반환하는 함수
	const estimateSize = (index: number) => pageHeights[index] || 300; // 초기값 300

	/**  페이지 가상 스크롤 설정 */
	const rowVirtualizer = useVirtualizer({
		count: sortedPages.length,
		getScrollElement: () => parentRef.current,
		estimateSize,
		//() => containerWidth * 1.414 + 24, // when parentRef is vertical Srcoll -> must be height / horizontal scroll -> must be width | PDF ratio + padding
		overscan: 3,
	});

	if (!file) {
		return <p className="p-3 w-full bg-muted rounded-full">Invalid File</p>;
	}

	//the purpose of using Document's onLoadSuccess on React-PDF
	// 1. get to know totalPages
	// 2. after page's loading, execute other logic
	return (
		<div ref={parentRef} style={{ height: containerHeight, overflowY: 'auto', width: '100%' }}>
			<Document
				file={file}
				loading={<PdfPreviewSkeleton pageCount={pages.length} />}
				onLoadSuccess={handleDocumentLoadSuccess}
				error={DocumentErrorMessage}
				className="relative w-full">
				<div style={{ height: rowVirtualizer.getTotalSize(), width: '100%', position: 'relative' }}>
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
									width: '100%',
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
