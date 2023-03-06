import {useRequest} from 'ahooks';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {
  FC,
  useEffect,
  useState,
  memo,
  ChangeEvent,
  useRef,
  useContext,
} from 'react';
import {useRecoilState} from 'recoil';

import {
  HeaderContainer,
  HeaderLogoContainer,
  HeaderOptionContainer,
  HeadeSearchContainer,
  WalletListContainer,
  UserListContainer,
  WalletItemContainer,
  UserItemContainer,
  SearchLists,
  SearchTabs,
  WalletContainer,
  SearchList,
} from './styles';

import {Loading, Auth} from '@/components';
import {apiUrl} from '@/config';
import {RouterPath} from '@/config/routes';
import {useMetaMask, useEthersUtils, Web3ProviderContext} from '@/ethers-react';
import {useSigner} from '@/ethers-react/useSigner';
import {getSearchAuthor, getSearchImage, getSearchNft} from '@/services/search';
import {onLogout} from '@/services/user';
import {userState} from '@/store/user';
import {userDrawerState} from '@/store/userDrawer';
import {Button, IconInput, SvgIcon} from '@/uikit';
import {showTip, IMessageType} from '@/utils';

export const Header: FC = memo(() => {
  const router = useRouter();
  const [user, _setUser] = useRecoilState(userState);
  const [_userDrawer, setUserDrawer] = useRecoilState(userDrawerState);

  // 创建商品
  const handleCreateClick = () => {
    router.push(RouterPath.Create);
  };

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
        {/* <DropDown OptionsNode={<User />}>
          <HeadeUserContainer>
            {user.token ? (
              <Image
                alt='Wallet'
                height={32}
                src='/static/icon/avatar-icon1.png'
                width={32}
              />
            ) : (
              <SvgIcon color='#fff' height={32} name='user-icon' width={32} />
            )}
          </HeadeUserContainer>
        </DropDown> */}
        <WalletContainer
          onClick={() => {
            setUserDrawer({
              open: !_userDrawer.open,
            });
          }}
        >
          {user?.accountAddress ? (
            <div className='account-address-box'>
              {`${user.accountAddress.slice(
                0,
                4
              )}...${user.accountAddress.slice(37)}`}
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

const SearchInput = memo(({children}) => {
  const searchNumber = 8;
  const router = useRouter();
  const [showSearchResult, setshowSearchResult] = useState(false);
  const {search, type} = router.query;
  const [tabType, settabType] = useState<searchType>(searchType.IMAGE);
  const [value, setValue] = useState('');
  let [choose, setChoose] = useState(-1);
  const [oldValue, setoldValue] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  // 获取当前dom节点
  const selectRef: any = useRef(null);
  /**
   * 判断点击的是list列表还是外部dom实现隐藏搜索内容
   * @param e
   */
  const clickCallback = (e: any) => {
    if (selectRef.current && selectRef.current.contains(e.target)) {
      return;
    }
    setshowSearchResult(false);
  };

  /**
   * 切换搜索类型
   * @searchType
   */
  const handleTabClick = (type: searchType) => {
    settabType(type);
    setshowSearchResult(false);
    router.push(RouterPath.search((value || search) as string, type));
  };
  /**
   * 改变搜索框
   * @e
   */
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setshowSearchResult(false);
    }
    setValue(e.target.value);
    setoldValue(e.target.value);
    setSearchLoading(true);
    setChoose(-1);
    run();
  };

  /**
   * 聚焦
   *
   */
  const onFocus = () => {
    run();
  };
  /**
   * enter跳转
   * @e
   */
  const onKeyDown = (
    e: KeyboardEvent | React.KeyboardEvent<HTMLInputElement>
  ) => {
    const chooseFn = () => {
      if (choose === -1) {
        setValue(oldValue);
      } else {
        const value =
          data[choose].title || data[choose].username || data[choose].name;
        setValue(value);
      }
      setChoose(choose);
    };
    // enter键
    if (e.keyCode === 13) {
      if (value === '') {
        // 搜索框为空返回首页
        router.push('/');
      } else {
        searchMore();
      }
    }
    // 上键
    if (e.keyCode === 38) {
      if (!data || data.length === 0) {
        return;
      }
      const max = data.length;
      if (choose < 0) {
        choose = max - 1;
      } else {
        choose -= 1;
      }
      chooseFn();
    }
    // 下键
    if (e.keyCode === 40) {
      if (!data || data.length === 0) {
        return;
      }
      const max = data.length;
      if (choose >= max - 1) {
        choose = -1;
      } else {
        choose += 1;
      }
      chooseFn();
    }
    // ESC
    if (e.keyCode === 27) {
      setshowSearchResult(false);
    }
  };
  /**
   * 获取搜索结果
   *
   */
  const getSerachRes = async () => {
    if (!value) {
      return;
    }
    setshowSearchResult(true);
    setSearchLoading(true);
    let result = [];
    if (tabType === searchType.IMAGE) {
      const res: any = await getSearchImage({
        title: value,
        page: 1,
        pageSize: searchNumber,
      });
      if (res.code === 0) {
        result = res.data.infoList;
      }
    }
    if (tabType === searchType.AUTHOR) {
      const res: any = await getSearchAuthor({
        title: value,
        page: 1,
        pageSize: searchNumber,
      });
      if (res.code === 0) {
        result = res.data.infoList;
      }
    }
    if (tabType === searchType.NFT) {
      const res: any = await getSearchNft({
        title: value,
        page: 1,
        pageSize: searchNumber,
      });
      if (res.code === 0) {
        result = res.data.infoList;
      }
    }
    setSearchLoading(false);
    return result;
  };
  /**
   * 防抖搜索
   * @e
   */
  const {data, run} = useRequest(getSerachRes, {
    debounceWait: 200,
    manual: true,
  });

  /**
   * 点击搜索内容跳转
   * @param value
   */
  const onClickList = (value: any) => {
    if (tabType === searchType.IMAGE) {
      router.push(RouterPath.worksDetail(value.id));
    }
    if (tabType === searchType.AUTHOR) {
      router.push(RouterPath.profile(value.uuid));
    }
    if (tabType === searchType.NFT) {
      router.push(RouterPath.project(value.typeId, value.name));
    }
    // router.push(RouterPath.search((value || search) as string, tabType));
    setValue('');
    // 点击后隐藏搜索内容
    setshowSearchResult(false);
  };
  /**
   *
   * 监听value变化
   */
  useEffect(() => {
    if (value) {
      document.addEventListener('click', clickCallback, false);
    }
    return () => {
      document.removeEventListener('click', clickCallback, false);
    };
  }, [value]);
  /**
   *
   * 监听搜索内容变化
   */
  useEffect(() => {
    // 切换页面将value、type置为默认
    if (router.pathname !== '/search') {
      setValue('');
      settabType(searchType.IMAGE);
      setshowSearchResult(false);
      return;
    }
    // 刷新页面，根据路由保存参数
    if (search && !value) {
      setValue((search as string) + window.location.hash);
      setoldValue((search as string) + window.location.hash);
    }
    if (type === searchType.IMAGE || !search) {
      settabType(searchType.IMAGE);
    }
    if (type === searchType.AUTHOR) {
      settabType(searchType.AUTHOR);
    }
    if (type === searchType.NFT) {
      settabType(searchType.NFT);
    }
  }, [search, type, router.pathname]);

  /**
   *
   * 鼠标经过加背景色
   */
  const onMouseOver = (index: number) => {
    setChoose(index);
  };
  /**
   *
   * 鼠标离开去除背景色
   */
  const onMouseOut = () => {
    setChoose(-1);
  };
  /**
   * 将指定字符串加粗
   * @param wholestr字符串,destr指定加粗字符
   */
  const becomeStrong = (wholestr: string, destr: string) => {
    const start = wholestr.toUpperCase().indexOf(destr.toUpperCase());
    let html = wholestr;
    if (start !== -1) {
      const end = start + destr.length;
      const last = wholestr.length;
      html = `${wholestr.slice(
        0,
        start
      )}<span style="color: #000;font-family: HarmonyOs-Bold;">${wholestr.slice(
        start,
        end
      )}</span>${wholestr.slice(end, last)}`;
    }
    return {__html: html};
  };
  const searchMore = () => {
    router.push(RouterPath.search((value || search) as string, tabType));
    setshowSearchResult(false);
  };
  return (
    <HeadeSearchContainer ref={selectRef}>
      <IconInput
        border='1px solid #EEF0F2'
        borderRadius={24}
        className='inputStyle'
        height={48}
        leftIcon={
          <SvgIcon color='#989898' height={24} name='search-icon' width={24} />
        }
        paddingLeft={53}
        placeholder='Search Collections'
        value={value}
        onChange={(e) => onChange(e)}
        onClick={onFocus}
        onFocus={onFocus}
        onKeyDown={(e) => {
          onKeyDown(e);
        }}
      />
      {showSearchResult ? (
        <SearchLists onMouseOut={onMouseOut}>
          {searchLoading ? (
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Loading size='mini' />
            </div>
          ) : data && data.length ? (
            <>
              {data.map((val: any, index: number) => (
                // 默认搜索Image
                <SearchList
                  className={choose === index ? 'choose' : ''}
                  key={index}
                  onClick={() => {
                    onClickList(val);
                  }}
                  onMouseOver={() => {
                    onMouseOver(index);
                  }}
                >
                  <span className='searchListImg'>
                    <Image
                      alt='image'
                      blurDataURL='/static/icon/copylink-icon.png'
                      layout='fill'
                      placeholder='blur'
                      quality={60}
                      src={
                        imageError
                          ? val.item ||
                            val.portrait ||
                            val.logo ||
                            '/static/icon/logoheader.png'
                          : `${
                              val.item || val.portrait || val.logo
                            }?x-oss-process=image/resize,m_fill,h_32,w_32` ||
                            '/static/icon/logoheader.png'
                      }
                      title='search'
                      onError={() => {
                        setImageError(true);
                      }}
                    />
                  </span>
                  <span
                    dangerouslySetInnerHTML={becomeStrong(
                      val.title || val.username || val.name,
                      value
                    )}
                  />
                </SearchList>
              ))}
              {router.pathname !== '/search' && data.length === searchNumber ? (
                <div className='more' onClick={searchMore}>
                  More
                </div>
              ) : null}
            </>
          ) : (
            <SearchList>No items found</SearchList>
          )}
        </SearchLists>
      ) : null}
      {router.pathname === '/search' ? (
        <SearchTabs>
          <Button
            borderRadius={43}
            height={24}
            marginLeft={16}
            variant={tabType === searchType.IMAGE ? 'primary' : 'text'}
            width={65}
            onClick={() => {
              handleTabClick(searchType.IMAGE);
            }}
          >
            Image
          </Button>
          <Button
            borderRadius={43}
            height={24}
            marginLeft={16}
            variant={tabType === searchType.AUTHOR ? 'primary' : 'text'}
            width={65}
            onClick={() => {
              handleTabClick(searchType.AUTHOR);
            }}
          >
            Author
          </Button>
          <Button
            borderRadius={43}
            height={24}
            marginLeft={16}
            variant={tabType === searchType.NFT ? 'primary' : 'text'}
            width={65}
            onClick={() => {
              handleTabClick(searchType.NFT);
            }}
          >
            NFT
          </Button>
        </SearchTabs>
      ) : null}
      {children}
    </HeadeSearchContainer>
  );
});

SearchInput.displayName = 'SearchInput';

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
      localStorage.setItem('accountAddress', user.accountAddress);
      setLoading(false);
    });

    // const res: any = await getLoginNonce({publicAddress});
    // const nonce = res.data.nonce || '';
    // if (res.code === 0) {
    //   const signature = getHashId(nonce);
    //   const res1: any = await onLogin({
    //     signature,
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
    //   }
    // }
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
    localStorage.setItem('accountAddress', user.accountAddress);
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

