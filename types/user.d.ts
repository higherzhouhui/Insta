declare namespace GlobalUser {
  interface User {
    id?: number | string;
    uuid?: string;
    username?: string;
    portrait?: string;
    bio?: string;
    publicAddress?: string;
    works_uri?: string[];
    email?: string;
    created?: number;
    favorite?: number;
    twitterInfo?: GlobalTwitter.User;
  }
  interface Register {
    parent: number | string;
    wallet: string;
  }
}
