export interface SearchParams extends GlobalPaging.BasePagingParams {
  title: any;
  userId?: string;
  uuid?: string;
}

export interface SearchAuthorRes extends GlobalPaging.PagingParams {
  infoList: GlobalUser.User;
}
