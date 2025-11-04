'use client';

import { Button } from '@/components/ui';
import { Download, LucideProps } from 'lucide-react';

interface MergeButtonProps {
	isLoading: boolean;
	Loading: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
}

export default function FileMergeButton({ isLoading, Loading }: MergeButtonProps) {
	return (
		<Button type="submit" size="icon-lg" className="col-span-1 w-full">
			{isLoading ? <Loading className="animate-spin" /> : <Download size={18} />}
			Merge
		</Button>
	);
}
