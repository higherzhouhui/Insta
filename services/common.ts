import {
  FootLinkRes,
  GetCommentsProps,
  HomeNftsProps,
  HomeNftsRes,
  PostFavoriteProps,
} from './common.d';

import service from '@/utils/request';
export const getFooterLinks = (params: GlobalPaging.BasePagingParams) => {
  return service<FootLinkRes>({
    url: '/base/link-list',
    method: 'GET',
    params,
  });
};

// 获取首页数据
export const getHomeNfts = (params: HomeNftsProps) => {
  return service<HomeNftsRes>({
    url: '/base/home-page',
    method: 'GET',
    params,
  });
};

// 获取评论
export const getComments = (params: GetCommentsProps) => {
  return service<GlobalComment.WorkComments>({
    url: '/base/works-comments',
    method: 'GET',
    params,
  });
};

export const postComment = (data: GlobalNft.PostComment) => {
  return service({
    url: '/works/publish-comment',
    method: 'POST',
    data,
  });
};

export const postFavorite = (data: PostFavoriteProps) => {
  return service({
    url: '/user/change-favorite',
    method: 'POST',
    data,
  });
};

// 获取平台提成
export const getPlatFormCommison = () => {
  return service<{royalty: number}>({
    url: '/init/royalty-config',
    method: 'GET',
  });
};

// 通知邮箱
export const updateEmail = (params: GlobalClaim.UpdateEmail) => {
  return service({
    url: '/user/claim-works-email',
    method: 'POST',
    params,
  });
};

// 认领作品
export const claimWorks = (data: GlobalClaim.Claim) => {
  return service({
    url: '/user/claim-works',
    method: 'POST',
    data,
  });
};

export const register = (data: GlobalUser.Register) => {
  return service({
    url: `/public/v1/users/register`,
    method: 'POST',
    data,
  });
};
