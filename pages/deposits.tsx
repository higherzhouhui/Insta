import axios from 'axios';
import {useRouter} from 'next/router';
import {useState, useEffect, SetStateAction, useContext, useRef} from 'react';
import {useRecoilState} from 'recoil';
import {Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {approveAbi, approveContractAddress} from '@/config/approveContract';
import {abi, contractAddress} from '@/config/depositContract';
import {staticRollUpData} from '@/config/staticData';
import {withDrawAbi, withDrawContractAddress} from '@/config/withDrawContract';
import {useContract, useEthersUtils, Web3ProviderContext} from '@/ethers-react';
import {userState} from '@/store/user';
import {
  DepositsContainer,
  MyTable,
  TotalAddress,
  WithDrawContainer,
} from '@/styles/deposits';
import {Modal, SvgIcon} from '@/uikit';
import {copyUrlToClip, IMessageType, showTip} from '@/utils';

import 'swiper/css';
import {ethers} from 'ethers';

const Deposits: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [withDrawvisable, setWithDrawVisable] = useState(false);
  const [exchangeisable, setExchangeisable] = useState(false);
  const [withDrawNumber, setWithDrawNumber] = useState<number | string>();
  const [exchangeNumber, setExchangeNumber] = useState<number | string>('');
  const [user, setUser] = useRecoilState(userState);
  const [copyLink, setCopyLink] = useState('');
  const router = useRouter();
  const [deposits, setDeposits] = useState<number>();
  const [totaldeposits, settotalDeposits] = useState<number>(0);
  const [totalIncome, settotalIncome] = useState<number>(0);
  const [totalAddress, settotalAddress] = useState<number>(0);
  const [teamTotalDeposits, setteamTotalDeposits] = useState<number>(0);
  const [depositError, setDepositError] = useState(false);
  const exchangeList = [25, 50, 75, 100];
  const {getContract} = useContract();
  const {getEtherPrice, getNormalPrice, getNetwork} = useEthersUtils();
  const {connectedAccount} = useContext(Web3ProviderContext);

  const exchangeOptionList = [
    {label: 'USDT', value: 'USDT', img: '/static/image/usdt.png', balance: 0},
    {label: 'INT', value: 'INT', img: '/static/image/int.png', balance: 0},
    {label: 'LTC', value: 'LTC', img: '/static/image/ltc.png', balance: 0},
    {label: 'LINK', value: 'LINK', img: '/static/image/link.png', balance: 0},
    {label: 'BNB', value: 'BNB', img: '/static/image/bnb.png', balance: 0},
    {label: 'ADA', value: 'ADA', img: '/static/image/ada.png', balance: 0},
    {label: 'DOGE', value: 'DOGE', img: '/static/image/doge.png', balance: 0},
  ];
  const [hasApprove, setHasApprove] = useState(false);
  const [fromObj, setFromObj] = useState(exchangeOptionList[0]);
  const [toObj, setToObj] = useState(exchangeOptionList[1]);
  const [balance, setBalance] = useState<any>({});
  const approveRef = useRef<any>();
  const depositRef = useRef<any>();

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

  const initRequest = () => {
    if (!connectedAccount) {
      return;
    }
    setLoading(true);
    let totalDeposit = 0;
    axios({
      url: `${apiUrl}/api/public/v1/users/deposit`,
      method: 'get',
      params: {wallet: connectedAccount},
    }).then((res) => {
      if (res?.data?.meta?.status === 200) {
        const array = res?.data?.data || [];
        array.forEach((item: any) => {
          totalDeposit += item.amount;
        });
        settotalDeposits(totalDeposit);
        setCopyLink(`http://${location.host}?inviterId=${connectedAccount}`);
      } else {
        showTip({content: res?.data?.meta?.msg});
      }
    });
    let totalIncome = 0;
    axios({
      url: `${apiUrl}/api/public/v1/users/income`,
      method: 'get',
      params: {wallet: connectedAccount},
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
      params: {wallet: connectedAccount},
    }).then((res: any) => {
      if (res?.data?.meta?.status === 200) {
        const data = res?.data?.data;
        settotalAddress(data?.invite_num);
        setteamTotalDeposits(data?.deposits_total);
      }
    });
    axios({
      url: `${apiUrl}/api/public/v1/users/balance`,
      method: 'get',
      params: {wallet: connectedAccount},
    }).then((res: any) => {
      setLoading(false);
      if (res?.data?.meta?.status === 200) {
        const {USDT, int, int_price} = res.data.data;
        setBalance({
          balance: USDT + parseFloat(int) * parseFloat(int_price),
          USDT: USDT || 0,
          int: parseFloat(int),
          usdt2Int: parseFloat(int_price),
        });
        setFromObj({
          ...fromObj,
          balance: USDT || 0,
        });
        setToObj({
          ...toObj,
          balance: parseFloat(int),
        });
      } else {
        setBalance({});
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
    showTip({type: IMessageType.SUCCESS, content: 'Copied'});
  };
  const handleWithdraw = async () => {
    setLoading(true);
    const result: any = await axios({
      url: `${apiUrl}/api/public/v1/users/withdraw`,
      method: 'get',
      params: {wallet: connectedAccount, amount: withDrawNumber},
    });
    setLoading(false);
    if (result?.data?.meta?.status === 200) {
      const {amount, r, s, v, token, timestamp, orderId, total} =
        result.data.data;
      setLoading(true);
      try {
        // eslint-disable-next-line prettier/prettier
      const contract = await getContract(withDrawContractAddress, withDrawAbi);
        await contract.withdraw(
          token,
          total.toString(),
          amount.toString(),
          orderId,
          timestamp,
          r,
          s,
          v
        );
        setLoading(false);
        showTip({type: IMessageType.SUCCESS, content: 'Operation succeeded!'});
      } catch (error: any) {
        showTip({
          type: IMessageType.ERROR,
          content: error?.data?.message || error?.message,
        });
        setLoading(false);
      }
    } else {
      showTip({type: IMessageType.ERROR, content: result?.data?.meta?.msg});
    }
  };
  const handleExchange = () => {
    setLoading(true);
    try {
      if (fromObj.value === 'USDT') {
        axios({
          url: `${apiUrl}/api/public/v1/users/u2i`,
          method: 'get',
          params: {wallet: connectedAccount, amount: exchangeNumber},
        }).then((res) => {
          setLoading(false);
          if (res?.data?.meta?.status === 200) {
            const {USDT, int, int_price} = res.data.data;
            setBalance({
              balance: USDT + parseFloat(int) * parseFloat(int_price),
              USDT,
              int: parseFloat(int),
              usdt2Int: parseFloat(int_price),
            });
            showTip({
              type: IMessageType.SUCCESS,
              content: 'Operation succeeded!',
            });
            setExchangeisable(false);
            setFromObj({
              ...fromObj,
              balance: USDT,
            });
            setToObj({
              ...toObj,
              balance: parseFloat(int),
            });
          } else {
            showTip({
              type: IMessageType.SUCCESS,
              content: res?.data?.meta?.msg,
            });
          }
        });
      } else {
        axios({
          url: `${apiUrl}/api/public/v1/users/i2u`,
          method: 'get',
          params: {wallet: connectedAccount, amount: exchangeNumber},
        }).then((res) => {
          setLoading(false);
          if (res?.data?.meta?.status === 200) {
            const {USDT, int, int_price} = res.data.data;
            setBalance({
              balance: USDT + parseFloat(int) * parseFloat(int_price),
              USDT,
              int: parseFloat(int),
              usdt2Int: parseFloat(int_price),
            });
            showTip({
              type: IMessageType.SUCCESS,
              content: 'Operation succeeded!',
            });
            setFromObj({
              ...fromObj,
              balance: parseFloat(int),
            });
            setToObj({
              ...toObj,
              balance: USDT,
            });
            setExchangeisable(false);
          } else {
            showTip({
              type: IMessageType.SUCCESS,
              content: res?.data?.meta?.msg,
            });
          }
        });
      }
    } catch (error: any) {
      showTip({
        type: IMessageType.ERROR,
        content: error?.data?.message || error?.message,
      });
      setLoading(false);
    }
  };
  const handleClickBtn = async () => {
    if (!hasApprove) {
      await checkIsApprove();
    }
    if (!deposits) {
      showTip({type: IMessageType.ERROR, content: 'Please Input'});
      return;
    }
    setLoading(true);
    try {
      const contract = await getContract(contractAddress, abi);
      const price = getEtherPrice(deposits || 0);
      await contract.deposits(price);
      setLoading(false);
      showTip({
        type: IMessageType.SUCCESS,
        content: 'Operation succeeded!',
      });
    } catch (error: any) {
      showTip({
        type: IMessageType.ERROR,
        content: error?.data?.message || error?.message,
      });
      setLoading(false);
    }
  };
  const checkIsApprove = async () => {
    setLoading(true);
    try {
      const price = getEtherPrice(99999999999);
      await approveRef.current.approve(contractAddress, price);
      setHasApprove(true);
      setLoading(false);
    } catch (error: any) {
      showTip({
        type: IMessageType.ERROR,
        content: error?.data?.message || error?.message,
      });
      setLoading(false);
      setHasApprove(false);
    }
  };

  const checkHasAllowance = async () => {
    await shiftNetWork();
    approveRef.current = await getContract(approveContractAddress, approveAbi);
    const account = connectedAccount;
    const edu = await approveRef.current.allowance(account, contractAddress);
    if (edu && getNormalPrice(edu._hex) !== '0.0') {
      setHasApprove(true);
    } else {
      setHasApprove(false);
    }
  };
  const almostPrice = () => {
    if (isNaN(exchangeNumber as any) || !exchangeNumber) {
      return '';
    }
    if (fromObj.value === 'USDT') {
      return (
        Math.round(
          (((exchangeNumber as any as number) || 0) / balance?.usdt2Int) *
            1000000
        ) / 1000000
      );
    }
    return (
      Math.round(
        ((exchangeNumber as any as number) || 0) * balance?.usdt2Int * 1000000
      ) / 1000000
    );
  };
  const shiftNetWork = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await getNetwork(provider);
  };
  // '7206a100-bbc2-11ed-ab9f-c7ad60dc9119'
  useEffect(() => {
    initRequest();
    checkHasAllowance();
    let link = '';
    if (user.uuid && connectedAccount) {
      link = `http://${location.host}?inviterId=${connectedAccount}`;
    }
    setCopyLink(link);
  }, [connectedAccount]);
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
                {staticRollUpData
                  .slice(index * 4, (index + 1) * 4)
                  .map((citem, cindex: any) => {
                    return (
                      <div className='content' key={cindex}>
                        <div>{citem.chain}</div>
                        <div>
                          <a href={citem.url} rel='noreferrer' target='_blank'>
                            {citem.projectName || citem.project || 'LiDo'}
                          </a>
                        </div>
                        <div>{`$${citem.tvlUsd}b`}</div>
                        <div>{`${citem.apy}%`}</div>
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
          </div>
        </div>
        <div className='desc'>
          <div className='left'>Expected return:300%</div>
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
            <div className='bot'>${balance?.balance || 0}</div>
          </div>
          <div className='detail' onClick={() => router.push('/balance')}>
            Details <SvgIcon color='#999' name='right-icon' />
          </div>
        </div>
        <div className='normalContent'>
          <div className='left'>
            <div className='top'>USDT</div>
            <div className='bot'>{balance?.USDT || 0}</div>
          </div>
          <div className='right'>
            <div
              className='top'
              onClick={() => {
                setWithDrawNumber('');
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
            <div className='bot'>{balance?.int || 0}</div>
          </div>
          <div className='right'>
            <div
              className='top'
              onClick={() => {
                setExchangeNumber('');
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
      {copyLink && (
        <>
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
        </>
      )}

      <Modal
        height='auto'
        visible={withDrawvisable}
        width='80%'
        onClose={() => {
          setWithDrawVisable(false);
        }}
      >
        <WithDrawContainer className={loading ? 'loading' : ''}>
          <h2>Withdraw</h2>
          <input
            placeholder='Please Enter'
            type='number'
            value={withDrawNumber || ''}
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
                disabled
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
            <div className='right'>Balance: {fromObj.balance}</div>
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
                      setExchangeNumber(item * fromObj.balance * 0.01);
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
                disabled
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
            <div className='right'>Balance: {toObj.balance}</div>
          </div>
          <div className='exchangeContent'>
            <input placeholder='' type='text' value={almostPrice()} />
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
              setExchangeisable(false);
            }}
          />
        </WithDrawContainer>
      </Modal>
    </DepositsContainer>
  );
};

Deposits.displayName = 'Deposits';

export default Deposits;
