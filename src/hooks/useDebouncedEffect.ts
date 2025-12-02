import React from 'react';
import { debounce } from 'es-toolkit';

interface UseDebouncedEffectProps {
	callback: () => void;
	effectTriggers: unknown[];
	delay?: number;
}

export default function useDebouncedEffect({ callback, effectTriggers, delay = 150 }: UseDebouncedEffectProps) {
	const ref = React.useRef<() => void | null>(null);
	ref.current = callback;

	React.useEffect(() => {
		const debouncedCallback = debounce(() => {
			ref.current?.();
		}, delay);

		debouncedCallback();

		return () => {
			debouncedCallback?.cancel();
		};
	}, [...effectTriggers, delay]);
}
