'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { DropzoneState } from 'react-dropzone';
import { Loader, Plus, X } from 'lucide-react';
import { Button, FileMergeConfirmContext, Input, MotionBlock, ServiceNav } from '@/components';
import { useMediaQuery, useResizableObserver, useKeyboardTrigger } from '@/hooks';
import { getTotalPageCount, type FileList } from '../pdf';
import { screenSize } from '@/constant';

interface FileEditListProps {
	dropzone: DropzoneState;
	files: FileList;
	setFiles: React.Dispatch<React.SetStateAction<FileList>>;
}

const PdfPreview = dynamic(() => import('../pdf/PdfPreview'), { ssr: false });

export default function FileEditableList({
	dropzone: { getRootProps, getInputProps, isDragActive, isDragAccept, open },
	files,
	setFiles,
}: FileEditListProps) {
	const fileInputId = React.useId();
	const [isMobile, notMobile, isTablet] = [
		useMediaQuery(screenSize.MAX_XS),
		useMediaQuery(screenSize.MIN_XS),
		useMediaQuery(screenSize.MAX_SM),
	];

	const [isConfirmContextOpen, setIsConfirmContextOpen] = React.useState(false);

	const { containerRef, containerWidth } = useResizableObserver<HTMLDivElement>({
		initialWidth: typeof window !== 'undefined' && isMobile ? 320 : window.innerWidth * 0.5,
		effectTriggers: [isTablet, isMobile, notMobile],
	});

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
			<ServiceNav resetFiles={handleReset} />

			<div className={`grid grid-rows-1 gap-3 md:grid-cols-6 md:max-w-full ${FIXED_HEIGHT_ON_MIN_MD}`}>
				<div className="relative col-span-full p-3 border-[1px] border-muted rounded-2xl md:col-span-2">
					<div className="flex flex-col gap-2 h-full">
						<div className="flex justify-between items-center">
							<h3 className="text-md font-bold">Uploaded PDFs</h3>
							<Button type="button" variant="outline" size="icon-sm" onClick={open} className="px-3 w-auto">
								<Plus />
								Add
							</Button>
						</div>
						<div
							className="flex flex-col gap-2 pb-16 w-full h-full overflow-y-scroll scrollbar-thin md:flex-1 md:min-h-0"
							{...getRootProps()}>
							{files?.map(({ id, file }) => (
								<div
									key={id}
									className="flex justify-between items-center gap-2 px-3 py-2 w-full bg-gray-50 rounded-lg border-[1px] border-muted">
									<span className="inline-block overflow-hidden text-ellipsis">{file.name}</span>
									<Button type="button" size="icon-sm" variant="ghost" onClick={() => setFiles(files.filter(file => file.id !== id))}>
										<X />
									</Button>
								</div>
							))}

							{isDragAccept && <div className="min-h-[50px] rounded-lg bg-gray-100" />}

							<MotionBlock
								className={`hidden h-full bg-radial-[at_50%_75%] ${
									isDragActive ? 'from-gray-200 via-gray-400 to-blue-100' : 'from-gray-100 via-gray-200 to-gray-50'
								} to-90% rounded-2xl border-[1px] border-dotted border-gray-300 transition-colors sm:block`}>
								<Input type="file" id={`file-dropzone-${fileInputId}`} className="hidden" {...getInputProps()} />
								<label htmlFor={`file-dropzone-${fileInputId}`} className="ui-flex-center min-h-48 w-full h-full cursor-pointer ">
									{isDragActive ? (
										<Loader className="animate-spin" size={18} />
									) : (
										<p className="ui-flex-center items-center gap-2">
											<Plus className="text-gray-900" size={18} />
											<span className="text-gray-900 font-medium">Insert more files</span>
										</p>
									)}
								</label>
							</MotionBlock>
						</div>
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

					<div className="w-full overflow-y-scroll scrollbar-thin md:min-h-0">
						<div ref={containerRef} className="flex flex-col gap-2 md:flex-1">
							{files?.map(({ id, file, pageCount }, idx) => (
								<PdfPreview
									key={id}
									file={file}
									pageCount={pageCount}
									startPageNumber={getTotalPageCount(files.slice(0, idx)) + 1}
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
