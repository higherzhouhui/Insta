import {Statistic, Skeleton, Divider, List, Avatar} from 'antd';
import moment from 'moment';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import CountUp from 'react-countup';
import InfiniteScroll from 'react-infinite-scroll-component';

import type {NextPage} from 'next';

import {TotalAddress} from '@/styles/deposits';
import {MyTeamContainer} from '@/styles/myTeam';
import {SvgIcon} from '@/uikit';

interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}
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
  const [data, setData] = useState<DataType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);
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
      <InfiniteScroll
        dataLength={data.length}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        hasMore={data.length < 50}
        loader={<Skeleton active avatar paragraph={{rows: 1}} />}
        next={loadMoreData}
        scrollableTarget='scrollableDiv'
        style={{background: '#181E30', padding: '4px', borderRadius: '8px'}}
      >
        <List
          dataSource={data}
          loading={loading}
          renderItem={(item, index) => (
            <List.Item
              key={item.email}
              style={{borderBottom: '1px solid #000'}}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                description={
                  <span style={{color: '#d3c2c2'}}>
                    {`0x1eDd${item?.email
                      ?.replace('.', '')
                      .replace('@example.com', '')
                      .toLowerCase()}E972`}
                  </span>
                }
                title={
                  <a href='https://ant.design' style={{color: '#fff'}}>
                    {item.name.last}
                  </a>
                }
              />
              <div style={{color: '#afa9a9'}}>
                {moment(
                  new Date().getTime() - index * Math.random() * 86400000
                ).format('YYYY-MM-DD HH:mm')}
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </MyTeamContainer>
  );
};

MyTeam.displayName = 'MyTeam';

export default MyTeam;
