declare namespace GlobalNft {
  interface Nft {
    typeId: number;
    name: string;
    logo: string;
    secondCreation: number;
    floorPrice: number;
    banner: string;
    description: string;
  }

  interface Works {
    tags: GlobalTag.Tags;
    worksDetail: WorksDetail;
  }

  interface CreateNft {
    title: string;
    item: string;
    description: string;
    isOriginal: boolean;
    price: number;
    royalty: number;
    blockchain: number; // (1,2)
    tag_ids?: string; // 标签字符串（格式：1,2,3,4)
    parentItem?: string;
  }

  interface WorksDetail extends CreateNft {
    id: string;
    userUuid: string;
    author: string;
    portrait: string;
    typeId: string;
    isLike: boolean;
    isOfficial?: boolean;
    totalLike: number;
  }

  interface UpdateNft extends CreateNft {
    worksId: string;
  }

  interface NftList extends GlobalPaging.PagingParams {
    infoList: Nft[];
  }

  interface PostComment {
    worksId: string;
    content: string;
  }

  interface WorksList extends GlobalPaging.PagingParams {
    infoList: WorksDetail[];
  }
}
