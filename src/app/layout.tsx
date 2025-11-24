import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components';

import { Inter } from 'next/font/google';

const inter = Inter({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
	preload: true,
});

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
		<html lang="en" className={`${inter.variable}`}>
			<body className="font-inter antialiased bg-white">
				{children}
				<Toaster />
			</body>
		</html>
	);
}
