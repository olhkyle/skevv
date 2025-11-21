'use client';

import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PageItem, PdfPreviewSkeleton } from '@/components';

if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
	pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

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

	if (!file) {
		return <p className="p-3 w-full bg-muted rounded-full">Invalid File</p>;
	}

	//the purpose of using Document's onLoadSuccess on React-PDF
	// 1. get to know totalPages
	// 2. after page's loading, execute other logic
	return (
		<div className="w-full rounded-lg">
			<Document
				file={file}
				loading={<PdfPreviewSkeleton pageCount={pages.length} />}
				error={DocumentErrorMessage}
				className="flex flex-col gap-2">
				{sortedPages.map((page, index) => {
					const originalPageNumber = +page.id.split('-page-')[1];

					return (
						<div key={index + 1} className="relative">
							<span className="absolute top-2 right-2 ui-flex-center w-[24px] h-[24px] bg-gray-200 text-sm text-gray-600 rounded-full z-10">
								{startPageNumber + index}
							</span>
							<Page
								devicePixelRatio={2.5}
								pageNumber={originalPageNumber}
								width={containerWidth}
								renderTextLayer={false}
								renderAnnotationLayer={false}
								className="ui-flex-center w-full border border-gray-200"
							/>
						</div>
					);
				})}
			</Document>
		</div>
	);
}
