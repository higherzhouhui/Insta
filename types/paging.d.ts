declare namespace GlobalPaging {
  interface PagingParams extends BasePagingParams {
    totalCount: number;
  }
  interface BasePagingParams {
    page: number;
    pageSize: number;
  }
}
