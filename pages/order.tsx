import {Switch} from 'antd';
import axios from 'axios';
import {useRouter} from 'next/router';
import {useState, useEffect, useContext, FC, memo} from 'react';
import {useTranslation} from 'react-i18next';

import type {NextPage} from 'next';

import {apiUrl} from '@/config';
import {Web3ProviderContext} from '@/ethers-react';
import {MyOrderContainer, OrderProductContainer} from '@/styles/order';
import {SvgIcon} from '@/uikit';
import {showTip} from '@/utils';

const MyOrder: NextPage = () => {
  const {t} = useTranslation();
  const router = useRouter();
  const [requestData, setRequestData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const {connectedAccount} = useContext(Web3ProviderContext);
  const [orders, setOrders] = useState<any>({
    all: [{}],
    pro: [{}, {automatic: true}, {}],
    com: [{}, {}],
  });
  const tabList = [
    {key: 'all', title: t('All orders')},
    {key: 'pro', title: t('In progress')},
    {key: 'com', title: t('Completed')},
  ];
  const [currentTab, setCurrentTab] = useState(tabList[0]);

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
          // 根据返回数据做处理
          setOrders({
            all: [],
            pro: [],
            com: [],
          });
        } else {
          setOrders({
            all: [],
            pro: [],
            com: [],
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    initRequest();
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
      <div className={`main ${loading ? 'loading' : ''}`}>
        <div className='tabList'>
          {tabList.map((item) => {
            return (
              <div
                className={`tab ${currentTab.key === item.key ? 'active' : ''}`}
                key={item.key}
                onClick={() => {
                  setCurrentTab(item);
                }}
              >
                {item.title}
              </div>
            );
          })}
        </div>
        <div>
          {orders[currentTab.key].map((item: any, index: number) => {
            return <OrderProduct key={index} {...item} />;
          })}
        </div>
      </div>
    </MyOrderContainer>
  );
};

interface IProps {
  pledge?: string;
  expect?: string;
  start?: string;
  end?: string;
  automatic?: boolean;
}

const OrderProduct: FC<IProps> = memo((product) => {
  const {t} = useTranslation();
  return (
    <OrderProductContainer>
      <div className='basicFlex'>
        <div className='left'>{t('PledgeAmount')}:</div>
        <div className='right'>{product?.pledge || 11}</div>
      </div>
      <div className='basicFlex'>
        <div className='left'>{t('ExpectedReturn')}:</div>
        <div className='right'>{product?.expect || 22}</div>
      </div>
      <div className='basicFlex'>
        <div className='left'>{t('StartingTime')}:</div>
        <div className='right'>{product?.start || '2023-5-27'}</div>
      </div>
      <div className='basicFlex'>
        <div className='left'>{t('EndTime')}:</div>
        <div className='right'>{product?.end || '2023-5-27'}</div>
      </div>
      {product.automatic ? (
        <div className='basicFlex'>
          <div className='left'>{t('Automatic')}:</div>
          <div className='right'>
            <Switch checked size='small' />
          </div>
        </div>
      ) : null}
    </OrderProductContainer>
  );
});

OrderProduct.displayName = 'OrderProduct';

MyOrder.displayName = 'MyOrder';

export default MyOrder;
