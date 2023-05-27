import axios from 'axios';
import {useRouter} from 'next/router';
import {useState, useEffect, useContext, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';

import type {NextPage} from 'next';

import {TrendIntroduce} from '@/components';
import {apiUrl} from '@/config';
import {Web3ProviderContext} from '@/ethers-react';
import {PledgeContainer} from '@/styles/pledge';
import {SvgIcon} from '@/uikit';
import {showTip} from '@/utils';

const Pledge: NextPage = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const [requestData, setRequestData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const {connectedAccount} = useContext(Web3ProviderContext);
  const [deposits, setDeposits] = useState<number>();
  const [isOpenAutomic, setOpenAutomic] = useState(true);
  const [depositError, setDepositError] = useState(false);
  const handleSwitch = () => {
    setOpenAutomic(!isOpenAutomic);
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
  const initRequest = () => {
    setLoading(true);
    axios({
      url: `${apiUrl}/api/public/v1/users/team`,
      method: 'get',
      params: {wallet: connectedAccount},
    })
      .then((res: any) => {
        if (res?.data?.meta?.status !== 200) {
          showTip({content: res?.data?.meta?.msg});
        }
        setLoading(false);
        if (res?.data?.meta?.status === 200) {
          // 根据返回数据做处理
          setRequestData([]);
        } else {
          setRequestData([]);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const handleClickBtn = () => {
    console.log(222);
  };
  useEffect(() => {
    initRequest();
  }, []);

  return (
    <PledgeContainer>
      <div className='nav'>
        <SvgIcon
          name='back'
          onClick={() => {
            router.back();
          }}
        />
        <span>{t('Pledge')}</span>
      </div>
      <div className={`main ${loading ? 'loading' : ''}`}>
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
              {/* <div className='usdtWrapper'>
                <SvgIcon name='usdt' />
                <span>USDT</span>
              </div>
              <div className='bep'>BEP20</div> */}
            </div>
          </div>
          <div className='trendWrapper'>
            <TrendIntroduce
              handleSwitch={handleSwitch}
              isOpen={isOpenAutomic}
            />
          </div>
          <div
            className='approveBtn'
            onClick={() => {
              handleClickBtn();
            }}
          >
            Pledge
          </div>
        </div>
      </div>
    </PledgeContainer>
  );
};

Pledge.displayName = 'Pledge';

export default Pledge;
