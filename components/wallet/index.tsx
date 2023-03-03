import dynamic from 'next/dynamic';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {FC, useState, memo, useContext} from 'react';
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
import {
  useMetaMask,
  useContract,
  useEthersUtils,
  Web3ProviderContext,
} from '@/ethers-react';
import {onLogout} from '@/services/user';
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
        {user.token ? (
          <WalletContainer>
            <WalletHeadContainer>
              <DropDown OptionsNode={<DownList />} placement='left'>
                <div className='user-box'>
                  <div className='img-box'>
                    {user.portrait ? (
                      <Image
                        alt='Wallet'
                        height={32}
                        src='/static/icon/avatar-icon1.png'
                        width={32}
                      />
                    ) : (
                      <SvgIcon height={32} name='login-user-icon' width={32} />
                    )}
                  </div>
                  <span>My wallet</span>
                  <Image
                    alt='Wallet'
                    height={12}
                    src='/static/icon/down-icon.png'
                    width={12}
                  />
                </div>
              </DropDown>

              <div className='account-address-box'>
                {connectedAccount &&
                  `${connectedAccount.slice(0, 4)}...${connectedAccount.slice(
                    37
                  )}`}
              </div>
            </WalletHeadContainer>
            <WalletBallanceContainer>
              <p>Total Balance</p>
              <strong>{Number(balance).toFixed(2)} ETH</strong>
              <div
                className='btn-box'
                onClick={() => {
                  setAddFundShow(true);
                  setUserDrawer({
                    open: false,
                  });
                }}
              >
                Add Funds
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
                <span>My wallet</span>
              </div>
            </WalletHeadContainer>
            <WalletTipContainer>
              Connect with one of our available wallet providers or create a new
              one.
            </WalletTipContainer>
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
  const [user, setUser] = useRecoilState(userState);
  const {getHashId} = useEthersUtils();
  const {getSignMessage} = useContract();
  const {connectWallect} = useMetaMask();
  const {connectedAccount} = useContext(Web3ProviderContext);

  const onloginRequest = async (publicAddress: string) => {
    setLoading(true);
    const msg = getHashId(`this is a pd1 111`);
    const signature = await getSignMessage(msg);
    setLoading(false);
    if (!signature.status) {
      showTip({type: IMessageType.ERROR, content: signature.sign || ''});
      return;
    }
    setUser({
      expiresAt: 265645,
      portrait: '',
      token: '45feafea5f',
      username: 'james',
      userId: 'uuid',
      accountAddress: publicAddress,
    });
    localStorage.setItem('x-token', 'res1.data.token');

    // const res: any = await getLoginNonce({publicAddress});
    // const {redirectUrl} = router.query;
    // const nonce = res.data.nonce || '';

    // if (res.code === 0) {
    //   const msg = getHashId(`this is a pd1 ${nonce}`);
    //   const signature = await getSignMessage(msg);
    //   if (!signature.status) {
    //     setLoading(false);
    //     showTip({type: IMessageType.ERROR, content: signature.sign || ''});
    //     return;
    //   }
    //   const res1: any = await onLogin({
    //     signature: signature.sign,
    //     publicAddress,
    //   });
    //   if (res1.code === 0) {
    //     const {expiresAt, portrait, token, username, uuid} = res1.data;
    //     setUser({
    //       expiresAt,
    //       portrait,
    //       token,
    //       username,
    //       userId: uuid,
    //       accountAddress: publicAddress,
    //     });
    //     setLoading(false);
    //     localStorage.setItem('x-token', res1.data.token);

    //     if (redirectUrl && typeof redirectUrl === 'string') {
    //       router.push(redirectUrl.split(webUrl).join(''));
    //     } else {
    //       router.push('/');
    //     }
    //   }
    // }
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
        <div className='tip-box'>Coming Soon</div>
      </WalletItemContainer>
    </WalletListContainer>
  );
});
WalletList.displayName = 'WalletList';

type IDownListProps = {};
const DownList: FC<IDownListProps> = memo(() => {
  const [user, setUser] = useRecoilState(userState);
  const {disconnectWallect} = useMetaMask();

  // useEffect(() => {
  //     if (user.token && !connectedAccount) {
  //         handleLogoutClick()
  //     }
  // }, [connectedAccount])

  // 退出登录
  const handleLogoutClick = async () => {
    localStorage.removeItem('x-token');
    setUser({
      expiresAt: null,
      portrait: null,
      token: null,
      username: null,
      userId: null,
      accountAddress: null,
    });
    disconnectWallect();
    showTip({type: IMessageType.SUCCESS, content: 'Log out successfully!'});
    return;
    const res: any = await onLogout();
    if (res?.code === 0) {
      localStorage.removeItem('x-token');
      setUser({
        expiresAt: null,
        portrait: null,
        token: null,
        username: null,
        userId: null,
        accountAddress: null,
      });
    }
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
