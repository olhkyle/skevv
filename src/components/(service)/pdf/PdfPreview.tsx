'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Loader } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfPreview({ file, fileCount }: { file: File; fileCount: number }) {
	const [numPages, setNumPages] = useState<number>(0);
	const [containerWidth, setContainerWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth * 0.9 : 800);
	const containerRef = useRef<HTMLDivElement>(null);

	/**
	 * ⚡️ change width depends on parent width
	 * offsetWidth - content + padding + border	px (number)	정수
		 clientWidth - content + padding	px (number)	정수
		 scrollWidth - content + padding + 스크롤 영역 포함	px (number)	정수
		 getComputedStyle(element).width - CSS상 width (box-sizing 영향 있음) "500px" (문자열) 소수점 가능
	 */
	useLayoutEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				const style = getComputedStyle(containerRef.current);
				const paddingLeft = parseFloat(style.paddingLeft) || 0;
				const paddingRight = parseFloat(style.paddingRight) || 0;
				const width = containerRef.current.offsetWidth - (paddingLeft + paddingRight);
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
		<div ref={containerRef} className="w-full p-2 rounded-lg min-w-[320px] sm:min-w-[480px] md:min-w-[640px]">
			<Document
				file={file}
				onLoadSuccess={({ numPages }: { numPages: number }) => setNumPages(numPages)}
				loading={<Loader />}
				error={<p className="p-4 bg-gray-200 text-gray-600 rounded-full">Error happened to get a file</p>}
				className="flex flex-col gap-2">
				{Array.from({ length: numPages }, (_, index) => (
					<div key={index + 1} className="relative">
						<span className="absolute top-4 left-4 px-4 py-2 bg-black text-white rounded-full z-10">{fileCount * (index + 1)}</span>
						<Page
							pageNumber={index + 1}
							width={containerWidth}
							renderTextLayer={false}
							renderAnnotationLayer={false}
							className="border-[1px] borer-gray-200"
						/>
					</div>
				))}
			</Document>
		</div>
	);
}
