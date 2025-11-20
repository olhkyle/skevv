'use client';

import { AnimateSpinner } from '@/components/common';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Page } from 'react-pdf';

interface LazyPageProps {
	pageNumber: number;
	pageCache: { [key: number]: string };
	containerWidth: number;
	// setCurrentPage: (num: number) => void;
}

export default function LazyPage({ pageNumber, pageCache, containerWidth }: LazyPageProps) {
	const { ref, inView } = useInView({ rootMargin: '150px 0px', triggerOnce: false });
	const canvasRef = React.useRef<HTMLCanvasElement>(null);

	const cachedImage = pageCache[pageNumber];

	return (
		<div ref={ref} className="w-full flex justify-center">
			{cachedImage ? (
				<div className="ui-flex-center">
					<img
						src={cachedImage}
						alt={`Page ${pageNumber}`}
						style={{ width: containerWidth, height: 'auto' }}
						className=" w-full border border-gray-200"
					/>
				</div>
			) : inView ? (
				<Page
					devicePixelRatio={2.5}
					pageNumber={pageNumber}
					width={containerWidth}
					renderTextLayer={false}
					renderAnnotationLayer={false}
					canvasRef={canvas => {
						if (canvas) {
							canvasRef.current = canvas;
							pageCache[pageNumber] = canvas.toDataURL();
							// setCurrentPage(pageNumber);
						}
					}}
					className="ui-flex-center w-full border borer-gray-200"
				/>
			) : (
				<AnimateSpinner />
			)}
		</div>
	);
}
