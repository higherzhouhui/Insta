import * as echarts from 'echarts';
import {useEffect} from 'react';

import type {NextPage} from 'next';

import {InfoContainer} from '@/styles/info';

const Info: NextPage = () => {
  useEffect(() => {
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
        data: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [100, 300, 700, 1800, 3900, 7200, 10562],
          type: 'line',
          smooth: true,
        },
      ],
    };
    option && myChart.setOption(option);
  }, []);
  return (
    <InfoContainer>
      <h2>INT TOKEN</h2>
      <div className='baseInfo'>
        <div className='left'>
          <h3>Today's increase: 2.0%</h3>
          <h3>Weekly increase: 3.2%</h3>
          <h3>Monthly increase: 6%</h3>
        </div>
        <div className='right'>$12.58</div>
      </div>
      <div id='main' />
      <img alt='info' className='infoimage' src='/static/image/info.png' />
    </InfoContainer>
  );
};

Info.displayName = 'Info';

export default Info;
