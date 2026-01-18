import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export function GET(request: Request) {
	const url = new URL(request.url);
	const title = url.searchParams.get('title') || 'Skevv';

	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				background: `
            radial-gradient(
              circle at 20% 80%,
              #2471fe 0%,
              #5f7fff 45%,
              #cff1ff 100%
            )
          `,
			}}>
			<h1
				style={{
					fontSize: 72,
					fontWeight: 900,
					color: '#fff',
					letterSpacing: '-0.03em',
					textAlign: 'center',
				}}>
				{title}
			</h1>

			<p
				style={{
					marginTop: 16,
					fontSize: 28,
					fontWeight: 500,
					color: '#fff',
				}}>
				Lightweight PDF Editor
			</p>
		</div>,
		{
			width: 1200,
			height: 630,
		},
	);
}
