import {ethers, utils} from 'ethers';

import {useMetaMask} from './useMetaMask';

import {USECHAINID} from '@/config/contractAddress';

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

  // price to number
  const getNormalPrice = (price: ethers.BigNumberish) => {
    return utils.formatEther(price);
  };
  // get network
  const getNetwork = async (
    provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider
  ) => {
    const res = await provider.getNetwork();
    const NODE_ENV = process.env.NODE_ENV;
    if (NODE_ENV && NODE_ENV === 'production') {
      if (res.chainId !== USECHAINID) {
        switchWalletNetwork(`0x${Number(USECHAINID).toString(16)}`);
      }
    }
    if (NODE_ENV && NODE_ENV !== 'production') {
      if (res.chainId !== USECHAINID) {
        switchWalletNetwork(`0x${Number(USECHAINID).toString(16)}`);
      }
    }
  };

  return {
    getHashId,
    getEtherPrice,
    getNetwork,
    getNormalPrice,
  };
};
