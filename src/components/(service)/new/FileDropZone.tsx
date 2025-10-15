'use client';

import { Button, Input } from '@/components/ui';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

export default function FileDropZone() {
	const [files, setFiles] = useState<FileWithPath[]>([]);

	const onDrop = (acceptedFiles: File[]) => {
		setFiles(acceptedFiles);
		// acceptedFiles.map(file =>
		// 	Object.assign(file, {
		// 		preview: URL.createObjectURL(file),
		// 	}),
		// ),
	};

	const { getRootProps, getInputProps, acceptedFiles, open, isDragActive } = useDropzone({
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
		<div className={`grid ${files.length === 0 ? 'grid-cols-1 gap-0' : 'grid-cols-5 gap-2'}`}>
			{files.length === 0 ? (
				<div {...getRootProps()} className="col-span-4 relative flex justify-center items-center">
					<Input type="file" id="file-dropzone" className="hidden" {...getInputProps()} />
					<label
						htmlFor="file-dropzone"
						className="p-36 w-full bg-radial-[at_25%_25%] from-white to-gray-400 to-75 text-xl font-bold text-center rounded-2xl outline-2 outline-dotted outline-offset-2 cursor-pointer">
						Drag and Drop Your PDFs
					</label>
					<Button type="button" onClick={open} className="absolute bottom-8 left-[50%] -translate-x-[50%]">
						Select your files
					</Button>
				</div>
			) : (
				<>
					<div className="col-span-1 p-4 border-[1px] border-gray-100 rounded-2xl">
						<div className="flex justify-between items-center">
							<h3 className="text-md font-bold">Uploaded PDFs</h3>
							<Button type="button" variant="secondary" onClick={handleReset}>
								<RotateCcw />
							</Button>
						</div>
						<ul>
							{files.map(({ path }) => (
								<li key={path}>{path}</li>
							))}
						</ul>
					</div>
					<div className="col-span-4 p-4 border-[1px] border-gray-100 rounded-2xl">All Pdf Previews</div>
				</>
			)}
		</div>
	);
}
