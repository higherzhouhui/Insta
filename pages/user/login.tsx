import {useEffect} from 'react';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {WalletList} from '@/components';
import {userState} from '@/store/user';
import {LoginContainer, LoginContentContainer} from '@/styles/login';

const Login: NextPage = () => {
  const [user, setUser] = useRecoilState(userState);
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
      <h2>You need an Ethereum wallet to use PD-1.</h2>
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
