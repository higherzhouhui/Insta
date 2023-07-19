import React, {createContext, ReactNode} from 'react';
import {useRecoilState} from 'recoil';

import {useMetaMask} from './useMetaMask';
import {useWeb3} from './useWeb3';

import {userState} from '@/store/user';
export type Props = {
  children: ReactNode;
};

export type ContextValue = {
  connectedAccount: string | null;
  balance: string | number;
  // mintNFT: (nftObj: nftIprops, callback: Function) => void;
  // buyNFT: (nft: any, callback: () => void) => void;
  // nfts: any [] | null;
  // myNfts: any [] | null;
  // nftLoading: boolean;
};

export const NFTABI = '';
export const NFTAddress = '';
export const NFTMarketABI = '';
export const NFTMarketAddress = '';

export const Web3ProviderContext = createContext<ContextValue>(
  {} as ContextValue
);

export const Web3ContextProvider = ({children}: Props) => {
  const {connectedAccount} = useMetaMask();
  const {balance} = useWeb3();
  const [user, setUser] = useRecoilState(userState);
  return (
    <Web3ProviderContext.Provider
      value={{
        connectedAccount: connectedAccount || user.accountAddress,
        balance,
      }}
    >
      {children}
    </Web3ProviderContext.Provider>
  );
};
