import React from 'react';

/**
 * query (screenSize)
 * - max_[SCREEN_SIZE] - is less than SCREEN_SIZE
 * - min_[SCREEN_SIZE] - is bigger than SCREEN_SIZE
 * 1. XS : 480px
 * 2. XM : 640px
 * 3. MD : 768px
 * 4. LG : 1024px
 * 5. XL : 1280px
 * 6. 2XL : 1536px
 */
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
