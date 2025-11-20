'use client';

import Image from 'next/image';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Page } from 'react-pdf';
import { AnimateSpinner } from '@/components';

interface LazyPageProps {
	pageNumber: number;
	pageCache: { [key: number]: string };
	containerWidth: number;
}

export default function LazyPage({ pageNumber, pageCache, containerWidth }: LazyPageProps) {
	const { ref, inView } = useInView({
		rootMargin: '300px 0px', // 더 넓은 범위에서 미리 로드
		triggerOnce: true, // 한 번 로드 후 unmount 방지
	});

	const [isRendered, setIsRendered] = React.useState(false);

	// 페이지가 viewport 근처에 들어오면 렌더
	React.useEffect(() => {
		if (inView && !isRendered) setIsRendered(true);
	}, [inView, isRendered]);

	return (
		<div ref={ref} className="w-full flex justify-center">
			{pageCache[pageNumber] ? (
				<Image
					src={pageCache[pageNumber]}
					alt={`Page ${pageNumber}`}
					style={{ width: containerWidth, height: 'auto' }}
					loading="lazy"
					placeholder="blur"
					className="w-full border border-gray-200"
				/>
			) : isRendered ? (
				<Page
					pageNumber={pageNumber}
					width={containerWidth}
					renderTextLayer={false}
					renderAnnotationLayer={false}
					devicePixelRatio={2.5} // 해상도 낮춰서 메모리 절약
					canvasRef={canvas => {
						if (canvas && !pageCache[pageNumber]) {
							pageCache[pageNumber] = canvas.toDataURL();
						}
					}}
					className="ui-flex-center w-full border border-gray-200"
				/>
			) : (
				<AnimateSpinner />
			)}
		</div>
	);
}
