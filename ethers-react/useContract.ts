import {ethers, ContractInterface} from 'ethers';

import {useSigner} from './useSigner';

export const useContract = () => {
  const {getSigner} = useSigner();
  // get contract
  const getContract = async (
    contactAddress: string,
    contactAbi: ContractInterface
  ) => {
    const signer = await getSigner();
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contactAddress, contactAbi, signer);

    return contract;
  };

  return {
    getContract,
  };
};
