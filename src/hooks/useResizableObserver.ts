import React from 'react';

interface UseResizableObserverProps {
	initialWidth?: number;
	effectTriggers: (number | string | boolean)[];
}

// export default function useResizableObserver<T extends HTMLElement>({ initialWidth = 0, effectTriggers = [] }: UseResizableObserverProps) {
// 	const [containerWidth, setContainerWidth] = React.useState<number>(initialWidth);
// 	const containerRef = React.useRef<T>(null);

// 	/**
// 	 * ⚡️ Change width depends on parent width
// 	 * box-sizing: border-box -> width: content + padding + border
// 	 *
// 	 * offsetWidth - content + padding + border	px (number)	정수
// 		 clientWidth - content + padding	px (number)	정수
// 		 scrollWidth - content + padding + 스크롤 영역 포함	px (number)	정수
// 		 getComputedStyle(element).width - CSS상 width (box-sizing 영향 있음) "500px" (문자열) 소수점 가능
// 	 */

// 	const handleResize = () => {
// 		if (containerRef.current) {
// 			const width = containerRef.current.getBoundingClientRect().width;
// 			const style = getComputedStyle(containerRef.current);
// 			const paddingLeft = parseFloat(style.paddingLeft) || 0;
// 			const paddingRight = parseFloat(style.paddingRight) || 0;
// 			const scrollbarWidth = 6;
// 			const borderWidth = 1;
// 			const currentWidth = width - (paddingLeft + paddingRight) - scrollbarWidth - 2 * borderWidth;

// 			setContainerWidth(currentWidth);
// 		}
// 	};

// 	React.useEffect(() => {
// 		if (!containerRef.current) return;

// 		handleResize();

// 		window.addEventListener('resize', handleResize);

// 		return () => {
// 			window.removeEventListener('resize', handleResize);
// 		};
// 	}, [...effectTriggers]);

// 	return { containerRef, containerWidth };
// }

export default function useResizableObserver(
	element: Element | null,
	options: ResizeObserverOptions | undefined,
	observerCallback: ResizeObserverCallback,
): void {
	React.useEffect(() => {
		if (!element || !('ResizeObserver' in window)) {
			return undefined;
		}

		const observer = new ResizeObserver(observerCallback);

		observer.observe(element, options);

		return () => {
			observer.disconnect();
		};
	}, [element, options, observerCallback]);
}
