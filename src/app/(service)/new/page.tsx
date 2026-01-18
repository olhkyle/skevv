import { SiteConfig } from '@/app/config';
import { FileManager } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: SiteConfig.title.NEW,
	description: SiteConfig.description.default,
	openGraph: {
		title: SiteConfig.title.NEW,
		description: SiteConfig.description.default,
		images: [
			{
				url: `${SiteConfig.url}/og/skevv-og.png`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function NewFilesMergePage() {
	return (
		<section className="flex-1 p-3">
			<FileManager />
		</section>
	);
}
