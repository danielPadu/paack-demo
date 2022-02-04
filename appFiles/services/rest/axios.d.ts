import 'axios';
import {Method, AxiosRequestHeaders} from 'axios';
declare module 'axios' {
  export interface AxiosRequestConfig {
    handlerEnabled?: boolean;
    method?: Method;
    url: string;
    headers: AxiosRequestHeaders;
  }
}
