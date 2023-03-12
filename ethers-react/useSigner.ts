import {ethers, Signer} from 'ethers';

import {useEthersUtils} from './useEthersUtils';

export const useSigner = () => {
  const {getNetwork} = useEthersUtils();
  const getSigner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const provider = new ethers.providers.JsonRpcProvider(RPCPROVIDERURL);
    await getNetwork(provider);

    const signer: Signer = provider.getSigner();
    return signer;
  };

  // get sign message
  const getSignMessage = async (nonce: string) => {
    const signature = {status: true, sign: ''};
    try {
      const signer = await getSigner();
      signature.sign = await signer.signMessage(nonce);
    } catch (error: any) {
      signature.status = false;
      signature.sign = error.message;
    }
    return signature;
  };

  return {
    getSigner,
    getSignMessage,
  };
};
