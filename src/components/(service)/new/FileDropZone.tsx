'use client';

import React from 'react';
import { CirclePlus, FileUp } from 'lucide-react';
import { DropzoneState } from 'react-dropzone';
import { MotionBlock, Button, Input } from '@/components';

interface FileDropZoneProps {
	dropzone: DropzoneState;
}

export default function FileDropZone({ dropzone: { getRootProps, getInputProps, isDragActive, open } }: FileDropZoneProps) {
	const fileInputId = React.useId();

	return (
		<div className="relative w-full h-full">
			<MotionBlock
				{...getRootProps()}
				className={`h-full bg-radial-[at_50%_75%] ${
					isDragActive ? 'from-sky-300 via-blue-500 to-indigo-400' : 'from-sky-200 via-blue-400 to-indigo-300'
				} to-90% rounded-2xl outline-2 outline-dotted outline-offset-2 focus-visible:rounded-2xl focus-visible:outline focus-visible:outline-offset-4`}>
				<Input type="file" id={`file-dropzone-${fileInputId}`} className="hidden" {...getInputProps()} />
				<label
					htmlFor={`file-dropzone-${fileInputId}`}
					className="flex justify-center items-center gap-2 p-4 w-full h-full text-sm text-white font-bold cursor-pointer lg:p-36 lg:text-base">
					<FileUp size={24} />
					<span>{isDragActive ? 'Put your files, here 😊' : 'Drag and Drop Your PDFs'} </span>
				</label>
			</MotionBlock>
			<Button type="button" onClick={open} className="absolute bottom-8 left-[50%] -translate-x-[50%] z-5">
				<CirclePlus strokeWidth={2.5} /> Select your files
			</Button>
		</div>
	);
}
