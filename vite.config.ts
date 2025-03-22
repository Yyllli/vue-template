import { defineConfig, loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import type { UserConfig, ConfigEnv } from 'vite';
import { fileURLToPath } from 'url';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	// 获取当前工作目录
	const root = process.cwd();
	// 获取环境变量
	const env = loadEnv(mode, root);
	console.log(env);
	return {
		// 项目根目录
		root,
		// 项目部署的基础路径
		base: './',
		publicDir: 'public',
		assetsInclude: fileURLToPath(new URL('./src/assets', import.meta.url)), // 需要处理的静态资源位置
		plugins: [
			// Vue模板文件编译插件
			vue(),
			// jsx文件编译插件
			vueJsx(),
			// 开启mock服务器
			viteMockServe({
				// 如果接口为 /mock/xxx 以 mock 开头就会被拦截响应配置的内容
				mockPath: 'mock', // 数据模拟需要拦截的请求起始 URL
				enable: true // 本地环境是否开启 mock 功能
			}),
			// 自动导入组件
			AutoImport({
				imports: ['vue', 'vue-router'],
				resolvers: [
					ElementPlusResolver(),
					IconsResolver({
						prefix: 'Icon'
					})
				],
				dts: fileURLToPath(
					new URL('./types/auto-imports.d.ts', import.meta.url)
				)
			}),
			// 自动注册组件
			Components({
				resolvers: [
					ElementPlusResolver(),
					IconsResolver({
						enabledCollections: ['ep']
					})
				],
				dts: fileURLToPath(
					new URL('./types/components.d.ts', import.meta.url)
				)
			}),
			Icons({
				autoInstall: true
			})
		],
		// 运行后本地预览的服务器
		server: {
			// 是否开启https
			https: false,
			// 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
			host: true,
			// 开发环境预览服务器端口
			port: 9000,
			// 启动后是否自动打开浏览器
			open: false,
			// 是否开启CORS跨域
			cors: true,
			// 代理服务器
			// 帮助我们开发时解决跨域问题
			proxy: {
				// 这里的意思是 以/api开头发送的请求都会被转发到 http://xxx:9000
				[env.VITE_APP_API_BASEURL]: {
					target: 'http://localhost:9000',
					// 改变 Host Header
					changeOrigin: true
					// 发起请求时将 '/api' 替换为 ''
					//rewrite: (path) => path.replace(/^\/api/, ""),
				},
				[env.VITE_APP_MOCK_BASEURL]: {
					target: 'http://localhost:9000',
					// 改变 Host Header
					changeOrigin: true
					// 发起请求时将 '/api' 替换为 ''
					//rewrite: (path) => path.replace(/^\/api/, ""),
				}
			}
		},
		// 打包配置
		build: {
			// 关闭 sorcemap 报错不会映射到源码
			sourcemap: false,
			// 打包大小超出 400kb 提示警告
			chunkSizeWarningLimit: 400,
			assetsDir: 'assets',
			rollupOptions: {
				// 打包入口文件 根目录下的 index.html
				// 也就是项目从哪个文件开始打包
				input: {
					index: fileURLToPath(
						new URL('./index.html', import.meta.url)
					)
				},
				// 静态资源分类打包
				output: {
					format: 'esm',
					chunkFileNames: 'static/js/[name]-[hash].js',
					entryFileNames: 'static/js/[name]-[hash].js',
					assetFileNames: (assetInfo) => {
						if (!assetInfo.name)
							return 'static/[ext]/[name]-[hash][extname]';

						const info = assetInfo.name.split('.');
						let extType = info[info.length - 1];
						if (
							/\.(png|jpe?g|gif|svg|webp|ico)(\?.*)?$/.test(
								assetInfo.name
							)
						) {
							extType = 'imgs';
						} else if (
							/\.(woff2?|eot|ttf|otf)(\?.*)?$/.test(
								assetInfo.name
							)
						) {
							extType = 'fonts';
						}
						return `static/${extType}/[name]-[hash][extname]`;
					}
				}
			}
		},
		// 配置别名
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				'#': fileURLToPath(new URL('./types', import.meta.url))
			}
		},
		optimizeDeps: {
			include: [
				'vue',
				'vue-router',
				'element-plus',
				'@element-plus/icons-vue'
			]
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/styles/element/index.scss" as *;`
				}
			}
		}
	};
});
