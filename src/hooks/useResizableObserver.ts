import React from 'react';

interface UseResizableObserverProps {
	initialWidth?: number;
	effectTriggers: (number | string | boolean)[];
}

export default function useResizableObserver<T extends HTMLElement>({ initialWidth = 0, effectTriggers = [] }: UseResizableObserverProps) {
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

	const handleResize = () => {
		const target = containerRef.current;
		if (target) {
			// $element.getBoundingClientRect().width = padding + content width + border
			const width = target.getBoundingClientRect().width;

			const targetStyle = getComputedStyle(target);
			const paddingLeft = parseFloat(targetStyle.paddingLeft) || 0;
			const paddingRight = parseFloat(targetStyle.paddingRight) || 0;
			const borderWidth = parseFloat(targetStyle.borderWidth) || 0;
			const scrollbarWidth = 6;

			const currentWidth = width - (paddingLeft + paddingRight) - scrollbarWidth - 2 * borderWidth;

			setContainerWidth(currentWidth);
		}
	};

	React.useEffect(() => {
		if (!containerRef.current) return;

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [...effectTriggers]);

	return { containerRef, containerWidth };
}
