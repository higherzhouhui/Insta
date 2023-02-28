export interface HomeNftsProps {
  collectionsSize: number;
  recommendSize: number;
  newestSize: number;
}

export interface HomeNftsRes {
  homeTop: GlobalNft.WorksDetail;
  collections: GlobalNft.NftList;
  newest: GlobalNft.WorksList;
  recommend: GlobalNft.WorksList;
  recommendDesc: string;
  recommendTitle: string;
}

export interface GetCommentsProps extends GlobalPaging.BasePagingParams {
  worksId: string;
}

export interface PostCommentProps {
  worksId: string;
  content: string;
}

export interface PostFavoriteProps {
  worksId: string;
  action: number;
}

export interface FootLinkRes {
  infoList: FootLinkBase[];
  totalCount: number;
}

export interface FootLinkBase {
  url: string;
  icon: string;
  title: string;
}
