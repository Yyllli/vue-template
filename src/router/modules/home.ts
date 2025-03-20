import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const route: RouteRecordRaw = {
	path: '/',
	name: 'layout',
	component: Layout,
	meta: {
		title: '首页',
		description:
			'智能创作助手是一款强大的AI驱动内容创作工具，提供文案改写、内容创作、分镜绘制等功能。',
		keywords: 'AI创作,文案改写,内容创作,分镜绘制'
	},
	children: [
		{
			path: '',
			name: 'HomePage',
			component: () => import('@/views/home/index.vue'),
			meta: {
				title: '首页',
				description:
					'智能创作助手是一款强大的AI驱动内容创作工具，提供文案改写、内容创作、分镜绘制等功能。',
				keywords: 'AI创作,文案改写,内容创作,分镜绘制'
			}
		}
	]
};

export default route;
