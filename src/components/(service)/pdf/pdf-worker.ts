import { PDFDocument } from 'pdf-lib';
import { FileWithPath } from 'react-dropzone';

type FileItem = {
	id: string;
	file: FileWithPath;
	imageSrc: string | null;
	pageCount?: number;
};

type FileList = FileItem[];

const getTotalPageCount = (files: FileList) => {
	if (files.length === 1) {
		return files[0].pageCount;
	}

	return files.reduce((sum, file) => sum + (file?.pageCount ?? 0), 1);
};

const getCountedPages = async (files: FileList) => {
	let counts: number[] = [];

	try {
		for (const item of files) {
			const arrayBuffer = await item.file.arrayBuffer();
			const pdf = await PDFDocument.load(arrayBuffer);
			const pageCount = pdf.getPageCount();
			counts = [...counts, pageCount];
		}

		return files.map((file, idx) => ({ ...file, pageCount: counts[idx] }));
	} catch (error) {
		console.error('Something happened wrong to get page count');
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
};

// ⚡️ Double try - catch
// 1. inner : local specific error
// 2. outer : get inner catch throw [ new Error(message) ] -> unify error message on outer catch
const mergeFiles = async ({ files, mergedFileName }: { files: FileList; mergedFileName: string }) => {
	try {
		const mergedPdf = await PDFDocument.create();

		for (const item of files) {
			const arrayBuffer = await item.file.arrayBuffer();
			const pdf = await PDFDocument.load(arrayBuffer);
			const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
			copiedPages.forEach(page => mergedPdf.addPage(page));
		}

		const mergedBytes = await mergedPdf.save();
		// as BlotPart doesn't make problem, because UIntArray can be used as BlobPart
		const blob = new Blob([mergedBytes as BlobPart], { type: 'application/pdf' });

		// 파일 저장 대화상자 열기
		if ('showSaveFilePicker' in window) {
			console.log('here');
			try {
				const fileHandle = await window.showSaveFilePicker!({
					suggestedName: `${mergedFileName}.pdf`,
					types: [
						{
							description: 'PDF files',
							accept: { 'application/pdf': ['.pdf'] },
						},
					],
				});

				const writable = await fileHandle.createWritable();
				await writable.write(blob);
				await writable.close();
				return { success: true, message: '파일이 성공적으로 저장되었습니다.' };
			} catch (error) {
				if (error instanceof DOMException && error.name === 'AbortError') {
					throw new Error('파일 저장이 취소되었습니다.');
				}

				throw error;
			}
		} else {
			// fallback download
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${mergedFileName}.pdf`;
			a.click();
			URL.revokeObjectURL(url);

			return { success: true, message: '파일이 다운로드되었습니다.' };
		}
	} catch (error) {
		console.log('Saving File Process is canceled', error instanceof Error ? error.message : 'unknown error');

		return { success: false, message: error instanceof Error ? error.message : '파일 저장 중 오류가 발생했습니다.' };
	}
};

export type { FileItem, FileList };
export { getTotalPageCount, getCountedPages, mergeFiles };
