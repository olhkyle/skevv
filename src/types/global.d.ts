// src/types/global.d.ts
interface Window {
	showSaveFilePicker?: (options?: {
		suggestedName?: string;
		types?: Array<{
			description: string;
			accept: Record<string, string[]>;
		}>;
	}) => Promise<FileSystemFileHandle>;
}

interface FileSystemFileHandle {
	createWritable(): Promise<FileSystemWritableFileStream>;
}

interface FileSystemWritableFileStream extends WritableStream {
	write(data: Blob): Promise<void>;
	close(): Promise<void>;
}
