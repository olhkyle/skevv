import { Loader } from 'lucide-react';

export default function LayoutSpinner() {
	return (
		<div className="flex justify-center items-center flex-1 w-full h-screen">
			<Loader className="animate-spin" />
		</div>
	);
}
