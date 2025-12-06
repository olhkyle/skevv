'use client';

import React from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { FileWithPath } from 'react-dropzone';
import { Asterisk, RotateCcw, RotateCw, SquareMousePointer } from 'lucide-react';
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
	rotatedAngle: number;
}

function TriggerButton({ isSMDown, ...props }: { isSMDown: boolean }) {
	return (
		<Button type="button" size="icon-sm" variant="ghost" className={`px-${isSMDown ? 'auto' : '4'}`} {...props}>
			<SquareMousePointer className="text-gray-500" />
		</Button>
	);
}

function RotateButtonList({ modifyAngle }: { modifyAngle: (factor: 'right' | 'left') => void }) {
	return (
		<div className="flex items-center gap-2">
			<Button type="button" size="icon-sm" variant="outline" onClick={() => modifyAngle('left')}>
				<RotateCcw />
			</Button>
			<Button type="button" size="icon-sm" variant="outline" onClick={() => modifyAngle('right')}>
				<RotateCw />
			</Button>
		</div>
	);
}

function PagePreview({ file, pageNumber, containerWidth, rotatedAngle }: PagePreviewProps) {
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
					rotate={rotatedAngle}
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

	const [rotatedAngle, setRotatedAngle] = React.useState(0);

	// TODO: use ScaleFactor to zoom in and out
	const modifyAngle = (factor: 'right' | 'left') =>
		setRotatedAngle(angle => {
			if (factor === 'right') {
				return angle + 90 > 360 ? 90 : angle + 90;
			}

			if (factor === 'left') {
				return angle - 90 < 0 ? 270 : angle - 90;
			}

			return angle;
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
					<DrawerContent className="max-h-[85vh] px-0 h-auto overflow-y-auto scrollbar-thin">
						<DrawerHeader className="p-3">
							<DrawerTitle className="text-lg text-start">{title}</DrawerTitle>
							<DrawerDescription className="inline-flex items-center gap-1.5 p-1.5 w-auto bg-gray-100 text-gray-500 text-xs border border-gray-200 rounded-md">
								<Asterisk size={12} />
								{description}
							</DrawerDescription>
						</DrawerHeader>
						<div className="p-3">
							<RotateButtonList modifyAngle={modifyAngle} />
							{file ? (
								<PagePreview file={file} pageNumber={pageNumber} containerWidth={containerWidth} rotatedAngle={rotatedAngle} />
							) : (
								<PdfDocumentErrorMessage />
							)}
						</div>
					</DrawerContent>
				</Drawer>
			) : (
				<Dialog open={isOpen} onOpenChange={toggle}>
					<DialogTrigger asChild>
						<TriggerButton isSMDown={isSMDown} />
					</DialogTrigger>
					<DialogContent
						ref={containerRef}
						className="max-w-[90dvw] min-w-[80dvw] max-h-[90dvh] w-auto h-auto overflow-x-hidden overflow-y-auto scrollbar-thin xl:min-w-[60dvw]">
						<DialogHeader>
							<DialogTitle className="text-lg">{title}</DialogTitle>
							<DialogDescription className="inline-flex items-center gap-1.5 p-1.5 w-auto bg-gray-100 text-gray-500 text-xs border border-gray-200 rounded-md">
								<Asterisk size={12} />
								{description}
							</DialogDescription>
						</DialogHeader>
						<div>
							<RotateButtonList modifyAngle={modifyAngle} />
							{file ? (
								<PagePreview file={file} pageNumber={pageNumber} containerWidth={containerWidth} rotatedAngle={rotatedAngle} />
							) : (
								<PdfDocumentErrorMessage />
							)}
						</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
