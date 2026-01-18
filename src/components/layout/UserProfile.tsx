import Link from 'next/link';
import { ChevronDown, ChevronUp, LogOut, Settings, Sparkle, User } from 'lucide-react';
import {
	MotionBlock,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components';
import { useUserStore } from '@/store';
import { route } from '@/constant';

interface UserProfileProps {
	inSideNav?: boolean;
}

export default function UserProfile({ inSideNav = false }: UserProfileProps) {
	const { userState } = useUserStore();

	return (
		<>
			{userState?.user ? (
				<DropdownMenu>
					<DropdownMenuTrigger
						className={`flex ${
							inSideNav ? 'justify-between' : 'justify-center'
						} items-center gap-2 py-2 px-3 w-full rounded-lg hover:bg-muted transition-colors cursor-pointer lg:justify-between`}
						aria-label="Open Profile Menu">
						<div className="flex items-center gap-2">
							<div className="ui-flex-center w-4 h-4 rounded-[9999px] bg-gray-900">
								{/* <img src="#" alt="not yet" className="block w-full h-full" /> */}
							</div>
							<span className={`${inSideNav ? 'inline-block' : 'hidden'} font-bold lg:inline`}>User</span>
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
								<span>My Profile</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							<Link
								href={route.SERVICE.SETTINGS.SUBSCRIPTION}
								className="flex items-center gap-2 w-full text-gray-800 font-medium rounded-md">
								<Sparkle size={18} className="text-gray-900" />
								<span>Subscription</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer">
							<Link
								href={route.SERVICE.SETTINGS.MYACCOUNT_PROFILE}
								className="flex items-center gap-2 w-full text-gray-800 font-medium rounded-md">
								<Settings size={18} className="text-gray-900" />
								<span>Settings</span>
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
			) : (
				<MotionBlock className="ui-flex-center">
					<Link
						href={route.AUTH.LOGIN}
						className="ui-flex-center gap-0 py-3 px-3 w-full font-semibold bg-gray-900 border border-muted text-white text-center rounded-lg cursor-pointer transition-colors hover:bg-primary/90 sm:px-2 lg:gap-2">
						<User size={18} />
						<span className="hidden lg:inline">Join the service</span>
					</Link>
				</MotionBlock>
			)}
		</>
	);
}
