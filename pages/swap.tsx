import {ethers} from 'ethers';
import {useState, useEffect, SetStateAction, useContext} from 'react';

import type {NextPage} from 'next';

import {approveAbi, approveContractAddress} from '@/config/approveContract';
import {USDTADDRESS, USECHAINID, WBNBADDRESS} from '@/config/contractAddress';
import {
  thinPancakeContractAddress,
  thinPancakeAbi,
} from '@/config/thinPancakeContract';
import {useContract, useEthersUtils, Web3ProviderContext} from '@/ethers-react';
import {MoneyContainer, SwapContainer} from '@/styles/swap';
import {SvgIcon} from '@/uikit';
import {getAccount, IMessageType, showTip} from '@/utils';

const Swap: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [setting, setSetting] = useState(false);
  const tabList = ['Avalance', 'BNB', 'Cronos', 'Polygon'];
  const [currentTab, setCurrentTab] = useState(tabList[1]);
  const [gasPrice, setgasPrice] = useState<number>();
  const [slippage, setslippage] = useState<number>();
  const [money, setMoney] = useState<number>();
  const [transFarMoney, settransFarMoney] = useState<number>();
  const {getContract} = useContract();
  const {getEtherPrice, getNormalPrice, getNetwork} = useEthersUtils();
  const exchangeOptionList = [
    {label: 'USDT', value: 'USDT', img: '/static/image/img6.webp'},
    {label: 'INT', value: 'INT', img: '/static/image/int.png'},
    {label: 'LTC', value: 'LTC', img: '/static/image/ltc.png'},
    {label: 'LINK', value: 'LINK', img: '/static/image/link.png'},
    {label: 'BNB', value: 'BNB', img: '/static/image/bnb.png'},
    {label: 'ADA', value: 'ADA', img: '/static/image/ada.png'},
    {label: 'DOGE', value: 'DOGE', img: '/static/image/doge.png'},
  ];
  const [fromObj, setFromObj] = useState(exchangeOptionList[0]);
  const [toObj, setToObj] = useState(exchangeOptionList[4]);
  const {connectedAccount} = useContext(Web3ProviderContext);
  const handleClickBtn = async () => {
    let account = connectedAccount;
    if (!account) {
      account = await getAccount();
    }
    if (!money) {
      showTip({type: IMessageType.WARN, content: 'Please Enter'});
      return;
    }
    // USDT TO BNB
    if (fromObj.value === 'USDT') {
      try {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const res = await provider.getNetwork();
        if (res.chainId !== USECHAINID) {
          try {
            await getNetwork(provider);
          } catch (error: any) {
            showTip({
              type: IMessageType.ERROR,
              content: error?.data?.message || error?.message,
            });
          }
          return;
        }
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const contract = await getContract(approveContractAddress, approveAbi);
        const edu = await contract.allowance(
          account,
          thinPancakeContractAddress
        );
        // 获取授权额度，如果未授权则先执行授权
        if (edu && getNormalPrice(edu._hex) === '0.0') {
          const price = getEtherPrice(99999999999);
          const approoveCon = await contract.approve(
            thinPancakeContractAddress,
            price
          );
        }

        // eslint-disable-next-line @typescript-eslint/await-thenable
        const thinPancakeContract = await getContract(
          thinPancakeContractAddress,
          thinPancakeAbi
        );
        // 正式链上替换
        const almostMoney = getEtherPrice(transFarMoney || 0) || 0;
        await thinPancakeContract.swapExactTokensForETH(
          getEtherPrice(money || 0),
          0,
          [USDTADDRESS, WBNBADDRESS],
          account,
          Math.floor(new Date().getTime() / 1000) + 60
        );
        setLoading(false);
        showTip({
          type: IMessageType.ERROR,
          content: 'Operation succeeded!',
        });
      } catch (error: any) {
        showTip({
          type: IMessageType.ERROR,
          content: error?.data?.message || error?.message,
        });
        setLoading(false);
      }
    } else {
      // BNB TO USDT
      try {
        setLoading(true);
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const thinPancakeContract = await getContract(
          thinPancakeContractAddress,
          thinPancakeAbi
        );
        // 正式链上替换
        const almostMoney = getEtherPrice(transFarMoney || 0) || 0;
        await thinPancakeContract.swapExactETHForTokens(
          0,
          [WBNBADDRESS, USDTADDRESS],
          account,
          Math.floor(new Date().getTime() / 1000) + 60,
          {value: getEtherPrice(money || 0)}
        );
        setLoading(false);
        showTip({
          type: IMessageType.ERROR,
          content: 'Operation succeeded!',
        });
      } catch (error: any) {
        showTip({
          type: IMessageType.ERROR,
          content: error?.data?.message || error?.message,
        });
        setLoading(false);
      }
    }
  };
  const transfarFrom2To = () => {
    const cfrom = JSON.parse(JSON.stringify(fromObj));
    const ctransfar = JSON.parse(JSON.stringify(toObj));
    setFromObj(ctransfar);
    setToObj(cfrom);
    if (money) {
      const huilv = (transFarMoney || 0) / (money || 0);
      const cmoney = money;
      settransFarMoney(cmoney / huilv);
    }
  };
  const handleChangeMoney = async (e: {
    target: {value: SetStateAction<string>};
  }) => {
    const value = e.target.value as any as number;
    setMoney(value);
    if (!value) {
      settransFarMoney(0);
      return;
    }
    let transMoney = 0;
    if (fromObj.value === 'USDT') {
      const result = await exchangeRate(value, true);
      transMoney = getNormalPrice(result[1]) as any as number;
    } else {
      const result = await exchangeRate(value, false);
      transMoney = getNormalPrice(result[1]) as any as number;
    }
    settransFarMoney(transMoney);
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

  const exchangeRate = async (amount: number, usdt2Bnb: boolean) => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const contract = await getContract(
      thinPancakeContractAddress,
      thinPancakeAbi
    );
    let exchangeNum = [];
    const price = getEtherPrice(amount);

    if (usdt2Bnb) {
      exchangeNum = await contract.getAmountsOut(price, [
        USDTADDRESS,
        WBNBADDRESS,
      ]);
    } else {
      exchangeNum = await contract.getAmountsOut(price, [
        WBNBADDRESS,
        USDTADDRESS,
      ]);
    }
    console.log(exchangeNum);
    return exchangeNum;
  };

  useEffect(() => {
    showTip({
      type: IMessageType.ERROR,
      content: 'Operation succeeded!',
      showTime: 9999999999999,
    });
  }, []);
  return (
    <SwapContainer className={loading ? 'loading' : ''}>
      <div className='tabList'>
        {tabList.map((item, index) => {
          return (
            <div
              className={`tab ${item === currentTab ? 'active' : ''}`}
              key={index}
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
                  type='number'
                  value={money}
                  onChange={handleChangeMoney}
                />
              </div>
              <div className='bot'>$-</div>
            </div>
            <div className='right'>
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
          </MoneyContainer>
        </div>
        <div
          className='connectBtn'
          onClick={() => {
            handleClickBtn();
          }}
        >
          {connectedAccount ? 'Confirm' : 'Connect Wallet'}
        </div>
      </div>
    </SwapContainer>
  );
};

Swap.displayName = 'Swap';

export default Swap;
