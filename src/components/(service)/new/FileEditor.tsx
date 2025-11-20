import React from 'react';
import { DropzoneState } from 'react-dropzone';
import { type ProcessedFileList, ServiceNav, FileListPanel, FilePreviewListPanel } from '@/components';

interface FileEditListProps {
	dropzone: DropzoneState;
	files: ProcessedFileList;
	setFiles: React.Dispatch<React.SetStateAction<ProcessedFileList>>;
	onReset: () => void;
}

export default function FileEditor({ dropzone, files, setFiles, onReset }: FileEditListProps) {
	return (
		<div className="flex flex-col gap-3 w-full sm:h-[calc(100dvh-2*var(--global-layout-padding))]">
			<ServiceNav resetFiles={onReset} />

			<div className={`grid grid-rows-1 gap-3 h-full md:grid-cols-6 md:max-w-full`}>
				<FileListPanel dropzone={dropzone} files={files} setFiles={setFiles} />
				<FilePreviewListPanel files={files} />
			</div>
		</div>
	);
}
