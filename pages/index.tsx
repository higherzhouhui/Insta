import axios from 'axios';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

// eslint-disable-next-line import/order
import {apiUrl} from '@/config';
import {staticHomeData} from '@/config/staticData';
import {userState} from '@/store/user';
import {userDrawerState} from '@/store/userDrawer';
import {HomeContainer, InviterComp} from '@/styles/home';
import {Modal, SvgIcon} from '@/uikit';
import {getAccount, IMessageType, showTip} from '@/utils';

import 'swiper/css';

const Home: NextPage = () => {
  const homeRef: any = useRef(null);
  const [visible, setVisible] = useState(false);
  const [userDrawer, setUserDrawer] = useRecoilState(userDrawerState);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  const {inviterId} = router.query;
  const [loading, setLoading] = useState(false);
  const handleClickBtn = async () => {
    setLoading(true);
    let accountAddress = user.accountAddress;
    if (!accountAddress) {
      // eslint-disable-next-line require-atomic-updates
      accountAddress = await getAccount();
    }
    axios({
      url: `${apiUrl}/api/public/v1/users/register`,
      method: 'post',
      data: {parent: inviterId, wallet: accountAddress},
    }).then((res: any) => {
      setLoading(false);
      if (res?.data?.meta?.status === 200) {
        const {createdAt, id, last_login, path, pid, updatedAt, uuid} =
          res.data.data;
        setUser({
          expiresAt: 15155,
          portrait: '',
          token: uuid,
          username: 'james',
          userId: id,
          accountAddress,
          createdAt,
          id,
          last_login,
          path,
          pid,
          updatedAt,
          uuid,
        });
        showTip({
          type: IMessageType.SUCCESS,
          content: 'Register successfully!',
        });
      } else {
        showTip({type: IMessageType.ERROR, content: res?.data?.meta?.msg});
      }
    });
    setVisible(false);
  };
  useEffect(() => {
    if (inviterId && !user.uuid) {
      setVisible(true);
    }
    // axios({
    //   url: 'http://www.pixso.site/summary.json',
    //   method: 'get',
    //   responseType: 'json',
    // });
  }, [inviterId, user.uuid]);

  const logoList = [
    '/static/image/img1.webp',
    '/static/image/img2.webp',
    '/static/image/img3.webp',
    '/static/image/img4.webp',
    '/static/image/img5.webp',
    '/static/image/img6.webp',
    '/static/image/img7.webp',
    '/static/image/img8.webp',
    '/static/image/img9.webp',
    '/static/image/img7.webp',
    '/static/image/img10.webp',
  ];
  const titleList = [
    'WBNB-AUTO',
    'BUSD-AUTO LP',
    'WBNB-CAKE LP',
    'WBNB-BUSD LP',
    'ADA-WBNB LP',
    'wbnb-xvs LP',
    'ETH-WBNB LP',
    'ADA-WBNB LP',
    'TUSD-BUSD LP',
    'TRX-BUSD LP',
    'AXX-BUSD LP',
  ];
  const descList = [
    'PancakeSwap',
    'Auto',
    'MDEX',
    'BNB-PancakeSwap',
    'Polygon-MeshSwap',
    'Polygon-Sushi',
    'Cronos-Crona',
    'Polygon-MeshSwap',
    'Polygon-Sushi',
    'Polygon-Sushi',
    'Polygon-Quickswap',
  ];
  const newestObj = {
    img1: '/static/image/img1.webp',
    img2: '/static/image/img2.webp',
    title: 'WBNB-GAL LP',
    desc: 'BNB-PancakeSwap',
    number: 5.11,
  };
  const [newestList, setNewestList] = useState();
  const ourPartners = [
    'Google',
    'Baidu',
    'Alibaba',
    'Tengxun',
    'Inter',
    'RedMi',
    'Huawei',
    'Oppera',
  ];
  return (
    <HomeContainer ref={homeRef}>
      <h1>The best cross‑chain Yield Aggregator across DeFi</h1>
      <h3>Buy and deposit on insta and start earning</h3>
      <div className='btnGroup'>
        <div className='btn'>
          Browse Vaults
          <SvgIcon color='#fff' name='right-icon' />
        </div>
        <div className='btn btnRight' onClick={() => router.push('/learnMore')}>
          Learn More
        </div>
      </div>
      <h3>Total Value Locked</h3>
      <h2>$30,976,140.71</h2>
      <div className='divide' />
      <h2>Supported Chains</h2>
      <div className='grid'>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              fill='none'
              height='24'
              viewBox='206 78 100 100'
              width='24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M229.014 92.665L256.042 77l27.028 15.665-9.937 5.786-17.091-9.877-17.092 9.877-9.936-5.786zm54.056 19.755l-9.937-5.787-17.091 9.878-17.092-9.878-9.936 5.787v11.574l17.091 9.877v19.756l9.937 5.787 9.937-5.787v-19.756l17.091-9.877V112.42zm0 31.329v-11.574l-9.937 5.787v11.574l9.937-5.787zm7.055 4.091l-17.091 9.877v11.574l27.028-15.664v-31.329l-9.937 5.786v19.756zm-9.937-45.298l9.937 5.787v11.574l9.937-5.787v-11.574l-9.937-5.787-9.937 5.787zm-34.083 59.366v11.574l9.937 5.787 9.937-5.787v-11.574l-9.937 5.787-9.937-5.787zm-17.091-18.159l9.936 5.787v-11.574l-9.936-5.787v11.574zm17.091-41.207l9.937 5.787 9.937-5.787-9.937-5.787-9.937 5.787zm-24.147 5.787l9.937-5.787-9.937-5.787-9.937 5.787v11.574l9.937 5.787v-11.574zm0 19.755l-9.937-5.786v31.329l27.029 15.664v-11.574l-17.092-9.877v-19.756z'
                fill='#F0B90B'
              />
            </svg>
          </div>
          <div className='font-medium text-sm'>BNB</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              fill='none'
              height='28'
              viewBox='0 0 41 40'
              width='28'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M20.464 1.667l-16.63 9.457v18.908l16.63 9.45 16.618-9.45V11.124L20.464 1.666zM32.16 27.23l-11.695 6.65-11.7-6.65V13.92l11.7-6.65 11.695 6.65v13.31z'
                fill='#002D74'
              />
              <path
                d='M20.464 39.483l16.619-9.451V11.124L20.464 1.666v5.61l11.695 6.65v13.31L20.464 33.88v5.604z'
                fill='url(#cronos_svg__paint0_linear)'
              />
              <path
                d='M20.454 1.667l-16.618 9.45v18.909l16.618 9.457v-5.61L8.76 27.224V13.913L20.454 7.27V1.667z'
                fill='url(#cronos_svg__paint1_linear)'
              />
              <path
                d='M28.219 24.992l-7.762 4.412-7.769-4.412v-8.83l7.769-4.417 7.762 4.418L24.988 18l-4.531-2.58-4.531 2.58v5.147l4.53 2.58 4.532-2.58 3.23 1.844z'
                fill='#002D74'
              />
              <defs>
                <linearGradient
                  gradientUnits='userSpaceOnUse'
                  id='cronos_svg__paint0_linear'
                  x1='28.773'
                  x2='28.773'
                  y1='39.483'
                  y2='20.575'
                >
                  <stop stopColor='#002D74' />
                  <stop offset='1' stopColor='#002D74' stopOpacity='0' />
                </linearGradient>
                <linearGradient
                  gradientUnits='userSpaceOnUse'
                  id='cronos_svg__paint1_linear'
                  x1='12.145'
                  x2='12.145'
                  y1='1.667'
                  y2='20.575'
                >
                  <stop stopColor='#002D74' />
                  <stop offset='1' stopColor='#002D74' stopOpacity='0' />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className='font-medium text-sm'>Cronos</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              fill='none'
              height='32'
              viewBox='0 0 32 32'
              width='32'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='16' cy='16' fill='#8247E5' r='16' />
              <path
                d='M21.144 12.89c-.366-.19-.836-.19-1.254 0l-2.924 1.567-1.984.997-2.872 1.567c-.366.19-.836.19-1.254 0l-2.245-1.235a1.142 1.142 0 01-.627-.997v-2.374c0-.38.21-.76.627-.997l2.245-1.186c.366-.19.836-.19 1.254 0l2.245 1.234c.366.19.627.57.627.997v1.567l1.984-1.045v-1.614c0-.38-.209-.76-.627-.997l-4.177-2.232c-.366-.19-.836-.19-1.253 0l-4.282 2.28c-.418.19-.627.57-.627.949v4.463c0 .38.209.76.627.997l4.23 2.231c.365.19.835.19 1.253 0l2.872-1.519 1.984-1.044 2.872-1.52c.366-.19.836-.19 1.253 0l2.246 1.187c.365.19.626.57.626.997v2.374c0 .38-.208.76-.626.997l-2.193 1.187c-.366.19-.836.19-1.254 0l-2.245-1.187a1.142 1.142 0 01-.627-.997v-1.52l-1.984 1.045v1.567c0 .38.209.76.627.997l4.23 2.232c.365.19.835.19 1.253 0l4.23-2.232c.365-.19.626-.57.626-.997v-4.51c0-.38-.209-.76-.627-.997l-4.23-2.232z'
                fill='#fff'
              />
            </svg>
          </div>
          <div className='font-medium text-sm'>Polygon</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              fill='none'
              height='32'
              viewBox='0 0 32 32'
              width='32'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16z'
                fill='#fff'
              />
              <path
                clipRule='evenodd'
                d='M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zM12.489 8.293a.88.88 0 00-.88-.88h-3.44v7.295c.918-1.715 2.496-3.245 4.32-3.97V8.292zm3.099 8.231a2 2 0 00-2 2v2.32h2.845a7.36 7.36 0 007.36-7.36V8.293a.88.88 0 00-.88-.88h-3.44v6.071a3.04 3.04 0 01-3.04 3.04h-.845zm.805-1.075a2 2 0 002-2v-2.32h-2.845a7.36 7.36 0 00-7.36 7.36v5.191c0 .486.394.88.88.88h3.44V18.49a3.04 3.04 0 013.04-3.04h.845zm3.1 8.231c0 .486.393.88.88.88h3.44v-7.295c-.919 1.715-2.498 3.245-4.32 3.97v2.445z'
                fill='#00943E'
                fillRule='evenodd'
              />
            </svg>
          </div>
          <div className='font-medium text-sm'>HECO</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              fill='none'
              height='28'
              viewBox='0 0 28 28'
              width='28'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M14 28c7.732 0 14-6.268 14-14S21.732 0 14 0 0 6.268 0 14s6.268 14 14 14z'
                fill='#E84142'
              />
              <path
                d='M17.983 14.204c.391-.712 1.023-.712 1.414 0l2.436 4.504c.391.712.071 1.292-.711 1.292h-4.908c-.774 0-1.094-.58-.711-1.292l2.48-4.504zm-4.712-8.67c.391-.712 1.013-.712 1.405 0l.542 1.03 1.28 2.369c.312.674.312 1.47 0 2.144l-4.294 7.837A2.24 2.24 0 0110.444 20H6.878c-.782 0-1.102-.571-.711-1.292l7.104-13.174z'
                fill='#fff'
              />
            </svg>
          </div>
          <div className='font-medium text-sm'>Avalanche</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              fill='none'
              height='32'
              viewBox='0 0 32 32'
              width='32'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16z'
                fill='#0062F9'
              />
              <path
                d='M15.094 7.043c.492-.247 1.24-.247 1.732 0l5.019 2.521c.3.151.463.377.489.609h.004v12.731h-.001c-.012.247-.177.49-.492.65L16.826 26.1c-.491.25-1.24.25-1.732 0l-5.018-2.544c-.32-.163-.475-.415-.482-.666v.015-12.731h.001c.02-.235.175-.455.48-.609l5.02-2.521zm-4.739 10.224v5.582l4.74 2.39c.273.14.557.278.835.288h.03c.252.002.496-.108.743-.224l.089-.041 4.784-2.433v-5.513l-4.693 2.353c-.484.242-1.216.247-1.709.013l-.027-.013-4.792-2.402zm-1.564 5.372c0 .485.06.803.178 1.027.098.186.245.328.513.501l.015.01c.059.038.123.077.202.123l.093.054.286.163-.41.642-.32-.183-.053-.031a6.933 6.933 0 01-.24-.146c-.764-.488-1.05-1.02-1.055-2.126v-.034h.791zm7.59-8.75v5.166a.783.783 0 00.132-.05l5.03-2.523a.42.42 0 00.015-.007l.005-.003-.008-.004-.012-.006-5.03-2.522a.783.783 0 00-.132-.05zm-.762.01a.743.743 0 00-.103.041l-5.03 2.522a.676.676 0 00-.015.008l-.004.002.008.005.011.005 5.03 2.522c.032.016.066.03.103.042v-5.147zm-5.264-2.845v4.624l4.606-2.31-4.606-2.314zm11.22-.005l-4.561 2.293 4.562 2.287v-4.58zm-5.117-3.342c-.261-.13-.734-.13-.995 0l-5.018 2.522a.67.67 0 00-.015.008l-.005.002.008.004.012.006 5.018 2.522c.261.131.734.131.995 0l5.018-2.522a.676.676 0 00.015-.008l.004-.002-.008-.004-.011-.006-5.018-2.522zm5.874.278l.32.183.053.03c.093.055.17.101.24.147.764.488 1.05 1.02 1.055 2.126v.033h-.791c0-.484-.06-.802-.178-1.027-.098-.186-.244-.328-.512-.5l-.016-.01a6.263 6.263 0 00-.202-.124l-.093-.054-.286-.163.41-.641z'
                fill='#fff'
              />
            </svg>
          </div>
          <div className='font-medium text-sm'>Fantom</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              height='20'
              viewBox='0 0 841.5 1070.82'
              width='20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g data-name='Layer 2' fill='currentColor'>
                <g data-name='Layer 1'>
                  <path d='M796.47 279.21c11.7 34.33 17.24 70.6 18.39 106.79a471.26 471.26 0 01-1.42 53.54c-1.16 14-.31 33.5-9.9 44.93a41.9 41.9 0 01-6.66 6c-90.63 70-219.28 68.61-314.15 9.35-28.41-17.75-53.64-39.76-82.46-56.83-36-21.34-75.54-37-117.17-42.35-42.05-5.4-85.26-4-126.43 6.61-38.07 9.82-73.3 28.09-104.47 52-9.23 7.06-18.55 14.86-29.92 17.3a4.94 4.94 0 01-3 0c-2.68-1.12-2.67-7.36-3.07-9.69a111 111 0 01-1.52-12.33c-1.2-21.08-3.23-42.21-2.67-63.26 1.46-55.12 13.47-110.42 36.07-160.77 23.27-51.82 59.15-94.41 101.4-131.9 40.91-36.31 87.25-63.94 139.78-79.91C372.07-6.51 461-6.76 543 21.24c74.18 25.33 137.7 71.18 186.82 131.93a347.63 347.63 0 0147.63 78c6.85 15.52 13.43 31.63 19.02 48.04z' />
                  <path d='M637.1 642.61c-58-.39-113.5-18.5-162.54-48.85-44.26-27.4-84.81-62.3-134-80.94-46.12-17.48-97.15-20.49-145.57-12.36-51.65 8.68-93.39 30.88-135.39 61.25-12.51 9-32.76 25.36-48.33 14.11-8.65-6.25-13.58-17.71-10.24-27.38 5.06-14.63 27.18-25.22 39.22-33.62a479.82 479.82 0 0151.29-31.7C193.39 429.63 327.49 435.91 423.1 500c13.33 8.94 26.23 18.52 39.66 27.33 46.1 30.27 88.42 56.49 144.47 63.09 55.63 6.56 117.57-4 164.84-35.26 11.51-7.6 22.68-15.71 34.36-23 10.57-6.62 21.7-2.73 28.92 5.63 6.53 7.56 7.72 16.36 4.22 25.53a20.17 20.17 0 01-6.09 8.73c-55.23 41.08-115.82 68.39-185.64 70.46q-5.37.14-10.74.1z' />
                  <path d='M240 807.05V596.28c0-8.82.66-17.63.5-26.44-.17-10.12 7.88-19.34 17.83-23.55 8.32-3.53 19.68.15 26.26 7.28 5.47 5.92 7.81 12.59 7.81 20.63q0 105.85.25 211.73.12 113.87.11 227.74c0 9.82.41 19.7-.57 29.43-2.24 22.16-19.78 34.21-39.1 24.11-8.17-4.27-12.35-12.34-12.43-21.93-.09-11-.07-22-.08-33q-.06-98.15-.11-196.29v-9zM194.39 696.32v112.32c0 10.27-2.75 19.42-11 26.11-11.77 9.59-22.31 6.51-32.8-3.31-6.62-6.19-8.79-14.92-8.81-23.68q-.27-111.33-.06-222.65a81.66 81.66 0 012.15-17.74c2.79-12.28 21.63-21 33.06-16 13.1 5.74 17.25 16.4 17.26 29.58v115.32zM585.13 827.39v117.8c0 4.28-.07 8.77-1.35 12.76-.93 2.88-3.72 5.29-6 7.57-13.51 13.39-34.24 7.05-41.52-6.84-1.91-3.63-2.61-8.28-2.62-12.46q-.23-119.57-.07-239.12c0-14.59 10.59-25.43 25.85-26.38 9.1-.56 22.32 6.23 25.29 19.43a30 30 0 01.47 6.43q-.02 60.42-.05 120.81zM683.05 817.94c0 34.3.22 68.6-.09 102.89-.15 16.29-14 25.94-29.09 24.56-14.4-1.32-22.66-12.74-22.62-27.16.18-59.78.07-119.55.17-179.32 0-9.61.27-19.24 1-28.82.72-9.41 11.18-18.14 20.53-19.22 13.17-1.53 22.16 3.92 27.92 15.16 1.57 3.06 2 7 2.06 10.51.14 33.8.08 67.6.08 101.4zM44.72 710.94c0-28.13-.13-56.27.06-84.4.09-14 17.72-31.91 33.31-23.83 9.66 5 16.69 12 17.25 23.59.54 11 1 21.91 1.08 32.87q.43 44.69.5 89.35c0 15.31.26 30.65-.62 45.92-.66 11.43-4.58 21.25-16.49 26.71-11 5.06-25.43-.62-30.88-9.85-3.49-5.92-4.74-12.11-4.65-19 .31-21.46.22-42.94.27-64.41v-17zM338.17 693.36c0-24.3-.17-48.6.12-72.9a71.19 71.19 0 012.56-19.08c5-17.11 26.19-20.47 37.64-11.15 9.57 7.79 11 17.93 11.06 28.94.09 46.77.24 93.54.15 140.3a228.33 228.33 0 01-1.6 28.29c-1.28 10.15-9 15.36-17.85 18a24.15 24.15 0 01-28.59-12.68c-2.55-5.53-3.59-12.18-3.68-18.34-.38-27.13-.16-54.26-.16-81.39zM782.06 737.5c0 15 .05 30 0 44.94-.06 13.68-18.2 30.24-36.47 21.74-12.41-5.78-16-15.51-16.09-27.69q-.18-37.44.08-74.89a97.54 97.54 0 011.4-15.34c1.77-10.66 9.25-16.23 18.91-18.6s17.92.71 25.15 8.05c5.57 5.66 7.18 11.91 7.08 19.35-.19 14.15-.07 28.29-.06 42.44zM436.27 691.41c0-8 .26-16-.06-24-.62-15.71 18-27.49 31.56-24.27 10 2.36 19.62 14.55 19.64 24.64 0 14.64-.08 29.29-.24 43.93-.18 15-9.75 25.11-24.82 26.43-11.9 1-25.46-10.78-25.85-22.81-.26-8-.05-16-.05-24z' />
                </g>
              </g>
            </svg>
          </div>
          <div className='font-medium text-sm'>Moonriver</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              fill='none'
              height='28'
              viewBox='0 0 28 28'
              width='28'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M14 28c7.732 0 14-6.268 14-14S21.732 0 14 0 0 6.268 0 14s6.268 14 14 14z'
                fill='#282C31'
              />
              <path
                d='M15.474 16.579a4.053 4.053 0 100-8.105 4.053 4.053 0 000 8.105zm0 1.474a5.526 5.526 0 110-11.053 5.526 5.526 0 010 11.053z'
                fill='#35D07F'
              />
              <path
                d='M12.526 19.526a4.053 4.053 0 100-8.105 4.053 4.053 0 000 8.105zm0 1.474a5.526 5.526 0 110-11.053 5.526 5.526 0 010 11.053z'
                fill='#FBCC5C'
              />
              <path
                d='M15.655 18.05a4.039 4.039 0 00.803-1.591 4.042 4.042 0 001.592-.803 5.502 5.502 0 01-.43 1.965 5.502 5.502 0 01-1.965.43zm-4.113-6.508a4.04 4.04 0 00-1.592.804 5.502 5.502 0 01.43-1.965 5.503 5.503 0 011.965-.43 4.04 4.04 0 00-.803 1.591z'
                fill='#ECFF8F'
              />
            </svg>
          </div>
          <div className='font-medium text-sm'>Celo</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              fill='none'
              height='18'
              viewBox='0 0 34 34'
              width='18'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M26.232 0c-3.94 0-7.154 3.214-7.258 7.154v7.984c-.726 0-1.451.104-2.28.104-.83 0-1.556 0-2.282.103v-8.19c0-3.94-3.318-7.155-7.362-7.051C3.215.104.105 3.318 0 7.154v19.078c.104 3.94 3.318 7.154 7.362 7.05 3.94-.103 7.05-3.214 7.05-7.05v-7.984c.726 0 1.452-.103 2.281-.103.83 0 1.555 0 2.281-.104v8.087c.104 3.94 3.318 7.154 7.362 7.05 3.94-.103 7.05-3.213 7.05-7.05V7.154c0-3.94-3.214-7.154-7.154-7.154zM7.258 2.903c2.385 0 4.25 1.866 4.25 4.251v8.399c-2.073.31-4.146.933-6.116 1.762-.83.415-1.66.83-2.385 1.452V7.154c0-2.28 1.866-4.25 4.25-4.25zm4.25 23.329c0 2.385-1.865 4.251-4.25 4.251s-4.251-1.866-4.251-4.251v-1.866c0-1.66 1.348-3.318 3.629-4.251 1.555-.726 3.214-1.14 4.977-1.452l-.104 7.569zm14.724 4.251c-2.385 0-4.251-1.866-4.251-4.251v-8.398c2.074-.311 4.147-.933 6.117-1.763.83-.415 1.66-.83 2.385-1.452v11.613c0 2.385-1.97 4.251-4.251 4.251zm.622-17.108c-1.555.726-3.214 1.14-4.977 1.452V7.154c0-2.385 1.867-4.25 4.251-4.25 2.385 0 4.251 1.865 4.251 4.25V9.02c.104 1.763-1.244 3.318-3.525 4.355z'
                fill='url(#harmony_svg__paint0_linear)'
              />
              <defs>
                <linearGradient
                  gradientUnits='userSpaceOnUse'
                  id='harmony_svg__paint0_linear'
                  x1='16.693'
                  x2='-6.325'
                  y1='0'
                  y2='23.018'
                >
                  <stop stopColor='#00E8A2' />
                  <stop offset='1' stopColor='#00ADE8' />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className='font-medium text-sm'>Harmony</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              fill='none'
              height='24'
              viewBox='50 50 500 500'
              width='24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M202.044 332.701c14.204 0 27.316-4.733 37.879-12.925l-86.685-86.654c-8.195 10.377-12.93 23.484-12.93 37.866-.182 34.042 27.499 61.713 61.736 61.713zM459.913 270.805c0-14.199-4.735-27.306-12.93-37.865l-86.685 86.653c10.381 8.192 23.493 12.925 37.88 12.925 34.054.182 61.735-27.488 61.735-61.713z'
                fill='#04795B'
              />
              <path
                d='M503.62 176.689l-38.426 38.412c12.748 15.291 20.397 34.588 20.397 56.07 0 48.241-39.154 87.381-87.414 87.381-21.307 0-40.793-7.646-56.09-20.389l-42.068 42.052-42.068-42.052c-15.297 12.743-34.601 20.389-56.09 20.389-48.26 0-87.414-39.14-87.414-87.381 0-21.3 7.649-40.779 20.397-56.07l-19.668-19.661-18.758-18.751C74.565 212.734 62 254.787 62 299.934c0 131.436 106.535 237.75 237.838 237.75 131.302 0 237.837-106.496 237.837-237.75.365-45.329-12.201-87.382-34.054-123.245z'
                fill='#04795B'
              />
              <path
                d='M472.114 135.728C428.954 90.399 367.764 62 300.019 62c-67.746 0-128.753 28.399-172.095 73.728a286.174 286.174 0 00-16.755 19.479l188.668 188.598 188.667-188.78c-4.735-6.554-10.38-13.289-16.39-19.297zm-172.095-42.78c55.726 0 107.446 21.481 146.236 60.621L300.019 299.751 153.783 153.569c38.972-39.14 90.51-60.621 146.236-60.621z'
                fill='#04795B'
              />
            </svg>
          </div>
          <div className='font-medium text-sm'>Gnosis</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              height='28'
              viewBox='0 0 42 37'
              width='28'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M28.9 13.9L21 27.7l-7.9-13.9h15.8zm7.9-4.7H5.2L21 37 36.8 9.2zM0 0l2.6 4.6h36.7L42 0H0z'
                fill='#0037c1'
              />
            </svg>
          </div>
          <div className='font-medium text-sm'>Velas</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              data-name='Layer 1'
              height='28'
              id='aurora_svg__Layer_1'
              viewBox='87.5 65 150 150'
              width='28'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M162 83a15.92 15.92 0 0114.31 8.84l45 90A16 16 0 01207 205h-90a16 16 0 01-14.31-23.16l45-90A15.92 15.92 0 01162 83m0-11a27 27 0 00-24.15 14.92l-45 90A27 27 0 00117 216h90a27 27 0 0024.15-39.08l-45-90A27 27 0 00162 72z'
                fill='#70d44b'
              />
            </svg>
          </div>
          <div className='font-medium text-sm'>Aurora</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              height='24'
              viewBox='0 0 128 128'
              width='24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <defs>
                <path d='M0 0h128v128H0z' id='oasis_svg__a' />
              </defs>
              <g clipPath='url(#oasis_svg__b)'>
                <path
                  clipRule='evenodd'
                  d='M115 25.4C105.3 13 91.1 5.1 75.4 5.1 45 5.1 22.7 33.4 22.7 64c0 21.3 14.2 37.3 29.9 37.3 1.5 0 2.9-.1 4.4-.4C46.4 93.2 39.7 79.2 39.7 64c0-24.2 16.4-43.1 35.7-43.1 21.1 0 35.7 20.9 35.7 43.1-.1 16.4-5.9 32.7-16.2 44.7-9 10.5-20.6 17.1-33.4 19.2 0 0 1.1.1 2.5.1 35.3 0 64-28.7 64-64 0-14.5-4.8-27.9-13-38.6zM105.3 64c0-21.3-14.2-37.3-29.9-37.3-1.5 0-2.9.1-4.4.4C81.6 34.8 88.3 48.8 88.3 64c0 24.2-16.4 43.1-35.7 43.1-21.1 0-35.7-20.9-35.7-43.1.1-16.4 5.9-32.7 16.2-44.7C42.1 8.8 53.7 2.2 66.5.1c0 0-1.1-.1-2.5-.1C28.7 0 0 28.7 0 64c0 14.5 4.8 27.9 13 38.6 9.7 12.4 23.9 20.2 39.6 20.2 30.4.1 52.7-28.2 52.7-58.8z'
                  fill='#0089db'
                  fillRule='evenodd'
                />
              </g>
            </svg>
          </div>
          <div className='font-medium text-sm'>Oasis</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              height='20'
              viewBox='0 0 200 200'
              width='20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0 0h200v200H0z' data-name='Rectangle 37' fill='none' />
              <path
                d='M118.683 16a61.3 61.3 0 00-61.276 61.313v.228a3.016 3.016 0 003.017 2.845h116.517a3.015 3.015 0 003.016-2.845l.005-.1v-.128A61.3 61.3 0 00118.683 16z'
                data-name='Path 185'
                fill='#53cbc8'
              />
              <path
                d='M16.837 145.77a3.729 3.729 0 11-3.73-3.732 3.73 3.73 0 013.73 3.732z'
                data-name='Path 186'
                fill='#e1147b'
              />
              <path
                d='M172.888 125.126H47.865a3.677 3.677 0 00-3.231 5.423l.062.116a3.668 3.668 0 003.232 1.924h124.9a3.669 3.669 0 003.232-1.924l.062-.116a3.678 3.678 0 00-3.234-5.423z'
                data-name='Path 187'
                fill='#e1147b'
              />
              <path
                d='M189.5 91.3H47.862a3.681 3.681 0 00-3.666 3.887c0 .039 0 .078.006.117a3.665 3.665 0 003.667 3.459H189.5a3.666 3.666 0 003.667-3.459c0-.039 0-.078.006-.117A3.681 3.681 0 00189.5 91.3z'
                data-name='Path 188'
                fill='#e1147b'
              />
              <path
                d='M136.171 175.864H72.338a3.675 3.675 0 00-1.638 6.964l.234.117a3.657 3.657 0 001.637.382h63.364a3.662 3.662 0 001.638-.382l.233-.117a3.675 3.675 0 00-1.635-6.964z'
                data-name='Path 189'
                fill='#e1147b'
              />
              <path
                d='M175.169 158.951h-63.831a3.676 3.676 0 00-1.637 6.964l.233.117a3.668 3.668 0 001.638.381h63.36a3.665 3.665 0 001.638-.381l.233-.117a3.676 3.676 0 00-1.634-6.964z'
                data-name='Path 190'
                fill='#e1147b'
              />
              <path
                d='M88.131 148.326l-.108-.116a3.674 3.674 0 012.694-6.173h103.6a3.674 3.674 0 012.694 6.173l-.108.116a3.7 3.7 0 01-2.693 1.174H90.824a3.7 3.7 0 01-2.693-1.174z'
                data-name='Path 191'
                fill='#e1147b'
              />
              <path
                d='M26.427 142.038h49.472a3.676 3.676 0 011.637 6.964l-.233.117a3.657 3.657 0 01-1.637.382h-49a3.658 3.658 0 01-1.638-.382l-.233-.117a3.676 3.676 0 011.632-6.964z'
                data-name='Path 192'
                fill='#e1147b'
              />
              <path
                d='M38.272 95.031a3.729 3.729 0 11-3.73-3.731 3.73 3.73 0 013.73 3.731z'
                data-name='Path 193'
                fill='#e1147b'
              />
              <path
                d='M126.183 112.952l.031-.116a3.672 3.672 0 00-3.549-4.622H19.049a3.671 3.671 0 00-3.549 4.622l.032.116a3.681 3.681 0 003.547 2.724h103.556a3.683 3.683 0 003.548-2.724'
                data-name='Path 194'
                fill='#e1147b'
              />
              <path
                d='M9.457 111.944a3.729 3.729 0 11-3.729-3.731 3.731 3.731 0 013.729 3.731z'
                data-name='Path 195'
                fill='#e1147b'
              />
              <path
                d='M38.272 128.857a3.729 3.729 0 11-3.73-3.731 3.731 3.731 0 013.73 3.731z'
                data-name='Path 196'
                fill='#e1147b'
              />
              <path
                d='M101.748 162.683a3.729 3.729 0 11-3.73-3.731 3.73 3.73 0 013.73 3.731z'
                data-name='Path 197'
                fill='#e1147b'
              />
              <path
                d='M62.746 179.596a3.729 3.729 0 11-3.729-3.731 3.73 3.73 0 013.729 3.731z'
                data-name='Path 198'
                fill='#e1147b'
              />
            </svg>
          </div>
          <div className='font-medium text-sm'>Moonbeam</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              fill='none'
              height='20'
              viewBox='10 20 130 120'
              width='20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M63.587 41.543C42.425 49.68 40.487 70.518 34.42 80.25c-6.14 9.848-20.206 15.281-18.282 20.3 1.923 5.018 16.006-.372 27.147 2.83 11.01 3.164 26.371 17.352 47.533 9.215 10.78-4.145 18.586-12.677 22.176-22.782.386-1.084-.336-2.244-1.481-2.352a1.737 1.737 0 00-1.716.946c-3.247 6.478-8.817 11.813-16.107 14.615-12.033 4.627-25.2.994-33.287-8.117a30.011 30.011 0 01-4.648-7.027 30.006 30.006 0 01-.952-2.198 30.465 30.465 0 01-.76-2.273c6.36-2.97 13.7-6.114 22.02-9.313 8.159-3.137 15.584-5.681 22.195-7.717a251.801 251.801 0 0112.272-3.456l.794-.2c.56-.138 1.135.161 1.342.7l.004.01c.122.32.227.641.34.963a38.471 38.471 0 011.643 6.27 1.361 1.361 0 001.984.978 161.264 161.264 0 008.3-4.761c9.254-5.708 14.384-10.549 13.331-13.292-1.051-2.745-8.097-2.903-18.787-.944-3.397.622-7.164 1.46-11.223 2.495-.702.18-1.412.365-2.131.556a273.795 273.795 0 00-10.77 3.11c-6.977 2.165-14.463 4.757-22.19 7.728a360.496 360.496 0 00-20.364 8.536c-.077-12.191 7.28-23.716 19.315-28.343a29.935 29.935 0 0121.733.067c.665.262 1.422.08 1.908-.447.779-.845.54-2.19-.471-2.74-9.419-5.1-20.92-6.208-31.7-2.064z'
                fill='#ED4E33'
              />
            </svg>
          </div>
          <div className='font-medium text-sm'>Evmos</div>
        </div>
        <div className='flex flex-col items-center leading-none space-y-1'>
          <div className='rounded-lg flex items-center justify-center w-10 h-8 sm:w-10 sm:h-10 relative'>
            <svg
              className='text-current w-full h-full'
              fill='none'
              height='28'
              viewBox='0 0 28 28'
              width='28'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M14 28c7.732 0 14-6.268 14-14S21.732 0 14 0 0 6.268 0 14s6.268 14 14 14z'
                fill='#fff'
              />
              <path
                clipRule='evenodd'
                d='M6.949 20.728l2.037-1.184 5.045 2.96 4.983-2.96 2.1 1.184L14.03 25l-7.082-4.272z'
                fill='#2FBDF4'
                fillRule='evenodd'
              />
              <path
                clipRule='evenodd'
                d='M4.692 8.856L7.45 10.04v6.655L14 12.728l6.613 3.967V10.04l2.695-1.184V21.4L14 15.832 4.692 21.4V8.856z'
                fill='#0F68AA'
                fillRule='evenodd'
              />
              <path
                clipRule='evenodd'
                d='M5.006 8.344L14 3l9.057 5.344-2.444 1.024L14 5.496 7.45 9.368 5.006 8.344z'
                fill='#2FBDF4'
                fillRule='evenodd'
              />
            </svg>
          </div>
          <div className='font-medium text-sm'>Wanchain</div>
        </div>
      </div>
      <h1>Top Vaults</h1>
      <h2>Newest</h2>
      {staticHomeData.newest.map((item, index) => {
        return (
          <div className='product' key={index}>
            <div className='left'>
              <div className='img'>
                <img
                  alt='logo'
                  className='img1'
                  src={logoList[Math.round(Math.random() * 10)]}
                />
                <img
                  alt='logo'
                  className='img2'
                  src={logoList[Math.round(Math.random() * 10)]}
                />
              </div>
              <div />
              <div className='title'>
                <div className='top'>{item.wantName || 'WBNB-GAL LP'}</div>
                <div className='bottom'>
                  {`${item.token0Symbol || 'WBNB'}-${
                    item.token1Symbol || 'BiSwap'
                  }`}
                </div>
              </div>
            </div>
            <div className='right'>
              {(Math.round((item.APY || 0) * 100) / 100).toFixed(2)}% APY
            </div>
          </div>
        );
      })}

      <h2>Highest APYS</h2>
      {staticHomeData.topAPYs.map((item, index) => {
        return (
          <div className='product' key={index}>
            <div className='left'>
              <div className='img'>
                <img
                  alt='logo'
                  className='img1'
                  src={logoList[Math.round(Math.random() * 10)]}
                />
                <img
                  alt='logo'
                  className='img2'
                  src={logoList[Math.round(Math.random() * 10)]}
                />
              </div>
              <div />
              <div className='title'>
                <div className='top'>{item.wantName || 'WBNB-GAL LP'}</div>
                <div className='bottom'>
                  {`${item.token0Symbol || 'WBNB'}-${
                    item.token1Symbol || 'BiSwap'
                  }`}
                </div>
              </div>
            </div>
            <div className='right'>
              {(Math.round((item.APY || 0) * 100) / 100).toFixed(2)}% APY
            </div>
          </div>
        );
      })}
      <h2>Hottest(last 7 days)</h2>
      {staticHomeData.hottest.map((item, index) => {
        return (
          <div className='product' key={index}>
            <div className='left'>
              <div className='img'>
                <img
                  alt='logo'
                  className='img1'
                  src={logoList[Math.round(Math.random() * 10)]}
                />
                <img
                  alt='logo'
                  className='img2'
                  src={logoList[Math.round(Math.random() * 10)]}
                />
              </div>
              <div />
              <div className='title'>
                <div className='top'>{item.wantName || 'WBNB-GAL LP'}</div>
                <div className='bottom'>
                  {`${item.token0Symbol || 'WBNB'}-${
                    item.token1Symbol || 'BiSwap'
                  }`}
                </div>
              </div>
            </div>
            <div className='right'>
              {(Math.round((item.APY || 0) * 100) / 100).toFixed(2)}% APY
            </div>
          </div>
        );
      })}
      <h2>Stablecoins</h2>
      {staticHomeData.topStablecoins.map((item, index) => {
        return (
          <div className='product' key={index}>
            <div className='left'>
              <div className='img'>
                <img
                  alt='logo'
                  className='img1'
                  src={logoList[Math.round(Math.random() * 10)]}
                />
                <img
                  alt='logo'
                  className='img2'
                  src={logoList[Math.round(Math.random() * 10)]}
                />
              </div>
              <div />
              <div className='title'>
                <div className='top'>{item.wantName || 'WBNB-GAL LP'}</div>
                <div className='bottom'>
                  {`${item.token0Symbol || 'WBNB'}-${
                    item.token1Symbol || 'BiSwap'
                  }`}
                </div>
              </div>
            </div>
            <div className='right'>
              {(Math.round((item.APY || 0) * 100) / 100).toFixed(2)}% APY
            </div>
          </div>
        );
      })}
      <h2>Our Partners</h2>
      <div className='HomePage_partners__T7882'>
        <a
          href='https://www.alpacafinance.org/'
          rel='noreferrer'
          target='_blank'
        >
          Alpaca
        </a>
        <a href='https://apeswap.finance/' rel='noreferrer' target='_blank'>
          ApeSwap
        </a>
        <a href='https://augmented.finance/' rel='noreferrer' target='_blank'>
          Augmented
        </a>
        <a href='https://basedfinance.io/' rel='noreferrer' target='_blank'>
          Based
        </a>
        <a href='https://beamswap.io/' rel='noreferrer' target='_blank'>
          BeamSwap
        </a>
        <a href='https://belt.fi/landing' rel='noreferrer' target='_blank'>
          Belt
        </a>
        <a href='https://benqi.fi/' rel='noreferrer' target='_blank'>
          BenQi
        </a>
        <a href='https://biswap.org/' rel='noreferrer' target='_blank'>
          BiSwap
        </a>
        <a href='https://bitbomb.io/' rel='noreferrer' target='_blank'>
          BitBomb
        </a>
        <a href='https://www.bomb.money/' rel='noreferrer' target='_blank'>
          Bomb
        </a>
        <a href='https://cz.farm/' rel='noreferrer' target='_blank'>
          CZodiac
        </a>
        <a target='_blank'>CZpegs</a>
        <a target='_blank'>Cherry</a>
        <a
          href='https://app.cronaswap.org/swap'
          rel='noreferrer'
          target='_blank'
        >
          Crona
        </a>
        <a href='https://curve.fi/' rel='noreferrer' target='_blank'>
          Curve
        </a>
        <a target='_blank'>EMP</a>
        <a href='https://geist.finance/' rel='noreferrer' target='_blank'>
          Geist
        </a>
        <a target='_blank'>GogoCoin</a>
        <a target='_blank'>Huckleberry</a>
        <a href='https://jetswap.finance/' rel='noreferrer' target='_blank'>
          JetSwap
        </a>
        <a
          href='https://kuswap.finance/#/swap'
          rel='noreferrer'
          target='_blank'
        >
          Kuswap
        </a>
        <a href='https://mdex.com/#/' rel='noreferrer' target='_blank'>
          MDEX
        </a>
        <a
          href='https://magicianmetaverse.com/#/'
          rel='noreferrer'
          target='_blank'
        >
          Magician
        </a>
        <a
          href='https://marsecosystem.com/home'
          rel='noreferrer'
          target='_blank'
        >
          Mars
        </a>
        <a href='https://meshswap.fi/' rel='noreferrer' target='_blank'>
          MeshSwap
        </a>
        <a
          href='https://app.mojitoswap.finance/'
          rel='noreferrer'
          target='_blank'
        >
          Mojito
        </a>
        <a href='https://oolongswap.com/#/' rel='noreferrer' target='_blank'>
          Oolong
        </a>
        <a href='https://stellaswap.com/' rel='noreferrer' target='_blank'>
          PYQ
        </a>
        <a href='https://pancakeswap.finance/' rel='noreferrer' target='_blank'>
          PancakeSwap
        </a>
        <a href='https://pangolin.exchange/' rel='noreferrer' target='_blank'>
          Pangolin
        </a>
        <a href='https://polarisfinance.io' rel='noreferrer' target='_blank'>
          Polaris
        </a>
        <a target='_blank'>Quickswap</a>
        <a href='https://singularitydao.ai/' rel='noreferrer' target='_blank'>
          SingularityDAO
        </a>
        <a href='https://www.sokuswap.org/' rel='noreferrer' target='_blank'>
          SokuSwap
        </a>
        <a href='https://solarbeam.io/' rel='noreferrer' target='_blank'>
          SolarBeam
        </a>
        <a
          href='https://www.spiritswap.finance/'
          rel='noreferrer'
          target='_blank'
        >
          Spirit
        </a>
        <a href='https://spooky.fi/#/' rel='noreferrer' target='_blank'>
          SpookySwap
        </a>
        <a href='https://stargate.finance/' rel='noreferrer' target='_blank'>
          Stargate
        </a>
        <a href='https://stellaswap.com/' rel='noreferrer' target='_blank'>
          StellaSwap
        </a>
        <a href='https://www.sushi.com/' rel='noreferrer' target='_blank'>
          Sushi
        </a>
        <a target='_blank'>TraderJoe</a>
        <a target='_blank'>Trisolaris</a>
        <a href='https://ubeswap.org/' rel='noreferrer' target='_blank'>
          UbeSwap
        </a>
        <a href='https://vvs.finance/' rel='noreferrer' target='_blank'>
          VVS
        </a>
        <a href='https://www.wagyuswap.app/' rel='noreferrer' target='_blank'>
          Wagyu
        </a>
        <a
          href='https://www.wanswap.finance/#/swap'
          rel='noreferrer'
          target='_blank'
        >
          Wanswap
        </a>
        <a target='_blank'>YUZU</a>
        <a
          href='https://app.zookeeper.finance/'
          rel='noreferrer'
          target='_blank'
        >
          ZooKeeper
        </a>
      </div>
      <div className='divide' />
      <Modal
        height='auto'
        visible={visible}
        width='80%'
        onClose={() => {
          setVisible(false);
        }}
      >
        <InviterComp className={loading ? 'loading' : ''}>
          <h2>Inviter Id</h2>
          <p>{inviterId}</p>
          <div
            className='confirm'
            onClick={() => {
              handleClickBtn();
            }}
          >
            Confirm
          </div>
          <img
            alt='close'
            className='close'
            src='/static/image/close.png'
            onClick={() => {
              setVisible(false);
            }}
          />
        </InviterComp>
      </Modal>
    </HomeContainer>
  );
};

Home.displayName = 'Home';

export default Home;
