'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileMergeButton, fileNameSchema, FileNameSchema } from '.';
import {
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
} from '@/components/ui';
import { useLoading, useMediaQuery } from '@/hooks';
import screenSize from '@/constant/screenSize';
import { FileList, mergeFiles } from '../pdf';

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
		if (files?.length === 0) {
			return;
		}

		try {
			const mergedFileName = form.getValues('fileName');
			const { success, message } = await startTransition(mergeFiles({ files, mergedFileName }));

			if (success) {
				toast.success(message);
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : typeof error === 'string' ? error : '파일 저장 중 오류가 발생했습니다.';
			toast.error(message);
		} finally {
			close();
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
					<DrawerFooter className="flex-row justify-between gap-2 mt-8 px-0">
						<DrawerClose asChild className="">
							<Button type="button" variant="secondary" size="lg" className="sm:w-auto">
								Cancel
							</Button>
						</DrawerClose>
						<FileMergeButton isLoading={isLoading} Loading={Loading} />
					</DrawerFooter>
				) : (
					<DialogFooter className="gap-2 mt-8 sm:flex-row sm:justify-between">
						<DialogClose asChild className="w-1/2">
							<Button type="button" variant="secondary" size="lg" className="sm:w-auto">
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
