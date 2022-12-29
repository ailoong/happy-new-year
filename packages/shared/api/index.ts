import { request } from '../axios';
import type { AxiosResponse } from '../axios';

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
export function getUserData() {
  const url = '/oauth2/userinfo';
  return request
    .get(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

export function getMonthcount(params: any) {
  const url = '/zh/query/newYear/monthcount';
  return request
    .get(url, {
      params,
    })
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
