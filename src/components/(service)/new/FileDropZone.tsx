'use client';

import dynamic from 'next/dynamic';
import { CirclePlus, FileUp, RotateCcw } from 'lucide-react';
import { Suspense, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { MotionBlock, Button, Input } from '@/components';

const PdfPreview = dynamic(() => import('../pdf/PdfPreview'), {
	ssr: false,
});

type FileItem = {
	id: string;
	file: FileWithPath;
};

export default function FileDropZone() {
	const [files, setFiles] = useState<FileItem[]>([]);

	const onDrop = (acceptedFiles: FileWithPath[]) => {
		const fileList = acceptedFiles.map(file => ({
			id: `${file.name}-${Date.now()}`,
			file,
		}));

		setFiles(fileList);
		// acceptedFiles.map(file =>
		// 	Object.assign(file, {
		// 		preview: URL.createObjectURL(file),
		// 	}),
		// ),
	};

	const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
		accept: { 'application/pdf': ['.pdf'] },
		noClick: true,
		onDrop,
	});

	const handleReset = () => setFiles([]);

	// useEffect(() => {
	// Make sure to revoke the data uris to avoid memory leaks, will run on unmount
	// return () => files.forEach(file => URL.revokeObjectURL(file.preview));
	// }, [files]);

	return (
		<>
			{files?.length === 0 ? (
				<div className="grid grid-cols-1">
					<MotionBlock
						{...getRootProps()}
						className="col-span-4 relative bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-300 to-90% rounded-2xl outline-2 outline-dotted outline-offset-2 focus-visible:rounded-2xl focus-visible:outline focus-visible:outline-offset-4">
						<Input type="file" id="file-dropzone" className="hidden" {...getInputProps()} />
						<label
							htmlFor="file-dropzone"
							className="flex justify-center items-center gap-2 px-36 min-h-[80dvh] w-full text-base text-white font-bold cursor-pointer lg:text-lg">
							<FileUp size={27} />
							<span>{isDragActive ? 'Put your files, here😊' : 'Drag and Drop Your PDFs'} </span>
						</label>

						<Button type="button" onClick={open} className="absolute bottom-8 left-[50%] -translate-x-[50%] z-10">
							<CirclePlus strokeWidth={2.5} /> Select your files
						</Button>
					</MotionBlock>
				</div>
			) : (
				<div className="grid grid-cols-5 gap-2">
					<div className="col-span-1 p-4 border-[1px] border-gray-100 rounded-2xl">
						<div className="flex justify-between items-center">
							<h3 className="text-md font-bold">Uploaded PDFs</h3>
							<Button type="button" variant="secondary" onClick={handleReset}>
								<RotateCcw size={21} />
							</Button>
						</div>
						<ul>
							{files?.map(({ id, file }) => (
								<li key={id}>
									<span>{file.name}</span>
								</li>
							))}
						</ul>
					</div>
					<div className="col-span-4 p-4 border-[1px] border-gray-100 rounded-2xl">All Pdf Previews</div>
				</div>
			)}
		</>
	);
}
