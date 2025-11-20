'use client';

import React from 'react';
import { CirclePlus, FileUp } from 'lucide-react';
import { DropzoneState } from 'react-dropzone';
import { MotionBlock, Button, Input } from '@/components';

interface FileDropZoneProps {
	dropzone: DropzoneState;
}

export default function FileDropZone({
	dropzone: { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, open },
}: FileDropZoneProps) {
	const fileInputId = React.useId();

	return (
		<div className="relative w-full h-full">
			<MotionBlock
				{...getRootProps()}
				className={`h-full bg-radial-[at_20%_80%] ${
					isDragActive && isDragAccept
						? 'from-sky-300 via-blue-500 to-indigo-400'
						: isDragActive && isDragReject
						? 'from-gray-100 via-gray-300 to-gray-100'
						: 'from-sky-100 via-blue-400 to-indigo-200'
				} to-90% rounded-2xl outline-2 outline-dotted outline-offset-2 focus-visible:rounded-2xl focus-visible:outline focus-visible:outline-offset-4`}>
				<Input type="file" id={`file-dropzone-${fileInputId}`} className="hidden" {...getInputProps()} />
				<label
					htmlFor={`file-dropzone-${fileInputId}`}
					className="ui-flex-center gap-2 p-4 w-full h-full text-sm text-white font-bold cursor-pointer lg:p-36 lg:text-base">
					<FileUp size={24} />
					<span>
						{isDragActive && isDragAccept
							? 'Put your files, here 😊'
							: isDragActive && isDragReject
							? 'Only PDF Files accepted'
							: 'Drag and Drop Your PDFs'}
					</span>
				</label>
			</MotionBlock>
			<Button
				type="button"
				variant="secondary"
				onClick={open}
				className="absolute bottom-8 left-[50%] -translate-x-[50%] bg-gradient-blue-200 border-gray-200 text-white z-5">
				<CirclePlus strokeWidth={2.5} /> Select your files
			</Button>
		</div>
	);
}
