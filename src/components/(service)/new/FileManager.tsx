'use client';

import React from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { type FileList, FileDropZone, FileEditableList, getCountedPages } from '..';

export default function FileManager() {
	const [files, setFiles] = React.useState<FileList>([]);
	const isFilesExist = files.length !== 0;

	//TODO: Additional Validation for file thumbnail
	const onDrop = async (acceptedFiles: FileWithPath[]) => {
		const willUpdateFiles = acceptedFiles
			.map(file => ({
				id: `${file.name}-${Date.now()}`,
				file,
			}))
			.sort((prev, curr) => prev.file.name.localeCompare(curr.file.name, undefined, { numeric: true, sensitivity: 'base' }));

		const fileList = files?.length !== 0 ? [...files, ...willUpdateFiles] : willUpdateFiles;

		try {
			const asyncFiles = await getCountedPages(fileList);
			setFiles(asyncFiles ?? files);
		} catch (error) {
			console.error(error);
			toast.error('Error happened to add files');
		}
	};

	const ACCEPT_TYPE = { 'application/pdf': ['.pdf'] };

	const dropzone = useDropzone({
		accept: ACCEPT_TYPE,
		noClick: true,
		onDrop,
	});

	return (
		<>{!isFilesExist ? <FileDropZone dropzone={dropzone} /> : <FileEditableList dropzone={dropzone} files={files} setFiles={setFiles} />}</>
	);
}
