import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {memo, useContext, useEffect} from 'react';
import {useRecoilState} from 'recoil';

import {CommonLayout} from './CommonLayout';
import {ListLayout} from './ListLayout';
import {LayoutContainer, LayoutMainContentContainer} from './styles';

import {Footer} from '@/components';
import {apiUrl} from '@/config';
import {useMetaMask, Web3ProviderContext} from '@/ethers-react';
import {userState} from '@/store/user';
import {getAccount, progressInit} from '@/utils';
const Wallet = dynamic(import('@/components/wallet'), {ssr: false});
const Header = dynamic(import('./header'), {ssr: false});

export const Layout = memo(({children}) => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const {setAccount} = useMetaMask();
  const {connectedAccount} = useContext(Web3ProviderContext);
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
  useEffect(() => {
    progressInit(router);
  }, []);
  const judgeIsLogin = async () => {
    if (connectedAccount) {
      return;
    }
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
      });
      return;
    }
    setAccount(currentAccount);
    axios({
      url: `${apiUrl}/api/public/v1/users/info`,
      method: 'get',
      params: {wallet: currentAccount},
    }).then((res: any) => {
      if (res?.data?.meta?.status !== 200) {
        setUser({...user, accountAddress: currentAccount});
        return;
      }
      const {createdAt, id, last_login, path, pid, updatedAt, uuid} =
        res.data.data;
      setUser({
        expiresAt: 154154125154,
        portrait: '',
        token: uuid,
        username: 'james',
        userId: id,
        accountAddress: currentAccount,
        createdAt,
        id,
        last_login,
        path,
        pid,
        updatedAt,
        uuid,
      });
    });
  };
  useEffect(() => {
    judgeIsLogin();
  }, [router.pathname]);
  return (
    <>
      <Head>
        <title>Insta</title>
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
