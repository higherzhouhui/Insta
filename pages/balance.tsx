import {Empty} from 'antd';
import axios from 'axios';
import moment from 'moment';
import {useRouter} from 'next/router';
import {useState, useEffect, useContext} from 'react';
import {useTranslation} from 'react-i18next';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {withDrawAbi, withDrawContractAddress} from '@/config/withDrawContract';
import {Web3ProviderContext, useContract} from '@/ethers-react';
import {WithDrawContainer} from '@/styles/deposits';
import {ProfitContainer, PMyTable} from '@/styles/profit';
import {Modal, SvgIcon} from '@/uikit';
import {IMessageType, showTip} from '@/utils';

const Balance: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [dataSource, setDataSource] = useState<any>([]);
  const {connectedAccount} = useContext(Web3ProviderContext);
  const [withDrawvisable, setWithDrawVisable] = useState(false);
  const [rechargevisable, setRechargeVisable] = useState(false);
  const [withDrawNumber, setWithDrawNumber] = useState<number | string>();
  const {getContract} = useContract();
  const {t} = useTranslation();
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
  };
  const columns: any[] = [
    {
      title: t('Classification'),
      dataIndex: 'class',
      key: 'class',
      align: 'center',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: t('Time'),
      dataIndex: 'time',
      align: 'center',
      key: 'time',
    },
    {
      title: t('The Amount'),
      dataIndex: 'profit',
      align: 'center',
      key: 'profit',
      sorter: true,
    },
  ];

  const handleWithdraw = async () => {
    if (!withDrawNumber) {
      return;
    }
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
        // eslint-disable-next-line prettier/prettier, @typescript-eslint/await-thenable
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
        showTip({type: IMessageType.SUCCESS, content: t('OperationSuccess')});
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

  const handleRecharge = () => {};

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
        <span>Balance</span>
      </div>
      <div className='smartContainer'>
        <div className='top'>{t('Smartcontract')}</div>
        <div className='middle'>
          59548.55
          <div className='unit'>USDT</div>
        </div>
        <div className='bot'>
          <div
            className='recharge'
            onClick={() => {
              setWithDrawNumber('');
              setRechargeVisable(true);
            }}
          >
            {t('Recharge')}
          </div>
          <div
            className='recharge'
            onClick={() => {
              setWithDrawNumber('');
              setWithDrawVisable(true);
            }}
          >
            {t('Withdraw')}
          </div>
          <div className='recharge' onClick={() => router.push('/pledge')}>
            {t('Pledge')}
          </div>
        </div>
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
          <Empty
            description={<span style={{color: '#eee'}}>{t('NoData')}</span>}
          />
        )}
      </PMyTable>
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
            placeholder={t('PleaseEnter')}
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
            {t('Confirm')}
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
        visible={rechargevisable}
        width='80%'
        onClose={() => {
          setRechargeVisable(false);
        }}
      >
        <WithDrawContainer className={loading ? 'loading' : ''}>
          <h2>Recharge</h2>
          <input
            placeholder={t('PleaseEnter')}
            type='number'
            value={withDrawNumber || ''}
            onChange={(e: any) => {
              setWithDrawNumber(e.target.value);
            }}
          />
          <div
            className='submit'
            onClick={() => {
              handleRecharge();
            }}
          >
            {t('Confirm')}
          </div>
          <img
            className='close'
            src='/static/image/close.png'
            onClick={() => {
              setRechargeVisable(false);
            }}
          />
        </WithDrawContainer>
      </Modal>
    </ProfitContainer>
  );
};

Balance.displayName = 'Balance';

export default Balance;
