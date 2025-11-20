import React from 'react';
import { ProcessedFileList } from '@/components';

interface FilePageState {
	id: string;
	isOpen: boolean;
}

export default function useFilePages({ files }: { files: ProcessedFileList }) {
	const [filePages, setFilePages] = React.useState<FilePageState[]>(files.map(file => ({ id: file.id, isOpen: false })));

	React.useEffect(() => {
		setFilePages(prevFilePages =>
			files.map(file => {
				const exist = prevFilePages.find(prevFilePage => prevFilePage.id === file.id); // files를 순회하여  filePages 배열 중 기존의 file id와 같은 녀석을 찾아 prevFilePage가 존재하는지 확인
				return exist ?? { id: file.id, isOpen: false }; // 존재하지 않으면 추가 | 존재하면 추가하지 않음
			}),
		);
	}, [files]);

	const isSomePageOpen = filePages.some(filePage => filePage.isOpen);

	const isAllPagesOpen = filePages.every(filePage => filePage.isOpen);

	const toggleEachFilePage = (fileId: string) =>
		setFilePages(filePages =>
			filePages.map(filePageOpen => ({
				...filePageOpen,
				isOpen: fileId === filePageOpen.id ? !filePageOpen.isOpen : filePageOpen.isOpen,
			})),
		);

	const toggleAll = () =>
		setFilePages(filePages => {
			return filePages.map(filePage => ({ ...filePage, isOpen: !isAllPagesOpen }));
		});

	const closeAll = () => setFilePages(filePages => filePages.map(filePage => ({ ...filePage, isOpen: false })));

	return { filePages, isSomePageOpen, isAllPagesOpen, toggle: toggleEachFilePage, toggleAll, closeAll };
}
