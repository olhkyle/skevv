import { useEffect, useRef } from 'react';

export default function useIsMountedRef() {
	const ref = useRef({ isMounted: true }).current;

	useEffect(() => {
		ref.isMounted = true;

		return () => {
			ref.isMounted = false;
		};
	}, [ref]);

	return ref;
}
