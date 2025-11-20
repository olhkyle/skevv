'use client';

import React from 'react';
import { FileDropZone, FileEditor } from '@/components';
import { useDropzoneFiles } from '@/hooks';

export default function FileManager() {
	const { dropzone, files, hasFiles, setFiles, onReset } = useDropzoneFiles();
	console.log(files);
	return (
		<>
			{hasFiles ? (
				<FileEditor dropzone={dropzone} files={files} setFiles={setFiles} onReset={onReset} />
			) : (
				<FileDropZone dropzone={dropzone} />
			)}
		</>
	);
}
