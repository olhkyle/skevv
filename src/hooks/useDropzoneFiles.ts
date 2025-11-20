import React from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { type RawFileItem, type ProcessedFileItem, getCountedPages } from '@/components';
import PDF_HQ from '@/constant/pdf';

export default function useDropzoneFiles() {
	const [files, setFiles] = React.useState<ProcessedFileItem[]>([]);
	const hasFiles = files.length !== 0;

	const handleResetFiles = () => setFiles([]);

	//TODO: Additional Validation for file thumbnail
	const onDrop = async (acceptedFiles: FileWithPath[]) => {
		const willUpdateFiles: RawFileItem[] = acceptedFiles
			.map(file => ({
				id: `${file.name}-${Date.now()}`,
				file,
			}))
			.sort((prev, curr) => prev.file.name.localeCompare(curr.file.name, undefined, { numeric: true, sensitivity: 'base' }));

		const fileList = hasFiles ? [...files, ...willUpdateFiles] : willUpdateFiles;

		try {
			const asyncFiles = await getCountedPages(fileList);

			setFiles(asyncFiles);
		} catch (error) {
			console.error(error);
			toast.error('Error happened to add files');
		}
	};

	const ACCEPT_TYPE = { [PDF_HQ.KEY]: PDF_HQ.VALUE };

	const dropzone = useDropzone({
		accept: ACCEPT_TYPE,
		noClick: true,
		onDrop,
	});

	return { dropzone, hasFiles, files, setFiles, onReset: handleResetFiles };
}
