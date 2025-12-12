'use client';

import React, { useTransition } from 'react';
import { DropEvent, FileRejection, FileWithPath, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { type RawFileItem, getCountedPages } from '@/components';
import { useFileStore } from '@/store';
import { PDF_HQ } from '@/constant';

const inputId = {
	OUTER: 'file-dropzone-outer',
	INNER: 'file-dropzone-inner',
} as const;

function isDragEvent(e: unknown): e is React.DragEvent<HTMLElement> {
	return !!e && typeof e === 'object' && 'target' in e;
}

export default function useDropzoneFiles() {
	const { files, setFiles, resetFiles } = useFileStore();

	const [isPending, startTransition] = useTransition();
	const hasFiles = files.length !== 0;

	//TODO: Additional Validation for file thumbnail
	const onDrop = async (acceptedFiles: FileWithPath[], rejections: FileRejection[], event: DropEvent) => {
		let inputIdValue: string | undefined;

		const willUpdateFiles: RawFileItem[] = acceptedFiles
			.map(file => ({
				id: `${file.name}-${Date.now()}`,
				file,
			}))
			.sort((prev, curr) => prev.file.name.localeCompare(curr.file.name, undefined, { numeric: true, sensitivity: 'base' }));

		const fileList = hasFiles ? [...files, ...willUpdateFiles] : willUpdateFiles;

		try {
			const asyncFiles = await getCountedPages(fileList);

			if (rejections.length) {
				toast.warning(`업로드한 ${rejections.length}개의 파일은 PDF 파일이 아닙니다`);
			}

			if (isDragEvent(event)) {
				inputIdValue = (event.target as HTMLElement & { dataset: { inputId?: string } }).dataset.inputId;
			}

			if (inputIdValue === inputId.OUTER) {
				startTransition(() => setFiles(asyncFiles));
			} else {
				setFiles(asyncFiles);
			}
		} catch (error) {
			console.error(error);
			toast.error('Error happened to add files');
		}
	};

	const ACCEPT_TYPE = { [PDF_HQ.KEY]: PDF_HQ.VALUE };

	const dropzone = useDropzone({
		accept: ACCEPT_TYPE,
		noClick: true,
		onDropAccepted: () => {
			toast.success('Successfully upload your files');
		},
		onDrop,
	});

	return { dropzone, isPending, hasFiles, files, setFiles, onReset: resetFiles };
}
