import {GetTagsProps, getTagPageProps} from './tag.d';

import service from '@/utils/request';

// 获取tags
export const getTags = (params: GetTagsProps) => {
  return service({
    url: '/tag/list',
    method: 'GET',
    params,
  });
};

// 创建tag
export const createTag = (tagName: string) => {
  return service({
    url: '/tag/create',
    method: 'POST',
    data: {
      tagName,
    },
  });
};

// 获取指定标签集合
export const onSearchTags = (params: GetTagsProps) => {
  return service({
    url: '/base/tag-search',
    method: 'GET',
    params,
  });
};

// 标签页面
export const getTagContent = (params: getTagPageProps) => {
  return service({
    url: '/tag/works-tag-list',
    method: 'GET',
    params,
  });
};
