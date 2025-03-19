import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import './styles/reset.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import '@/assets/fonts/iconfont.css';
import { vXss } from './directives/xss';

const app = createApp(App);
app.use(router);
app.use(pinia);

// 注册全局 XSS 防护指令
app.directive('xss', vXss);

app.mount('#app');

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
