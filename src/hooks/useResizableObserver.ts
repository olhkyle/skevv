import React from 'react';

interface UseResizableObserverProps {
	initialWidth?: number;
	effectTriggers: (number | string | boolean)[];
}

export default function useResizableObserver<T extends HTMLElement>({ initialWidth = 0, effectTriggers }: UseResizableObserverProps) {
	const [containerWidth, setContainerWidth] = React.useState<number>(initialWidth);

	const containerRef = React.useRef<T>(null);

	/**
	 * ⚡️ Change width depends on parent width
	 * box-sizing: border-box -> width: content + padding + border
	 * 
	 * offsetWidth - content + padding + border	px (number)	정수
		 clientWidth - content + padding	px (number)	정수
		 scrollWidth - content + padding + 스크롤 영역 포함	px (number)	정수
		 getComputedStyle(element).width - CSS상 width (box-sizing 영향 있음) "500px" (문자열) 소수점 가능
	 */
	const setWidthSafely = (nextWidth: number) => {
		const roundedWidth = Math.round(nextWidth);

		// 1px 오차
		setContainerWidth(prevWidth => {
			if (Math.abs(prevWidth - roundedWidth) >= 5) return roundedWidth;

			return prevWidth;
		});
	};

	// const handleResize = () => {
	// 	if (containerRef.current) {
	// 		const style = getComputedStyle(containerRef.current);
	// 		const paddingLeft = parseFloat(style.paddingLeft) || 0;
	// 		const paddingRight = parseFloat(style.paddingRight) || 0;
	// 		const width = containerRef.current.offsetWidth - (paddingLeft + paddingRight);

	// 		setContainerWidth(prevWidth => {
	// 			if (Math.abs(prevWidth - width) >= 1) return width; // 0.5px 오차 허용
	// 			return prevWidth;
	// 		});
	// 	}
	// };

	React.useEffect(() => {
		if (!containerRef.current) return;

		setWidthSafely(containerRef.current.getBoundingClientRect().width);

		const style = getComputedStyle(containerRef.current);
		const paddingLeft = parseFloat(style.paddingLeft) || 0;
		const paddingRight = parseFloat(style.paddingRight) || 0;

		const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
			const [entry] = entries;

			const width =
				entry.borderBoxSize?.[0]?.inlineSize ??
				entry.contentRect?.width ??
				containerRef.current!.offsetWidth - (paddingLeft + paddingRight);

			setWidthSafely(width);
		});

		observer.observe(containerRef.current, { box: 'border-box' });

		return () => {
			observer.disconnect();
		};
	}, [...effectTriggers]);

	return { containerRef, containerWidth };
}
