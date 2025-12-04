'use client';

import React from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { FileWithPath } from 'react-dropzone';
import { Asterisk, SquareMousePointer } from 'lucide-react';
import {
	AnimateSpinner,
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	PageItem,
	PdfDocumentErrorMessage,
	PdfPreviewSkeleton,
} from '@/components';
import { useDropzoneFiles, useMediaQuery, useResizableObserver } from '@/hooks';
import { screenSize } from '@/constant';

if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
	pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface PagePreviewContextProps {
	page: PageItem;
	isOpen: boolean;
	toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PagePreviewProps {
	file: FileWithPath;
	pageNumber: number;
	containerWidth: number;
}

function TriggerButton({ isSMDown, ...props }: { isSMDown: boolean }) {
	return (
		<Button type="button" size="icon-sm" variant="ghost" className={`px-${isSMDown ? 'auto' : '4'}`} {...props}>
			<SquareMousePointer className="text-gray-500" />
		</Button>
	);
}

function PagePreview({ file, pageNumber, containerWidth }: PagePreviewProps) {
	return (
		<div className="mt-1.5 mb-6 sm:mt-0">
			<Document file={file} loading={<PdfPreviewSkeleton pageCount={1} />}>
				<Page
					devicePixelRatio={2.5}
					loading={
						<div className="ui-flex-center w-full h-full bg-light rounded-lg">
							<AnimateSpinner size={18} />
						</div>
					}
					pageNumber={pageNumber}
					width={containerWidth}
					renderTextLayer={false}
					renderAnnotationLayer={false}
					className="ui-flex-center w-full border border-gray-200"
				/>
			</Document>
		</div>
	);
}

export default function PagePreviewContext({ page, isOpen, toggle }: PagePreviewContextProps) {
	const { files } = useDropzoneFiles();
	const [isXSDown, isSMDown] = [useMediaQuery(screenSize.MAX_XS), useMediaQuery(screenSize.MAX_SM)];

	const { containerRef, containerWidth } = useResizableObserver<HTMLDivElement>({
		initialWidth: typeof window !== 'undefined' && isXSDown ? 320 : window.innerWidth * 0.5,
	});

	const file = files.find(file => page.id.includes(file.id))?.file;
	const pageNumber = +page.id.split('-page-')[1];

	const title = `Page ${page.order} Preview`;
	const description = `${page.id.split('.pdf')[0]}.pdf`;

	return (
		<>
			{isSMDown ? (
				<Drawer open={isOpen} onOpenChange={toggle}>
					<DrawerTrigger asChild>
						<TriggerButton isSMDown={isSMDown} />
					</DrawerTrigger>
					<DrawerContent className="max-h-[85vh] overflow-y-auto px-0">
						<DrawerHeader className="p-3">
							<DrawerTitle className="text-lg text-start">{title}</DrawerTitle>
							<DrawerDescription className="inline-flex items-center gap-1.5 p-1.5 w-auto bg-gray-100 text-gray-500 text-xs border border-gray-200 rounded-md">
								<Asterisk size={12} />
								{description}
							</DrawerDescription>
							{file ? <PagePreview file={file} pageNumber={pageNumber} containerWidth={containerWidth} /> : <PdfDocumentErrorMessage />}
						</DrawerHeader>
					</DrawerContent>
				</Drawer>
			) : (
				<Dialog open={isOpen} onOpenChange={toggle}>
					<DialogTrigger asChild>
						<TriggerButton isSMDown={isSMDown} />
					</DialogTrigger>
					<DialogContent
						ref={containerRef}
						className="max-w-[90dvw] min-w-[60dvw] max-h-[90dvh] w-auto h-auto overflow-x-hidden  overflow-y-auto scroll-bar-thin">
						<DialogHeader>
							<DialogTitle className="text-lg">{title}</DialogTitle>
							<DialogDescription className="inline-flex items-center gap-1.5 p-1.5 w-auto bg-gray-100 text-gray-500 text-xs border border-gray-200 rounded-md">
								<Asterisk size={12} />
								{description}
							</DialogDescription>
						</DialogHeader>
						{file ? <PagePreview file={file} pageNumber={pageNumber} containerWidth={containerWidth} /> : <PdfDocumentErrorMessage />}
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
