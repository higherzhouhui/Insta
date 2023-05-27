import {Empty} from 'antd';
import axios from 'axios';
import moment from 'moment';
import {useRouter} from 'next/router';
import {useState, useEffect, useContext} from 'react';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {Web3ProviderContext} from '@/ethers-react';
import {WithDrawContainer} from '@/styles/deposits';
import {ProfitContainer, PMyTable} from '@/styles/profit';
import {SvgIcon} from '@/uikit';
import {IMessageType, showTip} from '@/utils';

const Balance: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [dataSource, setDataSource] = useState<any>([]);
  const {connectedAccount} = useContext(Web3ProviderContext);
  const [balance, setBalance] = useState<any>({});

  const exchangeOptionList = [
    {label: 'USDT', value: 'USDT', img: '/static/image/usdt.png', balance: 0},
    {label: 'INT', value: 'INT', img: '/static/image/int.png', balance: 0},
    {label: 'LTC', value: 'LTC', img: '/static/image/ltc.png', balance: 0},
    {label: 'LINK', value: 'LINK', img: '/static/image/link.png', balance: 0},
    {label: 'BNB', value: 'BNB', img: '/static/image/bnb.png', balance: 0},
    {label: 'ADA', value: 'ADA', img: '/static/image/ada.png', balance: 0},
    {label: 'DOGE', value: 'DOGE', img: '/static/image/doge.png', balance: 0},
  ];
  const [fromObj, setFromObj] = useState(exchangeOptionList[0]);
  const [toObj, setToObj] = useState(exchangeOptionList[1]);
  const [exchangeNumber, setExchangeNumber] = useState<number | string>('');
  const exchangeList = [25, 50, 75, 100];

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
  const initRequest = () => {
    const arr: any[] = [];
    setLoading(true);
    axios({
      url: `${apiUrl}/api/public/v1/users/balance_detail`,
      method: 'get',
      params: {wallet: connectedAccount},
    })
      .then((balance) => {
        if (balance?.data?.meta?.status !== 200) {
          showTip({content: balance?.data?.meta?.msg});
        }
        const array = balance?.data?.data || [];
        const typeNames = [
          'My Income',
          'My Income',
          'Invitation Bonus',
          'Promotion Reward',
          '', // 平级奖励
          'Withdraw',
          'Exchange-INT',
          'Exchange-INT',
          'Exchange-USDT',
          'Exchange-USDT',
          'CommunityReward',
          'GlobalReward',
        ];
        array.forEach((item: any) => {
          arr.push({
            class: typeNames[item.type],
            time: moment(new Date(item.createdAt)).format('yyyy-MM-DD HH:mm'),
            deposit:
              (item.amount > 0 ? '+' : '') +
              parseFloat(item.amount) +
              (item.type * 1 === 8 || item.type * 1 === 9 ? ' INT' : ' USDT'),
          });
        });
        setLoading(false);
        setDataSource(arr);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    // balance
    axios({
      url: `${apiUrl}/api/public/v1/users/balance`,
      method: 'get',
      params: {wallet: connectedAccount},
    })
      .then((res: any) => {
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
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const columns: any[] = [
    {
      title: 'Classification',
      dataIndex: 'class',
      key: 'class',
      align: 'center',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      align: 'center',
      key: 'time',
    },
    {
      title: 'The Amount',
      dataIndex: 'profit',
      align: 'center',
      key: 'profit',
      sorter: true,
    },
  ];
  useEffect(() => {
    initRequest();
  }, []);
  return (
    <ProfitContainer className={loading ? 'loading' : ''}>
      <div className='nav'>
        <SvgIcon
          name='back'
          onClick={() => {
            router.back();
          }}
        />
        <span>Exchange</span>
      </div>
      <div className='smartContainer'>
        <WithDrawContainer>
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
            className='submit exchangepage'
            onClick={() => {
              handleExchange();
            }}
          >
            OK
          </div>
        </WithDrawContainer>
      </div>
      <PMyTable style={{marginTop: '20px'}}>
        <div className='header'>
          {columns.map((item, index) => {
            return <div key={index}>{item.title}</div>;
          })}
        </div>
        {dataSource.map((citem: any, cindex: any) => {
          return (
            <div className='content' key={cindex}>
              {Object.keys(citem).map((ckey) => {
                return <div key={ckey}>{citem[ckey]}</div>;
              })}
            </div>
          );
        })}
        {!loading && dataSource.length === 0 && (
          <Empty description={<span style={{color: '#eee'}}>No Data</span>} />
        )}
      </PMyTable>
    </ProfitContainer>
  );
};

Balance.displayName = 'Balance';

export default Balance;
