import axios from 'axios';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {userState} from '@/store/user';
import {ProfitContainer, PMyTable} from '@/styles/profit';
import {SvgIcon} from '@/uikit';

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
      const array = res?.data?.data || [];
      array.forEach((item: any) => {
        arr.push({
          class: 'deposit',
          time: item.createdAt,
          profit: `$${item.amount}USDT`,
        });
      });
      setDataSource(arr);
      axios({
        url: `${apiUrl}/api/public/v1/users/income`,
        method: 'get',
        params: {wallet: user.accountAddress},
      }).then((income) => {
        const array = income?.data?.data || [];
        array.forEach((item: any) => {
          arr.push({
            class: 'deposit',
            time: item.createdAt,
            profit: item.amount,
          });
        });
        setLoading(false);
        setDataSource(arr);
      });
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
        <span>Profit</span>
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
