import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';
const {persistAtom} = recoilPersist();

interface IUserStore {
  expiresAt: number | null;
  portrait: string | null;
  token: string | null;
  username: string | null;
  userId: number | string | null;
  accountAddress: any;
  createdAt?: any;
  id?: any;
  last_login?: any;
  path?: any;
  pid?: any;
  updatedAt?: any;
  uuid?: any;
  sign?: any;
  hash_rate?: any;
  invite_code?: any;
  level?: any;
}

export const userState = atom<IUserStore>({
  key: 'userState',
  default: {
    expiresAt: null,
    portrait: null,
    token: null,
    username: null,
    userId: null,
    accountAddress: null,
    createdAt: null,
    id: null,
    last_login: null,
    path: null,
    pid: null,
    updatedAt: null,
    uuid: null,
    sign: null,
    hash_rate: null,
    invite_code: null,
    level: null,
  },
  effects_UNSTABLE: [persistAtom],
});
