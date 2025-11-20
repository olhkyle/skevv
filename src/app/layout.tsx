import type { Metadata } from 'next';
import './globals.css';
import '@/styles/font.css';
import { Toaster } from '@/components';

export const metadata: Metadata = {
	title: 'SKEVV',
	description: 'A lightweight pdf editor',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased bg-white">
				{children}
				<Toaster />
			</body>
		</html>
	);
}
