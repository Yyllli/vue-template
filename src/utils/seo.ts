import { nextTick } from 'vue';

interface MetaOptions {
	title?: string;
	description?: string;
	keywords?: string;
	author?: string;
	image?: string;
	url?: string;
}

export const defaultMeta: MetaOptions = {
	title: '智能创作助手 - AI驱动的内容创作平台',
	description:
		'智能创作助手是一款强大的AI驱动内容创作工具，提供文案改写、内容创作、分镜绘制等功能，助您高效生成精准内容。',
	keywords: 'AI创作,文案改写,内容创作,分镜绘制,人工智能,智能助手',
	author: 'Your Company Name',
	image: '/logo.png',
	url: 'https://your-domain.com'
};

export const updateMeta = async (options: MetaOptions = {}): Promise<void> => {
	await nextTick();

	const meta = { ...defaultMeta, ...options };

	// 更新标题
	document.title = meta.title ?? defaultMeta.title ?? '';

	// 更新 meta 标签
	const metaTags = {
		description: meta.description,
		keywords: meta.keywords,
		author: meta.author,
		'og:title': meta.title,
		'og:description': meta.description,
		'og:image': meta.image,
		'og:url': meta.url,
		'twitter:card': 'summary_large_image',
		'twitter:title': meta.title,
		'twitter:description': meta.description,
		'twitter:image': meta.image
	};

	Object.entries(metaTags).forEach(([name, content]) => {
		if (!content) return;

		let tag =
			document.querySelector(`meta[name="${name}"]`) ||
			document.querySelector(`meta[property="${name}"]`);

		if (!tag) {
			tag = document.createElement('meta');
			tag.setAttribute(
				name.startsWith('og:') ? 'property' : 'name',
				name
			);
			document.head.appendChild(tag);
		}

		tag.setAttribute('content', content);
	});
};

// 生成结构化数据
export const generateStructuredData = (type: string, data: any): void => {
	const script = document.createElement('script');
	script.type = 'application/ld+json';
	script.textContent = JSON.stringify(data);
	document.head.appendChild(script);
};

// 示例：生成文章的结构化数据
export const generateArticleStructuredData = (article: any): void => {
	const data = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: article.title,
		description: article.description,
		image: article.image,
		datePublished: article.publishDate,
		dateModified: article.updateDate,
		author: {
			'@type': 'Organization',
			name: article.author || defaultMeta.author
		}
	};

	generateStructuredData('Article', data);
};
