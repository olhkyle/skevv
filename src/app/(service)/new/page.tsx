import { Suspense } from 'react';
import { LayoutSpinner, FileManager } from '@/components';

export default function NewFilesMergePage() {
	return (
		<section className="p-3">
			<FileManager />
		</section>
	);
}
