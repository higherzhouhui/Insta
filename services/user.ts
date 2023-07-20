import {
  userInfoParams,
  UpdateUserProps,
  LoginProps,
  LoginNonceProps,
  GetUserWorks,
} from './user.d';

import {setHeaderToken} from '@/utils';
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
    url: '/api/user/login',
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
    url: '/api/user/userinfo',
    method: 'GET',
    params,
  });
};

// 查询自己的信息
export const getMyInfo = (address: string) => {
  setHeaderToken('address', address);
  return service<GlobalUser.User>({
    url: '/api/user/info',
    method: 'GET',
  });
};

// 注册
export const registerAccount = (data: {
  invite_code: string;
  wallet: string;
  sign: string;
}) => {
  return service<any>({
    url: '/api/user/register',
    method: 'POST',
    data,
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
// MINT
export const mintNft = (data: {level: number; address?: string}) => {
  setHeaderToken('address', data.address || '');
  return service({
    url: '/api/nft/mint',
    method: 'POST',
    data,
  });
};

// 算力
export const getPower = (address: string) => {
  setHeaderToken('address', address);
  return service({
    url: '/api/user/hash_rate',
    method: 'GET',
  });
};

// 我的团队
export const getInviters = (address: string) => {
  setHeaderToken('address', address);
  return service({
    url: '/api/user/invite_user',
    method: 'GET',
  });
};
