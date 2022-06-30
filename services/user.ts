import {
  userInfoParams,
  UpdateUserProps,
  LoginProps,
  LoginNonceProps,
  GetUserWorks,
} from './user.d';

import service from '@/utils/request';

// 获取登录随机数
export const getLoginNonce = (data: LoginNonceProps) => {
  return service({
    url: '/base/nonce',
    method: 'POST',
    data,
  });
};

// 登录
export const onLogin = (data: LoginProps) => {
  return service({
    url: '/base/login',
    method: 'POST',
    data,
  });
};

// 退出登录
export const onLogout = () => {
  return service({
    url: '/jwt/jsonInBlacklist',
    method: 'POST',
  });
};

// 个人资料编辑
export const updateUserInfo = (data: UpdateUserProps) => {
  return service<GlobalUser.User>({
    url: '/user/update-userinfo',
    method: 'POST',
    data,
  });
};

// 个人创建作品列表
export const getUserCreated = (params: GetUserWorks) => {
  return service({
    url: '/user/created',
    method: 'GET',
    params,
  });
};

// 个人喜欢作品列表
export const getUserFavorite = (params: GetUserWorks) => {
  return service({
    url: '/user/favorite',
    method: 'GET',
    params,
  });
};

// 查询任意用户信息
export const getUserInfo = (params: userInfoParams) => {
  return service<GlobalUser.User>({
    url: '/base/userinfo',
    method: 'GET',
    params,
  });
};

// 查询自己的信息
export const getMyInfo = () => {
  return service<GlobalUser.User>({
    url: '/user/userinfo',
    method: 'GET',
  });
};

// 谷歌验证
export const getRecapRes = (resp: string) => {
  return service({
    url: '/upload/google-captcha',
    method: 'POST',
    data: {
      resp,
    },
  });
};
