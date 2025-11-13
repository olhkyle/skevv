'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	FileMergeButton,
	fileNameSchema,
	FileNameSchema,
	Button,
	DialogClose,
	DialogFooter,
	DrawerClose,
	DrawerFooter,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@/components';
import { useLoading, useMediaQuery } from '@/hooks';
import { screenSize } from '@/constant';
import { ASYNC_PDF_MESSAGE, FileList, mergeFiles } from '../pdf';

interface FileNameSetterFormProps {
	files: FileList;
	close: () => void;
}

export default function FileNameSetterForm({ files, close }: FileNameSetterFormProps) {
	const form = useForm<FileNameSchema>({
		resolver: zodResolver(fileNameSchema),
		defaultValues: {
			fileName: 'new',
		},
	});

	const { Loading, isLoading, startTransition } = useLoading();
	const isMobile = useMediaQuery(screenSize.MAX_SM);

	const onSubmit = async () => {
		if (files?.length === 0) return;

		try {
			const mergedFileName = form.getValues('fileName');
			const { success, message } = await startTransition(mergeFiles({ files, mergedFileName }));
			console.log(success, message);

			if (success) {
				toast.success(message);
				close();
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : ASYNC_PDF_MESSAGE.MERGE.ERROR.CANCEL_FILE_SAVE;
			toast.error(message);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="fileName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-medium text-sm">Merged File Name</FormLabel>
							<FormControl>
								<Input type="text" placeholder="Set your merged filename" {...field} />
							</FormControl>
							<FormMessage className="text-xs" />
						</FormItem>
					)}
				/>
				{isMobile ? (
					<DrawerFooter className="grid grid-cols-2 gap-3 mt-8 px-0">
						<DrawerClose asChild className="">
							<Button type="button" variant="outline" size="lg" className="col-span-1">
								Cancel
							</Button>
						</DrawerClose>
						<FileMergeButton isLoading={isLoading} Loading={Loading} />
					</DrawerFooter>
				) : (
					<DialogFooter className="grid grid-cols-2 gap-3 mt-8">
						<DialogClose asChild>
							<Button type="button" variant="outline" size="lg" className="col-span-1">
								Cancel
							</Button>
						</DialogClose>
						<FileMergeButton isLoading={isLoading} Loading={Loading} />
					</DialogFooter>
				)}
			</form>
		</Form>
	);
}
