import React from 'react';

export default function useFileScrollIntoView<T extends HTMLElement>() {
	const scrollTargetRef = React.useRef<T | null>(null);

	const [targetId, setTargetId] = React.useState('');

	if (scrollTargetRef.current) {
		if (scrollTargetRef.current.id === targetId) {
			scrollTargetRef.current.scrollIntoView();
		}
	}

	return { scrollTargetRef, setTargetId };
}
