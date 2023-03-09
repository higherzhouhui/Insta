import axios from 'axios';
import moment from 'moment';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {userState} from '@/store/user';
import {ProfitContainer, PMyTable} from '@/styles/profit';
import {SvgIcon} from '@/uikit';
import {showTip} from '@/utils';

const Porfit: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [dataSource, setDataSource] = useState<any>([]);
  const [user, setUser] = useRecoilState(userState);

  const initRequest = () => {
    const arr: any[] = [];
    setLoading(true);
    axios({
      url: `${apiUrl}/api/public/v1/users/deposit`,
      method: 'get',
      params: {wallet: user.accountAddress},
    }).then((res) => {
      if (res?.data?.meta?.status !== 200) {
        showTip({content: res?.data?.meta?.msg});
      }
      const array = res?.data?.data || [];
      array.forEach((item: any) => {
        arr.push({
          class: 'deposit',
          time: moment(new Date(item.createdAt)).format('yyyy-MM-DD HH:mm:ss'),
          deposit: `$${item.amount}USDT`,
        });
      });
      setDataSource(arr);
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
        <span>Deposit</span>
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
      </PMyTable>
    </ProfitContainer>
  );
};

Porfit.displayName = 'Porfit';

export default Porfit;
