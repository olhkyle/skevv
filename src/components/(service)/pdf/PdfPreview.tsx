'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';

// Polyfill for environments where window is not available (e.g., server-side rendering)
if (typeof Promise.withResolvers === 'undefined') {
	if (typeof window !== 'undefined') {
		// @ts-expect-error This does not exist outside of polyfill which this is doing
		window.Promise.withResolvers = function () {
			let resolve, reject;
			const promise = new Promise((res, rej) => {
				resolve = res;
				reject = rej;
			});
			return { promise, resolve, reject };
		};
	} else {
		// @ts-expect-error This does not exist outside of polyfill which this is doing
		global.Promise.withResolvers = function () {
			let resolve, reject;
			const promise = new Promise((res, rej) => {
				resolve = res;
				reject = rej;
			});
			return { promise, resolve, reject };
		};
	}
}

// pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfPreview({ file }: { file: File }) {
	const [numPages, setNumPages] = useState<number>(0);

	if (!file) {
		return <p>유효하지 않은 PDF 파일</p>;
	}

	return (
		<div className="border p-2 rounded-lg">
			<Document
				renderMode="canvas"
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
