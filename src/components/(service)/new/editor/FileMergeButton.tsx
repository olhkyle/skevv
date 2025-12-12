'use client';

import { FilePlus } from 'lucide-react';
import { Button } from '@/components';
import { AnimateLoader } from '@/hooks/useLoading';

interface MergeButtonProps {
	isLoading: boolean;
	Loading: AnimateLoader;
}

export default function FileMergeButton({ isLoading, Loading }: MergeButtonProps) {
	return (
		<Button type="submit" size="icon-lg" className="col-span-1 w-full">
			{isLoading ? Loading : <FilePlus size={18} />}
			Merge
		</Button>
	);
}
