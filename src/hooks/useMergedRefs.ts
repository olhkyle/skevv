export default function useMergedRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
	return (element: T) => {
		refs.forEach(ref => {
			if (!ref) return;
			if (typeof ref === 'function') {
				ref(element);
			} else {
				// 객체 ref
				(ref as React.RefObject<T | null>).current = element;
			}
		});
	};
}
