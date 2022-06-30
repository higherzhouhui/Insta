export interface TypeListProps extends GlobalPaging.BasePagingParams {
  sort?: number;
  typeId?: number;
}

export type GetNewCollectionProps = {
  page: number;
  pageSize: number;
};

export interface getDetailProps {
  worksID: string;
}

export type getProjectParam = {
  typeID: string;
};
