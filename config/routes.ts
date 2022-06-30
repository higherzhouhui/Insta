export const RouterPath = {
  worksDetail: (uuid: string) => {
    return `/nft/${uuid}`;
  },
  profile: (uuid: string, type?: string) => {
    let url = `/user/profile/${uuid}`;
    if (type) {
      url = `/user/profile/${uuid}?type=${type}`;
    }
    return url;
  },
  project: (typeId: number, projectName: string) => {
    return `/project/${typeId}?projectName=${projectName}`;
  },
  Create: '/create',
  tag: (tagId: number, tagName: string) => {
    return `/tag/${tagId}?tagName=${tagName}`;
  },
  search: (search: string, type: any) => {
    return `/search?type=${type}&search=${search}`;
  },
  list: (type: 'recommend' | 'newCollection' | 'published') => {
    return `/nft/list?type=${type}`;
  },
  editWorks: (uuid: string) => {
    return `/nft/edit/${uuid}`;
  },
  account: '/user/account',
};
