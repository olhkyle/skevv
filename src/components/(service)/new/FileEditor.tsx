import React from 'react';
import { DropzoneState } from 'react-dropzone';
import { type FileList, ServiceNav, FileListPanel, FilePreviewListPanel } from '@/components';

interface FileEditListProps {
	dropzone: DropzoneState;
	files: FileList;
	setFiles: React.Dispatch<React.SetStateAction<FileList>>;
	onReset: () => void;
}

export default function FileEditor({ dropzone, files, setFiles, onReset }: FileEditListProps) {
	const FIXED_HEIGHT_ON_MIN_MD =
		'md:h-[calc(100dvh-2*var(--global-layout-padding)-var(--service-nav-height)-var(--global-layout-padding))]';

	return (
		<div className="flex flex-col gap-3 w-full">
			<ServiceNav resetFiles={onReset} />

			<div className={`grid grid-rows-1 gap-3 md:grid-cols-6 md:max-w-full ${FIXED_HEIGHT_ON_MIN_MD}`}>
				<FileListPanel dropzone={dropzone} files={files} setFiles={setFiles} />
				<FilePreviewListPanel files={files} />
			</div>
		</div>
	);
}
