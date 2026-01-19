import type { Metadata } from 'next';
import './globals.css';
import { Geist_Mono, Inter } from 'next/font/google';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { Toaster } from '@/components';
import { SiteConfig } from './config';
import { GAProvider } from '@/lib/ga4';

const inter = Inter({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
	preload: true,
});

const geistMono = Geist_Mono({
	variable: '--font-jetbrains-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		template: `%s`,
		default: SiteConfig.title.default,
	},
	description: SiteConfig.subtitle,
	openGraph: {
		title: SiteConfig.title.default,
		description: SiteConfig.subtitle,
		siteName: 'Skevv',
		locale: 'en_US',
		type: 'website',
		url: SiteConfig.url,
		images: [
			{
				url: `${SiteConfig.url}/og/skevv-og.png`,
				width: 1200,
				height: 630,
				type: 'image/png',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: SiteConfig.title.default,
		description: SiteConfig.subtitle,
		images: [`${SiteConfig.url}/og/skevv-og.png`],
	},
	icons: {
		icon: '/favicon/apple-touch-icon.png',
		shortcut: '/favicon/apple-touch-icon.png',
		apple: '/favicon/apple-touch-icon.png',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${inter.variable} ${geistMono.variable} antialiased`}>
			<head>
				<link rel="icon" href="/favicon/favicon.ico" sizes="any" />
				<link rel="shortcut icon" type="image/x-icon" href="/favicon/favicon.ico" />
				<link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
				<link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<link rel="manifest" href="/favicon/site.webmanifest" />
				<meta name="apple-mobile-web-app-title" content="Skevv" />
				<meta name="msapplication-TileColor" content="ffffff" />
				<meta name="theme-color" content="#ffffff" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
				<meta name="robots" content="index, follow" />
			</head>
			<body>
				{process.env.NEXT_PUBLIC_GA4_ID ? <GAProvider gaId={process.env.NEXT_PUBLIC_GA4_ID} /> : null}
				{children}
				<Toaster />
				<VercelAnalytics />
			</body>
		</html>
	);
}
