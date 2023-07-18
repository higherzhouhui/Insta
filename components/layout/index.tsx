import {ethers} from 'ethers';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {memo, useEffect} from 'react';
import {useRecoilState} from 'recoil';

import {CommonLayout} from './CommonLayout';
import {ListLayout} from './ListLayout';
import {LayoutContainer, LayoutMainContentContainer} from './styles';

import {Footer} from '@/components';
import {useSigner} from '@/ethers-react/useSigner';
import {onLogin} from '@/services/user';
import {userState} from '@/store/user';
import {IMessageType, progressInit, showTip} from '@/utils';
const Wallet = dynamic(import('@/components/wallet'), {ssr: false});
const Header = dynamic(import('./header'), {ssr: false});

export const Layout = memo(({children}) => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const {getSignMessage} = useSigner();
  const listRouterPathName = [
    '/nft/list',
    '/tag/[id]',
    '/project/[id]',
    '/user/login',
    '/',
    '/search',
    '/user/profile/[uuid]',
    '/tos',
    '/policy',
  ];

  const getAccount = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let currentAccount = '';
      try {
        const accounts = await provider.send('eth_requestAccounts', []);
        currentAccount = accounts[0];
        return currentAccount;
      } catch (error: any) {
        showTip({
          type: IMessageType.ERROR,
          content: error?.data?.message || error?.message,
        });
        return '';
      }
    } catch (error: any) {
      showTip({
        type: IMessageType.ERROR,
        content: error?.data?.message || error?.message,
      });
      return '';
    }
  };

  useEffect(() => {
    progressInit(router);
  }, []);
  const judgeIsLogin = async () => {
    const currentAccount = await getAccount();
    if (!currentAccount) {
      setUser({
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
      });
      return;
    }
    let sign = localStorage.getItem('sign');
    if (!sign) {
      const signature = await getSignMessage('Login');
      if (!signature.status) {
        showTip({type: IMessageType.ERROR, content: signature.sign || ''});
        return;
      }
      sign = signature.sign;
      localStorage.setItem('sign', sign);
      setUser({...user, sign: signature.sign});
    }
    onLogin({wallet: currentAccount, sign}).then((loginRes: any) => {
      if (loginRes.CODE === 0) {
        const {user, token} = loginRes.DATA;
        localStorage.setItem('Authorization', token);
        setUser({
          ...user,
          hash_rate: user.hash_rate,
          level: user.level,
          invite_code: user.invite_code,
        });
      } else {
        showTip({
          type: IMessageType.ERROR,
          content: '本系统为邀约制，请联系推荐人！',
        });
        console.log(loginRes.MESSAGE);
      }
    });
  };
  useEffect(() => {
    if (
      router.pathname === '/' ||
      router.pathname === '/deposits' ||
      router.pathname === '/info' ||
      router.pathname === '/swap'
    ) {
      judgeIsLogin();
    }
  }, [router.pathname]);
  return (
    <>
      <Head>
        <title>Finovate</title>
      </Head>
      <Header />
      <LayoutContainer>
        <LayoutMainContentContainer id='layout-main-content'>
          {listRouterPathName.includes(router.pathname) ? (
            <ListLayout>{children}</ListLayout>
          ) : (
            <CommonLayout>{children}</CommonLayout>
          )}
          <Footer />
        </LayoutMainContentContainer>
      </LayoutContainer>
      <Wallet />
    </>
  );
});

Layout.displayName = 'Layout';
