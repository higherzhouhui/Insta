import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';

import type {NextPage} from 'next';

import {ProfitContainer, PMyTable} from '@/styles/profit';
import {SvgIcon} from '@/uikit';

const Porfit: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [dataSource, setDataSource] = useState<any>([]);
  const initRequest = () => {
    const arr: any[] = [];
    Array(20)
      .fill('')
      .forEach((_item, index) => {
        arr.push({
          class: Math.random() > 0.5 ? 'deposits' : 'income',
          time: Math.random() > 0.5 ? '02-20 18: 59' : '02-23 12: 29',
          profit: `$${Math.round(Math.random() * 1000) / 10}USDT`,
        });
      });
    setDataSource(arr);
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
      <PMyTable>
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
