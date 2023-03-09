import React from 'react';
import {SkeletonTheme} from 'react-loading-skeleton';
import {RecoilRoot} from 'recoil';
import {ThemeProvider} from 'styled-components';

import {LanguageProvider} from './LanguageProvider';

import {Web3ContextProvider} from '@/ethers-react';
import {lightTheme} from '@/uikit';

type ProvidersProps = {};

const Providers: React.FC<ProvidersProps> = ({children}) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <LanguageProvider>
        <RecoilRoot>
          <Web3ContextProvider>
            <SkeletonTheme baseColor='#ebf0f6' highlightColor='#ffffff'>
              {children}
            </SkeletonTheme>
          </Web3ContextProvider>
        </RecoilRoot>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Providers;
