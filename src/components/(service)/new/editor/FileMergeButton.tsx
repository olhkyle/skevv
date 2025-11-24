'use client';

import { Button } from '@/components';
import { AnimateLoader } from '@/hooks/useLoading';
import { Download } from 'lucide-react';

interface MergeButtonProps {
	isLoading: boolean;
	Loading: AnimateLoader;
}

export default function FileMergeButton({ isLoading, Loading }: MergeButtonProps) {
	return (
		<Button type="submit" size="icon-md" className="col-span-1 w-full">
			{isLoading ? Loading : <Download size={18} />}
			Merge
		</Button>
	);
}
