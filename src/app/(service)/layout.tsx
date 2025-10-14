import { Aside, Main, Nav } from '@/components/layout';
import { ReactQueryProvider } from '@/providers';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex flex-1">
				<ReactQueryProvider>
					<Aside />
					<Main>
						<Nav />
						{children}
					</Main>
				</ReactQueryProvider>
			</div>
		</div>
	);
}
