import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ElMessage } from "element-plus";
import { getMessageInfo } from "./status";

interface BaseResponse<T = any> {
  code: number | string;
  status?: number | string;
  message: string;
  data: T;
}

const server = axios.create({
    baseURL: import.meta.env.VITE_APP_USE_MOck
    ? import.meta.env.VITE_APP_MOCK_PREFIX
    : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 5000,
});

// axios实例拦截
server.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// axios响应拦截
server.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status == 200) {
      return response.data;
    }

    ElMessage({
      message: getMessageInfo(response.status),
      type: "error",
    });
    return response.data;
  },
  (error: any) => {
    const { response } = error;
    if (response) {
      ElMessage({
        message: getMessageInfo(response.status),
        type: "error",
      });
      return Promise.reject(response.data);
    }

    ElMessage({
      message: "网络连接异常，请稍候重试！",
      type: "error",
    });
  }
);

// 二次拦截
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config;
  return new Promise((resolve, reject) => {
    server
      .request<any, AxiosResponse<BaseResponse>>(conf)
      .then((res: AxiosResponse<BaseResponse>) => {
        const data = res.data;
        if (data.code != 0) {
          ElMessage.error(data.message);
          reject(data.message);
        } else {
          ElMessage.success(data.message);
          resolve(data.data as T);
        }
      });
  });
};

export function get<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  params?: U
): Promise<T> {
  return requestInstance({
    ...config,
    url,
    method: "GET",
    params,
  });
}

export function post<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  data?: U
): Promise<T> {
  return requestInstance({
    ...config,
    url,
    method: "POST",
    data,
  });
}

export function put<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  params?: U
): Promise<T> {
  return requestInstance({
    ...config,
    url,
    method: "PUT",
    params,
  });
}

export function del<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  data?: U
): Promise<T> {
  return requestInstance({
    ...config,
    url,
    method: "DELETE",
    data,
  });
}

export default server;
