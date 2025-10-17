'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfPreview({ file }: { file: File }) {
	const [numPages, setNumPages] = useState<number>(0);

	if (!file) {
		return <p>유효하지 않은 PDF 파일</p>;
	}

	return (
		<div className="border p-2 rounded-lg">
			<Document
				// renderMode="canvas"
				file={file}
				onLoadSuccess={({ numPages }: { numPages: number }) => setNumPages(numPages)}
				loading={<p>로딩 중...</p>}
				error={<p>PDF를 불러올 수 없습니다.</p>}>
				{Array.from({ length: numPages }, (_, index) => (
					<Page key={index + 1} pageNumber={index + 1} width={200} renderTextLayer={false} />
				))}
			</Document>
		</div>
	);
}
