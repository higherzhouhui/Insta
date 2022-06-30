import {TypeListProps, getDetailProps, getProjectParam} from './nft.d';

import service from '@/utils/request';

export const getRecommend = (params: GlobalPaging.BasePagingParams) => {
  return service<GlobalNft.WorksList>({
    url: '/base/works-recommend-list',
    method: 'GET',
    params,
  });
};

// 获取官方作品
export const getTypeList = (params: TypeListProps) => {
  return service<GlobalNft.NftList>({
    url: '/base/works-type-list',
    method: 'GET',
    params,
  });
};
// 获取用户作品列表
export const getUserPicList = (params: TypeListProps) => {
  return service<GlobalNft.WorksList>({
    url: '/base/works-type-pic',
    method: 'GET',
    params,
  });
};
// 获取NewCollection
export const getNewCollection = (params: GlobalPaging.BasePagingParams) => {
  return service<GlobalNft.WorksList>({
    url: '/base/works-new-list',
    method: 'GET',
    params,
  });
};
// 获取更多nft
export const getMoreNfts = (params: GlobalPaging.BasePagingParams) => {
  return service<GlobalNft.NftList>({
    url: '/base/works-type-more-list',
    method: 'GET',
    params,
  });
};

// 获取详情信息
export const getDetail = (params: getDetailProps) => {
  return service<GlobalNft.Works>({
    url: '/base/works-detail',
    method: 'GET',
    params,
  });
};

// 创建nft
export const createNft = (data: GlobalNft.CreateNft) => {
  return service({
    url: '/user/submit-works',
    method: 'POST',
    data,
  });
};

export const updateNft = (data: GlobalNft.UpdateNft) => {
  return service({
    url: '/user/update-works',
    method: 'POST',
    data,
  });
};

// 获取作品类型详情
export const getProjectInfo = (params: getProjectParam) => {
  return service({
    url: '/base/works-type-detail',
    method: 'GET',
    params,
  });
};
