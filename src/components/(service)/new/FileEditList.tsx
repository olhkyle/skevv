'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { RotateCcw, X } from 'lucide-react';
import { Button, FileMergeConfirmContext, ServiceNav } from '@/components';
import { useMediaQuery, useResizableObserver, useKeyboardTrigger } from '@/hooks';
import { getTotalPageCount, type FileList } from '../pdf';
import screenSize from '@/constant/screenSize';

interface FileEditListProps {
	files: FileList;
	setFiles: React.Dispatch<React.SetStateAction<FileList>>;
}

const PdfPreview = dynamic(() => import('../pdf/PdfPreview'), { ssr: false });

export default function FileEditList({ files, setFiles }: FileEditListProps) {
	const [isMobile, notMobile] = [useMediaQuery(screenSize.MAX_XS), useMediaQuery(screenSize.MIN_XS)];
	const [isConfirmContextOpen, setIsConfirmContextOpen] = React.useState(false);

	const [containerWidth, setContainerWidth] = React.useState<number>(0);
	const [containerRef, setContainerRef] = React.useState<HTMLElement | null>(null);

	// const { containerRef, containerWidth } = useResizableObserver<HTMLDivElement>({
	// 	initialWidth: typeof window !== 'undefined' && isMobile ? 320 : window.innerWidth * 0.9,
	// 	effectTriggers: [isMobile, notMobile],
	// });

	const onResize = React.useCallback<ResizeObserverCallback>(entries => {
		const [entry] = entries;

		if (entry) {
			setContainerWidth(entry.contentRect.width);
		}
	}, []);
	useResizableObserver(containerRef, {}, onResize);

	useKeyboardTrigger({
		handler: (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key.toLowerCase() === 'm') {
				e.preventDefault();
				setIsConfirmContextOpen(true);
			}
		},
	});

	const FIXED_HEIGHT_ON_MIN_MD =
		'md:h-[calc(100dvh-2*var(--global-layout-padding)-var(--service-nav-height)-var(--global-layout-padding))]';

	const handleReset = () => setFiles([]);

	return (
		<div className="flex flex-col gap-3 w-full">
			<ServiceNav />

			<div className={`grid grid-rows-1 gap-3 md:grid-cols-6 md:max-w-full ${FIXED_HEIGHT_ON_MIN_MD}`}>
				<div className="relative col-span-full p-3 border-[1px] border-muted rounded-2xl md:col-span-2">
					<div className="flex flex-col gap-2 h-full">
						<div className="flex justify-between items-center">
							<h3 className="text-md font-bold">Uploaded PDFs</h3>
							<Button type="button" size="icon-sm" onClick={handleReset}>
								<RotateCcw />
							</Button>
						</div>
						<ul className="flex flex-col gap-2 pb-16 w-full h-full overflow-y-scroll scrollbar-thin md:flex-1 md:min-h-0">
							{files?.map(({ id, file }) => (
								<li
									key={id}
									className="flex justify-between items-center gap-2 px-3 py-2 w-full bg-gray-50 rounded-lg border-[1px] border-muted">
									<span className="inline-block overflow-hidden text-ellipsis">{file.name}</span>
									<Button type="button" size="icon-sm" variant="ghost" onClick={() => setFiles(files.filter(file => file.id !== id))}>
										<X />
									</Button>
								</li>
							))}
						</ul>
					</div>
					<div className="absolute left-0 bottom-0 p-3 w-full bg-gray-100 rounded-b-xl border-t-[1px] border-muted">
						{files.length !== 0 && (
							<FileMergeConfirmContext files={files} isOpen={isConfirmContextOpen} setIsOpen={setIsConfirmContextOpen} />
						)}
					</div>
				</div>
				<div className="hidden flex-col gap-2 col-span-full p-3 border-[1px] border-muted rounded-2xl sm:flex md:col-span-4">
					<div className="flex items-center min-h-[32px]">
						<h3 className="text-md font-bold">Preview</h3>
					</div>

					<div className="flex flex-col gap-2 w-full overflow-y-scroll scrollbar-thin md:flex-1 md:min-h-0">
						<div ref={setContainerRef}>
							{files?.map(({ id, file, pageCount }, idx) => (
								<PdfPreview
									key={id}
									file={file}
									pageCount={pageCount}
									startPageNumber={getTotalPageCount(files.slice(0, idx))}
									containerWidth={containerWidth}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
