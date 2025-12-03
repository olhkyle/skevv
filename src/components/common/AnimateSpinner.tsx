import { Loader } from 'lucide-react';

export default function AnimateSpinner({ size = 18 }: { size?: number }) {
	return <Loader className="text-gray-500 animate-spin" size={size} />;
}
