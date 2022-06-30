import {create, IPFSHTTPClient} from 'ipfs-http-client';

export const useInfura = () => {
  //   const projectId = '97d0229688c545b3a4988438d1ac85e8';
  //   const projectSecret = '4f102c98e47647859cb07421e6c0e7ef';
  // const authorization = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  //   const authorization = `Basic ${btoa(`${projectId}:${projectSecret}`)}`;
  let ipfs: IPFSHTTPClient | undefined;
  try {
    ipfs = create({
      url: 'https://ipfs.infura.io:5001/api/v0',
      // headers: {
      //     authorization,
      // },
    });
  } catch (error) {
    console.error('IPFS error ', error);
    ipfs = undefined;
  }
  return {
    client: ipfs,
  };
};
