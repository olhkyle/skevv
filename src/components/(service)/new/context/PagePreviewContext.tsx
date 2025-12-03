'use client';

import { Document, Page } from 'react-pdf';
import React from 'react';
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
	PdfPreviewSkeleton,
} from '@/components';
import { useDropzoneFiles, useMediaQuery, useResizableObserver } from '@/hooks';
import { screenSize } from '@/constant';

interface PagePreviewContextProps {
	page: PageItem;
	isOpen: boolean;
	toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function TriggerButton({ isSMDown, ...props }: { isSMDown: boolean }) {
	return (
		<Button type="button" size="icon-sm" variant="ghost" className={`px-${isSMDown ? 'auto' : '4'}`} {...props}>
			<SquareMousePointer className="text-gray-500" />
		</Button>
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
	console.log(file, page);
	const title = `Page ${page.order} Preview`;
	const description = `${page.id.split('.pdf')[0]}.pdf`;

	return (
		<>
			{isSMDown ? (
				<Drawer open={isOpen} onOpenChange={toggle}>
					<DrawerTrigger asChild>
						<TriggerButton isSMDown={isSMDown} />
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader className="p-3">
							<DrawerTitle className="text-lg text-start">{title}</DrawerTitle>
							<DrawerDescription className="inline-flex items-center gap-1.5 p-1.5 w-auto bg-gray-200 text-gray-500 text-xs border border-gray-300 rounded-md">
								<Asterisk size={12} />
								{description}
							</DrawerDescription>
							<Document file={file} loading={<PdfPreviewSkeleton pageCount={1} />}>
								<Page
									devicePixelRatio={2.5}
									loading={
										<div className="ui-flex-center w-full h-full bg-light rounded-lg">
											<AnimateSpinner size={18} />
										</div>
									}
									width={containerWidth}
									renderTextLayer={false}
									renderAnnotationLayer={false}
									className="ui-flex-center w-full border border-gray-200"
								/>
							</Document>
						</DrawerHeader>
					</DrawerContent>
				</Drawer>
			) : (
				<Dialog open={isOpen} onOpenChange={toggle}>
					<DialogTrigger asChild>
						<TriggerButton isSMDown={isSMDown} />
					</DialogTrigger>
					<DialogContent ref={containerRef} className="">
						<DialogHeader>
							<DialogTitle className="text-lg">{title}</DialogTitle>
							<DialogDescription className="inline-flex items-center gap-1.5 p-1.5 w-auto bg-gray-200 text-gray-500 text-xs border border-gray-300 rounded-md">
								<Asterisk size={12} />
								{description}
							</DialogDescription>
						</DialogHeader>
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
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
