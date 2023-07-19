import Image from 'next/image';
import {useRouter} from 'next/router';
import {FC, useState, memo} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import {
  CollectContainer,
  NftBotComp,
  NftProContainer,
  NftTlside,
  NftTopComp,
  TagProductContainer,
} from './styles';
import {Auth} from '../auth';
import {ShareComp} from '../share';

import {RouterPath} from '@/config/routes';
import {SvgIcon} from '@/uikit';
import {formatPrice} from '@/utils';

interface ProductProps {
  product?: GlobalNft.WorksDetail;
}

enum ClickType {
  Work = 'Work',
  Author = 'Author',
}

export const Product: FC<ProductProps> = memo(({product}) => {
  const router = useRouter();
  const [imgErr, setImgErr] = useState(false);
  const onClick = (type: ClickType) => {
    if (!product) {
      return;
    }
    if (type === ClickType.Work) {
      router.push(RouterPath.worksDetail(product?.id));
    }
    if (type === ClickType.Author && !product.isOfficial) {
      router.push(RouterPath.profile(product.userUuid));
    }
  };

  const handleErrorImage = () => {
    setImgErr(true);
  };

  return (
    <CollectContainer>
      {product ? (
        <>
          <div
            className='cloPic'
            onClick={() => {
              onClick(ClickType.Work);
            }}
          >
            {product.item && (
              <Image
                alt='pic'
                blurDataURL='/static/icon/copylink-icon.png'
                layout='fill'
                placeholder='blur'
                src={
                  imgErr
                    ? product.item
                    : `${product.item}?x-oss-process=image/resize,m_fill,h_310,w_310`
                }
                unoptimized={product.item.endsWith('.gif')}
                onError={handleErrorImage}
              />
            )}
          </div>
          <div className='botContent'>
            <div className='leftSide'>
              <span
                className='authorPic'
                onClick={() => {
                  onClick(ClickType.Author);
                }}
              >
                <Image
                  alt='pic'
                  blurDataURL='/static/icon/copylink-icon.png'
                  layout='fill'
                  placeholder='blur'
                  src={product.portrait || '/static/icon/logoheader.png'}
                />
              </span>
              <span className='authorName'>{product?.author || 'PD-1'} </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <Skeleton className='cloPic' />
          <div className='botContent'>
            <div className='leftSide'>
              <Skeleton className='authorPic' />
              <Skeleton className='authorName' />
            </div>
          </div>
        </>
      )}
    </CollectContainer>
  );
});
Product.displayName = 'Product';

type ILProps = {
  product?: GlobalNft.Nft;
  idx: number;
  classNmae?: string;
};
export const Project: FC<ILProps> = memo(({idx, product = null}) => {
  const router = useRouter();
  const [imgErr, setImgErr] = useState(false);
  const goToDetail = () => {
    if (!product) {
      return;
    }
    router.push(RouterPath.project(product.typeId, product.name));
  };
  const handleErrorImage = () => {
    setImgErr(true);
  };
  return (
    <NftProContainer onClick={goToDetail}>
      {product && idx ? (
        <div className='nft-wrapper'>
          <NftTopComp>
            <NftTlside
              className={
                idx === 1
                  ? 'bg1'
                  : idx === 2
                  ? 'bg2'
                  : idx === 3
                  ? 'bg3'
                  : 'normal'
              }
            >
              <SvgIcon
                height={18}
                name={idx < 4 ? 'nft-trophy-3st' : 'nft-trophy-normal'}
                width={18}
              />
              <span className='sort'>{idx}</span>
            </NftTlside>
            <div className='rightSide'>
              <SvgIcon height={24} name='nft-coin' width={24} />
              <span className='money'>
                {formatPrice(product?.floorPrice || 0)}
              </span>
            </div>
          </NftTopComp>
          <div className='middelSide' />
          <NftBotComp>
            <div className='portrait'>
              {product.logo && (
                <Image
                  alt='portrait'
                  blurDataURL='/static/icon/copylink-icon.png'
                  layout='fill'
                  placeholder='blur'
                  src={
                    imgErr
                      ? product.logo
                      : `${product.logo}?x-oss-process=image/resize,m_fill,h_80,w_80`
                  }
                  onError={handleErrorImage}
                />
              )}
            </div>
            <span className='nftName'>{product?.name}</span>
            <span className='nftNumber'>
              {product?.secondCreation} in stock
            </span>
          </NftBotComp>
        </div>
      ) : (
        <div className='nft-wrapper'>
          <NftTopComp>
            <NftTlside className='bg1'>
              <SvgIcon height={18} name='nft-trophy-3st' width={18} />
              <span className='sort'>1</span>
            </NftTlside>
            <div className='rightSide'>
              <SvgIcon height={24} name='nft-coin' width={24} />
              <span className='money'>00.00</span>
            </div>
          </NftTopComp>
          <div className='middelSide' />
          <NftBotComp>
            <div className='portrait'>
              <Skeleton
                style={{display: 'block', width: '100%', height: '100%'}}
              />
            </div>
            <Skeleton className='nftName' />
            <Skeleton className='nftNumber' />
          </NftBotComp>
        </div>
      )}
    </NftProContainer>
  );
});
Project.displayName = 'Project';

export const TagProduct: FC<ProductProps> = memo(({product}) => {
  const [shareShow, setShareShow] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const router = useRouter();
  const clickToPage = (type: string) => {
    if (!product) {
      return;
    }
    if (type === ClickType.Work) {
      router.push(RouterPath.worksDetail(product.id));
    }
    if (type === ClickType.Author && !product.isOfficial) {
      router.push(RouterPath.profile(product.userUuid));
    }
  };
  const handleErrorImage = () => {
    setImgErr(true);
  };

  return (
    <TagProductContainer
      onMouseLeave={() => {
        setShareShow(false);
      }}
    >
      {product ? (
        <>
          <div
            className='img-box'
            onClick={() => {
              clickToPage(ClickType.Work);
            }}
          >
            {product.item && (
              <Image
                alt='image'
                blurDataURL='/static/icon/copylink-icon.png'
                layout='fill'
                placeholder='blur'
                src={
                  imgErr
                    ? product.item
                    : `${product.item}?x-oss-process=image/resize,m_fill,h_310,w_310`
                }
                unoptimized={product.item.endsWith('.gif')}
                onError={handleErrorImage}
              />
            )}
          </div>
          <div className='des-box'>
            <div
              className='author-icon'
              onClick={() => {
                clickToPage(ClickType.Author);
              }}
            >
              <Image
                alt='user'
                blurDataURL='/static/icon/copylink-icon.png'
                layout='fill'
                placeholder='blur'
                src={product?.portrait || '/static/icon/logoheader.png'}
              />
            </div>
            <div className='make-thing'>
              <div className='make-icon'>
                <Auth>
                  <SvgIcon
                    color='white'
                    height={24}
                    name='tag-comment'
                    width={24}
                    onClick={() => {
                      clickToPage(ClickType.Work);
                    }}
                  />
                </Auth>
              </div>
              <div className='make-icon'>
                <SvgIcon
                  color={shareShow ? '#53A9FF' : 'white'}
                  height={24}
                  name='share-link'
                  width={24}
                  onClick={() => {
                    setShareShow(!shareShow);
                  }}
                />
                {shareShow ? (
                  <div className='share-comp'>
                    <ShareComp
                      href={RouterPath.worksDetail(product.id)}
                      name={product.title}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Skeleton className='img-box' />
      )}
    </TagProductContainer>
  );
});

TagProduct.displayName = 'tagProduct';
