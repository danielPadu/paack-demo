import axios, {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';
//setting instance of axios with interceptors for all api calls
export const axiosInstance = axios.create({});
export type {AxiosResponse, AxiosError, AxiosRequestConfig};
const objectHas = (config: AxiosRequestConfig, prop: string) =>
  Object.prototype.hasOwnProperty.call(config, prop) === true;
const isHandlerEnabled = (config: AxiosRequestConfig) => {
  return !(objectHas(config, 'handlerEnabled') && !config.handlerEnabled!);
};

/** request interceptor */
const requestHandler = (requestConfig: AxiosRequestConfig) => {
  if (isHandlerEnabled(requestConfig)) {
    /**  Modify request here by changing headers or payload * /
           /*
              console.log(">>API Request -", requestConfig?.method, '-@-', requestConfig?.url, requestConfig?.data != undefined && requestConfig?.data);
           */
    return requestConfig;
  }
  return requestConfig;
};

axiosInstance.interceptors.request.use(request => requestHandler(request));
/** response interceptor */
axiosInstance.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error),
);
const successHandler = (response: AxiosResponse) => {
  if (isHandlerEnabled(response.config)) {
    /**  handle success response */
    return response;
  }
  return response;
};
const errorHandler = (error: AxiosError) => {
  if (isHandlerEnabled(error.config)) {
    /** handle errors response */
  }
  return Promise.reject(error);
};
