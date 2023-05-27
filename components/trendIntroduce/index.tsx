import {Statistic, Switch} from 'antd';
import {FC, memo, useState, useEffect} from 'react';
import CountUp from 'react-countup';

import {TrendIntroduceContainer} from './styles';

import {useTranslation} from '@/hooks';

type IProps = {
  isOpen: boolean;
  handleSwitch: () => void;
};

export const TrendIntroduce: FC<IProps> = memo(({isOpen, handleSwitch}) => {
  const {t} = useTranslation();
  const [switchOpen, setSwitchOpen] = useState(isOpen);
  const dayList = [
    {key: 1, value: 2},
    {key: 5, value: 10},
    {key: 15, value: 30},
    {key: 30, value: 60},
  ];
  const [currentDay, setCurrentDay] = useState(dayList[0]);
  const handleClickDay = (item: any) => {
    setCurrentDay(item);
  };
  const formatter = (value: any) => (
    <CountUp end={value.toFixed(1)} separator=',' />
  );
  const handldChangeSwitch = (e: any) => {
    handleSwitch();
  };
  useEffect(() => {
    setSwitchOpen(isOpen);
  }, [isOpen]);

  return (
    <TrendIntroduceContainer>
      <div className='basicflex'>
        <div className='left'>{t('Invest  Days :')}</div>
        <div className='right list'>
          {dayList.map((item) => {
            return (
              <div
                className={`listItem ${
                  currentDay.key === item.key ? 'listItemActive' : ''
                }`}
                key={item.key}
                onClick={() => {
                  handleClickDay(item);
                }}
              >
                {item.key}D
              </div>
            );
          })}
        </div>
      </div>
      <div className='basicflex'>
        <div className='left'>{t('Daily  Yield  :')}</div>
        <div className='right'>
          <Statistic
            formatter={formatter}
            style={{color: '#fff'}}
            suffix='%'
            value={currentDay.value || 0}
          />
        </div>
      </div>
      <div className='basicflex'>
        <div className='left'>{t('automatic  :')}</div>
        <div className='right'>
          <Switch
            checked={switchOpen}
            onChange={(e) => {
              handldChangeSwitch(e);
            }}
          />
        </div>
      </div>
    </TrendIntroduceContainer>
  );
});

TrendIntroduce.displayName = 'TrendIntroduce';
