'use client';

import dynamic from 'next/dynamic';
import { RotateCcw, RotateCw } from 'lucide-react';
import { type ProcessedFileList, Button, getTotalPageCount } from '@/components';
import { useMediaQuery, useResizableObserver } from '@/hooks';
import { screenSize } from '@/constant';

const PdfPreview = dynamic(() => import('../../pdf/PdfPreview'), { ssr: false });

interface FilePreviewListPanel {
	files: ProcessedFileList;
}

export default function FilePreviewListPanel({ files }: FilePreviewListPanel) {
	const [isMobile, notMobile, isTablet] = [
		useMediaQuery(screenSize.MAX_XS),
		useMediaQuery(screenSize.MIN_XS),
		useMediaQuery(screenSize.MAX_SM),
	];

	const { containerRef, containerWidth } = useResizableObserver<HTMLDivElement>({
		initialWidth: typeof window !== 'undefined' && isMobile ? 320 : window.innerWidth * 0.5,
		effectTriggers: [isTablet, isMobile, notMobile],
	});

	return (
		<div className="hidden flex-col gap-2 col-span-full p-3 border-[1px] border-muted rounded-2xl sm:flex md:col-span-4">
			<div className="flex justify-between items-center min-h-[32px]">
				<h3 className="text-md font-bold">Preview</h3>
				<div className="flex justify-between items-center gap-2">
					<Button type="button" size="icon-sm" variant="ghost">
						<RotateCcw />
					</Button>
					<Button type="button" size="icon-sm" variant="ghost">
						<RotateCw />
					</Button>
				</div>
			</div>

			<div className="w-full overflow-y-scroll scrollbar-thin md:min-h-0">
				<div ref={containerRef} className="flex flex-col gap-2 md:flex-1">
					{files?.map(({ id, file, pageCount, pages }, idx) => {
						const startPageNumber = getTotalPageCount(files.slice(0, idx)) + 1;
						const pagesHash = pages.map(p => p.id).join('-');
						console.log(id, pagesHash);
						return (
							<PdfPreview
								key={`${id}-${startPageNumber}-${pagesHash}`}
								file={file}
								pageCount={pageCount}
								startPageNumber={startPageNumber}
								containerWidth={containerWidth}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
