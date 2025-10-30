'use client';

import React from 'react';
import { Download } from 'lucide-react';
import {
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
	FileNameSetterForm,
} from '@/components';
import screenSize from '@/constant/screenSize';
import { useMediaQuery } from '@/hooks';
import { type FileList, getTotalPageCount } from '../pdf';
import { Kbd } from '@/components/ui/kbd';

interface FileMergeConfirmContextProps {
	files: FileList;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FileMergeConfirmBody {
	files: FileList;
	isMobile: boolean;
	close: () => void;
}

function TriggerButton({ isMobile, ...props }: { isMobile: boolean }) {
	return (
		<Button type="button" size="icon-lg" className={`inline-flex justify-center gap-4 w-full px-${isMobile ? 'auto' : '4'}`} {...props}>
			<div className="flex items-center gap-2 overflow-hidden text-ellipsis ">
				<Download size={18} />
				Merge Files
			</div>
			{!isMobile && <Kbd>Ctrl + M</Kbd>}
		</Button>
	);
}

function FileMergeConfirmBody({ files, isMobile, close }: FileMergeConfirmBody) {
	return (
		<div className={`flex flex-col gap-4 ${isMobile ? 'p-3' : ''}`}>
			<div className="flex justify-between items-center">
				<span className="font-medium text-sm">Total Pages</span>
				<p className="py-1.5 px-3 bg-gray-100 font-medium rounded-lg">{getTotalPageCount(files)}</p>
			</div>
			<FileNameSetterForm files={files} close={close} />
		</div>
	);
}

export default function FileMergeConfirmContext({ files, isOpen, setIsOpen }: FileMergeConfirmContextProps) {
	const isMobile = useMediaQuery(screenSize.MAX_SM);
	const title = 'Confirm Merge';
	const description = `Check your all PDFs status here. Click merge when you're done.`;
	const onClose = () => setIsOpen(false);

	return (
		<>
			{isMobile ? (
				<Drawer open={isOpen} onOpenChange={setIsOpen}>
					<DrawerTrigger asChild>
						<TriggerButton isMobile={isMobile} />
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader className="p-3 text-left">
							<DrawerTitle className="text-start text-lg">{title}</DrawerTitle>
							<DrawerDescription className="text-start">{description}</DrawerDescription>
						</DrawerHeader>
						<FileMergeConfirmBody files={files} isMobile={isMobile} close={onClose} />
					</DrawerContent>
				</Drawer>
			) : (
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<TriggerButton isMobile={isMobile} />
					</DialogTrigger>
					<DialogContent className="sm:max-w-3/5 md:max-w-1/2">
						<DialogHeader>
							<DialogTitle className="text-lg">{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</DialogHeader>
						<FileMergeConfirmBody files={files} isMobile={isMobile} close={onClose} />
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
