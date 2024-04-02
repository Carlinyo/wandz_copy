import type { AxiosResponse } from 'axios';

export const sleep = (milliSec: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliSec);
  });

export const resToBody = (res: AxiosResponse) => res.data;
