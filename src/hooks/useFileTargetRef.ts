import { useFileTargetStore } from '@/store';
import React from 'react';

export default function useFileTargetRef<T extends HTMLElement>() {
	const pageRefs = React.useRef<Record<string, T | null>>({});

	const { targetId, setTargetId } = useFileTargetStore();

	const setRef = (id: string, el: T | null) => {
		if (pageRefs?.current) {
			pageRefs.current[id] = el;
		}
	};

	return { pageRefs, targetId, setTargetId, setRef };
}
