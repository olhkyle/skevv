'use client';

import React from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { type FileList, FileDropZone, FileEditList, getCountedPages } from '..';

export default function FileManager() {
	const [files, setFiles] = React.useState<FileList>([]);
	const isFilesExist = files.length !== 0;

	//TODO: Additional Validation for file thumbnail
	const onDrop = async (acceptedFiles: FileWithPath[]) => {
		const fileList = acceptedFiles.map(file => ({
			id: `${file.name}-${Date.now()}`,
			file,
			imageSrc: URL.createObjectURL(file),
		}));

		try {
			const asyncFiles = await getCountedPages(fileList);
			setFiles(asyncFiles ?? files);
		} catch (error) {
			console.error(error);
		}
	};

	const ACCEPT_TYPE = { 'application/pdf': ['.pdf'] };

	const dropzone = useDropzone({
		accept: ACCEPT_TYPE,
		noClick: true,
		onDrop,
	});

	React.useEffect(() => {
		//Make sure to revoke the data uris to avoid memory leaks, will run on unmount
		return () => files.forEach(file => URL.revokeObjectURL(file.imageSrc!));
	}, [files]);

	return <>{!isFilesExist ? <FileDropZone dropzone={dropzone} /> : <FileEditList files={files} setFiles={setFiles} />}</>;
}
