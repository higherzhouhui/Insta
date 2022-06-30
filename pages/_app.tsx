import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {loadReCaptcha} from 'react-recaptcha-v3';

import type {AppProps} from 'next/app';

import {Layout, Message} from '@/components';
import Providers from '@/context';
import {GlobalStyle} from '@/styles/global';
import 'nprogress/nprogress.css';
import {progressInit} from '@/utils';

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  useEffect(() => {
    loadReCaptcha('6Ld_5qofAAAAAF3WTqQeNBd2U1OktPEMdhnZn6nb');
    progressInit(router);
  }, []);
  return (
    <Providers>
      <GlobalStyle />
      <Message />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}

export default MyApp;
