import { request } from '../axios';
import type { AxiosResponse } from '../axios';

/**
 * 获取会议数据
 * @name getMeetingData
 * @return {Array}
 */
export function getPosterData(params: any) {
  const url = '/zh/query/newYear/report';
  return request
    .get(url, {
      params,
    })
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
export function getUserData() {
  const url = '/zh/oauth2/userinfo';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
