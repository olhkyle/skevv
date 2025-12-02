'use client';

import React from 'react';
import { BetweenHorizonalEnd, ChevronRight, EllipsisVertical, FileText, Plus } from 'lucide-react';
import { closestCenter, DndContext, DragEndEvent, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button, MotionBlock, SortableFile, FileMergeConfirmContext, Input, AnimateSpinner, FileInsertSkeleton } from '@/components';
import { useDropzoneFiles, useFilePages, useKeyboardTrigger } from '@/hooks';

export default function FileListPanel() {
	const {
		dropzone: { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, open },
		files,
		setFiles,
	} = useDropzoneFiles();

	const fileInputId = React.useId();
	const [isConfirmContextOpen, setIsConfirmContextOpen] = React.useState(false);
	const [currentDragFilesCount, setCurrentDragFilesCount] = React.useState(0);

	const { filePages, isSomePageOpen, toggle, toggleAll, closeAll } = useFilePages({ files });
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(MouseSensor),
		useSensor(TouchSensor, {
			activationConstraint: {
				distance: 5, // prevent mal-function of finger touch
			},
		}),
	);

	useKeyboardTrigger({
		handler: (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key.toLowerCase() === 'm') {
				e.preventDefault();
				setIsConfirmContextOpen(true);
			}
		},
	});

	const rootProps = {
		...getRootProps(),
		onDragEnter: (e: React.DragEvent<HTMLDivElement>) => {
			getRootProps().onDragEnter?.(e);

			if (e.dataTransfer?.items) {
				setCurrentDragFilesCount(e.dataTransfer.items.length);
			}
		},
		onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
			getRootProps().onDragOver?.(e);

			if (e.dataTransfer?.items) {
				setCurrentDragFilesCount(e.dataTransfer.items.length);
			}
		},
		onDragLeave: (e: React.DragEvent<HTMLDivElement>) => {
			getRootProps().onDragLeave?.(e);
			setCurrentDragFilesCount(0);
		},
	};

	const handleDragEnd = (event: DragEndEvent) => {
		closeAll();

		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = files.findIndex(file => file.id === active.id);
		const newIndex = files.findIndex(file => file.id === over.id);
		setFiles(arrayMove([...files], oldIndex, newIndex));
	};

	return (
		<div className="relative col-span-full p-3 bg-white border border-muted rounded-2xl md:col-span-2">
			<div className="flex flex-col gap-2 h-full max-h-screen">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="flex items-center gap-2 text-md font-bold cursor-pointer" onClick={toggleAll}>
							<span>Uploaded PDFs</span>
							<ChevronRight size={18} className={`${isSomePageOpen ? 'rotate-90' : 'rotate-0'}`} />
						</h3>
					</div>
					<div className="ui-flex-center gap-2">
						<Button type="button" variant="ghost" size={'icon-md'} onClick={open}>
							<BetweenHorizonalEnd />
						</Button>
						<Button type="button" variant="ghost" size={'icon-md'}>
							<EllipsisVertical />
						</Button>
					</div>
				</div>

				<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
					<SortableContext items={files.map(({ id }) => id)} strategy={verticalListSortingStrategy}>
						<div
							className="flex flex-col flex-1 shrink-0 items-center gap-1 pb-16 w-full h-full overflow-y-scroll scrollbar-thin md:min-h-0 "
							{...rootProps}>
							{files?.map(file => (
								<SortableFile
									key={file.id}
									filePage={filePages.find(filePage => filePage.id === file.id)!}
									file={file}
									toggleFilePages={toggle}
									deleteFile={() => setFiles(files.filter(prevFile => prevFile.id !== file.id))}
								/>
							))}

							{isDragActive && isDragAccept && <FileInsertSkeleton filesLength={currentDragFilesCount} />}

							<MotionBlock
								className={`relative mx-auto w-[calc(100%-8px)] h-full ${
									isDragActive ? 'bg-gradient-gray-200' : 'bg-gradient-gray-100'
								} rounded-2xl outline outline-dashed outline-offset-2 outline-gray-300 transition-colors sm:block `}>
								<Input
									type="file"
									id={`file-dropzone-${fileInputId}`}
									data-input-id={`file-dropzone-inner`}
									className="hidden"
									{...getInputProps()}
								/>
								<label htmlFor={`file-dropzone-${fileInputId}`} className="ui-flex-center min-h-48 w-full h-full cursor-pointer ">
									{isDragActive && isDragAccept ? (
										<AnimateSpinner />
									) : isDragActive && isDragReject ? (
										<p className="text-gray-900 font-medium">Only PDF Files accepted</p>
									) : (
										<p className="ui-flex-center items-center gap-2">
											<Plus className="text-gray-900" size={18} />
											<span className="text-gray-900 font-medium">Insert more files</span>
										</p>
									)}
								</label>
								<div className="absolute bottom-4 left-[50%] -translate-x-[50%] ui-flex-center gap-2 px-2 py-1 text-white text-xs font-medium rounded-full bg-black sm:px-3 sm:py-1.5">
									<FileText size={16} />
									<span>PDF only</span>
								</div>
							</MotionBlock>
						</div>
					</SortableContext>
				</DndContext>
			</div>
			<div className="absolute left-0 bottom-0 p-3 w-full bg-light rounded-b-xl border-t border-muted">
				{files.length !== 0 && <FileMergeConfirmContext files={files} isOpen={isConfirmContextOpen} toggle={setIsConfirmContextOpen} />}
			</div>
		</div>
	);
}
