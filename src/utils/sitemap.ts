import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

interface SitemapUrl {
	loc: string;
	lastmod?: string;
	changefreq?: string;
	priority?: number;
}

const baseUrl = 'https://your-domain.com';

// 定义路由配置
const routes = [
	{
		path: '/',
		priority: 1.0
	},
	{
		path: '/home',
		priority: 0.8
	},
	{
		path: '/knowledgeBase',
		priority: 0.8
	},
	{
		path: '/tools/video',
		priority: 0.6
	},
	{
		path: '/tools/image',
		priority: 0.6
	}
];

export const generateSitemap = (): void => {
	const urls: SitemapUrl[] = [];

	// 生成 URL
	routes.forEach((route) => {
		urls.push({
			loc: `${baseUrl}${route.path}`,
			changefreq: 'weekly',
			priority: route.priority,
			lastmod: new Date().toISOString()
		});
	});

	// 生成 sitemap XML
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

	// 获取当前文件的目录
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	// 写入文件
	writeFileSync(resolve(__dirname, '../../public/sitemap.xml'), sitemap);
};

// 生成 sitemap
generateSitemap();
