import { Loader } from 'lucide-react';

export default function AnimateSpinner({ size = 18 }: { size?: number }) {
	return <Loader className="animate-spin" size={size} />;
}
