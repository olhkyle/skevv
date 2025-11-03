import Link from 'next/link';
import { ChevronDown, ChevronUp, LogOut, Settings, Sparkle, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui';
import route from '@/constant/route';

interface UserProfileProps {
	inSideNav?: boolean;
}

export default function UserProfile({ inSideNav = false }: UserProfileProps) {
	return (
		<div className={`mx-1.5 lg:mx-0`}>
			<DropdownMenu>
				<DropdownMenuTrigger
					className={`flex ${
						inSideNav ? 'justify-between' : 'justify-center'
					} items-center gap-2  py-3 px-2 w-full rounded-lg hover:bg-muted transition-colors cursor-pointer lg:justify-between`}
					aria-label="Open Profile Menu">
					<div className="flex items-center gap-2">
						<div className="flex justify-center items-center w-4 h-4 rounded-[9999px] bg-gray-900">
							{/* <img src="#" alt="not yet" className="block w-full h-full" /> */}
						</div>
						<span className={`${inSideNav ? 'inline-block' : 'hidden'} font-bold lg:inline`}>Kyle Kwon</span>
					</div>
					<span className={`${inSideNav ? 'inline-block' : 'hidden'} lg:inline`}>
						{inSideNav ? <ChevronDown size={18} className="text-gray-900" /> : <ChevronUp size={18} className="text-gray-900" />}
					</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel className="text-gray-500">kylekwon.dev@gmail.com</DropdownMenuLabel>
					<DropdownMenuItem className="cursor-pointer">
						<Link
							href={route.SERVICE.SETTINGS.MYACCOUNT_PROFILE}
							className="flex items-center gap-2 w-full text-gray-800 font-medium rounded-md">
							<User size={18} className="text-gray-900" />
							<span className="">My Profile</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						<Link
							href={route.SERVICE.SETTINGS.SUBSCRIPTION}
							className="flex items-center gap-2 w-full text-gray-800 font-medium rounded-md">
							<Sparkle size={18} className="text-gray-900" />
							<span className="">Subscription</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						<Link
							href={route.SERVICE.SETTINGS.MYACCOUNT_PROFILE}
							className="flex items-center gap-2 w-full text-gray-800 font-medium rounded-md">
							<Settings size={18} className="text-gray-900" />
							<span className="">Settings</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="cursor-pointer">
						<div className="flex items-center gap-2 w-full text-gray-800 font-medium rounded-md">
							<LogOut size={18} className="text-gray-900" />
							Sign Out
						</div>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
