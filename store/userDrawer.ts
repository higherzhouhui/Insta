import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';
const {persistAtom} = recoilPersist();

interface IUserDrawerStore {
  open: boolean;
}

export const userDrawerState = atom<IUserDrawerStore>({
  key: 'userDrawerState',
  default: {
    open: false,
  },
  effects_UNSTABLE: [persistAtom],
});
