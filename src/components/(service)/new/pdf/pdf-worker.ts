import PDF_HQ from '@/constant/pdf';
import { PDFDocument } from 'pdf-lib';
import { FileWithPath } from 'react-dropzone';
import { pipe, chunk, toArray } from '@fxts/core';

interface PageItem {
	id: `${string}-page-${number}`;
	order: number;
}

interface RawFileItem {
	id: string;
	file: FileWithPath;
}

interface ProcessedFileItem extends RawFileItem {
	pageCount: number;
	pages: PageItem[];
}

type RawFileList = RawFileItem[];
type ProcessedFileList = ProcessedFileItem[];

// TODO: multi-language options
const ASYNC_PDF_MESSAGE = {
	LOAD: {
		ERROR: 'PDF 로드 중 오류가 발생하였습니다.',
	},
	VIRTUALIZE: {
		ERROR: '가상화 중 오류가 발생하였습니다.',
	},
	MERGE: {
		SUCCESS: {
			SAVE_FILE: '파일이 성공적으로 저장되었습니다.',
		},
		ERROR: {
			CANCEL_FILE_SAVE: '파일 저장이 취소되었습니다.',
			DURING_SAVE: '파일 저장 중 오류가 발생하였습니다.',
		},
	},
} as const;

const getTotalPageCount = (files: ProcessedFileList) => {
	if (files.length === 0) return 0;

	return files.reduce((sum, file) => sum + (file?.pageCount ?? 0), 0);
};

const getCountedPages = async (files: RawFileList): Promise<ProcessedFileList> => {
	const pageCounts: number[] = [];
	const batchFiles = pipe(files, chunk(3), toArray);

	try {
		for (const batchFile of batchFiles) {
			const counts = await Promise.all(
				batchFile.map(async file => {
					const arrayBuffer = await file.file.arrayBuffer();
					const batchedPdf = await PDFDocument.load(arrayBuffer);

					return batchedPdf.getPageCount();
				}),
			);

			pageCounts.push(...counts);
		}

		return files.map((file, idx) => ({
			...file,
			pageCount: pageCounts[idx],
			pages: Array.from({ length: pageCounts[idx] }, (_, idx) => ({ id: `${file.id}-page-${idx + 1}`, order: idx + 1 })),
		}));
	} catch (error) {
		console.error('Something happened wrong to get page count');
		if (error instanceof Error) {
			throw new Error(error.message, { cause: error });
		}

		throw error;
	}
};

const saveFileOnLocal = async ({ mergedFileName, newBlob }: { mergedFileName: string; newBlob: Blob }) => {
	if ('showSaveFilePicker' in window) {
		try {
			const fileHandle = await window.showSaveFilePicker?.({
				suggestedName: `${mergedFileName}.pdf`,
				types: [
					{
						description: 'PDF files',
						accept: { [PDF_HQ.KEY]: PDF_HQ.VALUE },
					},
				],
			});

			const writable = await fileHandle?.createWritable();
			await writable?.write(newBlob);
			await writable?.close();

			return { success: true, message: ASYNC_PDF_MESSAGE.MERGE.SUCCESS.SAVE_FILE };
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				throw new Error(ASYNC_PDF_MESSAGE.MERGE.ERROR.CANCEL_FILE_SAVE, { cause: error });
			}
			throw new Error(ASYNC_PDF_MESSAGE.MERGE.ERROR.DURING_SAVE, { cause: error });
		}
	} else {
		// fallback download
		const url = URL.createObjectURL(newBlob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${mergedFileName}.pdf`;
		a.click();
		URL.revokeObjectURL(url);

		return { success: true, message: ASYNC_PDF_MESSAGE.MERGE.SUCCESS.SAVE_FILE };
	}
};

// ⚡️ Double try - catch
// 1. inner : local specific error
// 2. outer : get inner catch throw [ new Error(message) ] -> unify error message on outer catch
const mergeFiles = async ({ files, mergedFileName }: { files: ProcessedFileList; mergedFileName: string }) => {
	try {
		const createdPdf = await PDFDocument.create();

		const batchFiles = pipe(files, chunk(3), toArray);

		for (const batchFile of batchFiles) {
			const loadedPdfs = await Promise.all(
				batchFile.map(async file => {
					const arrayBuffer = await file.file.arrayBuffer();
					const batchedPdf = await PDFDocument.load(arrayBuffer);

					return { file, pdf: batchedPdf };
				}),
			);

			for (const { file, pdf } of loadedPdfs) {
				// order : just show order of each page
				// id : fileName-page-realPageNumber
				// copyPages function need pageIndices which show the actual number of page
				const pageIndices = [...file.pages]
					.sort((prev, curr) => prev.order - curr.order)
					.map(page => {
						const originalIndex = +page.id.split('-page-')[1] - 1;
						return originalIndex;
					}); // PDF-lib use 0-based index

				const virtualPages = await createdPdf.copyPages(pdf, pageIndices);
				virtualPages.forEach(page => createdPdf.addPage(page));
			}
		}

		const mergedBytes = await createdPdf.save();
		// as BlotPart doesn't make problem, because UIntArray can be used as BlobPart
		const newBlob = new Blob([mergedBytes as BlobPart], { type: PDF_HQ.KEY });

		return await saveFileOnLocal({ mergedFileName, newBlob });
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		} else {
			throw new Error(ASYNC_PDF_MESSAGE.MERGE.ERROR.DURING_SAVE);
		}
	}
};

const getVirtualPages = async ({ file, createdPdf }: { file: ProcessedFileItem; createdPdf: PDFDocument }) => {
	try {
		const arrayBuffer = await file.file.arrayBuffer();
		const pdf = await PDFDocument.load(arrayBuffer);

		const virtualPages = await createdPdf.copyPages(pdf, pdf.getPageIndices());
		virtualPages.forEach(page => createdPdf.addPage(page));
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		} else {
			throw new Error(ASYNC_PDF_MESSAGE.VIRTUALIZE.ERROR);
		}
	}
};

const getVirtualFiles = async (file: ProcessedFileItem) => {
	try {
		const createdPdf = await PDFDocument.create();

		await getVirtualPages({ file, createdPdf });
		const mergedBytes = await createdPdf.save();
		const newBlobFiles = new Blob([mergedBytes as BlobPart], { type: PDF_HQ.KEY });

		return newBlobFiles;
	} catch (e) {
		console.error(e);
	}
};

export type { PageItem, RawFileItem, ProcessedFileItem, RawFileList, ProcessedFileList };
export { ASYNC_PDF_MESSAGE, getTotalPageCount, getCountedPages, mergeFiles, getVirtualFiles };
