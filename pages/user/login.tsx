import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {WalletList} from '@/components';
import {userState} from '@/store/user';
import {LoginContainer, LoginContentContainer} from '@/styles/login';
import {SvgIcon} from '@/uikit';

const Login: NextPage = () => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  useEffect(() => {
    setUser({
      expiresAt: null,
      portrait: null,
      token: null,
      username: null,
      userId: null,
      accountAddress: null,
    });
  }, []);
  return (
    <LoginContainer>
      <div className='title'>
        <SvgIcon
          className='back'
          name='back'
          onClick={() => {
            router.back();
          }}
        />
        <span>Connect Wallet</span>
      </div>

      <h2>You need an Ethereum wallet to use Insta.</h2>
      <p>
        Connect with one of our available wallet providers or create a new one.
      </p>
      <LoginContentContainer>
        <WalletList />
      </LoginContentContainer>
    </LoginContainer>
  );
};

export default Login;
