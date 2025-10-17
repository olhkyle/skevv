'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useRef, useState } from 'react';
import { Loader } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfPreview({ file }: { file: File }) {
	const [numPages, setNumPages] = useState<number>(0);
	const [containerWidth, setContainerWidth] = useState<number>(800);
	const containerRef = useRef<HTMLDivElement>(null);

	// change width depends on parent width
	useEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				const width = containerRef.current.offsetWidth;
				setContainerWidth(width);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	if (!file) {
		return <p className="p-4 bg-muted rounded-full">Invalid File</p>;
	}

	return (
		<div ref={containerRef} className="w-full p-2 rounded-lg">
			<Document
				file={file}
				onLoadSuccess={({ numPages }: { numPages: number }) => setNumPages(numPages)}
				loading={<Loader />}
				error={<p className="p-4 bg-gray-200 text-gray-600 rounded-full">Error happened to get a file</p>}>
				{Array.from({ length: numPages }, (_, index) => (
					<Page
						key={index + 1}
						pageNumber={index + 1}
						width={containerWidth}
						renderTextLayer={false}
						renderAnnotationLayer={false}
						className="p-2 border-[1px] borer-gray-200"
					/>
				))}
			</Document>
		</div>
	);
}
