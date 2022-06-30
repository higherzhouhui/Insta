declare namespace GlobalTag {
  interface Tag {
    id: number;
    tagName: string;
  }
  interface Tags extends GlobalPaging {
    infoList: Tag[];
  }
}
