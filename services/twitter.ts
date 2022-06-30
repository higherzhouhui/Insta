import {TwitterAuthUrlInter, TwitterUserInfoResponseInter} from './twitter.d';

import service from '@/utils/request';

// 获取twitter授权地址
export const getTwitterAuthUrl = (redirectUrl: string) => {
  return service<TwitterAuthUrlInter>({
    url: '/user/twitter-authurl',
    method: 'GET',
    params: {
      redirectUrl,
    },
  });
};

// 获取twitter用户信息
export const getTwitterUserInfo = (
  twitterCode: string,
  redirectUrl: string
) => {
  return service<TwitterUserInfoResponseInter>({
    url: '/user/twitter-info',
    method: 'GET',
    params: {
      twitterCode,
      redirectUrl,
    },
  });
};
