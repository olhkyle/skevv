'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	Kbd,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui';
import screenSize from '@/constant/screenSize';
import { useMediaQuery } from '@/hooks';

interface FileResetConfirmContextProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	resetFiles: () => void;
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
				<Button type="button" size="icon-lg" onClick={open} className="rounded-full" {...props}>
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
				<DrawerFooter className="grid grid-cols-2 gap-3 py-4 px-3">
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
				<DialogFooter className="grid grid-cols-2 gap-3">
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

export default function FileResetConfirmContext({ isOpen, setIsOpen, resetFiles }: FileResetConfirmContextProps) {
	const isMobile = useMediaQuery(screenSize.MAX_SM);
	const title = 'Reset Current Files';

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
						</DrawerHeader>
						<FileResetConfirmBody isMobile={isMobile} close={close} resetFiles={resetFiles} />
					</DrawerContent>
				</Drawer>
			) : (
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<TriggerButton open={open} />
					</DialogTrigger>
					<DialogContent className="w-[300px]" aria-describedby="File Reset Confirm Dialog Content">
						<DialogHeader>
							<DialogTitle className="text-lg">{title}</DialogTitle>
						</DialogHeader>
						<FileResetConfirmBody isMobile={isMobile} close={close} resetFiles={resetFiles} />
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
