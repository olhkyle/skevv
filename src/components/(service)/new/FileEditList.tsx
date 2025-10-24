'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui';
import { Download, RotateCcw, X } from 'lucide-react';
import { toast } from 'sonner';
import { FileItem, mergeFiles } from '../pdf';
import { useLoading } from '@/hooks';
import { ServiceNav } from '@/components/layout';

interface FileEditListProps {
	files: FileItem[];
	setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
}

const PdfPreview = dynamic(() => import('../pdf/PdfPreview'), { ssr: false });

export default function FileEditList({ files, setFiles }: FileEditListProps) {
	const { Loading, isLoading, startTransition } = useLoading();
	const handleReset = () => setFiles([]);

	const handleMergeFiles = async () => {
		if (files?.length === 0) {
			return;
		}

		try {
			const { success, message } = await startTransition(mergeFiles(files));
			if (success) {
				toast.success(message);
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : typeof error === 'string' ? error : '파일 저장 중 오류가 발생했습니다.';
			toast.error(message);
		}
	};

	return (
		<div className="flex flex-col gap-3 w-full">
			<ServiceNav />
			<div className="grid grid-rows-1 gap-3 md:grid-cols-6 md:max-w-full md:h-[calc(100dvh-2*var(--global-layout-padding)-var(--service-nav-height)-var(--global-layout-padding))]">
				<div className="relative col-span-full p-3 border-[1px] border-muted rounded-2xl md:col-span-2">
					<div className="flex flex-col gap-2 h-full">
						<div className="flex justify-between items-center">
							<h3 className="text-md font-bold">Uploaded PDFs</h3>
							<Button type="button" size="icon-sm" onClick={handleReset}>
								<RotateCcw />
							</Button>
						</div>
						<ul className="flex flex-col gap-2 pb-16 w-full h-full overflow-y-scroll scrollbar-thin md:flex-1 md:min-h-0">
							{files?.map(({ id, file }) => (
								<li
									key={id}
									className="flex justify-between items-center gap-2 px-3 py-2 w-full bg-gray-50 rounded-lg border-[1px] border-muted">
									<span className="inline-block overflow-hidden text-ellipsis">{file.name}</span>
									<Button type="button" size="icon-sm" variant="ghost" onClick={() => setFiles(files.filter(file => file.id !== id))}>
										<X />
									</Button>
								</li>
							))}
						</ul>
					</div>
					<div className="absolute left-0 bottom-0 p-3 w-full bg-gray-100 rounded-b-xl border-t-[1px] border-muted">
						{files.length !== 0 && (
							<Button type="button" size="icon-lg" onClick={handleMergeFiles} className="w-full">
								{isLoading ? <Loading className="animate-spin" /> : <Download size={18} />}
								Merge All Files
							</Button>
						)}
					</div>
				</div>
				<div className="hidden flex-col gap-2 col-span-full p-3 border-[1px] border-muted rounded-2xl sm:flex md:col-span-4">
					<div className="flex items-center min-h-[32px]">
						<h3 className="text-md font-bold">Preview</h3>
					</div>
					<div className="flex flex-col gap-2 overflow-y-scroll scrollbar-thin md:flex-1 md:min-h-0">
						{files?.map(({ id, file, pageCount }, idx) => (
							<PdfPreview
								key={id}
								file={file}
								pageCount={pageCount}
								startPageNumber={files.slice(0, idx).reduce((sum, f) => sum + (f.pageCount ?? 0), 1)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
