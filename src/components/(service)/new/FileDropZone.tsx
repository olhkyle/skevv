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
	imageSrc: string | null;
};

export default function FileDropZone() {
	const [files, setFiles] = useState<FileItem[]>([]);

	//TODO: Additional Validation for file thumbnail
	const onDrop = (acceptedFiles: FileWithPath[]) => {
		const fileList = acceptedFiles.map(file => ({
			id: `${file.name}-${Date.now()}`,
			file,
			imageSrc: URL.createObjectURL(file),
		}));

		setFiles(fileList);
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
							className="flex justify-center items-center gap-2 p-4 min-h-[80dvh] w-full text-base text-white font-bold cursor-pointer lg:text-lg lg:p-36">
							<FileUp size={27} />
							<span>{isDragActive ? 'Put your files, here😊' : 'Drag and Drop Your PDFs'} </span>
						</label>

						<Button type="button" onClick={open} className="absolute bottom-8 left-[50%] -translate-x-[50%] z-10">
							<CirclePlus strokeWidth={2.5} /> Select your files
						</Button>
					</MotionBlock>
				</div>
			) : (
				<div className="grid grid-rows-2 gap-2 md:grid-cols-5">
					<div className="flex flex-col gap-2 col-span-full row-span-1 p-4 border-[1px] border-gray-100 rounded-2xl lg:col-span-2">
						<div className="flex justify-between items-center">
							<h3 className="text-md font-bold">Uploaded PDFs</h3>
							<Button type="button" variant="secondary" onClick={handleReset}>
								<RotateCcw size={21} />
							</Button>
						</div>
						<ul className="flex flex-col gap-2">
							{files?.map(({ id, file }) => (
								<li key={id}>
									<div className="px-4 py-2 bg-secondary rounded-lg border-muted">{file.name}</div>
								</li>
							))}
						</ul>
					</div>
					<div className="col-span-full p-4 border-[1px] border-gray-100 rounded-2xl md:col-span-3">
						<h3 className="text-md font-bold">All PDF Preview</h3>
						<ul className="flex flex-col gap-2">
							{files?.map(({ id, file }) => (
								<li key={id}>
									<PdfPreview file={file} />
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</>
	);
}
