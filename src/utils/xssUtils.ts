import xss from 'xss';

// XSS 防护配置
const xssOptions = {
	whiteList: {
		// 允许的标签和属性
		a: ['href', 'title', 'target'],
		p: [],
		div: [],
		span: [],
		br: [],
		b: [],
		i: [],
		em: [],
		strong: []
	},
	stripIgnoreTag: true, // 去除不在白名单中的标签
	stripIgnoreTagBody: ['script', 'style', 'iframe', 'frame', 'object'], // 完全去除这些标签及其内容
	css: false // 禁止 CSS 攻击
};

// 过滤单个字符串
export const filterXSS = (input: string): string => {
	if (!input) return '';
	return xss(input, xssOptions);
};

// 递归过滤对象中的所有字符串
export const filterObject = (obj: any): any => {
	if (typeof obj !== 'object' || obj === null) {
		return typeof obj === 'string' ? filterXSS(obj) : obj;
	}

	if (Array.isArray(obj)) {
		return obj.map((item) => filterObject(item));
	}

	const filtered: Record<string, any> = {};
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			filtered[key] = filterObject(obj[key]);
		}
	}
	return filtered;
};

// HTML 转义函数
export const escapeHtml = (str: string): string => {
	if (!str) return '';
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#x27;')
		.replace(/\//g, '&#x2F;');
};

// URL 参数过滤
export const filterUrl = (url: string): string => {
	if (!url) return '';
	try {
		const parsedUrl = new URL(url);
		// 过滤 URL 参数
		const params = new URLSearchParams(parsedUrl.search);
		const filteredParams = new URLSearchParams();

		params.forEach((value, key) => {
			filteredParams.append(key, filterXSS(value));
		});

		parsedUrl.search = filteredParams.toString();
		return parsedUrl.toString();
	} catch {
		return filterXSS(url);
	}
};
