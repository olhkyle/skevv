'use client';

import React from 'react';
import { DropzoneState } from 'react-dropzone';
import { Loader, Plus } from 'lucide-react';
import { useSensors, useSensor, DndContext, closestCenter, PointerSensor, DragEndEvent, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button, FileMergeConfirmContext, FilePreviewListPanel, Input, MotionBlock, ServiceNav, SortableFile } from '@/components';
import { useKeyboardTrigger } from '@/hooks';
import { type FileList } from '../pdf';

interface FileEditListProps {
	dropzone: DropzoneState;
	files: FileList;
	setFiles: React.Dispatch<React.SetStateAction<FileList>>;
}

function FileInsertSkeleton() {
	return <div className="min-h-[50px] rounded-lg bg-gray-100" />;
}

export default function FileEditableList({
	dropzone: { getRootProps, getInputProps, isDragActive, isDragAccept, open },
	files,
	setFiles,
}: FileEditListProps) {
	const fileInputId = React.useId();

	const [isConfirmContextOpen, setIsConfirmContextOpen] = React.useState(false);

	useKeyboardTrigger({
		handler: (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key.toLowerCase() === 'm') {
				e.preventDefault();
				setIsConfirmContextOpen(true);
			}
		},
	});

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(MouseSensor),
		useSensor(TouchSensor, {
			activationConstraint: {
				distance: 5, // 손가락 터치 오작동 방지
			},
		}),
	);

	const FIXED_HEIGHT_ON_MIN_MD =
		'md:h-[calc(100dvh-2*var(--global-layout-padding)-var(--service-nav-height)-var(--global-layout-padding))]';

	const handleReset = () => setFiles([]);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = files.findIndex(file => file.id === active.id);
			const newIndex = files.findIndex(file => file.id === over.id);
			setFiles(files => arrayMove(files, oldIndex, newIndex));
		}
	};

	return (
		<div className="flex flex-col gap-3 w-full">
			<ServiceNav resetFiles={handleReset} />

			<div className={`grid grid-rows-1 gap-3 md:grid-cols-6 md:max-w-full ${FIXED_HEIGHT_ON_MIN_MD}`}>
				<div className="relative col-span-full p-3 border-[1px] border-muted rounded-2xl md:col-span-2">
					<div className="flex flex-col gap-2 h-full">
						<div className="flex justify-between items-center">
							<h3 className="text-md font-bold">Uploaded PDFs</h3>
							<Button type="button" variant="outline" size="icon-sm" onClick={open} className="px-3 w-auto">
								<Plus />
								Add
							</Button>
						</div>

						{/* 썸네일 + 순서 변경 */}
						<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
							<SortableContext items={files.map(file => file.id)} strategy={verticalListSortingStrategy}>
								<div
									className="flex flex-col gap-2 pb-16 w-full h-full overflow-y-scroll scrollbar-thin md:flex-1 md:min-h-0"
									{...getRootProps()}>
									{files?.map(({ id, file }) => (
										<SortableFile key={id} id={id} file={file} deleteFile={() => setFiles(files.filter(file => file.id !== id))} />
									))}

									{isDragAccept && <FileInsertSkeleton />}

									<MotionBlock
										className={`hidden h-full bg-radial-[at_50%_75%] ${
											isDragActive ? 'from-gray-200 via-gray-400 to-blue-100' : 'from-gray-100 via-gray-200 to-gray-50'
										} to-90% rounded-2xl border-[1px] border-dotted border-gray-300 transition-colors sm:block`}>
										<Input type="file" id={`file-dropzone-${fileInputId}`} className="hidden" {...getInputProps()} />
										<label htmlFor={`file-dropzone-${fileInputId}`} className="ui-flex-center min-h-48 w-full h-full cursor-pointer ">
											{isDragActive ? (
												<Loader className="animate-spin" size={18} />
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
					<div className="absolute left-0 bottom-0 p-3 w-full bg-gray-100 rounded-b-xl border-t-[1px] border-muted">
						{files.length !== 0 && (
							<FileMergeConfirmContext files={files} isOpen={isConfirmContextOpen} setIsOpen={setIsConfirmContextOpen} />
						)}
					</div>
				</div>
				<FilePreviewListPanel files={files} />
			</div>
		</div>
	);
}
