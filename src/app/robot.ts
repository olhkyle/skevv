import { SiteConfig } from './config';

export default function robots() {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/private/', '/admin/'],
		},
		sitemap: `${SiteConfig.url}/sitemap.xml`,
	};
}
