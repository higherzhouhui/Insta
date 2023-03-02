import {Table, Statistic} from 'antd';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import CountUp from 'react-countup';

import type {NextPage} from 'next';

import {TotalAddress} from '@/styles/deposits';
import {MyTeamContainer} from '@/styles/myTeam';
import {SvgIcon} from '@/uikit';

const MyTeam: NextPage = () => {
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
          time: Math.random() > 0.5 ? '02-20 18: 59' : '02-23 12: 29',
          address: '0x5B9a81C121790575b3BF4e771a11c881BD176C08',
        });
      });
    setDataSource(arr);
  };
  const columns: any[] = [
    {
      title: 'Time',
      dataIndex: 'time',
      align: 'center',
      key: 'time',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      align: 'center',
      key: 'address',
    },
  ];
  const formatter = (value: any) => <CountUp end={value} separator=',' />;

  useEffect(() => {
    initRequest();
  }, []);
  return (
    <MyTeamContainer>
      <div className='nav'>
        <SvgIcon
          name='back'
          onClick={() => {
            router.back();
          }}
        />
        <span>My Team</span>
      </div>
      <p>grade</p>
      <h2>
        Level3
        <img className='grade' src='/static/image/grade.png' />
      </h2>

      <TotalAddress>
        <div className='left'>
          <div className='top'>Total address</div>
          <div className='bot'>
            <Statistic formatter={formatter} value={845} />
          </div>
        </div>
        <div className='left'>
          <div className='top'>Total deposit</div>
          <div className='bot'>
            <Statistic formatter={formatter} suffix='USDT' value={166548.875} />
          </div>
        </div>
      </TotalAddress>
      <h2>Invited Users</h2>
      <Table
        bordered={false}
        className='myTable'
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{y: 400}}
      />
    </MyTeamContainer>
  );
};

MyTeam.displayName = 'MyTeam';

export default MyTeam;
