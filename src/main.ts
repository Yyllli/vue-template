import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import './styles/reset.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import '@/assets/fonts/iconfont.css';

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