const User = memo(() => {
  const [user, setUser] = useRecoilState(userState);
  const {disconnectWallect} = useMetaMask();

  // 跳转
  const handleGoClick = (url: string) => {
    // if (!connectedAccount) {
    //     connectWallect()
    //     return
    // }
  };

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
    showTip({type: IMessageType.SUCCESS, content: 'Log out successfully!'});
    disconnectWallect();
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
      showTip({type: IMessageType.SUCCESS, content: 'Log out successfully!'});
    }
  };

  return (
    <UserListContainer>
      <Auth>
        <UserItemContainer
          onClick={() => {
            handleGoClick(`/user/profile/${user.userId}`);
          }}
        >
          <div className='name-box'>
            <SvgIcon
              color='#333333'
              height={24}
              name='profile-icon'
              width={24}
            />
            <span>Profile</span>
          </div>
        </UserItemContainer>
      </Auth>
      <Auth>
        <UserItemContainer
          onClick={() => {
            handleGoClick(`/user/profile/${user.userId}?type=favorite`);
          }}
        >
          <div className='name-box'>
            <SvgIcon color='#333333' height={24} name='love-icon' width={24} />
            <span>Favorite</span>
          </div>
        </UserItemContainer>
      </Auth>
      {/* <UserItemContainer>
                <div className="name-box">
                    <Image
                        src={'/static/icon/user-fund-icon.png'}
                        alt='Crowdfund'
                        width={24}
                        height={24}
                    />
                    <SvgIcon name='crowdfun-icon' width={24} height={24} color={'#333333'} />
                    <span>Crowdfund</span>
                </div>
            </UserItemContainer> */}
      {user.token ? (
        <UserItemContainer onClick={handleLogoutClick}>
          <div className='name-box'>
            <SvgIcon
              color='#333333'
              height={24}
              name='logout-icon'
              width={24}
            />
            <span>Log Out</span>
          </div>
        </UserItemContainer>
      ) : null}
    </UserListContainer>
  );
});
User.displayName = 'User';

export default Header;
