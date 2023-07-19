import axios from 'axios';
import * as echarts from 'echarts';
import moment from 'moment';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {getInviters, getPower} from '@/services/user';
import {userState} from '@/store/user';
import {InfoContainer} from '@/styles/info';
import {IMessageType, copyUrlToClip, showTip} from '@/utils';

const Info: NextPage = () => {
  const [user, setUser] = useRecoilState(userState);
  const [totalPower, setTotalPower] = useState<any>({});
  const [inviteLink, setInviteLink] = useState('');
  const [list, setList] = useState<any>([]);
  const {t} = useTranslation();
  const initRequestData = () => {
    Promise.all([getPower(), getInviters()])
      .then((res: any) => {
        const [power, inviters] = res;
        setTotalPower(power.DATA || {});
        const mlist = inviters.DATA || [];
        mlist.forEach((item: any) => {
          item.wallet = `${item.wallet.slice(0, 8)}...${item.wallet.slice(37)}`;
          item.created_at = moment(item.created_at).format('YYYY-MM-DD HH:mm');
        });
        setList(inviters.DATA);
      })
      .catch((err) => {
        console.log(err);
        showTip({content: err || 'error'});
      });
  };

  const initIncrease = () => {
    axios({
      url: `${apiUrl}/api/public/v1/users/increase`,
      method: 'get',
      params: {},
    }).then((res) => {
      if (res?.data?.meta?.status !== 200) {
        showTip({content: res?.data?.meta?.msg});
      }
      const data = res?.data?.data || [];
      // setIncrease({
      //   'today': parseFloat(data.today)
      // });
    });
  };

  const initLineChart = (xdata: string[], ydata: string[]) => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom as any);
    const option = {
      grid: {
        top: '20px',
        left: '50px',
        right: '0',
        bottom: '30px',
      },
      xAxis: {
        type: 'category',
        data: xdata,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: ydata,
          type: 'line',
          smooth: true,
        },
      ],
    };
    option && myChart.setOption(option);
  };
  const copyToClip = (url: string) => {
    copyUrlToClip(url);
    showTip({type: IMessageType.SUCCESS, content: '複製成功'});
  };
  useEffect(() => {
    initRequestData();
    setInviteLink(`${location.host}?inviterId=${user?.invite_code}`);
  }, []);

  return (
    <InfoContainer>
      <div className='title'>
        <Image layout='fill' src='/static/image/title.png' />
      </div>
      <div className='myLevel'>
        <div className='desc'>我的等級</div>
        <div className='level'>V{user?.level || 0}</div>
      </div>
      <div className='myPower'>
        <div className='left'>
          <div className='desc'>我的算力</div>
          <div className='number'>
            {Number(user?.hash_rate || 0).toLocaleString()}
          </div>
        </div>
        <div className='right'>確定</div>
      </div>
      <div className='totalPower'>
        <div className='left'>
          <div className='desc'>總算力</div>
          <div className='number'>
            {Number(totalPower?.totalHashRate || 0).toLocaleString()}
          </div>
        </div>
        <div className='left'>
          <div className='desc'>小區算力</div>
          <div className='number'>
            {Number(totalPower?.minHashRate || 0).toLocaleString()}
          </div>
        </div>
      </div>
      <div className='share'>
        <Image layout='fill' src='/static/image/share.png' />
      </div>
      <div className='wrapper'>
        <div className='link'>邀請鏈接：</div>
        <div className='linkUrl'>
          <div className='mylink'>{inviteLink}</div>
          <div
            className='copy'
            onClick={() => {
              copyToClip(inviteLink);
            }}
          >
            <Image layout='fill' src='/static/image/copy.png' />
          </div>
        </div>
      </div>
      <div className='wrapper' style={{marginTop: '30px', borderRadius: '6px'}}>
        <div className='invites'>
          <div className='header'>
            <div className='left'>地址</div>
            <div className='left'>時間</div>
          </div>
          {list.map((item: any, index: number) => {
            return (
              <div className='list' key={index}>
                <div className='left'>{item.wallet}</div>
                <div className='left'>{item.created_at}</div>
              </div>
            );
          })}
          {/* <div className='content'>暂无数据</div> */}
        </div>
      </div>
    </InfoContainer>
  );
};

Info.displayName = 'Info';

export default Info;
