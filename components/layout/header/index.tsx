import {Dropdown, Menu} from 'antd';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC, useState, memo, useContext, useMemo} from 'react';
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
import {userState} from '@/store/user';
import {userDrawerState} from '@/store/userDrawer';
import {SvgIcon} from '@/uikit';
import {showTip, IMessageType} from '@/utils';

export const Header: FC = memo(() => {
  const [_userDrawer, setUserDrawer] = useRecoilState(userDrawerState);
  const {connectedAccount} = useContext(Web3ProviderContext);
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('lang') || 'en'
  );
  const shiftLanguage = (lang: string) => {
    localStorage.setItem('lang', lang);
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
  };
  const LanguagesMenu = useMemo(() => {
    return (
      <Menu
        items={[
          {
            key: 'en',
            label: (
              <div
                onClick={(e) => {
                  shiftLanguage('en');
                }}
              >
                Engilsh
              </div>
            ),
            disabled: currentLang === 'en',
          },
          {
            key: 'zh',
            label: (
              <div
                onClick={(e) => {
                  shiftLanguage('zh');
                }}
              >
                繁體中文
              </div>
            ),
            disabled: currentLang === 'zh',
          },
        ]}
      />
    );
  }, [currentLang]);

  return (
    <HeaderContainer>
      <HeaderLogoContainer>
        <Link passHref href='/'>
          <a>
            <SvgIcon height={60} name='logo' width={100} />
          </a>
        </Link>
      </HeaderLogoContainer>
      <HeaderOptionContainer>
        <Dropdown
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
            {currentLang === 'en' ? 'English' : '繁體中文'}
          </div>
        </Dropdown>
        <WalletContainer
          onClick={() => {
            setUserDrawer({
              open: !_userDrawer.open,
            });
          }}
        >
          {connectedAccount ? (
            <div className='account-address-box'>
              {`${connectedAccount.slice(0, 4)}...${connectedAccount.slice(
                37
              )}`}
            </div>
          ) : (
            <>
              <SvgIcon name='wallet-icon' />
              <span className='wallet'>Wallet</span>
            </>
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

  const {inviterId} = router.query;

  const onloginRequest = async (publicAddress: string) => {
    if (!publicAddress) {
      return;
    }
    const uuid = await getUserInfo(publicAddress);
    // 如果当前用户存在，直接登录
    if (uuid) {
      return;
    }
    if (!inviterId) {
      showTip({
        type: IMessageType.ERROR,
        content:
          'This website adopts an invitation system, please contact the recommender',
        showTime: 6000,
      });
      return;
    }
    setLoading(true);
    const msg = getHashId(`this is a insta system`);
    const signature = await getSignMessage(msg);
    setLoading(false);
    if (!signature.status) {
      showTip({type: IMessageType.ERROR, content: signature.sign || ''});
      return;
    }
    setLoading(true);
    axios({
      url: `${apiUrl}/api/public/v1/users/register`,
      method: 'post',
      data: {parent: inviterId, wallet: publicAddress},
    }).then((res: any) => {
      setLoading(false);
      if (res?.data?.meta?.status !== 200) {
        return;
      }
      const {createdAt, id, last_login, path, pid, updatedAt, uuid} =
        res.data.data;
      setUser({
        expiresAt: 15155,
        portrait: '',
        token: uuid,
        username: 'james',
        userId: id,
        accountAddress: publicAddress,
        createdAt,
        id,
        last_login,
        path,
        pid,
        updatedAt,
        uuid,
      });
      showTip({type: IMessageType.SUCCESS, content: 'Login successfully!'});
      setLoading(false);
    });
  };
  const getUserInfo = async (account: any) => {
    const res = await axios({
      url: `${apiUrl}/api/public/v1/users/info`,
      method: 'get',
      params: {wallet: account},
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
    showTip({type: IMessageType.SUCCESS, content: 'Login successfully!'});
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
        <div className='tip-box'>Coming Soon</div>
      </WalletItemContainer>
    </WalletListContainer>
  );
});
Wallet.displayName = 'Wallet';

export default Header;
