import axios from 'axios';
import {ethers} from 'ethers';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC, useState, memo, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';

import {
  HeaderContainer,
  HeaderLogoContainer,
  HeaderOptionContainer,
  WalletListContainer,
  WalletItemContainer,
  WalletContainer,
} from './styles';

import {Loading} from '@/components';
import {apiUrl} from '@/config';
import {useMetaMask, useEthersUtils, Web3ProviderContext} from '@/ethers-react';
import {useSigner} from '@/ethers-react/useSigner';
import i18n from '@/locales/config';
import {onLogin, registerAccount} from '@/services/user';
import {userState} from '@/store/user';
import {userDrawerState} from '@/store/userDrawer';
import {showTip, IMessageType, setHeaderToken} from '@/utils';

export const Header: FC = memo(() => {
  const [_userDrawer, setUserDrawer] = useRecoilState(userDrawerState);
  const {connectedAccount} = useContext(Web3ProviderContext);
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('lang') || 'zh'
  );
  const getAccount = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let currentAccount = '';
      try {
        const accounts = await provider.send('eth_requestAccounts', []);
        currentAccount = accounts[0];
      } catch {
        currentAccount = '';
      }
      return currentAccount;
    } catch {
      showTip({content: '请使用DApp浏览器打开！'});
      return '';
    }
  };

  const handleConnect = () => {
    // setUserDrawer({
    //   open: !_userDrawer.open,
    // });
    getAccount();
  };
  const shiftLanguage = (lang: string) => {
    localStorage.setItem('lang', lang);
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
  };
  const [user, setUser] = useRecoilState(userState);
  // const LanguagesMenu = useMemo(() => {
  //   return (
  //     <Menu
  //       items={[
  //         {
  //           key: 'en',
  //           label: (
  //             <div
  //               onClick={(e) => {
  //                 shiftLanguage('en');
  //               }}
  //             >
  //               Engilsh
  //             </div>
  //           ),
  //           disabled: currentLang === 'en',
  //         },
  //         {
  //           key: 'zh',
  //           label: (
  //             <div
  //               onClick={(e) => {
  //                 shiftLanguage('zh');
  //               }}
  //             >
  //               繁體
  //             </div>
  //           ),
  //           disabled: currentLang === 'zh',
  //         },
  //       ]}
  //     />
  //   );
  // }, [currentLang]);

  return (
    <HeaderContainer>
      <HeaderLogoContainer>
        <Link passHref href='/'>
          <a className='logo'>
            <Image layout='fill' src='/static/image/logo.png' />
          </a>
        </Link>
      </HeaderLogoContainer>
      <HeaderOptionContainer>
        {/* <Dropdown
          overlay={LanguagesMenu}
          placement='bottom'
          trigger={['hover']}
        >
          <div
            className='dropDown'
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {currentLang === 'en' ? 'English' : '繁體'}
          </div>
        </Dropdown> */}
        <WalletContainer
          onClick={() => {
            handleConnect();
          }}
        >
          {connectedAccount && user.accountAddress ? (
            <div className='account-address-box'>
              {`${connectedAccount.slice(0, 4)}...${connectedAccount.slice(
                37
              )}`}
            </div>
          ) : (
            <div className='wallet'>Connect Wallet</div>
          )}
        </WalletContainer>
      </HeaderOptionContainer>
    </HeaderContainer>
  );
});
Header.displayName = 'Header';

export enum searchType {
  IMAGE = 'Image',
  AUTHOR = 'Author',
  NFT = 'NFT',
}

const Wallet = memo(() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useRecoilState(userState);
  const {getHashId} = useEthersUtils();
  const {connectWallect} = useMetaMask();
  const {connectedAccount} = useContext(Web3ProviderContext);
  const router = useRouter();
  const {getSignMessage} = useSigner();
  const {t} = useTranslation();
  const {inviterId} = router.query;

  const onloginRequest = async (publicAddress: string) => {
    if (!publicAddress) {
      return;
    }
    if (!inviterId) {
      showTip({
        type: IMessageType.ERROR,
        content: '本系统为邀约制，请联系推荐人',
        showTime: 6000,
      });
      return;
    }
    setLoading(true);
    // const msg = getHashId(`REGISTER`);
    const signature = await getSignMessage('REGISTER');
    if (!signature.status) {
      showTip({type: IMessageType.ERROR, content: signature.sign || ''});
      setLoading(false);
      return;
    }
    setLoading(true);
    const sign = signature.sign;
    localStorage.setItem('sign', sign);
    registerAccount({
      invite_code: inviterId as any,
      wallet: publicAddress,
      sign: signature.sign,
    }).then((res: any) => {
      setLoading(false);
      if (res?.CODE === 0) {
        onLogin({
          wallet: publicAddress as any,
          sign,
        }).then((loginRes: any) => {
          if (loginRes?.CODE === 0) {
            const {token, user} = loginRes.DATA;
            // localStorage.setItem('Authorization', token);
            setHeaderToken(publicAddress as any, token);
            setUser({
              ...user,
              sign: signature.sign,
              hash_rate: user.hash_rate,
              level: user.level,
              invite_code: user.invite_code,
            });
            showTip({
              type: IMessageType.SUCCESS,
              content: '註冊成功！',
            });
          } else {
            showTip({
              type: IMessageType.ERROR,
              content: res?.data?.MESSAGE,
            });
          }
        });
      } else {
        showTip({type: IMessageType.ERROR, content: res?.data?.MESSAGE});
        setLoading(false);
      }
    });
  };
  const getUserInfo = async (account: any) => {
    const res = await axios({
      url: `${apiUrl}/api/user/login`,
      method: 'POST',
      data: {wallet: account},
    });
    if (res?.data?.meta?.status !== 200) {
      showTip({
        type: IMessageType.ERROR,
        content: res?.data?.meta?.msg,
      });
      return '';
    }
    const {createdAt, id, last_login, path, pid, updatedAt, uuid} =
      res.data.data;
    setUser({
      expiresAt: 15155,
      portrait: '',
      token: uuid,
      username: 'james',
      userId: id,
      accountAddress: account,
      createdAt,
      id,
      last_login,
      path,
      pid,
      updatedAt,
      uuid,
    });
    showTip({type: IMessageType.SUCCESS, content: t('login.success')});
    return uuid;
  };
  // MetaMask链接
  const handleMetaMaskClick = () => {
    setLoading(true);
    if (!connectedAccount) {
      connectWallect((account: string | null) => {
        if (account) {
          onloginRequest(account);
        } else {
          setLoading(false);
        }
      });
    }
    onloginRequest(connectedAccount || '');
  };
  return (
    <WalletListContainer>
      <WalletItemContainer onClick={handleMetaMaskClick}>
        <div className='name-box'>
          <Image
            alt='Wallet'
            height={24}
            src='/static/icon/metamask-icon.png'
            width={24}
          />
          <span>MetaMask</span>
        </div>
        {loading ? (
          <div className='loading-box'>
            <Loading size='mini' />
          </div>
        ) : null}
      </WalletItemContainer>
      <WalletItemContainer>
        <div className='name-box'>
          <Image
            alt='Wallet'
            height={24}
            src='/static/icon/wallet-connect-icon.png'
            width={24}
          />
          <span>Wallet Connect</span>
        </div>
        <div className='tip-box'>{t('come.soon')}</div>
      </WalletItemContainer>
    </WalletListContainer>
  );
});
Wallet.displayName = 'Wallet';

export default Header;
