import { AnimateSpinner } from '@/components';

export default function PdfPreviewSkeleton({ pageCount = 3, estimateHeight = 180 }: { pageCount?: number; estimateHeight?: number }) {
	return (
		<>
			{pageCount === 1 ? (
				<div style={{ height: estimateHeight }} className="ui-flex-center w-full bg-light rounded-lg">
					<AnimateSpinner size={18} />
				</div>
			) : (
				<div className="flex flex-col gap-2">
					{Array.from({ length: pageCount }).map((_, idx) => (
						<div key={idx} style={{ height: estimateHeight }} className="ui-flex-center w-full bg-light rounded-lg">
							<AnimateSpinner size={18} />
						</div>
					))}
				</div>
			)}
		</>
	);
}
