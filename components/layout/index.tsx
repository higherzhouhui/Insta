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
import {getMyInfo, onLogin} from '@/services/user';
import {userState} from '@/store/user';
import {
  IMessageType,
  progressInit,
  showTip,
  Event,
  EventTypes,
  setHeaderToken,
} from '@/utils';
const Wallet = dynamic(import('@/components/wallet'), {ssr: false});
const Header = dynamic(import('./header'), {ssr: false});

export const Layout = memo(({children}) => {
  const router = useRouter();
  const [originUser, setUser] = useRecoilState(userState);
  const {connectedAccount, setAccount} = useMetaMask();
  const {getNetwork} = useEthersUtils();

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
    judgeIsLogin();
  }, []);
  const judgeIsLogin = async () => {
    const currentAccount = await getAccount();
    setAccount(currentAccount);
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
    }
  };

  const getInfo = async (currentAccount: string) => {
    const myInfo: any = await getMyInfo(currentAccount);
    if (myInfo.CODE === 0) {
      const {DATA} = myInfo;
      setUser({
        ...originUser,
        accountAddress: currentAccount,
        hash_rate: DATA.hash_rate,
        level: DATA.level,
        invite_code: DATA.invite_code,
      });
    } else {
      onLogin({wallet: currentAccount, sign: 'Login'}).then((loginRes: any) => {
        if (loginRes.CODE === 0) {
          const {user, token} = loginRes.DATA;
          setHeaderToken(currentAccount, token);
          setUser({
            ...originUser,
            accountAddress: currentAccount,
            hash_rate: user.hash_rate,
            level: user.level,
            invite_code: user.invite_code,
          });
          showTip({content: '登录成功'});
        } else {
          Event.emit(EventTypes.notRegister);
        }
      });
    }
  };

  useEffect(() => {
    if (connectedAccount) {
      getInfo(connectedAccount);
    }
  }, [connectedAccount]);

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
