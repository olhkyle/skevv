import { AnimateSpinner } from '@/components';

export default function PdfPreviewSkeleton({ pageCount = 3 }: { pageCount?: number }) {
	return (
		<>
			{pageCount === 1 ? (
				<div className="ui-flex-center w-full h-120 bg-light rounded-lg">
					<AnimateSpinner size={18} />
				</div>
			) : (
				<div className="flex flex-col gap-2">
					{Array.from({ length: pageCount }).map((_, idx) => (
						<div key={idx} className="ui-flex-center w-full h-120 bg-light rounded-lg">
							<AnimateSpinner size={18} />
						</div>
					))}
				</div>
			)}
		</>
	);
}
