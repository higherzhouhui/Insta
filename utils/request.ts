import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

import {addPending, removePending} from './pending';

import {showTip, IMessageType, getHeaderToken, clearToken} from '@/utils';

// 处理响应
const handleResponse = (data: GlobalRequest.Response<any>) => {
  const {CODE} = data;
  if (CODE === 401) {
    clearToken(getHeaderToken());
  }
};
// 处理错误
const handleError = (res: any) => {
  if (!res) {
    return;
  }
  showTip({
    type: IMessageType.ERROR,
    content: res?.statusText || 'Network error',
  });
};

// 创建请求实例
const instance = axios.create({
  baseURL: 'https://dapp.aimetaspacedao.co',
  timeout: 500000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const xToken = getHeaderToken(getHeaderToken('address'));
      if (xToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${xToken}`,
        };
      }
    }
    removePending(config);
    addPending(config);
    // 发送请求之前做些什么
    return config;
  },
  (err) => {
    // 对请求错误做些什么
    return Promise.reject(err);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const data: GlobalRequest.Response<any> = response.data;
    // 对响应数据做些什么
    removePending(response);
    handleResponse(data);
    return response;
  },
  (err) => {
    // 对响应错误做些什么
    handleError(err.response);
    return Promise.reject(err);
  }
);

function request<T>(config: AxiosRequestConfig) {
  return instance
    .request<GlobalRequest.Response<T>>(config)
    .then((res) => res.data);
}

export default request;
