import axios from 'axios';
import {ethers} from 'ethers';
import {useState, useEffect} from 'react';

import {useContract} from './useContract';
import {useInfura} from './useInfura';
import {useMetaMask} from './useMetaMask';

export type nftIprops = {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  likes?: string | number;
  category: string | number;
  categoryName: string;
  currency: string;
  price: string | number;
  createdAt: string | number;
  views: string | number;
};

export const useNFT = (
  nftAddress: string,
  nftABI: any,
  marketAddress: string,
  marketABI: any
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nfts, setNfts] = useState<any[]>([]);
  const [myNfts, setMyNfts] = useState<any[]>([]);
  const {getContract} = useContract();
  const {client} = useInfura();
  const {connectedAccount} = useMetaMask();

  // mint NFT
  const mintNFT = async (
    nftObj: nftIprops,
    callback: (tokenId: string | number) => void
  ) => {
    setIsLoading(true);
    const data = JSON.stringify(nftObj);
    if (!client) {
      return;
    }
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createMarket(url, nftObj, callback);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  // create Market
  const createMarket = async (
    url: string,
    nftObj: nftIprops,
    callback: (tokenId: string | number) => void
  ) => {
    let contract = getContract(nftAddress, nftABI);
    let transaction = await contract.createToken(url);
    const tx = await transaction.wait();
    console.log(tx);
    const event = tx.events[0];
    const value = event.args[2];
    const tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(`${nftObj.price}`, 'ether');

    contract = getContract(marketAddress, marketABI);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftAddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    getMarketNFTs();
    getMyNFTs();
    callback(tokenId);
    console.log('Success mint....');
  };

  // get Market NFT
  const getMarketNFTs = async () => {
    setIsLoading(true);
    const contract = getContract(marketAddress, marketABI);
    const NFTContract = getContract(nftAddress, nftABI);
    const data = await contract.fetchMarketItems();
    const items = await Promise.all(
      data.map(async (i: any) => {
        const tokenUri = await NFTContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        const price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        const item = {
          ...meta.data,
          price,
          tokenId: i.tokenId.toNumber(),
          owner: i.owner,
          seller: i.seller,
        };
        return item;
      })
    );
    setIsLoading(false);
    console.log('nfts:', items);
    setNfts(items);
    return items;
  };

  // get My NFT
  const getMyNFTs = async () => {
    setIsLoading(true);
    const marketContract = getContract(marketAddress, marketABI);
    const NFTContract = getContract(nftAddress, nftABI);
    const data = await marketContract.fetchMyNFTs();
    const items = await Promise.all(
      data.map(async (i: any) => {
        const tokenUri = await NFTContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        const price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        const item = {
          ...meta.data,
          price,
          tokenId: i.tokenId.toNumber(),
          owner: i.owner,
          image: meta.data.image,
        };
        return item;
      })
    );
    console.log('my nfts:', items);
    setIsLoading(false);
    setMyNfts(items);
    return items;
  };

  // buy NFT
  const buyNFT = async (nft: any, callback: () => void) => {
    console.log('start buy...');
    setIsLoading(true);
    const contract = getContract(marketAddress, marketABI);
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(
      nftAddress,
      nft.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();
    callback();
    setIsLoading(false);
    getMarketNFTs();
    getMyNFTs();
    console.log(`Success Buy.....`);
  };

  useEffect(() => {
    if (connectedAccount) {
      getMarketNFTs();
      getMyNFTs();
    }
  }, [connectedAccount]);

  return {
    isLoading,
    nfts,
    myNfts,
    mintNFT,
    getMarketNFTs,
    getMyNFTs,
    buyNFT,
  };
};
