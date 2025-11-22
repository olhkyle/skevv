'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	Kbd,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui';
import { useMediaQuery } from '@/hooks';
import { screenSize } from '@/constant';
import { useFileStore } from '@/store';

interface FileResetConfirmContextProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FileResetConfirmBodyProps {
	isMobile: boolean;
	close: () => void;
	resetFiles: () => void;
}

function TriggerButton({ open, ...props }: { open: () => void }) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button type="button" size="icon-md" onClick={open} className="rounded-full" {...props}>
					<RotateCcw size={21} />
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<Kbd>Reset All Files</Kbd>
			</TooltipContent>
		</Tooltip>
	);
}

function FileResetConfirmBody({ isMobile, close, resetFiles }: FileResetConfirmBodyProps) {
	return (
		<>
			{isMobile ? (
				<DrawerFooter className="grid grid-cols-2 gap-3 mb-3 py-4 px-3 sm:mb-0">
					<Button type="button" variant="outline" size="lg" onClick={close} className="col-span-1">
						Cancel
					</Button>
					<DrawerClose asChild>
						<Button type="button" size="lg" onClick={resetFiles} className="col-span-1">
							Confirm
						</Button>
					</DrawerClose>
				</DrawerFooter>
			) : (
				<DialogFooter className="grid grid-cols-2 gap-3 mb-3 sm:mb-0">
					<Button type="button" variant="outline" size="lg" onClick={close} className="col-span-1">
						Cancel
					</Button>
					<DialogClose asChild>
						<Button type="button" size="lg" onClick={resetFiles} className="col-span-1">
							Confirm
						</Button>
					</DialogClose>
				</DialogFooter>
			)}
		</>
	);
}

export default function FileResetConfirmContext({ isOpen, setIsOpen }: FileResetConfirmContextProps) {
	const { resetFiles } = useFileStore();
	const isMobile = useMediaQuery(screenSize.MAX_SM);
	const title = 'Reset Current Files';
	const description = 'Do you really mind to reset files?';

	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);

	return (
		<>
			{isMobile ? (
				<Drawer open={isOpen} onOpenChange={setIsOpen}>
					<DrawerTrigger asChild>
						<TriggerButton open={open} />
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader className="p-3 text-left">
							<DrawerTitle className="text-start text-lg">{title}</DrawerTitle>
							<DrawerDescription className="my-2 font-medium text-start">{description}</DrawerDescription>
						</DrawerHeader>
						<FileResetConfirmBody isMobile={isMobile} close={close} resetFiles={resetFiles} />
					</DrawerContent>
				</Drawer>
			) : (
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<TriggerButton open={open} />
					</DialogTrigger>
					<DialogContent className="w-[500px]" aria-describedby="File Reset Confirm Dialog Content">
						<DialogHeader>
							<DialogTitle className="text-lg">{title}</DialogTitle>
							<DialogDescription className="my-2 font-medium text-start">{description}</DialogDescription>
						</DialogHeader>
						<FileResetConfirmBody isMobile={isMobile} close={close} resetFiles={resetFiles} />
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
