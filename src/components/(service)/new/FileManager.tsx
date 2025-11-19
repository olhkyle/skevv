'use client';

import React from 'react';
import { FileDropZone, FileEditor } from '@/components';
import { useDropzoneFiles } from '@/hooks';

export default function FileManager() {
	const { dropzone, files, hasFiles, setFiles, onReset } = useDropzoneFiles();

	return (
		<>
			{!hasFiles ? (
				<FileDropZone dropzone={dropzone} />
			) : (
				<FileEditor dropzone={dropzone} files={files} setFiles={setFiles} onReset={onReset} />
			)}
		</>
	);
}
