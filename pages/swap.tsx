import {useState, useEffect, SetStateAction} from 'react';

import type {NextPage} from 'next';

import {MoneyContainer, SwapContainer} from '@/styles/swap';
import {SvgIcon} from '@/uikit';

const swap: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [setting, setSetting] = useState(false);
  const tabList = ['Avalance', 'BNB', 'Cronos', 'Polygon'];
  const [currentTab, setCurrentTab] = useState(tabList[0]);
  const [gasPrice, setgasPrice] = useState();
  const [slippage, setslippage] = useState();
  const [money, setMoney] = useState('');
  const [transFarMoney, settransFarMoney] = useState('');
  const [from, setFrom] = useState({
    url: 'https://tokens.autofarm.network/43114-0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7.webp',
    title: 'AVAX',
  });
  const [transfar, setTransfar] = useState({
    url: 'https://tokens.autofarm.network/56-0x3ee2200efb3400fabb9aacf31297cbdd1d435d47.webp',
    title: 'ADE',
  });
  const transfarFrom2To = () => {
    const cfrom = JSON.parse(JSON.stringify(from));
    const ctransfar = JSON.parse(JSON.stringify(transfar));
    setFrom(ctransfar);
    setTransfar(cfrom);
  };
  const handleChangeMoney = (e: {target: {value: SetStateAction<string>}}) => {
    setMoney(e.target.value);
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
                          gasPrice * 1 === item ? 'active' : ''
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
                          slippage * 1 === item ? 'active' : ''
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
              <img alt='AVAX' src={from.url} />
              <span>{from.title}</span>
              <SvgIcon color='#fff' name='back' />
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
              <img alt='ADA' src={transfar.url} />
              <span>{transfar.title}</span>
              <SvgIcon color='#fff' name='back' />
            </div>
          </MoneyContainer>
        </div>
        <div className='connectBtn'>Connect Wallet</div>
      </div>
    </SwapContainer>
  );
};

swap.displayName = 'swap';

export default swap;
