import { AnimateSpinner } from '@/components';

export default function PdfPreviewSkeleton({ pageCount = 3 }: { pageCount?: number }) {
	return (
		<div className="flex flex-col gap-2">
			{Array.from({ length: pageCount }).map((_, idx) => (
				<div key={idx} className="ui-flex-center w-full h-100 bg-gradient-skeleton rounded-lg">
					<AnimateSpinner size={24} />
				</div>
			))}
		</div>
	);
}
