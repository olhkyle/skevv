import { debounce } from 'es-toolkit';
import React from 'react';

interface UseDebouncedEffectProps {
	callback: () => void;
	effectTriggers: unknown[];
	delay?: number;
}

export default function useDebouncedEffect({ callback, effectTriggers, delay = 150 }: UseDebouncedEffectProps) {
	const ref = React.useRef<() => void | null>(null);
	ref.current = callback;

	const useDebouncedCallback = React.useMemo(
		() =>
			debounce(() => {
				ref.current?.();
			}, delay),
		[delay],
	);

	React.useEffect(() => {
		useDebouncedCallback();

		return () => {
			useDebouncedCallback?.cancel();
		};
	}, [...effectTriggers]);
}
