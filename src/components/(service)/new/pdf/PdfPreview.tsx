'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { pdfjs, Document } from 'react-pdf';
import { useVirtualizer } from '@tanstack/react-virtual';
import { type PageItem, PdfPreviewSkeleton } from '@/components';
import { SCROLL_BAR_WIDTH, useFileTargetRef } from '@/hooks';
import { PDF_DEFAULT_HEIGHT } from '@/constant';

if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
	pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

const VirtualPage = dynamic(() => import('../pdf/VirtualPage'), {
	ssr: false,
});

interface PdfPreviewProps {
	file: File;
	pages: PageItem[];
	startPageNumber?: number;
	containerWidth: number;
}

function DocumentErrorMessage() {
	return <p className="p-3 w-full bg-red-100 text-red-400 rounded-full">Error happened to get a file</p>;
}

export default function PdfPreview({ file, pages, startPageNumber = 1, containerWidth }: PdfPreviewProps) {
	const sortedPages = React.useMemo(() => [...pages].sort((prev, curr) => prev.order - curr.order), [pages]);
	const { targetId, setRef } = useFileTargetRef<HTMLDivElement>();

	const [isLoaded, setLoaded] = React.useState(false);

	// single row height
	const getEstimateHeightSize = (index: number) => pageHeights[index] || PDF_DEFAULT_HEIGHT;

	const rowVirtualizer = useVirtualizer({
		count: isLoaded ? sortedPages.length : 0,
		getScrollElement: () => documentWrapperRef.current,
		estimateSize: index => getEstimateHeightSize(index),
		overscan: 3,
	});

	const documentWrapperRef = React.useRef<HTMLDivElement>(null);
	const [pageHeights, setPageHeights] = React.useState<number[]>([]);

	React.useEffect(() => {
		if (!targetId || !rowVirtualizer || pageHeights.length === 0) return;

		const index = sortedPages.findIndex(page => page.id === targetId);
		console.log(index);
		if (index !== -1) {
			console.log('here');
			requestAnimationFrame(() => {
				rowVirtualizer.scrollToIndex(index, { align: 'center' });
			});
		}
	}, [targetId, rowVirtualizer, sortedPages, pageHeights]);

	const calculateHeights = async (pdf: pdfjs.PDFDocumentProxy) => {
		const heights: number[] = [];

		try {
			for (let i = 0; i < pdf.numPages; i++) {
				const page = await pdf.getPage(i + 1);
				const viewport = page.getViewport({ scale: 1 });
				const PADDING = 12;

				// 가로가 긴 or 세로가 긴 PDF -> width 기준 + padding
				// 1. width > height
				// 2. height > width
				const height = (viewport.height / viewport.width) * containerWidth + PADDING;
				heights.push(height);
			}

			return heights;
		} catch (e) {
			console.error(e);
		}
	};

	const handleDocumentLoadSuccess = async (pdf: pdfjs.PDFDocumentProxy) => {
		const heights = await calculateHeights(pdf);

		setPageHeights(heights!);
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
									height: getEstimateHeightSize(index),
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
