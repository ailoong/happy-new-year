import { request } from '../axios';
import type { AxiosResponse } from '../axios';

/**
 * 获取会议数据
 * @name getMeetingData
 * @return {Array}
 */
export function getPosterData(params: any) {
  const url = '/query/newYear/report';
  return request
    .get(url, {
      params,
    })
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
