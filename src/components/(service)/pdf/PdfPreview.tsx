'use client';

import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { AnimateSpinner } from '@/components';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfPreviewProps {
	file: File;
	pageCount: number;
	startPageNumber?: number;
	containerWidth: number;
}

function DocumentErrorMessage() {
	return <p className="p-3 w-full bg-red-100 text-red-400 rounded-full">Error happened to get a file</p>;
}

export default function PdfPreview({ file, pageCount = 0, startPageNumber = 1, containerWidth }: PdfPreviewProps) {
	const [numPages, setNumPages] = React.useState<number>(pageCount);

	if (!file) {
		return <p className="p-3 w-full bg-muted rounded-full">Invalid File</p>;
	}

	return (
		<div className="w-full rounded-lg">
			<Document
				file={file}
				onLoadSuccess={({ numPages }: { numPages: number }) => setNumPages(numPages)}
				loading={
					<div className="ui-flex-center w-full h-[150px] bg-gray-100 rounded-lg">
						<AnimateSpinner size={24} />
					</div>
				}
				error={DocumentErrorMessage}
				className="flex flex-col gap-2">
				{Array.from({ length: numPages }, (_, index) => (
					<div key={index + 1} className="relative">
						<span className="absolute top-2 right-2 ui-flex-center w-[24px] h-[24px] bg-gray-200 text-sm text-gray-600 rounded-full z-10">
							{startPageNumber + index}
						</span>
						<Page
							devicePixelRatio={2.5}
							pageNumber={index + 1}
							width={containerWidth}
							renderTextLayer={false}
							renderAnnotationLayer={false}
							className="ui-flex-center w-full border-[1px] borer-gray-200"
						/>
					</div>
				))}
			</Document>
		</div>
	);
}
