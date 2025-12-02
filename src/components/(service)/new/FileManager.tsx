'use client';

import React from 'react';
import { AnimateSpinner, FileDropZone, FileEditor } from '@/components';
import { useDropzoneFiles } from '@/hooks';

export default function FileManager() {
	const { isPending, hasFiles } = useDropzoneFiles();

	return (
		<>
			{isPending ? (
				<div className="ui-flex-center w-full h-full bg-light border border-light rounded-lg ">
					<AnimateSpinner />
				</div>
			) : (
				<>{hasFiles ? <FileEditor /> : <FileDropZone />}</>
			)}
		</>
	);
}
