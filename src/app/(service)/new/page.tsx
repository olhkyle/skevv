import { FileDropZone } from '@/components/(service)/new';

export default async function NewDocPage() {
	return (
		<div className="max-w-full">
			<FileDropZone />
		</div>
	);
}
