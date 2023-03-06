import {useEffect, useState} from 'react';
export const useMetaMask = () => {
  const [account, setAccount] = useState<string | null>(null);
  // Check wallet is installed
  const checkIfWalletIsInstalled = async () => {
    let flag: boolean = true;
    if (!window.ethereum) {
      flag = false;
    }
    return flag;
  };
  // Connect wallet
  const connectWallet = async () => {
    const flag = await checkIfWalletIsInstalled();
    try {
      if (!flag) {
        window.open('https://metamask.io/download/');
        return false;
      }
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts && accounts.length) {
        setAccount(accounts[0]);
        return accounts[0];
      }
    } catch (error) {
      throw new Error('No ethereum object.');
    }
  };

  // Disconnect Wallet
  const disconnectWallet = async () => {
    setAccount(null);
  };

  // Switch network
  const switchWalletNetwork = async (
    chain: 'Ethereum' | 'Ropsten' | 'Rinkeby' | 'Goerli' | 'Kovan'
  ) => {
    const flag = await checkIfWalletIsInstalled();
    if (!flag) {
      window.open('https://metamask.io/download/');
      return false;
    }
    const chainObj = {
      Ethereum: '0x1',
      Ropsten: '0x3',
      Rinkeby: '0x4',
      Goerli: '0x5',
      Kovan: '0x2a',
    };
    const chainId = chainObj[chain];
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{chainId}],
    });
  };

  // monitor accounts change
  const onChangeAccount = async (callback?: (accounts: string[]) => void) => {
    try {
      const flag = await checkIfWalletIsInstalled();
      if (!flag) {
        return false;
      }
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts && accounts.length) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
        callback && callback(accounts);
      });
    } catch (error) {
      throw new Error('No ethereum object.');
    }
  };
  // monitor network change
  const onChangeNetwork = async (callback?: (accounts: string[]) => void) => {
    try {
      const flag = await checkIfWalletIsInstalled();
      if (!flag) {
        return false;
      }
      window.ethereum.on('chainChanged', (networkIDstring: string) => {
        // 可指定测试网络退出登陆状态
        console.log(networkIDstring);
        // setAccount(null);
      });
    } catch (error) {
      throw new Error('No ethereum object.');
    }
  };

  useEffect(() => {
    onChangeNetwork();
    onChangeAccount();
  }, []);

  return {
    account,
    connectWallet,
    disconnectWallet,
    onChangeAccount,
    switchWalletNetwork,
  };
};
