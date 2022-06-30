declare namespace GlobalComment {
  interface Comment {
    worksId: string;
    userId: string;
    userPortrait: string;
    userUsername: string;
    content: string;
  }

  interface WorkComments extends GlobalPaging.PagingParams {
    infoList: Comment[];
  }
}
