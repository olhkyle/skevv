'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import { Loader } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfPreview({ file }: { file: File }) {
	const [numPages, setNumPages] = useState<number>(0);

	if (!file) {
		return <p className="p-4 bg-muted rounded-full">Invalid File</p>;
	}

	return (
		<div className="border border-gray-200 p-2 rounded-lg">
			<Document
				file={file}
				onLoadSuccess={({ numPages }: { numPages: number }) => setNumPages(numPages)}
				loading={<Loader />}
				error={<p className="p-4 bg-gray-200 text-gray-600 rounded-full">Error happened to get a file</p>}>
				{Array.from({ length: numPages }, (_, index) => (
					<Page key={index + 1} pageNumber={index + 1} width={400} renderTextLayer={false} className="p-2 border-[1px] borer-gray-200" />
				))}
			</Document>
		</div>
	);
}
