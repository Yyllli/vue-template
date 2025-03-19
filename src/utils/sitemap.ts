import { writeFileSync } from 'fs';
import { resolve } from 'path';
import router from '@/router';

interface SitemapUrl {
	loc: string;
	lastmod?: string;
	changefreq?: string;
	priority?: number;
}

const baseUrl = 'https://your-domain.com';

export const generateSitemap = (): void => {
	const urls: SitemapUrl[] = [];

	// Generate URLs from route configuration
	router.getRoutes().forEach((route) => {
		if (!route.path.includes(':') && !route.path.includes('*')) {
			urls.push({
				loc: `${baseUrl}${route.path}`,
				changefreq: 'weekly',
				priority: route.path === '/' ? 1.0 : 0.8,
				lastmod: new Date().toISOString()
			});
		}
	});

	// Generate sitemap XML
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
	)
	.join('')}
</urlset>`;

	// Write to file
	writeFileSync(resolve(__dirname, '../../public/sitemap.xml'), sitemap);
};

// Generate in development environment
if (process.env.NODE_ENV === 'development') {
	generateSitemap();
}
