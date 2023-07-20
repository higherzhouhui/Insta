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
  sign: string;
  address?: string;
}

export interface LoginNonceProps {
  wallet: string;
}

export interface GetUserWorks extends GlobalPaging.BasePagingParams {
  uuid: string;
}
