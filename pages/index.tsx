import {ethers} from 'ethers';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useContext, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {Swiper, SwiperSlide} from 'swiper/react';

import type {NextPage} from 'next';

// eslint-disable-next-line import/order
// import {approveAbi, approveContractAddress} from '@/config/approveContract';
import {nftAbi, nftContractAddress} from '@/config/nftContract';
import {usdtAbi, usdtContractAddress} from '@/config/usdtContract';
import {useContract, useEthersUtils, Web3ProviderContext} from '@/ethers-react';
import {useSigner} from '@/ethers-react/useSigner';
import {mintNft, onLogin, registerAccount} from '@/services/user';
import {userState} from '@/store/user';
import {HomeContainer, InviterComp, SwipperItem} from '@/styles/home';
import {Modal} from '@/uikit';
import {IMessageType, showTip} from '@/utils';
import 'swiper/css';

const Home: NextPage = () => {
  const homeRef: any = useRef(null);
  const [visible, setVisible] = useState(false);
  const {connectedAccount} = useContext(Web3ProviderContext);
  const approveRef = useRef<any>();
  const nftRef = useRef<any>();
  const {getContract} = useContract();
  const {getNormalPrice, getNetwork} = useEthersUtils();
  const {t} = useTranslation();
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const {inviterId} = router.query;
  const [loading, setLoading] = useState(false);
  const [swiper, setSwiper] = useState<any>('');
  const {getSignMessage} = useSigner();
  const [hasApprove, setHasApprove] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [disMint, setDisMint] = useState(false);
  const checkIsApprove = async () => {
    setLoading(true);
    try {
      if (!connectedAccount) {
        await getAccount();
      }
      approveRef.current = await getContract(usdtContractAddress, usdtAbi);
      const price = '99999999999';
      await approveRef.current.approve(nftContractAddress, price);
      setHasApprove(true);
      setLoading(false);
      return true;
    } catch (error: any) {
      showTip({
        type: IMessageType.ERROR,
        content: error?.data?.message || error?.message,
      });
      setLoading(false);
      setHasApprove(false);
      return false;
    }
  };

  const checkHasAllowance = async () => {
    try {
      approveRef.current = await getContract(usdtContractAddress, usdtAbi);
      const account = connectedAccount;
      const edu = await approveRef.current.allowance(
        account,
        nftContractAddress
      );
      if (edu && getNormalPrice(edu._hex) !== '0.0') {
        setHasApprove(true);
      } else {
        setHasApprove(false);
      }
    } catch (error: any) {
      showTip({
        type: IMessageType.ERROR,
        content: error?.data?.message || error?.message,
      });
      setHasApprove(false);
    }
  };

  const mint = async (deposits: number) => {
    if (loading) {
      return;
    }
    setLoading(true);

    if (!hasApprove) {
      await checkIsApprove();
      setLoading(false);

      if (!hasApprove) {
        return;
      }
    }
    if (!deposits) {
      showTip({type: IMessageType.ERROR, content: t('Please Input')});
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      let tlevel = currentTab;
      if (currentTab === 0) {
        tlevel = 3;
      } else if (currentTab === 1) {
        tlevel = 2;
      } else if (currentTab === 2) {
        tlevel = 1;
      }
      const mintRes: any = await mintNft({level: tlevel});
      if (mintRes?.CODE !== 0) {
        setLoading(false);
        showTip({content: mintRes?.MESSAGE});
        return;
      }
      const {level, parent, reward, r, s, v} = mintRes.DATA;

      await nftRef.current.mint(level, parent, reward, r, s, v);

      setDisMint(true);
      setLoading(false);
      showTip({
        type: IMessageType.SUCCESS,
        content: t('鑄造成功！'),
      });
      await getRemain();
    } catch (error: any) {
      showTip({
        type: IMessageType.ERROR,
        content: error?.data?.message || error?.message,
      });
      setLoading(false);
    }
  };
  const handleClickBtn = async () => {
    setRegisterLoading(true);
    let accountAddress = connectedAccount;
    if (!accountAddress) {
      // eslint-disable-next-line require-atomic-updates
      accountAddress = await getAccount();
    }
    let sign = '';
    const signature = await getSignMessage('Register');
    if (!signature.status) {
      showTip({type: IMessageType.ERROR, content: signature.sign || ''});
      setRegisterLoading(false);
      return;
    }
    sign = signature.sign;
    localStorage.setItem('sign', sign);
    registerAccount({
      invite_code: inviterId as any,
      wallet: accountAddress,
      sign: signature.sign,
    }).then((res: any) => {
      setRegisterLoading(false);
      if (res?.CODE === 0) {
        onLogin({
          wallet: accountAddress as any,
          sign,
        }).then((loginRes: any) => {
          if (loginRes?.CODE === 0) {
            const {token, datauser} = loginRes.DATA;
            localStorage.setItem('Authorization', token);
            setUser({
              ...user,
              sign: signature.sign,
              hash_rate: datauser.hash_rate,
              level: datauser.level,
              invite_code: datauser.invite_code,
            });
            showTip({
              type: IMessageType.SUCCESS,
              content: '註冊成功！',
            });
          } else {
            showTip({
              type: IMessageType.ERROR,
              content: res?.MESSAGE,
            });
          }
        });
      } else {
        showTip({type: IMessageType.ERROR, content: res?.MESSAGE});
        setRegisterLoading(false);
      }
    });
    setVisible(false);
  };
  const judgeIsRegister = async (inviterId: any) => {
    if (inviterId) {
      if (connectedAccount && localStorage.getItem('Authorization')) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }
  };
  const [currentTab, setCurrentTab] = useState(0);
  const [tabs, setTabs] = useState([
    {
      title: '创世节点',
      tab: 'tab1',
      bg: 'bg1',
      total: 108,
      remain: 108,
      price: 1000,
      hint: [
        '獲得1000個算力',
        '享受AMD交易手續費分紅',
        '送永久V3級別',
        '推廣創世、高級、初級節點享受20%收益(U)',
        '獲得推廣節點算力加成',
        '送永久V3级别',
        'AMD上線享受白名單優先購買（限購50000枚）',
        '萬龍天城原住民機票一張（可進入元宇宙遊戲）',
        '萬龍天城內購買房產，開店享受9折折扣優惠',
        '萬龍天城城市稅收20%分紅',
        '優先在萬龍天城城市開店（共220家店）',
      ],
    },
    {
      title: '高级节点',
      tab: 'tab2',
      bg: 'bg2',
      total: 500,
      remain: 500,
      price: 500,
      hint: [
        '獲得500個算力',
        '享受AMD交易手續費分紅',
        '送永久V2級別',
        '送永久V2级别',
        '推廣創世、高級、初級節點享受20%收益(U)',
        '獲得推廣節點算力加成',
        'AMD上線享受白名單優先購買（限購25000枚）',
        '萬龍天城原住民機票一張（可進入元宇宙遊戲）',
        '萬龍天城內購買房產，開店享受9折折扣優惠',
        '優先在萬龍天城城市開店（共220家店）',
      ],
    },
    {
      title: '初级节点',
      tab: 'tab3',
      bg: 'bg3',
      total: 9999,
      remain: 9999,
      price: 100,
      hint: [
        '獲得100算力',
        '獲得推廣節點算力加成',
        '推廣初級節點享受20%收益(U)',
        'AMD上線享受白名單優先購買限購5000枚',
      ],
    },
  ]);

  const shiftNetWork = async () => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await getNetwork(provider);
      }
    });
  };

  const handleToSlide = (index: number) => {
    swiper.slideTo(index);
    setCurrentTab(index);
  };

  const getRemain = async () => {
    try {
      nftRef.current = await getContract(nftContractAddress, nftAbi);

      let level = currentTab;
      if (currentTab === 0) {
        level = 3;
      } else if (currentTab === 1) {
        level = 2;
      } else if (currentTab === 2) {
        level = 1;
      }
      const remain = await nftRef.current.getStock(level);
      tabs[currentTab].remain = remain.toString();
      setTabs([...tabs]);
    } catch (err) {
      console.log(err);
    }
  };

  const isMint = async () => {
    try {
      nftRef.current = await getContract(nftContractAddress, nftAbi);
      // eslint-disable-next-line new-cap
      const flag = await nftRef.current.MintLog(connectedAccount);
      console.log(flag, 'flag');
      if (flag) {
        setDisMint(true);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connectedAccount) {
      getRemain();
    }
  }, [currentTab]);

  useEffect(() => {
    let timer: any = '';
    if (connectedAccount) {
      timer = setTimeout(() => {
        shiftNetWork();
        checkHasAllowance();
        judgeIsRegister(inviterId);
        isMint();
        getRemain();
      }, 500);
    }

    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [inviterId, connectedAccount]);

  return (
    <HomeContainer ref={homeRef}>
      <div className={loading ? 'loading' : ''} />
      <div className='topImg'>
        <Image layout='fill' src='/static/image/shoutu.png' />
      </div>
      <div className='jdzm'>
        <Image layout='fill' src='/static/image/jdzm.png' />
      </div>
      <div className='tabs'>
        {tabs.map((item, index) => {
          return (
            <div className='tab' key={index}>
              <div
                className={`tabImg ${index === currentTab ? 'tabActive' : ''}`}
                onClick={() => {
                  handleToSlide(index);
                }}
              >
                <Image
                  layout='fill'
                  src={`/static/image/${item.tab}${
                    index === currentTab ? '-active' : ''
                  }.png`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <Swiper
        className='mySwiper'
        loop={false}
        onSlideChange={(e) => {
          setCurrentTab(e.activeIndex);
        }}
        onSwiper={setSwiper}
      >
        {tabs.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <SwipperItem>
                <div className='bg'>
                  <Image layout='fill' src={`/static/image/${item.bg}.png`} />
                </div>
                <div className='describe'>
                  <div className='number'>
                    <div className='total'>发行总量</div>
                    {/* <div className='total'>剩余总量</div> */}
                  </div>
                  <div className='proWrapper'>
                    <div className='showNumber'>
                      <div>{item.total}</div>
                      {/* <div>{item.remain}</div> */}
                    </div>
                    <div
                      className='proTotal'
                      style={{
                        width: `${Math.round(
                          ((item.total - item.remain) / item.total) * 100
                        )}%`,
                      }}
                    />
                    <div
                      className='proRemain'
                      style={{
                        width: `${Math.round(
                          (item.remain / item.total) * 100
                        )}%`,
                      }}
                    />
                    {/* <div
                      className='divide'
                      style={{
                        left: `${Math.round(
                          ((item.total - item.remain) / item.total) * 100
                        )}%`,
                      }}
                    >
                      <Image layout='fill' src='/static/image/divide.png' />
                    </div> */}
                  </div>
                  <div className='priceWrapper'>
                    <span className='price'>价格：</span>
                    <span className='priceNumber'>{item.price}U</span>
                  </div>
                  <div
                    className={`btn ${disMint ? 'disMint' : ''}`}
                    onClick={() => mint(item.price)}
                  >
                    {hasApprove ? t('MINT') : t('授權')}
                  </div>
                </div>
                <div className='hint'>
                  <div className='title'>权益说明：</div>
                  {item.hint.map((item: string, index: number) => {
                    return (
                      <div className='list' key={index}>
                        <b>{index + 1}</b>.{item}
                      </div>
                    );
                  })}
                </div>
              </SwipperItem>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Modal
        height='auto'
        visible={visible}
        width='90%'
        onClose={() => {
          setVisible(false);
        }}
      >
        <InviterComp className={registerLoading ? 'loading' : ''}>
          <h2>{t('邀請碼')}</h2>
          <p>{inviterId}</p>
          <div
            className='confirm'
            onClick={() => {
              handleClickBtn();
            }}
          >
            {t('註冊')}
          </div>
          <img
            alt='close'
            className='close'
            src='/static/image/close.png'
            onClick={() => {
              setVisible(false);
            }}
          />
        </InviterComp>
      </Modal>
    </HomeContainer>
  );
};

Home.displayName = 'Home';

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
    showTip({content: 'Please Install MetaMask'});
    return '';
  }
};

export default Home;
