import {Statistic, List, Avatar} from 'antd';
import axios from 'axios';
import moment from 'moment';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import CountUp from 'react-countup';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {userState} from '@/store/user';
import {TotalAddress} from '@/styles/deposits';
import {MyTeamContainer} from '@/styles/myTeam';
import {SvgIcon} from '@/uikit';
import {copyUrlToClip, IMessageType, showTip} from '@/utils';

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
  const [user, setUser] = useRecoilState(userState);
  const [requestData, setRequestData] = useState<any>({});
  const initRequest = () => {
    setLoading(true);
    axios({
      url: `${apiUrl}/api/public/v1/users/team`,
      method: 'get',
      params: {wallet: user.accountAddress},
    }).then((res: any) => {
      setLoading(false);
      if (res?.data?.meta?.status === 200) {
        setRequestData(res.data.data);
      } else {
        setRequestData({});
      }
    });
  };

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
          <div className='top'>Total deposit</div>
          <div className='bot'>
            <Statistic
              formatter={formatter}
              suffix='usdt'
              value={requestData.deposits_total || 0}
            />
          </div>
        </div>
        <div className='left'>
          <div className='top'>Other deposit</div>
          <div className='bot'>
            <Statistic
              formatter={formatter}
              suffix='usdt'
              value={requestData.other_deposits_total || 0}
            />
          </div>
        </div>
      </TotalAddress>
      <h2>Invited Users({requestData.invite_num || 0})</h2>
      <List
        dataSource={requestData?.wallets}
        loading={loading}
        renderItem={(item: any, index) => (
          <List.Item key={index} style={{borderBottom: '1px solid #000'}}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`/static/icon/avatar-icon${
                    Math.ceil(Math.random() * 6) + 1
                  }.png`}
                />
              }
              description={
                <span
                  style={{
                    color: '#d3c2c2',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    overflow: 'hidden',
                    display: 'inline-block',
                  }}
                  onClick={() => {
                    copyUrlToClip(item);
                    showTip({type: IMessageType.SUCCESS, content: 'copied!'});
                  }}
                >
                  {item}
                </span>
              }
              title={
                <div style={{color: '#afa9a9'}}>
                  {moment(
                    new Date().getTime() -
                      (index + 3) * Math.random() * 86400000
                  ).format('YYYY-MM-DD HH:mm')}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </MyTeamContainer>
  );
};

MyTeam.displayName = 'MyTeam';

export default MyTeam;
