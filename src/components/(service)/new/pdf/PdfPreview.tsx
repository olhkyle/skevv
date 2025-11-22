'use client';

import React from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useInView } from 'react-intersection-observer';
import { PageItem, PdfPreviewSkeleton } from '@/components';
import { useFileScrollIntoView, SCROLL_BAR_WIDTH } from '@/hooks';
import { PDF_DEFAULT_HEIGHT } from '@/constant';

if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
	pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface PdfPreviewProps {
	file: File;
	pages: PageItem[];
	startPageNumber?: number;
	containerWidth: number;
}

interface VirtualPageProps {
	page: PageItem;
	style: React.CSSProperties;
	pageNumber: number;
	startPageNumber: number;
	targetId: string;
	containerWidth: number;
	setRef: (id: string, el: HTMLDivElement | null) => void;
}

function VirtualPage({ page, style, pageNumber, startPageNumber, targetId, containerWidth, setRef }: VirtualPageProps) {
	const { ref, inView } = useInView({
		rootMargin: '300px 0px',
	});

	return (
		<div
			id={page.id}
			ref={ref}
			style={style}
			className="relative"
			onClick={e => {
				if (page.id !== targetId) return;

				if (e.currentTarget) {
					console.log('here');
					setRef(page.id, e.currentTarget);
				}
			}}>
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

function DocumentErrorMessage() {
	return <p className="p-3 w-full bg-red-100 text-red-400 rounded-full">Error happened to get a file</p>;
}

export default function PdfPreview({ file, pages, startPageNumber = 1, containerWidth }: PdfPreviewProps) {
	const sortedPages = React.useMemo(() => [...pages].sort((prev, curr) => prev.order - curr.order), [pages]);
	const { targetId, setRef } = useFileScrollIntoView<HTMLDivElement>();

	const [isLoaded, setLoaded] = React.useState(false);

	const rowVirtualizer = useVirtualizer({
		count: isLoaded ? sortedPages.length : 0,
		getScrollElement: () => documentWrapperRef.current,
		estimateSize: index => pageHeights[index] || PDF_DEFAULT_HEIGHT,
		overscan: 3,
	});

	const documentWrapperRef = React.useRef<HTMLDivElement>(null);
	const [pageHeights, setPageHeights] = React.useState<number[]>([]);

	const calculateHeight = async (pdf: pdfjs.PDFDocumentProxy, index: number) => {
		const PADDING = 12;

		const page = await pdf.getPage(index);
		const viewport = page.getViewport({ scale: 1 });

		// 가로가 긴 or 세로가 긴 PDF -> width 기준 + padding
		const height = (viewport.height / viewport.width) * containerWidth + PADDING;
		return height;
	};

	const getVirtualizerItemsHeights = async (pdf: pdfjs.PDFDocumentProxy) => {
		const heights: number[] = [];

		try {
			for (let idx = 0; idx < pdf.numPages; idx++) {
				const height = await calculateHeight(pdf, idx + 1);
				heights.push(height);
			}

			setPageHeights(heights);
		} catch (e) {
			console.error(e);
		}
	};

	const handleDocumentLoadSuccess = async (pdf: pdfjs.PDFDocumentProxy) => {
		getVirtualizerItemsHeights(pdf);

		setLoaded(true);
	};

	if (!file) {
		return <p className="p-3 w-full bg-muted rounded-full">Invalid File</p>;
	}

	//the purpose of using Document's onLoadSuccess on React-PDF
	// 1. get to know totalPages
	// 2. after page's loading, execute other logic
	return (
		<div ref={documentWrapperRef} className="scrollbar-hide" style={{ width: containerWidth + SCROLL_BAR_WIDTH, height: '100%' }}>
			<Document
				file={file}
				loading={<PdfPreviewSkeleton pageCount={pages.length} />}
				onLoadSuccess={handleDocumentLoadSuccess}
				error={DocumentErrorMessage}
				className="relative">
				<div className="scrollbar-thin" style={{ position: 'relative', width: containerWidth, height: rowVirtualizer?.getTotalSize() }}>
					{rowVirtualizer?.getVirtualItems().map(virtualRow => {
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
									width: containerWidth,
									transform: `translateY(${virtualRow.start}px)`,
								}}
								page={page}
								pageNumber={pageNumber}
								startPageNumber={startPageNumber}
								targetId={targetId}
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
