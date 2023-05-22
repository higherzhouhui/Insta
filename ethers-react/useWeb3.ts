import {ethers} from 'ethers';
import {useState, useEffect} from 'react';

import {useMetaMask} from './useMetaMask';

export const useWeb3 = () => {
  const {connectedAccount} = useMetaMask();
  const [balance, setBalance] = useState<string | number>(0);
  const [provider, setProvider] = useState<any>(null);

  // get provider
  const getProvider = async () => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);
          clearInterval(timer);
        }
      }, 100);
    });
  };

  // get balance
  const getBalance = async () => {
    const balance = await provider.getBalance(connectedAccount);
    setBalance(ethers.utils.formatEther(balance));
  };

  useEffect(() => {
    window.ethereum && getProvider();
  }, []);

  useEffect(() => {
    connectedAccount && provider && getBalance();
  }, [connectedAccount, provider]);

  return {
    balance,
    web3Provider: provider,
  };
};
