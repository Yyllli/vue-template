import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 配置路由
export const noFoundRoutes: RouteRecordRaw = {
	path: '/404',
	name: '404',
	component: () => import('@/views/404/index.vue'),
	meta: {},
	children: []
};

const UserAggrement: RouteRecordRaw[] = [
	{
		path: '/userAggrement',
		name: 'UserAggrement',
		component: () => import('@/views/userAgreement/user.vue'),
		meta: {
			title: '用户协议',
			isShow: true
		}
	},
	{
		path: '/privacyAggrement',
		name: 'PrivacyAggrement',
		component: () => import('@/views/userAgreement/privacy.vue'),
		meta: {
			title: '隐私协议',
			isShow: true
		}
	}
];

const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
	// 懒加载
	eager: true
});
let routes: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
	const module = modules[key].default;
	routes.push(module);
});
routes.push(noFoundRoutes);
routes = [...routes, ...UserAggrement];

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach(async (to, from, next) => {
	NProgress.start();
	next();
});

router.afterEach(async (to, from, next) => {
	NProgress.done();
});

export default router;
