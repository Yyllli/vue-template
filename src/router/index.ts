import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
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

const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
    // 懒加载
    eager: true
}); 
const routes: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach(key => {
    const module = modules[key].default;
    routes.push(module);
})
routes.push(noFoundRoutes);

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    next();
})

router.afterEach(async (to, from, next) => {
    NProgress.done();
})

export default router;
