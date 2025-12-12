import React from 'react';
import { ProcessedFileList } from '@/components';

interface FileAccordionState {
	id: string;
	isOpen: boolean;
}

export default function useFileAccordions({ files }: { files: ProcessedFileList }) {
	const [fileAccordions, setFileAccordions] = React.useState<FileAccordionState[]>(files.map(file => ({ id: file.id, isOpen: false })));

	React.useEffect(() => {
		setFileAccordions(prevFileAccordions =>
			files.map(file => {
				const exist = prevFileAccordions.find(prevFileAccordion => prevFileAccordion.id === file.id); // files를 순회하여  fileAccordions 배열 중 기존의 file id와 같은 녀석을 찾아 prevFileAccordion가 존재하는지 확인
				return exist ?? { id: file.id, isOpen: false }; // 존재하지 않으면 추가 | 존재하면 추가하지 않음
			}),
		);
	}, [files]);

	const isSomeAccordionOpen = fileAccordions.some(fileAccordion => fileAccordion.isOpen);
	const isAllAccordionsOpen = fileAccordions.every(fileAccordion => fileAccordion.isOpen);

	const toggleEachFilePage = (fileId: string) =>
		setFileAccordions(prevFileAccordions =>
			prevFileAccordions.map(fileAccordion => ({
				...fileAccordion,
				isOpen: fileId === fileAccordion.id ? !fileAccordion.isOpen : fileAccordion.isOpen,
			})),
		);

	const toggleAll = () =>
		setFileAccordions(fileAccordions => {
			return fileAccordions.map(fileAccordion => ({ ...fileAccordion, isOpen: !isSomeAccordionOpen }));
		});

	const closeAll = () => setFileAccordions(fileAccordions => fileAccordions.map(fileAccordion => ({ ...fileAccordion, isOpen: false })));

	return { fileAccordions, isSomeAccordionOpen, isAllAccordionsOpen, toggle: toggleEachFilePage, toggleAll, closeAll };
}
