import axios from 'axios';
import {ethers} from 'ethers';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useContext, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';
import {Swiper, SwiperSlide} from 'swiper/react';

import type {NextPage} from 'next';

// eslint-disable-next-line import/order
import {apiUrl} from '@/config';
// import {approveAbi, approveContractAddress} from '@/config/approveContract';
import {nftAbi, nftContractAddress} from '@/config/nftContract';
import {usdtAbi, usdtContractAddress} from '@/config/usdtContract';
import {
  useContract,
  useEthersUtils,
  useMetaMask,
  Web3ProviderContext,
} from '@/ethers-react';
import {useSigner} from '@/ethers-react/useSigner';
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
  const {getContract} = useContract();
  const {getEtherPrice, getNormalPrice, getNetwork} = useEthersUtils();
  const {t} = useTranslation();
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const {inviterId} = router.query;
  const [loading, setLoading] = useState(false);
  const [swiper, setSwiper] = useState<any>('');
  const {getSignMessage} = useSigner();
  const {setAccount} = useMetaMask();
  const [hasApprove, setHasApprove] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const checkIsApprove = async () => {
    setLoading(true);
    try {
      const price =
        '115792089237316195423570985008687907853269984665640564039457584007913129639935';
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
      // eslint-disable-next-line @typescript-eslint/await-thenable
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
    if (!hasApprove) {
      await checkIsApprove();
      if (!hasApprove) {
        return;
      }
    }
    if (!deposits) {
      showTip({type: IMessageType.ERROR, content: t('PleaseInput')});
      return;
    }

    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      const contract = await getContract(nftContractAddress, nftAbi);
      const price = getEtherPrice(deposits || 0);
      await contract.deposits(price);
      setLoading(false);
      showTip({
        type: IMessageType.SUCCESS,
        content: t('OperationSuccess'),
      });
    } catch (error: any) {
      showTip({
        type: IMessageType.ERROR,
        content: error?.data?.message || error?.message,
      });
      setLoading(false);
    }
  };

  const judgeIsRegister = async (inviterId: any) => {
    if (inviterId) {
      if (connectedAccount) {
        setVisible(false);
        // 判断是否注册，未注册则弹窗
        const res = await axios({
          url: `${apiUrl}/api/user/login`,
          method: 'POST',
          data: {wallet: connectedAccount, sign: user.sign},
        });
        if (res?.data?.CODE === 0) {
          setVisible(false);
        } else {
          setVisible(true);
        }
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
      total: 1000,
      remain: 523,
      price: 1000,
      hint: [
        '万龙天城原住民机票一张（1000算力）直推20%',
        '万龙天城内购买房产，开店享受折扣',
        '万龙天城城市税收10%分红',
        '优先在万龙天城城市开店',
        '享受AMD交易手续费分红',
        '送永久V3级别',
        '推广高级初级节点享受20%收益(U)',
        '获得推广节点算力加成',
        '代币上线享受白名单优先购买（100U额度）',
      ],
    },
    {
      title: '高级节点',
      tab: 'tab2',
      bg: 'bg2',
      total: 500,
      remain: 250,
      price: 500,
      hint: [
        '万龙天城原住民机票一张（500算力）',
        '万龙天城内购买房产，开店享受折扣',
        '享受AMD交易手续费分红',
        '送永久V2级别',
        '推广初级/高级节点享受20%收益(U)',
        '获得推广节点算力加成',
        '代币上线享受白名单优先购买（50U额度）',
      ],
    },
    {
      title: '初级节点',
      tab: 'tab3',
      bg: 'bg3',
      total: 100,
      remain: 60,
      price: 100,
      hint: [
        '获得100算力',
        '获得推广节点算力加成',
        '推广初级节点享受20%收益(U)',
      ],
    },
  ]);

  const shiftNetWork = async () => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await getNetwork(provider);
          clearInterval(timer);
        }
      }, 100);
    });
  };

  const handleToSlide = (index: number) => {
    swiper.slideTo(index);
    setCurrentTab(index);
  };

  useEffect(() => {
    shiftNetWork();
    setTimeout(() => {
      checkHasAllowance();
      judgeIsRegister(inviterId);
    }, 500);
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
                    <div className='total'>剩余总量</div>
                  </div>
                  <div className='proWrapper'>
                    <div className='showNumber'>
                      <div>{item.total}</div>
                      <div>{item.remain}</div>
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
                  <div className='btn' onClick={() => mint(1)}>
                    {hasApprove ? t('MINT') : t('授权')}
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
          <h2>{t('InviterId')}</h2>
          <p>{inviterId}</p>
          <div
            className='confirm'
            onClick={() => {
              handleClickBtn();
            }}
          >
            {t('Confirm')}
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
