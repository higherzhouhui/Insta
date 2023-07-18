import axios from 'axios';
import * as echarts from 'echarts';
import moment from 'moment';
import Image from 'next/image';
import {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {Web3ProviderContext} from '@/ethers-react/Web3ContextProvider';
import {InfoContainer} from '@/styles/info';
import {IMessageType, copyUrlToClip, showTip} from '@/utils';

const Info: NextPage = () => {
  const {connectedAccount} = useContext(Web3ProviderContext);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [increase, setIncrease] = useState(null);
  const {t} = useTranslation();
  const initRequestData = () => {
    axios({
      url: `${apiUrl}/api/public/v1/users/trend`,
      method: 'get',
      params: {wallet: connectedAccount},
    }).then((res) => {
      if (res?.data?.meta?.status !== 200) {
        showTip({content: res?.data?.meta?.msg});
      }
      const data = res?.data?.data || [];
      const xdata: string[] = [];
      const ydata: string[] = [];
      data.forEach((item: any) => {
        xdata.push(moment(new Date(item.createdAt)).format('MM-DD'));
        ydata.push(item.price);
      });
      setFinalPrice(data[data.length - 1].price);
      initLineChart(xdata, ydata);
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
  }, []);
  return (
    <InfoContainer>
      <div className='title'>
        <Image layout='fill' src='/static/image/title.png' />
      </div>
      <div className='myLevel'>
        <div className='desc'>我的等級</div>
        <div className='level'>V3</div>
      </div>
      <div className='myPower'>
        <div className='left'>
          <div className='desc'>我的算力</div>
          <div className='number'>{Number(3233442432).toLocaleString()}</div>
        </div>
        <div className='right'>確定</div>
      </div>
      <div className='totalPower'>
        <div className='left'>
          <div className='desc'>總算力</div>
          <div className='number'>{Number(3233442432).toLocaleString()}</div>
        </div>
        <div className='left'>
          <div className='desc'>小區算力</div>
          <div className='number'>{Number(3233442432).toLocaleString()}</div>
        </div>
      </div>
      <div className='share'>
        <Image layout='fill' src='/static/image/share.png' />
      </div>
      <div className='wrapper'>
        <div className='link'>邀請鏈接：</div>
        <div className='linkUrl'>
          <div className='mylink'>http://www.baidu.com</div>
          <div
            className='copy'
            onClick={() => {
              copyToClip('3232');
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
          <div className='list'>
            <div className='left'>23feafaefaewfawe</div>
            <div className='left'>2023-705</div>
          </div>
          {/* <div className='content'>暂无数据</div> */}
        </div>
      </div>
    </InfoContainer>
  );
};

Info.displayName = 'Info';

export default Info;
