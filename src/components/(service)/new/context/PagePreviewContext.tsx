'use client';

import React from 'react';
import { SquareMousePointer } from 'lucide-react';
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
	PageItem,
} from '@/components';
import { useMediaQuery } from '@/hooks';
import { screenSize } from '@/constant';

interface PagePreviewContextProps {
	page: PageItem;
	isOpen: boolean;
	toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function TriggerButton({ isMobile, ...props }: { isMobile: boolean }) {
	return (
		<Button type="button" size="icon-sm" variant="ghost" className={`px-${isMobile ? 'auto' : '4'}`} {...props}>
			<SquareMousePointer className="text-gray-500" />
		</Button>
	);
}

export default function PagePreviewContext({ page, isOpen, toggle }: PagePreviewContextProps) {
	const isMobile = useMediaQuery(screenSize.MAX_SM);
	const title = `Page ${page.order} Preview`;
	const description = `﹡ ${page.id.split('-')[0]}`;

	return (
		<>
			{isMobile ? (
				<Drawer open={isOpen} onOpenChange={toggle}>
					<DrawerTrigger asChild>
						<TriggerButton isMobile={isMobile} />
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader className="p-3 text-left">
							<DrawerTitle className="text-lg">{title}</DrawerTitle>
							<DrawerDescription className="py-1.5 px-3 bg-light text-gray-500 text-sm text-start rounded-md">
								{description}
							</DrawerDescription>
						</DrawerHeader>
					</DrawerContent>
				</Drawer>
			) : (
				<Dialog open={isOpen} onOpenChange={toggle}>
					<DialogTrigger asChild>
						<TriggerButton isMobile={isMobile} />
					</DialogTrigger>
					<DialogContent className="">
						<DialogHeader>
							<DialogTitle className="text-lg">{title}</DialogTitle>
							<DialogDescription className="py-1.5 px-3 bg-light text-gray-500 text-sm text-start rounded-md">
								{description}
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
