import {useState, useEffect, SetStateAction} from 'react';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {userState} from '@/store/user';
import {userDrawerState} from '@/store/userDrawer';
import {MoneyContainer, SwapContainer} from '@/styles/swap';
import {SvgIcon} from '@/uikit';

const Swap: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [setting, setSetting] = useState(false);
  const tabList = ['Avalance', 'BNB', 'Cronos', 'Polygon'];
  const [currentTab, setCurrentTab] = useState(tabList[0]);
  const [gasPrice, setgasPrice] = useState<number>();
  const [slippage, setslippage] = useState<number>();
  const [money, setMoney] = useState('');
  const [transFarMoney, settransFarMoney] = useState('');
  const exchangeOptionList = [
    {label: 'USDT', value: 'USDT', img: '/static/image/usdt.png'},
    {label: 'INT', value: 'INT', img: '/static/image/int.png'},
    {label: 'LTC', value: 'LTC', img: '/static/image/ltc.png'},
    {label: 'LINK', value: 'LINK', img: '/static/image/link.png'},
    {label: 'BNB', value: 'BNB', img: '/static/image/bnb.png'},
    {label: 'ADA', value: 'ADA', img: '/static/image/ada.png'},
    {label: 'DOGE', value: 'DOGE', img: '/static/image/doge.png'},
  ];
  const [fromObj, setFromObj] = useState(exchangeOptionList[0]);
  const [toObj, setToObj] = useState(exchangeOptionList[1]);
  const [userDrawer, setUserDrawer] = useRecoilState(userDrawerState);
  const [user, _setUser] = useRecoilState(userState);
  const handleClickBtn = () => {
    if (!user.accountAddress) {
      setUserDrawer({
        open: !userDrawer.open,
      });
    }
  };
  const transfarFrom2To = () => {
    const cfrom = JSON.parse(JSON.stringify(fromObj));
    const ctransfar = JSON.parse(JSON.stringify(toObj));
    setFromObj(ctransfar);
    setToObj(cfrom);
  };
  const handleChangeMoney = (e: {target: {value: SetStateAction<string>}}) => {
    setMoney(e.target.value);
  };
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
  useEffect(() => {}, [currentTab]);
  return (
    <SwapContainer>
      <div className='tabList'>
        {tabList.map((item, index) => {
          return (
            <div
              className={`tab ${item === currentTab ? 'active' : ''}`}
              key={index}
              onClick={() => {
                setCurrentTab(item);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className='main'>
        <h2>Swap</h2>
        <div className='desc'>Optimize returns through trade routing</div>
        <div className='from'>From</div>
        <div className='setting'>
          <SvgIcon
            name='setting'
            onClick={() => {
              setSetting(!setting);
            }}
          />
        </div>
        {setting && (
          <div className='settingContainer'>
            <div className='settingContent'>
              <div className='desc'>Gas price(gwei)</div>
              <div className='settingItem'>
                <div className='left'>
                  {[6, 10, 15].map((item, index) => {
                    return (
                      <div
                        className={`chooseBtn ${
                          (gasPrice || 0) * 1 === item ? 'active' : ''
                        }`}
                        key={index}
                        onClick={() => {
                          setgasPrice(item);
                        }}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
                <input
                  placeholder='Custom'
                  type='number'
                  value={gasPrice}
                  onChange={(e: any) => {
                    setgasPrice(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className='settingContent'>
              <div className='desc'>Slippage tolerance</div>
              <div className='settingItem'>
                <div className='left'>
                  {[0.1, 0.5, 1].map((item, index) => {
                    return (
                      <div
                        className={`chooseBtn ${
                          (slippage || 0) * 1 === item ? 'active' : ''
                        }`}
                        key={index}
                        onClick={() => {
                          setslippage(item);
                        }}
                      >
                        {`${item}%`}
                      </div>
                    );
                  })}
                </div>
                <input
                  placeholder='Custom'
                  type='number'
                  value={slippage}
                  onChange={(e: any) => {
                    setslippage(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <div className='transformContainer'>
          <MoneyContainer>
            <div className='left'>
              <div className='top'>
                <input
                  placeholder='0.0'
                  type='text'
                  value={money}
                  onChange={handleChangeMoney}
                />
              </div>
              <div className='bot'>$-</div>
            </div>
            <div className='right'>
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
          </MoneyContainer>
          <div className='transform'>
            <SvgIcon
              name='transform'
              onClick={() => {
                transfarFrom2To();
              }}
            />
          </div>
          <div className='from'>To</div>
          <MoneyContainer>
            <div className='left'>
              <div className='top'>
                <input placeholder='0.0' type='text' value={transFarMoney} />
              </div>
              <div className='bot'>$-</div>
            </div>
            <div className='right'>
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
          </MoneyContainer>
        </div>
        <div
          className='connectBtn'
          onClick={() => {
            handleClickBtn();
          }}
        >
          {user.accountAddress ? 'confirm' : 'Connect Wallet'}
        </div>
      </div>
    </SwapContainer>
  );
};

Swap.displayName = 'Swap';

export default Swap;
