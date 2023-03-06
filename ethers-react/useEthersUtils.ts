import {ethers, utils} from 'ethers';

import {useMetaMask} from './useMetaMask';

export const useEthersUtils = () => {
  const {switchWalletNetwork} = useMetaMask();
  // get hash id
  const getHashId = (str: string) => {
    return utils.id(str);
  };

  // get ether price
  const getEtherPrice = (price: string | number) => {
    return utils.parseUnits(price.toString(), 'ether');
  };

  // get network
  const getNetwork = async (provider: ethers.providers.Web3Provider) => {
    const res = await provider.getNetwork();
    const NODE_ENV = process.env.NODE_ENV;
    // if (NODE_ENV && NODE_ENV === 'production') {
    //   if (res.chainId !== 4) {
    //     switchWalletNetwork('Rinkeby');
    //   }
    // }
    // if (NODE_ENV && NODE_ENV !== 'production') {
    //   if (res.chainId !== 4) {
    //     switchWalletNetwork('Rinkeby');
    //   }
    // }
    if (NODE_ENV && NODE_ENV === 'production') {
      if (res.chainId !== 1) {
        switchWalletNetwork('Ethereum');
      }
    }
    if (NODE_ENV && NODE_ENV !== 'production') {
      if (res.chainId !== 1) {
        switchWalletNetwork('Ethereum');
      }
    }
  };

  return {
    getHashId,
    getEtherPrice,
    getNetwork,
  };
};
