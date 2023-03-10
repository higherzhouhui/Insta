import {Statistic, List, Avatar} from 'antd';
import axios from 'axios';
import moment from 'moment';
import {useRouter} from 'next/router';
import {useState, useEffect, useContext} from 'react';
import CountUp from 'react-countup';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {Web3ProviderContext} from '@/ethers-react';
import {TotalAddress} from '@/styles/deposits';
import {MyTeamContainer} from '@/styles/myTeam';
import {SvgIcon} from '@/uikit';
import {showTip} from '@/utils';

const MyTeam: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {connectedAccount} = useContext(Web3ProviderContext);

  const [requestData, setRequestData] = useState<any>({});
  const initRequest = () => {
    setLoading(true);
    axios({
      url: `${apiUrl}/api/public/v1/users/team`,
      method: 'get',
      params: {wallet: connectedAccount},
    }).then((res: any) => {
      if (res?.data?.meta?.status !== 200) {
        showTip({content: res?.data?.meta?.msg});
      }
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
      <div className='level'>
        <div className='left'>
          <span>Level:</span>
          {requestData?.level}
        </div>
        <img className='grade' src='/static/image/grade.png' />
      </div>

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
              value={requestData.other_deposits || 0}
            />
          </div>
        </div>
      </TotalAddress>
      <div className='level'>Invited Users({requestData.invite_num || 0})</div>
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
                >
                  {`${item[0].slice(0, 10)}**************${item[0].slice(30)}`}
                </span>
              }
              title={
                <div style={{color: '#afa9a9'}}>
                  {moment(new Date(item[1])).format('yyyy-MM-DD HH:mm:ss')}
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
