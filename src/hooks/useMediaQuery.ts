import React from 'react';

export default function useMediaQuery(query: string) {
	const [matches, setMatches] = React.useState(() => {
		if (typeof window !== 'undefined') {
			return window.matchMedia(query).matches;
		}

		return false;
	});

	React.useEffect(() => {
		if (typeof window === 'undefined') {
			return undefined;
		}

		const mediaQuery = window.matchMedia(query);

		const handler = () => {
			setMatches(mediaQuery.matches);
		};

		handler();

		// Using the standard addEventListener for modern browsers
		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener('change', handler);
		}

		return () => {
			if (mediaQuery.removeEventListener) {
				mediaQuery.removeEventListener('change', handler);
			}
		};
	}, [query]);

	return matches;
}
