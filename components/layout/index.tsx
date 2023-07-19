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
import {useEthersUtils, useMetaMask} from '@/ethers-react';
import {useSigner} from '@/ethers-react/useSigner';
import {getMyInfo, onLogin} from '@/services/user';
import {userState} from '@/store/user';
import {IMessageType, progressInit, showTip} from '@/utils';
const Wallet = dynamic(import('@/components/wallet'), {ssr: false});
const Header = dynamic(import('./header'), {ssr: false});

export const Layout = memo(({children}) => {
  const router = useRouter();
  const [originUser, setUser] = useRecoilState(userState);
  const {getSignMessage} = useSigner();
  const {disconnectWallect, setAccount} = useMetaMask();
  const {getNormalPrice, getNetwork} = useEthersUtils();

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
  const shiftNetWork = async () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await getNetwork(provider);
      }
    });
  };

  useEffect(() => {
    progressInit(router);
  }, []);
  const judgeIsLogin = async () => {
    await shiftNetWork();
    const currentAccount = await getAccount();
    if (!currentAccount) {
      localStorage.clear();
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
    setAccount(currentAccount);
    setUser({...originUser, accountAddress: currentAccount});

    const myInfo: any = await getMyInfo();
    if (myInfo.CODE === 0) {
      const {DATA} = myInfo;
      setUser({
        ...originUser,
        hash_rate: DATA.hash_rate,
        level: DATA.level,
        invite_code: DATA.invite_code,
      });
    } else {
      let sign = localStorage.getItem('sign');
      if (!sign) {
        const signature = await getSignMessage('Login');
        if (!signature.status) {
          showTip({type: IMessageType.ERROR, content: signature.sign || ''});
          return;
        }
        sign = signature.sign;
        localStorage.setItem('sign', sign);
      }
      onLogin({wallet: currentAccount, sign}).then((loginRes: any) => {
        if (loginRes.CODE === 0) {
          const {user, token} = loginRes.DATA;
          localStorage.setItem('Authorization', token);
          setAccount(currentAccount);
          setUser({
            ...originUser,
            hash_rate: user.hash_rate,
            level: user.level,
            invite_code: user.invite_code,
          });
        }
      });
    }
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
        <title>METASPACE</title>
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
