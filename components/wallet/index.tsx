import dynamic from 'next/dynamic';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {FC, useState, memo, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';

import {
  WalletContainer,
  WalletHeadContainer,
  WalletTipContainer,
  WalletListContainer,
  WalletItemContainer,
  WalletBallanceContainer,
  DownListContainer,
} from './styles';

import {Loading, AddFundModal, DropDown} from '@/components';
import {useMetaMask, useEthersUtils, Web3ProviderContext} from '@/ethers-react';
import {useSigner} from '@/ethers-react/useSigner';
import {onLogin, registerAccount} from '@/services/user';
import {userState} from '@/store/user';
import {userDrawerState} from '@/store/userDrawer';
import {SvgIcon} from '@/uikit';
import {showTip, IMessageType} from '@/utils';
const Drawer = dynamic(import('@/uikit/components/Drawer/Drawer'), {
  ssr: false,
});

type IProps = {};
const Wallet: FC<IProps> = memo(({children}) => {
  const [userDrawer, setUserDrawer] = useRecoilState(userDrawerState);
  const [user] = useRecoilState(userState);
  const {connectedAccount, balance} = useContext(Web3ProviderContext);
  const [addFundShow, setAddFundShow] = useState<boolean>(false);
  const {t} = useTranslation();
  return (
    <>
      <Drawer
        getContainer={document.getElementById('layout-main-content')}
        visible={userDrawer.open}
        width={320}
        onClose={() => {
          setUserDrawer({open: false});
        }}
      >
        {user.accountAddress && localStorage.getItem('Authorization') ? (
          <WalletContainer>
            <WalletHeadContainer>
              <DropDown OptionsNode={<DownList />} placement='left'>
                <div className='user-box'>
                  <div className='img-box'>
                    {user.accountAddress ? (
                      <Image
                        alt='Wallet'
                        height={32}
                        src={`/static/icon/avatar-icon${Math.floor(
                          Math.random() * 7
                        )}.png`}
                        width={32}
                      />
                    ) : (
                      <SvgIcon height={32} name='login-user-icon' width={32} />
                    )}
                  </div>
                  <span>{t('Mywallet')}</span>
                  <Image
                    alt='Wallet'
                    height={12}
                    src='/static/icon/down-icon.png'
                    width={12}
                  />
                </div>
              </DropDown>
              <div className='account-address-box'>
                {`${user.accountAddress.slice(
                  0,
                  4
                )}...${user.accountAddress.slice(37)}`}
              </div>
              <img
                height={20}
                src='/static/image/close.png'
                width={20}
                onClick={() => {
                  setUserDrawer({open: false});
                }}
              />
            </WalletHeadContainer>
            <WalletBallanceContainer>
              <p>Total Balance</p>
              <strong>— ETH</strong>
              <div
                className='btn-box'
                onClick={() => {
                  setAddFundShow(true);
                  setUserDrawer({
                    open: false,
                  });
                }}
              >
                {t('Add funds')}
              </div>
            </WalletBallanceContainer>
          </WalletContainer>
        ) : (
          <WalletContainer>
            <WalletHeadContainer>
              <div className='user-box'>
                <div className='img-box'>
                  <SvgIcon height={24} name='login-user-icon' width={24} />
                </div>
                <span>{t('Mywallet')}</span>
              </div>
              <img
                height={20}
                src='/static/image/close.png'
                width={20}
                onClick={() => {
                  setUserDrawer({open: false});
                }}
              />
            </WalletHeadContainer>
            <WalletTipContainer>{t('Connectwith')}</WalletTipContainer>
            <WalletList />
          </WalletContainer>
        )}
      </Drawer>
      <AddFundModal
        show={addFundShow}
        onClose={() => {
          setAddFundShow(false);
        }}
      />
    </>
  );
});

Wallet.displayName = 'Wallet';

export const WalletList = memo(() => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [originUser, setUser] = useRecoilState(userState);
  const {getHashId} = useEthersUtils();
  const {getSignMessage} = useSigner();
  const {connectWallect} = useMetaMask();
  const {connectedAccount} = useContext(Web3ProviderContext);
  const {t} = useTranslation();
  const [userDrawer, setUserDrawer] = useRecoilState(userDrawerState);

  const onloginRequest = async (publicAddress: string) => {
    if (!publicAddress) {
      return;
    }

    const loginsignature: any = await getSignMessage('Login');
    setLoading(false);
    if (!loginsignature.status) {
      showTip({type: IMessageType.ERROR, content: loginsignature.sign || ''});
      return;
    }
    const loginRes: any = await onLogin({
      wallet: publicAddress,
      sign: loginsignature.sign,
    });
    if (loginRes?.CODE === 0) {
      showTip({content: '登录成功'});
      const {user, token} = loginRes.DATA;
      localStorage.setItem('Authorization', token);
      localStorage.setItem('sign', loginsignature.sign);
      setUser({
        ...originUser,
        accountAddress: publicAddress,
        hash_rate: user.hash_rate,
        level: user.level,
        invite_code: user.invite_code,
      });
      setLoading(false);
      setUserDrawer({
        open: !userDrawer.open,
      });
      return;
    }

    if (!location.href.includes('?inviterId=')) {
      showTip({
        type: IMessageType.ERROR,
        content: '本系统为邀约制，请联系推荐人',
        showTime: 6000,
      });
      setLoading(false);
      return;
    }

    const inviterId = location.href.split('?inviterId=')[1];

    setLoading(true);
    const signature = await getSignMessage('Register');
    setLoading(false);
    if (!signature.status) {
      showTip({type: IMessageType.ERROR, content: signature.sign || ''});
      return;
    }
    setLoading(true);
    try {
      registerAccount({
        invite_code: inviterId,
        wallet: publicAddress,
        sign: signature.sign,
      }).then((res: any) => {
        setLoading(false);
        if (res.CODE === 0) {
          onLogin({
            wallet: publicAddress as any,
            sign: signature.sign,
          }).then((loginRes: any) => {
            setLoading(false);
            if (loginRes?.CODE === 0) {
              const {token, user} = loginRes.DATA;
              localStorage.setItem('Authorization', token);
              localStorage.setItem('sign', signature.sign);
              setUser({
                ...originUser,
                accountAddress: publicAddress,
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
                content: loginRes?.MESSAGE,
              });
            }
          });
        } else {
          showTip({
            type: IMessageType.ERROR,
            content: res?.MESSAGE,
          });
        }
      });
    } catch {
      setLoading(false);
    }
  };

  // MetaMask链接
  const handleMetaMaskClick = () => {
    setLoading(true);
    if (!connectedAccount) {
      alert(11);
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
          <SvgIcon height={24} name='metamask-icon' width={24} />
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
          <SvgIcon height={24} name='wallet-connect-icon' width={24} />
          <span>Wallet Connect</span>
        </div>
        <div className='tip-box'>{t('come.soon')}</div>
      </WalletItemContainer>
    </WalletListContainer>
  );
});
WalletList.displayName = 'WalletList';

type IDownListProps = {};
const DownList: FC<IDownListProps> = memo(() => {
  const [user, setUser] = useRecoilState(userState);
  const {disconnectWallect} = useMetaMask();
  const [userDrawer, setUserDrawer] = useRecoilState(userDrawerState);
  const {t} = useTranslation();
  // 退出登录
  const handleLogoutClick = async () => {
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
      hash_rate: null,
      invite_code: null,
      level: null,
    });
    showTip({type: IMessageType.SUCCESS, content: t('退出登录成功！')});
    setUserDrawer({
      open: !userDrawer.open,
    });
    disconnectWallect();
  };

  return (
    <DownListContainer>
      <div className='down-item-box is-active'>
        <div className='left'>
          <SvgIcon height={24} name='metamask-icon' width={24} />
          <span>MetaMask</span>
        </div>
        <div className='right'>
          <Image
            alt='Wallet'
            height={16}
            src='/static/icon/selected-icon.png'
            width={16}
          />
        </div>
      </div>
      <div className='down-item-box' onClick={handleLogoutClick}>
        <div className='left'>
          <SvgIcon color='#333333' height={24} name='logout-icon' width={24} />
          <span>Log Out</span>
        </div>
        <div className='right' />
      </div>
      {/* <div className="down-item-box" onClick={handleRefreshFunds}>
                <div className="left">
                    <SvgIcon name='profile-icon' width={24} height={24} />
                    <span>Refresh funds</span>
                </div>
                <div className="right"></div>
            </div> */}
    </DownListContainer>
  );
});
DownList.displayName = 'DownList';

export default Wallet;
