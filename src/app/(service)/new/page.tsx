import { Suspense } from 'react';
import { LayoutSpinner, FileManager } from '@/components';

export default async function NewDocPage() {
	return (
		<section className="p-3">
			<Suspense fallback={<LayoutSpinner />}>
				<FileManager />
			</Suspense>
		</section>
	);
}
