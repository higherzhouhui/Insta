import type {AppProps} from 'next/app';

import {Layout, Message} from '@/components';
import Providers from '@/context';
import {GlobalStyle} from '@/styles/global';

import 'nprogress/nprogress.css';

function MyApp({Component, pageProps}: AppProps) {
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
