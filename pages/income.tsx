import {Empty} from 'antd';
import axios from 'axios';
import moment from 'moment';
import {useRouter} from 'next/router';
import {useState, useEffect, useContext} from 'react';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {Web3ProviderContext} from '@/ethers-react';
import {ProfitContainer, PMyTable} from '@/styles/profit';
import {SvgIcon} from '@/uikit';
import {showTip} from '@/utils';

const Income: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [dataSource, setDataSource] = useState<any>([]);
  const {connectedAccount} = useContext(Web3ProviderContext);

  const initRequest = () => {
    const arr: any[] = [];
    setLoading(true);
    axios({
      url: `${apiUrl}/api/public/v1/users/income`,
      method: 'get',
      params: {wallet: connectedAccount},
    }).then((income) => {
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
      title: 'Profit',
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
    <ProfitContainer>
      <div className='nav'>
        <SvgIcon
          name='back'
          onClick={() => {
            router.back();
          }}
        />
        <span>Income</span>
      </div>
      <PMyTable className={loading ? 'loading' : ''}>
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

Income.displayName = 'Income';

export default Income;
