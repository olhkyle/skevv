import { create } from 'zustand';

interface FileTargetStore {
	targetId: string;
	setTargetId: (id: string) => void;
}

const useFileTargetStore = create<FileTargetStore>(set => ({
	targetId: '',
	setTargetId: (id: string) => set({ targetId: id }),
}));

export default useFileTargetStore;
