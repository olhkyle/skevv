import localFont from 'next/font/local';

export const satoshi = localFont({
	src: [
		{
			path: '../../public/static/fonts/satoshi/Satoshi-Light.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../../public/static/fonts/satoshi/Satoshi-LightItalic.woff2',
			weight: '300',
			style: 'italic',
		},
		{
			path: '../../public/static/fonts/satoshi/Satoshi-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/static/fonts/satoshi/Satoshi-Italic.woff2',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../public/static/fonts/satoshi/Satoshi-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/static/fonts/satoshi/Satoshi-MediumItalic.woff2',
			weight: '500',
			style: 'italic',
		},
		{
			path: '../../public/static/fonts/satoshi/Satoshi-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/static/fonts/satoshi/Satoshi-BoldItalic.woff2',
			weight: '700',
			style: 'italic',
		},
		{
			path: '../../public/static/fonts/satoshi/Satoshi-Black.woff2',
			weight: '900',
			style: 'normal',
		},
		{
			path: '../../public/static/fonts/satoshi/Satoshi-BlackItalic.woff2',
			weight: '900',
			style: 'italic',
		},
	],
	variable: '--font-satoshi',
	display: 'swap',
});
