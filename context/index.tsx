import React from 'react';
import {SkeletonTheme} from 'react-loading-skeleton';
import {RecoilRoot} from 'recoil';
import {ThemeProvider} from 'styled-components';

import {Web3ContextProvider} from '@/ethers-react';
import {lightTheme} from '@/uikit';

type ProvidersProps = {};

const Providers: React.FC<ProvidersProps> = ({children}) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <RecoilRoot>
        <Web3ContextProvider>
          <SkeletonTheme baseColor='#ebf0f6' highlightColor='#ffffff'>
            {children}
          </SkeletonTheme>
        </Web3ContextProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default Providers;
