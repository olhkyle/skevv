type Transform = {
	x: number;
	y: number;
	scaleX: number;
	scaleY: number;
};

const getTransformStyleOnSortableContext = (transform: Transform | null, transition: string | undefined) => {
	return {
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		transition,
	};
};

export { getTransformStyleOnSortableContext };
