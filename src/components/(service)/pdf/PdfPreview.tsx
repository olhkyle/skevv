'use client';

import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader } from 'lucide-react';
import useMediaQuery from '@/hooks/useMediaQuery';
import screenSize from '@/constant/screenSize';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function DocumentErrorMessage() {
	return <p className="p-4 bg-gray-200 text-gray-600 rounded-full">Error happened to get a file</p>;
}

export default function PdfPreview({
	file,
	pageCount = 0,
	startPageNumber = 1,
}: {
	file: File;
	pageCount?: number;
	startPageNumber?: number;
}) {
	const [isMobile, notMobile] = [useMediaQuery(screenSize.MAX_XS), useMediaQuery(screenSize.MIN_XS)];
	const [numPages, setNumPages] = React.useState<number>(pageCount);
	const [containerWidth, setContainerWidth] = React.useState<number>(
		typeof window !== 'undefined' && isMobile ? 320 : window.innerWidth * 0.9,
	);
	const containerRef = React.useRef<HTMLDivElement>(null);

	/**
	 * ⚡️ change width depends on parent width
	 * offsetWidth - content + padding + border	px (number)	정수
		 clientWidth - content + padding	px (number)	정수
		 scrollWidth - content + padding + 스크롤 영역 포함	px (number)	정수
		 getComputedStyle(element).width - CSS상 width (box-sizing 영향 있음) "500px" (문자열) 소수점 가능
	 */

	const handleResize = () => {
		if (containerRef.current) {
			const style = getComputedStyle(containerRef.current);
			const paddingLeft = parseFloat(style.paddingLeft) || 0;
			const paddingRight = parseFloat(style.paddingRight) || 0;
			const borderWidth = parseFloat(style.borderWidth);
			const width = containerRef.current.offsetWidth - (paddingLeft + paddingRight) - borderWidth * 2;

			setContainerWidth(width);
		}
	};

	React.useLayoutEffect(() => {
		handleResize();

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isMobile, notMobile]);

	if (!file) {
		return <p className="p-4 bg-muted rounded-full">Invalid File</p>;
	}

	return (
		<div ref={containerRef} className="w-full rounded-lg min-w-[320px] sm:min-w-[480px] sm:max-w-[640px] max-w-full">
			<Document
				file={file}
				onLoadSuccess={({ numPages }: { numPages: number }) => setNumPages(numPages)}
				loading={
					<div className="flex justify-center items-center w-full h-[120px] bg-gray-100">
						<Loader size={24} />
					</div>
				}
				error={DocumentErrorMessage}
				className="flex flex-col gap-2">
				{Array.from({ length: numPages }, (_, index) => (
					<div key={index + 1} className="relative">
						<span className="absolute top-2 right-2 flex justify-center items-center w-[24px] h-[24px] bg-gray-200 text-sm text-gray-600 rounded-full z-10">
							{startPageNumber + index}
						</span>
						<Page
							pageNumber={index + 1}
							width={containerWidth}
							renderTextLayer={false}
							renderAnnotationLayer={false}
							className="w-full border-[1px] borer-gray-200"
						/>
					</div>
				))}
			</Document>
		</div>
	);
}
