import React from 'react';

export default function Wip({ message, icon }: { message: string; icon: React.ReactNode }) {
	return (
		<div className="flex items-center gap-3 px-6 py-3 w-full text-white bg-gradient-blue-100 rounded-full">
			<span>{icon}</span>
			<p className="font-medium text-xs sm:text-sm">{message}</p>
		</div>
	);
}
