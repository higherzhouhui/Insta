export type userInfoParams = {
  uuid: any;
};

export type UpdateUserProps = {
  command: string;
  username?: string;
  portrait?: string;
  twitterInfo?: string;
};

export interface LoginProps extends LoginNonceProps {
  signature: string;
}

export interface LoginNonceProps {
  publicAddress: string;
}

export interface GetUserWorks extends GlobalPaging.BasePagingParams {
  uuid: string;
}
