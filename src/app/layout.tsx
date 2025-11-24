import type { Metadata } from 'next';
import './globals.css';
import { satoshi } from '@/styles/font';
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
		<html lang="en" className={`${satoshi.variable}`}>
			<body className="font-satoshi antialiased bg-white">
				{children}
				<Toaster />
			</body>
		</html>
	);
}
