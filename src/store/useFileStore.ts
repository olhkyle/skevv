import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProcessedFileItem } from '@/components';

type SetProcessedFiles = (files: ProcessedFileItem[]) => void;

// interface PersistedFile {
// 	id: string;
// 	name: string;
// 	size: number;
// 	pageCount: number;
// }

interface FileStore {
	files: ProcessedFileItem[];
	setFiles: (files: ProcessedFileItem[]) => void;
	resetFiles: () => void;
}

const useFileStore = create(
	persist<FileStore>(
		set => ({
			files: [],
			setFiles: files => set({ files }),
			resetFiles: () => set({ files: [] }),
		}),
		{
			name: 'files-storage',

			onRehydrateStorage: () => state => {
				console.log('Hydrating ﹡ Reset files');
				state?.resetFiles();
			},
		},
	),
);

export type { SetProcessedFiles };
export { useFileStore };
