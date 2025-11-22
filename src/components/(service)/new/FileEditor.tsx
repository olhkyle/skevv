import React from 'react';
import { DropzoneState } from 'react-dropzone';
import { ServiceNav, FileListPanel, FilePreviewListPanel } from '@/components';
import { useMediaQuery } from '@/hooks';
import { screenSize } from '@/constant';

interface FileEditListProps {
	dropzone: DropzoneState;
}

export default function FileEditor({ dropzone }: FileEditListProps) {
	const moreThanMD = useMediaQuery(screenSize.MIN_MD);

	return (
		<div className="flex flex-col gap-3 w-full h-[calc(100dvh-2*var(--global-layout-padding)-var(--service-nav-height))] min-h-0 overflow-hidden sm:h-[calc(100dvh-2*var(--global-layout-padding))]">
			<ServiceNav />

			<div className={`grid grid-rows-1 flex-1 gap-3 min-h-0 h-full md:grid-cols-6 md:max-w-full`}>
				<FileListPanel dropzone={dropzone} />
				{moreThanMD && <FilePreviewListPanel />}
			</div>
		</div>
	);
}
