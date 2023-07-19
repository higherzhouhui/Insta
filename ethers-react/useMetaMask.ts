import {useState, useEffect} from 'react';

import {showTip} from '@/utils';

export const useMetaMask = () => {
  // is installed wallet
  const [isInstalledWallet, setIsInstalledWallet] = useState<boolean>(false);
  // is connected wallet
  const [isConnected, setIsConnected] = useState<boolean>(false);
  // connected accounts
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);
  // connected accounts
  const [connectedChainId, setConnectedChainId] = useState<string | null>(null);

  // check wallet is installed
  const checkIfWalletIsInstalled = async () => {
    let flag: boolean = true;
    if (!window.ethereum) {
      flag = false;
    }
    setIsInstalledWallet(flag);
    return flag;
  };

  // check wallet is network
  const checkIfWalletNetWork = async () => {
    if (window?.ethereum?.chainId) {
      // if (window?.ethereum?.chainId !== '0x4') {
      //     switchWalletNetwork('0x4');
      //     return
      // }
      setConnectedChainId(window?.ethereum?.chainId);
    }
  };

  // check network is normal
  const switchWalletNetwork = async (chainId: string) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId}],
      });
    } catch (error: any) {
      showTip({
        content:
          'Please manually switch the network to Binance Smart Chain Testnet',
        showTime: 8000,
      });
    }
  };

  // monitor accounts change
  const onChangeAccounts = async () => {
    try {
      if (!isInstalledWallet) {
        return false;
      }
      window.ethereum.on('accountsChanged', function (accounts: string[]) {
        if (accounts && accounts.length) {
          setConnectedAccount(accounts[0]);
        } else {
          setConnectedAccount(null);
          localStorage.clear();
        }
      });
    } catch (error) {
      console.log(error);
      // throw new Error("No ethereum object.");
    }
  };

  // monitor chain change
  const onChangeChain = async () => {
    try {
      if (!isInstalledWallet) {
        return false;
      }
      window.ethereum.on('chainChanged', function (_chainId: string) {
        console.log('chainChanged:', parseInt(_chainId));
        setConnectedChainId(_chainId);
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      // throw new Error("No ethereum object.");
    }
  };

  // check wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!isInstalledWallet) {
        return false;
      }
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (accounts && accounts.length) {
        setConnectedAccount(accounts[0]);
      } else {
        setConnectedAccount(null);
        console.log('No accounts found');
      }
    } catch (error) {
      console.log(error);
      // throw new Error("No ethereum object.");
    }
  };
  const setAccount = (account: string | null) => {
    setConnectedAccount(account);
  };
  // connect wallect
  const connectWallect = async (
    callback?: (account: string | null) => void
  ) => {
    try {
      if (!isInstalledWallet) {
        window.open('https://metamask.io/download/');
        return false;
      }
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts && accounts.length) {
        setConnectedAccount(accounts[0]);
        callback && callback(accounts[0]);
      }
    } catch (error) {
      console.log(error);
      callback && callback(null);
      // throw new Error("No ethereum object.");
    }
  };

  // disconnect wallect
  const disconnectWallect = async () => {
    console.log('disvon');
    try {
      // if (!isInstalledWallet || !connectedAccount) {
      //     return false;
      // }
      setConnectedAccount(null);
    } catch (error) {
      console.log(error);
      // throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsInstalled();
  }, []);

  useEffect(() => {
    checkIfWalletNetWork();
    onChangeChain();
  }, [isInstalledWallet]);

  useEffect(() => {
    checkIfWalletIsConnected();
    onChangeAccounts();
  }, [connectedChainId]);

  return {
    isInstalledWallet,
    isConnected,
    connectedAccount,
    connectedChainId,
    setAccount,
    switchWalletNetwork,
    checkIfWalletIsInstalled,
    checkIfWalletIsConnected,
    connectWallect,
    disconnectWallect,
  };
};
