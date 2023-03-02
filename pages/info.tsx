import {useEffect} from 'react';

import type {NextPage} from 'next';

import {InfoContainer} from '@/styles/info';

const Info: NextPage = () => {
  useEffect(() => {}, []);
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
      <img alt='info' className='infoimage' src='/static/image/info.png' />
    </InfoContainer>
  );
};

Info.displayName = 'Info';

export default Info;
