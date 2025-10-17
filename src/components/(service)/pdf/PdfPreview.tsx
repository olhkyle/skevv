'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfPreview({ file }: { file: File }) {
	const [numPages, setNumPages] = useState<number>(0);

	if (!file) {
		return <p className="p-4 bg-muted rounded-full">Invalid File</p>;
	}

	return (
		<div className="border p-2 rounded-lg">
			<Document
				// renderMode="canvas"
				file={file}
				onLoadSuccess={({ numPages }: { numPages: number }) => setNumPages(numPages)}
				loading={<p>Loading...</p>}
				error={<p>Error happened to get a file</p>}>
				{Array.from({ length: numPages }, (_, index) => (
					<Page key={index + 1} pageNumber={index + 1} width={400} renderTextLayer={false} />
				))}
			</Document>
		</div>
	);
}
