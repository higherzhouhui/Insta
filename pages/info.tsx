import axios from 'axios';
import * as echarts from 'echarts';
import moment from 'moment';
import {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {Web3ProviderContext} from '@/ethers-react/Web3ContextProvider';
import {InfoContainer} from '@/styles/info';
import {showTip} from '@/utils';

const Info: NextPage = () => {
  const staticData = [
    {title: 'BNB', desc: '$22.66M(72.42%)'},
    {title: 'Cronos', desc: '$12.66M(34.92%)'},
    {title: 'Polygon', desc: '$1.726M(1.24%)'},
    {title: 'HECO', desc: '$5.36M(12.3%)'},
    {title: 'Avalance', desc: '$8.13M(9.1%)'},
    {title: 'Fantom', desc: '$0.66M(5.21%)'},
    {title: 'OKC', desc: '$22.66M(76.32%)'},
    {title: 'Verlas', desc: '$98.16M(7.12%)'},
    {title: 'Celo', desc: '$77.63M(9.2%)'},
    {title: 'Oasis', desc: '$69.36M(8.9%)'},
    {title: 'Aurora', desc: '$43.76M(31.95%)'},
    {title: 'Boba', desc: '$21.63M(5.5%)'},
    {title: 'KCC', desc: '$16.11M(3.277)'},
    {title: 'Gnosis', desc: '$46.1M(6.92%)'},
    {title: 'Wanchain', desc: '$2.5M(8.52%)'},
    {title: 'Evmos', desc: '$1.08M(5.02%)'},
  ];
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

  useEffect(() => {
    initRequestData();
  }, []);
  return (
    <InfoContainer>
      <h2>INT TOKEN</h2>
      <div className='baseInfo'>
        <div className='left'>
          <h3>{t('TodayIncreas')} 5%</h3>
          <h3>{t('WeeklyIncrease')} 63.22%</h3>
          <h3>{t('MonthlyIncrease')} 788.48%</h3>
        </div>
        <div className='right'>${finalPrice}</div>
      </div>
      <div id='main' />
      <div className='tvlContainer'>
        <h1>TVL</h1>
        <h2>$31.72M</h2>

        <div className='chainData'>
          {staticData.map((item, index) => {
            return (
              <div className='left' key={index}>
                <div className='title'>{item.title}</div>
                <div className='desc'>{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </InfoContainer>
  );
};

Info.displayName = 'Info';

export default Info;
