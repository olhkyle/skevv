'use client';

import Link from 'next/link';
import React from 'react';
import { ArrowRightIcon, Menu, X } from 'lucide-react';
import { Button } from '../ui';
import route from '@/constant/route';
import { MotionBlock } from '../common';

export default function Nav() {
	const [isSideNavOpen, setIsSideNavOpen] = React.useState(false);
	const toggle = () => setIsSideNavOpen(isSideNavOpen => !isSideNavOpen);

	return (
		<>
			<nav id="layout-nav" className={`fixed flex justify-center w-full pt-3 px-3 bg-white backdrop-blur-lg z-40 md:hidden`}>
				<div className="flex justify-between items-center flex-1 w-full px-4 py-3 min-h-[var(--global-layout-nav-height)] h-[var(--layout-nav-height)] border-[1px] border-muted rounded-full">
					<h1 className="text-xl font-black">
						<Link href={route.SERVICE.ROOT}>SKEVV</Link>
					</h1>
					<Button type="button" size="icon-md" variant="outline" onClick={toggle}>
						{isSideNavOpen ? <X /> : <Menu />}
					</Button>
				</div>
			</nav>

			<div
				id="layout-side-navigation"
				className={`fixed top-[calc(var(--global-layout-padding)+var(--global-layout-nav-height))] left-0 right-0 flex flex-col ${
					isSideNavOpen ? 'max-h-[100%]' : 'max-h-0'
				} px-3 w-full bg-white z-20 overflow-hidden transition-[max-height] duration-200 ease-[cubic-bezier(0.22, 1, 0.36, 1)] md:hidden`}>
				<MotionBlock onClick={toggle} className="rounded-lg">
					<Link
						href={route.SERVICE.WRITE}
						className="flex justify-between items-center px-3 w-full min-h-[60px] rounded-lg font-medium cursor-pointer active:bg-gray-50 ">
						<span>New Merge</span>
						<ArrowRightIcon size={20} />
					</Link>
				</MotionBlock>
				<MotionBlock onClick={toggle} className="rounded-lg">
					<Link
						href={route.SERVICE.DOCUMENTS}
						className="flex justify-between items-center px-3 w-full min-h-[60px] font-medium rounded-lg cursor-pointer active:bg-gray-50">
						Documents
						<ArrowRightIcon size={20} />
					</Link>
				</MotionBlock>
			</div>
			<div
				id="layout-overlay"
				onClick={toggle}
				className={`fixed top-0 ${isSideNavOpen ? 'left-0' : 'slide-out-to-bottom-full'} right-0 bottom-0 h-full bg-muted ${
					isSideNavOpen ? 'opacity-80' : 'opacity-0'
				} z-10 transition-all duration-300 ease-[cubic-bezier(0.22, 1, 0.36, 1)]`}></div>
		</>
	);
}
