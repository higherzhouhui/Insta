import axios from 'axios';
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
import {apiUrl} from '@/config';
import {useMetaMask} from '@/ethers-react';
import {userState} from '@/store/user';
import {IMessageType, progressInit, showTip} from '@/utils';
const Wallet = dynamic(import('@/components/wallet'), {ssr: false});
const Header = dynamic(import('./header'), {ssr: false});

export const Layout = memo(({children}) => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const {setAccount, connectedAccount} = useMetaMask();
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
      });
    }
    axios({
      url: `${apiUrl}/api/public/v1/users/info`,
      method: 'get',
      params: {wallet: currentAccount},
    })
      .then((res: any) => {
        if (res?.data?.meta?.status !== 200) {
          setUser({
            expiresAt: null,
            portrait: null,
            token: null,
            username: null,
            userId: null,
            accountAddress: currentAccount,
            createdAt: null,
            id: null,
            last_login: null,
            path: null,
            pid: null,
            updatedAt: null,
            uuid: null,
          });
          setAccount(currentAccount);
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
        setAccount(currentAccount);
      })
      .catch((error) => {
        console.log(error);
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
