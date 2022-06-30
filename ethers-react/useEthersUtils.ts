import {utils} from 'ethers';

export const useEthersUtils = () => {
  // 获取hash加密
  const getHashId = (str: string) => {
    return utils.id(str);
  };
  return {
    getHashId,
  };
};
