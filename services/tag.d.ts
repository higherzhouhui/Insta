export interface GetTagsProps extends GlobalPaging.BasePagingParams {
  title?: string;
}

export interface getTagPageProps extends GlobalPaging.BasePagingParams {
  // 1=最近上市 2=最多人看 3=最多人喜欢
  sort?: number;
  tagId: number;
  isOfficial: boolean;
}
