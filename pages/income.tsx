import {Empty} from 'antd';
import axios from 'axios';
import moment from 'moment';
import {useRouter} from 'next/router';
import {useState, useEffect, useContext} from 'react';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {withDrawContractAddress, withDrawAbi} from '@/config/withDrawContract';
import {Web3ProviderContext, useContract} from '@/ethers-react';
import {WithDrawContainer} from '@/styles/deposits';
import {ProfitContainer, PMyTable} from '@/styles/profit';
import {SvgIcon, Modal} from '@/uikit';
import {IMessageType, showTip} from '@/utils';

const Income: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [dataSource, setDataSource] = useState<any>([]);
  const {connectedAccount} = useContext(Web3ProviderContext);
  const [withDrawvisable, setWithDrawVisable] = useState(false);
  const [withDrawNumber, setWithDrawNumber] = useState<number | string>();
  const {getContract} = useContract();

  const initRequest = () => {
    const arr: any[] = [];
    setLoading(true);
    axios({
      url: `${apiUrl}/api/public/v1/users/income`,
      method: 'get',
      params: {wallet: connectedAccount},
    })
      .then((income) => {
        if (income?.data?.meta?.status !== 200) {
          showTip({content: income?.data?.meta?.msg});
        }
        const array = income?.data?.data || [];
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
        <span>Income</span>
      </div>
      <div className='smartContainer withdrawContainer'>
        <div className='top'>Withdrawable income</div>
        <div className='middle'>
          59548.55
          <div className='unit'>USDT</div>
        </div>
        <div className='withdraw'>
          <div
            className='recharge'
            onClick={() => {
              setWithDrawNumber('');
              setWithDrawVisable(true);
            }}
          >
            withdraw
          </div>
        </div>
        <div className='shareContainer'>
          <div className='sitem'>
            <div className='stop'>Share revenue</div>
            <div className='sbot'>
              <span className='price'>32223.32</span>
              <span className='sunit'>usdt</span>
            </div>
          </div>
          <div className='sitem'>
            <div className='stop'>Pledge income</div>
            <div className='sbot'>
              <span className='price'>32223.32</span>
              <span className='sunit'>usdt</span>
            </div>
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
          <Empty description={<span style={{color: '#eee'}}>No Data</span>} />
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
            Confirm
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
    </ProfitContainer>
  );
};

Income.displayName = 'Income';

export default Income;
