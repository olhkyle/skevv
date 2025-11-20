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

	return (
		<div ref={ref} className="w-full flex justify-center">
			{/* {pageCache[pageNumber] ? (
        <img
          src={pageCache[pageNumber]}
          alt={`페이지 ${pageNumber}`}
          onLoad={() => setCurrentPage(pageNumber)}
        />
      ) : inView ? (
        <Page
          pageNumber={pageNumber}
          renderMode="canvas"
          scale={0.85}
          canvasRef={(canvas) => {
            if (canvas) {
              canvasRef.current = canvas;
              pageCache[pageNumber] = canvas.toDataURL();
              setCurrentPage(pageNumber);
            }
          }}
          loading={<div>페이지 {pageNumber} 로딩 중...</div>}
        />
      ) : (
        <div className="w-[600px] h-[850px] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          페이지 {pageNumber} (비활성)
        </div>
      )} */}
			{inView ? (
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
					className="ui-flex-center w-full border-[1px] borer-gray-200"
				/>
			) : (
				<AnimateSpinner />
			)}
		</div>
	);
}
