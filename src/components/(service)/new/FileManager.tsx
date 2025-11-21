'use client';

import React from 'react';
import { AnimateSpinner, FileDropZone, FileEditor } from '@/components';
import { useDropzoneFiles } from '@/hooks';

export default function FileManager() {
	const { dropzone, isPending, files, hasFiles, setFiles, onReset } = useDropzoneFiles();

	return (
		<>
			{isPending ? (
				<div className="ui-flex-center w-full h-full bg-gradient-blue-100 rounded-lg">
					<AnimateSpinner />
				</div>
			) : (
				<>
					{hasFiles ? (
						<FileEditor dropzone={dropzone} files={files} setFiles={setFiles} onReset={onReset} />
					) : (
						<FileDropZone dropzone={dropzone} />
					)}
				</>
			)}
		</>
	);
}
