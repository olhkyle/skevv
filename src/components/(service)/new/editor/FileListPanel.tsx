'use client';

import React from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import { DropzoneState } from 'react-dropzone';
import { closestCenter, DndContext, DragEndEvent, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { type ProcessedFileItem, Button, MotionBlock, SortableFile, FileMergeConfirmContext, Input, AnimateSpinner } from '@/components';
import { useFilePages, useKeyboardTrigger, useMediaQuery } from '@/hooks';
import { screenSize } from '@/constant';

interface FileListPanelProps {
	dropzone: DropzoneState;
	files: ProcessedFileItem[];
	setFiles: React.Dispatch<React.SetStateAction<ProcessedFileItem[]>>;
}

function FileInsertSkeleton() {
	return <div className="min-h-[50px] rounded-lg bg-gray-100" />;
}

export default function FileListPanel({
	dropzone: { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, open },
	files,
	setFiles,
}: FileListPanelProps) {
	const fileInputId = React.useId();
	const [isConfirmContextOpen, setIsConfirmContextOpen] = React.useState(false);
	const isNotMobile = useMediaQuery(screenSize.MIN_SM);

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

	const handleDragEnd = (event: DragEndEvent) => {
		closeAll();

		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = files.findIndex(file => file.id === active.id);
		const newIndex = files.findIndex(file => file.id === over.id);
		setFiles(files => arrayMove([...files], oldIndex, newIndex));
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
					<Button type="button" variant="outline" size={isNotMobile ? 'icon-sm' : 'icon-lg'} onClick={open} className="lg:px-3 lg:w-auto">
						<Plus size={21} />
						<span className="hidden lg:inline">Add</span>
					</Button>
				</div>

				<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
					<SortableContext items={files.map(({ id }) => id)} strategy={verticalListSortingStrategy}>
						<div
							className="flex flex-col gap-1 pb-16 w-full h-full overflow-y-scroll scrollbar-thin md:flex-1 md:min-h-0 shrink-0"
							{...getRootProps()}>
							{files?.map(file => (
								<SortableFile
									key={file.id}
									filePage={filePages.find(filePage => filePage.id === file.id)!}
									file={file}
									setFiles={setFiles}
									toggleFilePages={toggle}
									deleteFile={() => setFiles(files.filter(prevFile => prevFile.id !== file.id))}
								/>
							))}

							{isDragAccept && <FileInsertSkeleton />}

							<MotionBlock
								className={`hidden h-full ${
									isDragActive ? 'bg-gradient-gray-200' : 'bg-gradient-gray-100'
								} rounded-2xl border border-dashed border-gray-300 transition-colors sm:block`}>
								<Input type="file" id={`file-dropzone-${fileInputId}`} className="hidden" {...getInputProps()} />
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
							</MotionBlock>
						</div>
					</SortableContext>
				</DndContext>
			</div>
			<div className="absolute left-0 bottom-0 p-3 w-full bg-light rounded-b-xl border-t border-muted">
				{files.length !== 0 && <FileMergeConfirmContext files={files} isOpen={isConfirmContextOpen} setIsOpen={setIsConfirmContextOpen} />}
			</div>
		</div>
	);
}
