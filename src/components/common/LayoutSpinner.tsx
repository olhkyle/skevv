import { Loader } from 'lucide-react';
import AnimateSpinner from './AnimateSpinner';

export default function LayoutSpinner() {
	return (
		<div className="ui-flex-center flex-1 w-full h-screen">
			<AnimateSpinner />
		</div>
	);
}
