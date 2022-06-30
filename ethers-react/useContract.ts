import {ethers, Signer} from 'ethers';
import {useState} from 'react';

export const useContract = () => {
  const [signer, setSigner] = useState<Signer | null>(null);
  const getSigner = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer: Signer = provider.getSigner();
    setSigner(signer);
    return signer;
  };

  // get sign message
  const getSignMessage = async (nonce: string) => {
    const signature = {status: true, sign: ''};
    try {
      if (signer) {
        signature.sign = await signer.signMessage(nonce);
      } else {
        const signer = getSigner();
        signature.sign = await signer.signMessage(nonce);
      }
    } catch (error: any) {
      signature.status = false;
      signature.sign = error.message;
    }
    return signature;
  };

  // get contract
  const getContract = (contractAddress: string, abi: any) => {
    let contract = null;
    if (signer) {
      contract = new ethers.Contract(contractAddress, abi, signer);
    } else {
      const signer = getSigner();
      contract = new ethers.Contract(contractAddress, abi, signer);
    }
    return contract;
  };

  return {
    getContract,
    getSignMessage,
  };
};
