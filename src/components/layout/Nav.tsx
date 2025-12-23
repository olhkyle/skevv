'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { ArrowRightIcon, X } from 'lucide-react';
import skevvSVG from '/public/favicon.svg';
import { MotionBlock, Button, UserProfile } from '@/components';
import { route } from '@/constant';

const Menu = ({ className }: { className?: string }) => {
	return (
		<svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="transparent">
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8.5h18m-18 7h18"></path>
		</svg>
	);
};

export default function Nav() {
	const [isSideNavOpen, setIsSideNavOpen] = React.useState(false);
	const toggle = () => setIsSideNavOpen(isSideNavOpen => !isSideNavOpen);

	return (
		<>
			<nav id="layout-nav" className={`fixed flex justify-center w-full pt-3 px-3 ${isSideNavOpen ? 'bg-white' : ''} z-40 md:hidden`}>
				<div className="flex justify-between items-center w-full px-4 py-3 min-h-[var(--global-layout-nav-height)] border border-muted rounded-full bg-white backdrop-blur-lg">
					<h1 className="inline-flex justify-center items-center" onClick={() => setIsSideNavOpen(false)}>
						<Link href={route.SERVICE.ROOT} className="inline-flex justify-center items-center h-8 font-black text-xl">
							<Image src={skevvSVG} alt={'Skevv'} className="inline-block w-full h-full" priority /> SKEVV
						</Link>
					</h1>
					<Button
						type="button"
						size="icon-lg"
						variant="ghost"
						className={`${isSideNavOpen ? 'bg-light' : 'bg-none'} rounded-full`}
						onClick={toggle}>
						{isSideNavOpen ? <X className="size-5" /> : <Menu className="size-5" />}
					</Button>
				</div>
			</nav>

			<div
				id="layout-side-navigation"
				className={`fixed top-[calc(var(--global-layout-padding)+var(--global-layout-nav-height))] left-0 right-0 flex flex-col ${
					isSideNavOpen ? 'max-h-full' : 'max-h-0'
				} px-3 w-full bg-white z-20 overflow-hidden transition-[max-height] duration-200 ease-[cubic-bezier(0.22, 1, 0.36, 1)] md:hidden`}>
				<MotionBlock onClick={toggle} className="rounded-lg">
					<Link
						href={route.SERVICE.WRITE}
						className="flex justify-between items-center px-3 w-full min-h-[60px] rounded-lg font-medium cursor-pointer active:bg-light">
						<span>New Merge</span>
						<ArrowRightIcon size={20} />
					</Link>
				</MotionBlock>
				<MotionBlock onClick={toggle} className="rounded-lg">
					<Link
						href={route.SERVICE.DOCUMENTS}
						className="flex justify-between items-center px-3 w-full min-h-[60px] font-medium rounded-lg cursor-pointer active:bg-light">
						Documents
						<ArrowRightIcon size={20} />
					</Link>
				</MotionBlock>
				<div className="flex justify-between items-center min-h-[60px]">
					<UserProfile inSideNav={true} />
					{/**TODO: LANG Option */}
					<div className="p-2 border border-muted rounded-full">ENG</div>
				</div>
			</div>
			<div
				id="layout-overlay"
				onClick={toggle}
				className={`fixed top-0 ${isSideNavOpen ? 'left-0' : 'slide-out-to-bottom-full'} right-0 bottom-0 h-full bg-muted ${
					isSideNavOpen ? 'opacity-80' : 'opacity-0'
				} z-10 transition-opacity will-change-transform duration-300 ease-[cubic-bezier(0.22, 1, 0.36, 1)] cursor-pointer md:hidden`}
			/>
		</>
	);
}
