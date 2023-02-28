import {Table} from 'antd';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';

import type {NextPage} from 'next';

import {ProfitContainer} from '@/styles/profit';
import {SvgIcon} from '@/uikit';

const profit: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [dataSource, setDataSource] = useState<any>([]);
  const initRequest = () => {
    const arr: any[] = [];
    Array(11)
      .fill('')
      .forEach((_item, index) => {
        arr.push({
          key: index,
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
      <Table
        bordered={false}
        className='myTable'
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{y: 600}}
        size='small'
      />
    </ProfitContainer>
  );
};

profit.displayName = 'profit';

export default profit;
