import React from 'react';

export default function useFileScrollIntoView<T extends HTMLElement>() {
	const pageRefs = React.useRef<Record<string, T | null>>({});

	const [targetId, setTargetId] = React.useState('');

	const setRef = (id: string, el: T | null) => {
		if (pageRefs?.current) {
			pageRefs.current[id] = el;
		}
	};

	return { pageRefs, targetId, setTargetId, setRef };
}
