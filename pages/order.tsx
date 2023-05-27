import axios from 'axios';
import {useRouter} from 'next/router';
import {useState, useEffect, useContext} from 'react';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {Web3ProviderContext} from '@/ethers-react';
import {useTranslation} from '@/hooks';
import {MyOrderContainer} from '@/styles/order';
import {SvgIcon} from '@/uikit';
import {EventTypes, showTip, Event} from '@/utils';

const MyOrder: NextPage = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const [requestData, setRequestData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const {connectedAccount} = useContext(Web3ProviderContext);
  const [random, setRandom] = useState(Math.random());

  const [orders, setOrders] = useState({
    all: [],
    pro: [],
    com: [],
  });
  const tabList = [
    {key: 'all', title: t('All orders')},
    {key: 'pro', title: t('In progress')},
    {key: 'com', title: t('Completed')},
  ];
  const initRequest = () => {
    setLoading(true);
    axios({
      url: `${apiUrl}/api/public/v1/users/team`,
      method: 'get',
      params: {wallet: connectedAccount},
    })
      .then((res: any) => {
        if (res?.data?.meta?.status !== 200) {
          showTip({content: res?.data?.meta?.msg});
        }
        setLoading(false);
        if (res?.data?.meta?.status === 200) {
          setRequestData(res.data.data);
        } else {
          setRequestData({});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    initRequest();
    const refresHtml = () => {
      setRandom(Math.random());
    };
    Event.addListener(EventTypes.shiftLang, refresHtml);
  }, []);

  return (
    <MyOrderContainer>
      <div className='nav'>
        <SvgIcon
          name='back'
          onClick={() => {
            router.back();
          }}
        />
        <span>{t('Orders')}</span>
      </div>
    </MyOrderContainer>
  );
};

MyOrder.displayName = 'MyOrder';

export default MyOrder;
