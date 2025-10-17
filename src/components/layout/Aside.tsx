'use client';

import Link from 'next/link';
import route from '@/constant/route';
import { FilePlus, LayoutList, Search, Settings } from 'lucide-react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useState } from 'react';

const links = [
	{ title: 'Merge PDF', to: route.SERVICE.WRITE, icon: <FilePlus size={18} className="text-gray-900" /> },
	{ title: 'Documents', to: route.SERVICE.DOCUMENTS, icon: <LayoutList size={18} /> },
] as const;

export default function Aside() {
	const segment = useSelectedLayoutSegment();

	return (
		<div className="relative">
			<aside
				className={`fixed flex-col left-0 hidden py-2 h-full w-14 max-h-screen overflow-y-auto overflow-x-hidden bg-muted border-muted border-r md:sticky md:flex lg:w-56 lg:p-3`}>
				<div className="flex h-full flex-col justify-between">
					<header className="hidden justify-between items-center gap-2 lg:flex">
						<button className="flex items-center gap-2 py-1.5 px-2">
							<div className="flex justify-center items-center w-4 h-4 rounded-[9999px] bg-gray-900">
								{/* <img src="#" alt="not yet" className="block w-full h-full" /> */}
							</div>
							<div className="font-bold">Kyle Kwon</div>
						</button>
						<button
							type="button"
							className="flex justify-center items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors lg:px-2">
							<Search size={20} className="text-gray-800" />
						</button>
					</header>
					<Link href={route.SERVICE.ROOT} className="inline-flex justify-center item-center h-[36px] text-center lg:hidden">
						<h1 className="text-xl font-bold">SKV</h1>
					</Link>
					<nav className="flex flex-col flex-1 gap-2 mt-2 md:px-2 lg:mt-4 lg:px-0">
						{links.map(({ title, to, icon }) => (
							<Link
								href={to}
								key={to}
								className={`flex justify-center items-center gap-0 py-1.5 px-2 ${
									to === route.SERVICE.ROOT + segment ? 'bg-gray-200' : 'bg-muted'
								} text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors lg:gap-2 lg:justify-start`}>
								{icon}
								<span className="hidden lg:inline">{title}</span>
							</Link>
						))}
					</nav>
				</div>
				<div>
					<Link
						href={route.SERVICE.SETTINGS.MYACCOUNT_PROFILE}
						className="flex justify-center items-center gap-0 py-1.5 px-2 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition-colors lg:gap-2 lg:justify-start">
						<Settings size={18} className="text-gray-900" />
						<span className="hidden lg:inline">Settings</span>
					</Link>
					<small className="text-default mx-3 mb-2 mt-1 hidden text-[0.5rem] opacity-50 lg:block">
						© 2025{' '}
						<Link href={route.HOME} className="hover:underline" target="_blank">
							SKEVV
						</Link>
					</small>
				</div>
			</aside>
		</div>
	);
}
