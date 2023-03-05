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
  },
  effects_UNSTABLE: [persistAtom],
});
