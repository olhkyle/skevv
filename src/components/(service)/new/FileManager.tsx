'use client';

import React from 'react';
import { AnimateSpinner, FileDropZone, FileEditor } from '@/components';
import { useDropzoneFiles } from '@/hooks';

export default function FileManager() {
	const { hasFiles } = useDropzoneFiles();

	return <>{hasFiles ? <FileEditor /> : <FileDropZone />}</>;
}
