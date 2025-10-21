import { FileDropZone } from '@/components/(service)/new';

export default async function NewDocPage() {
	return (
		<section className="max-w-full p-3">
			<FileDropZone />
		</section>
	);
}
