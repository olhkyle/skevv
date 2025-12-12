'use client';

import React from 'react';

interface PdfPreviewPortalProps {
	hostRef: React.RefObject<HTMLDivElement | null>;
}

export default function PdfPreviewPortal({ hostRef }: PdfPreviewPortalProps) {
	const mountRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		// hostRef.current 내부의 렌더된 실제 PDF DOM을 클론하여 가져옴
		if (hostRef.current) {
			const cloned = hostRef.current.cloneNode(true) as HTMLElement;
			cloned.style.display = 'block';

			if (mountRef?.current) {
				mountRef.current.innerHTML = ''; // 기존 내용 제거
				mountRef.current?.appendChild(cloned);
			}
			// setNode(cloned);
		}
	}, [hostRef]);

	return <div ref={mountRef} className="ui-flex-center w-full" />;
}
