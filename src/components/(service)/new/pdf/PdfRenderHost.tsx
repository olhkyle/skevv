'use client';

import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileWithPath } from 'react-dropzone';
import { AnimateSpinner } from '@/components/common';

if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
	pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface PdfRenderHostProps {
	file: FileWithPath;
	pageNumber: number;
	width: number;
	rotatedAngle: number;
	containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function PdfRenderHost({ file, pageNumber, width, rotatedAngle, containerRef }: PdfRenderHostProps) {
	return (
		<div ref={containerRef} style={{ display: 'none' }}>
			<Document file={file}>
				<Page
					devicePixelRatio={2.5}
					loading={
						<div className="ui-flex-center w-full h-full bg-light rounded-lg">
							<AnimateSpinner size={18} />
						</div>
					}
					pageNumber={pageNumber}
					width={width}
					renderTextLayer={false}
					renderAnnotationLayer={false}
					rotate={rotatedAngle}
					className="ui-flex-center w-full border border-gray-200"
				/>
			</Document>
		</div>
	);
}
