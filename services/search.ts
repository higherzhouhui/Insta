import {SearchParams, SearchAuthorRes} from './search.d';

import service from '@/utils/request';

// 搜索图片
export const getSearchImage = (params: SearchParams) => {
  return service<GlobalNft.WorksList>({
    url: '/base/image-search',
    method: 'GET',
    params,
  });
};
// 搜索作者
export const getSearchAuthor = (params: SearchParams) => {
  return service<SearchAuthorRes>({
    url: '/base/author-search',
    method: 'GET',
    params,
  });
};
// 搜索NFT
export const getSearchNft = (params: SearchParams) => {
  return service<GlobalNft.Nft>({
    url: '/base/nft-search',
    method: 'GET',
    params,
  });
};
