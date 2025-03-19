import axios from 'axios';
import { filterObject, filterUrl } from './xssUtils';

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 30000
});

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		// 过滤请求参数
		if (config.params) {
			config.params = filterObject(config.params);
		}
		if (config.data) {
			config.data = filterObject(config.data);
		}
		if (config.url) {
			config.url = filterUrl(config.url);
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	(response) => {
		// 过滤响应数据
		if (response.data) {
			response.data = filterObject(response.data);
		}
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default service;
