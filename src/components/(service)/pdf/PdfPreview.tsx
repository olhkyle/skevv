'use client';

import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { List, AutoSizer } from 'react-virtualized';
import { LazyPage, PageItem, PdfPreviewSkeleton } from '@/components';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
	if (!file) {
		return <p className="p-3 w-full bg-muted rounded-full">Invalid File</p>;
	}

	const listRef = React.useRef<List>(null);
	const pageCache = React.useRef<{ [key: number]: string }>({});

	const rowRenderer = React.useCallback(({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => {
		const page = pages.sort((prev, curr) => prev.order - curr.order)[index];
		const originalPageNumber = +page.id.split('-page-')[1];

		return (
			<div key={key} style={style} className="relative">
				<span className="absolute top-2 right-2 ui-flex-center w-[24px] h-[24px] bg-gray-200 text-sm text-gray-600 rounded-full z-10">
					{startPageNumber + index}
				</span>

				<LazyPage pageNumber={originalPageNumber} pageCache={pageCache.current} containerWidth={containerWidth} />
			</div>
		);
	}, []);

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
				<AutoSizer>
					{({ width, height }) => (
						<List
							width={width}
							height={height}
							rowCount={pages.length}
							rowHeight={900}
							rowRenderer={rowRenderer}
							overscanRowCount={3}
							ref={listRef}
						/>
					)}
				</AutoSizer>
			</Document>
		</div>
	);
}
