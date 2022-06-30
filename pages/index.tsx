import {useSize} from 'ahooks';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {memo, FC, useEffect, useState, useRef} from 'react';
import Skeleton from 'react-loading-skeleton';
import {Swiper, SwiperSlide} from 'swiper/react';

import type {NextPage} from 'next';

import {Card, Project, Product, FavoriteHeart} from '@/components';
import {RouterPath} from '@/config/routes';
import {getHomeNfts} from '@/services/common';
import {
  HomeContainer,
  HomeBoutiquePanelContainer,
  HomeBoutiqueBgContainer,
  HomePublishContainer,
  HomeRecommendContainer,
  HomeCollectionContainer,
} from '@/styles/home';
import {Row, Col, Button, SvgIcon} from '@/uikit';

import 'swiper/css';

const Home: NextPage = () => {
  const homeRef: any = useRef(null);
  const size = useSize(homeRef);
  const [homeTop, setHomeTop] = useState<GlobalNft.WorksDetail | null>(null);
  const [publishNfts, setPublishNfts] = useState<GlobalNft.Nft[] | null[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [recommendNfts, setRecommendNfts] = useState<GlobalNft.WorksDetail[]>(
    []
  );
  const [newCollects, setNewCollects] = useState<
    GlobalNft.WorksDetail[] | null[]
  >([null, null, null, null, null, null, null, null]);
  const [recommendDesc, setRecommendDesc] = useState('');
  const [recommendTitle, setRecommendTitle] = useState('');

  useEffect(() => {
    getHomeNftsRequest();
  }, []);

  /**
   * 首页
   */
  const getHomeNftsRequest = async () => {
    const res = await getHomeNfts({
      collectionsSize: 15,
      recommendSize: 8,
      newestSize: 8,
    });

    if (res.code === 0) {
      setPublishNfts(res?.data?.collections?.infoList || []);
      setRecommendNfts(res?.data?.recommend?.infoList || []);
      setNewCollects(res?.data?.newest?.infoList || []);
      setHomeTop(res?.data?.homeTop || null);
      setRecommendTitle(
        res?.data?.recommendTitle ||
          'The amazing <br /> NFT art of the world here'
      );
      setRecommendDesc(
        res?.data?.recommendDesc ||
          "Everyone's works are unique, but there are also differences. I like to find your favorite works there，Everyone's works are unique, but there are also differences. I like to find your favorite works there"
      );
    }
  };
  return (
    <HomeContainer ref={homeRef}>
      <HomeBoutiquePanel nft={homeTop} />
      <HomePublishedPanel list={publishNfts} size={size} />
      <HomeRecommendPanel
        desc={recommendDesc}
        list={recommendNfts}
        title={recommendTitle}
      />
      <HomeCollectionPanel list={newCollects} size={size} />
    </HomeContainer>
  );
};

interface IBoutiqueProps {
  nft: GlobalNft.WorksDetail | null;
}
const HomeBoutiquePanel: FC<IBoutiqueProps> = memo(({nft}) => {
  const router = useRouter();
  const handleMoreRecommend = () => {
    router.push(RouterPath.list('recommend'));
  };
  const handleRecommendDetail = (item: GlobalNft.WorksDetail | null) => {
    if (item) {
      router.push(RouterPath.worksDetail(item.id));
    }
  };
  return (
    <HomeBoutiquePanelContainer>
      <HomeBoutiqueBgContainer
        style={{
          backgroundImage:
            nft && nft.item
              ? `url(${nft.item})`
              : 'url(https://pd1.oss-accelerate.aliyuncs.com/pd1/uploads/2022-04-01/微信图片_20220401165444.png)',
        }}
      />
      <div className='content-box'>
        <div className='boutique-box'>
          <div className='title-box'>
            <h1>
              The 1st <strong>NFT</strong> <br />
              Derivative Community
            </h1>
            <p>
              PD-1 is an NFT derivative community, with great
              <br /> derivative works, talented creators and web3 native
              <br /> users.
            </p>
            <Button
              borderRadius={40}
              endIcon={
                <SvgIcon
                  color='#ffffff'
                  height={20}
                  name='right-icon'
                  width={20}
                />
              }
              fontSize={16}
              height={48}
              variant='primary'
              width={154}
              onClick={handleMoreRecommend}
            >
              Explore
            </Button>
          </div>
          <div className='nft-box'>
            <i className='iconfont icon-LOGO' />
            <div className='nft-content-box'>
              <div
                className='nft-img-box'
                onClick={() => {
                  handleRecommendDetail(nft);
                }}
              >
                {nft && nft.item ? (
                  <Image
                    alt='nft'
                    layout='fill'
                    src={`${nft?.item}?x-oss-process=image/resize,m_fill,h_578,w_452`}
                  />
                ) : (
                  <Skeleton borderRadius={24} height='100%' width='100%' />
                )}
              </div>
              <div className='circle-box'>
                <Image
                  alt='circle'
                  layout='fill'
                  src='/static/svg/home-nft-circle-icon.svg'
                />
              </div>
              <div className='bottom-left-box'>
                <Image
                  alt='circle'
                  layout='fill'
                  src='/static/svg/home-nft-bottom-left.svg'
                />
              </div>
              <div className='bottom-right-box'>
                <Image
                  alt='circle'
                  layout='fill'
                  src='/static/svg/home-nft-bottom-right.svg'
                />
              </div>
              <div className='user-box'>
                {nft ? (
                  <>
                    <h3>{nft?.title?.toLocaleUpperCase() || ''}</h3>
                    <div className='des-box'>
                      <div className='head-box'>
                        <div className='img-box'>
                          <Image
                            alt='nft'
                            blurDataURL='/static/icon/copylink-icon.png'
                            layout='fill'
                            placeholder='blur'
                            src={nft?.portrait || '/static/icon/logoheader.png'}
                            onClick={() => {
                              if (!nft.isOfficial) {
                                router.push(RouterPath.profile(nft.userUuid));
                              }
                            }}
                          />
                        </div>
                        <h4>{nft.author || 'PD-1'}</h4>
                      </div>
                      <FavoriteHeart
                        action={nft.isLike ? 1 : 2}
                        amount={nft.totalLike}
                        color='#FFF'
                        fontColor='#FFF'
                        worksId={nft.id}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h3 />
                    <div className='des-box'>
                      <div className='head-box'>
                        <div className='img-box'>
                          <Image
                            alt='portrait'
                            layout='fill'
                            src='/static/icon/logoheader.png'
                          />
                        </div>
                        <h4 />
                      </div>
                      <FavoriteHeart
                        action={2}
                        amount={0}
                        color='#FFF'
                        fontColor='#FFF'
                        worksId='1'
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeBoutiquePanelContainer>
  );
});
HomeBoutiquePanel.displayName = 'HomeBoutiquePanel';

interface IPublishedProps {
  list: GlobalNft.Nft[] | null[];
  size: any;
}
const HomePublishedPanel: FC<IPublishedProps> = memo(({list, size}) => {
  const [swiper, setSwiper] = useState<any>(null);
  return (
    <HomePublishContainer>
      <div
        className='prev-box'
        onClick={() => {
          swiper.slidePrev();
        }}
      >
        <SvgIcon
          color='#989898'
          height={24}
          name='home-banner-prev'
          width={24}
        />
      </div>
      <div
        className='next-box'
        onClick={() => {
          swiper.slideNext();
        }}
      >
        <SvgIcon
          color='#989898'
          height={24}
          name='home-banner-next'
          width={24}
        />
      </div>
      <Card moreUrl={RouterPath.list('published')} title='Published NFT'>
        <Swiper
          loop={false}
          slidesPerView={size?.width && size.width > 1100 ? 5 : 4}
          spaceBetween={25}
          onSlideChange={() => {}}
          onSwiper={setSwiper}
        >
          {list.map((nft: any, index: number) => (
            <SwiperSlide key={`publish-${index}`}>
              <Project idx={index + 1} product={nft} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Card>
    </HomePublishContainer>
  );
});
HomePublishedPanel.displayName = 'HomePublishedPanel';

interface IRecommendProps {
  list: GlobalNft.WorksDetail[] | any[];
  title: string | null;
  desc: string | null;
}
const HomeRecommendPanel: FC<IRecommendProps> = memo(({list, title, desc}) => {
  const arr = [null, null, null];
  const router = useRouter();
  const handleMoreRecommend = () => {
    router.push(RouterPath.list('recommend'));
  };
  const handleRecommendDetail = (item: GlobalNft.WorksDetail | null) => {
    if (item) {
      router.push(RouterPath.worksDetail(item.id));
    }
  };
  return (
    <HomeRecommendContainer>
      <Card title='Recommend'>
        <div className='card-content-box'>
          <div className='recommend-nft-box'>
            {arr.map((_, index: number) => {
              return (
                <div
                  className={`nft-box nft-box-${index + 1}`}
                  key={`recommend-${index}`}
                  onClick={() => {
                    handleRecommendDetail(list[index]);
                  }}
                >
                  {list && list.length >= 3 ? (
                    <>
                      <div className='img-box'>
                        <Image
                          alt='nft'
                          blurDataURL='/static/icon/copylink-icon.png'
                          layout='fill'
                          placeholder='blur'
                          src={`${list[index].item}?x-oss-process=image/resize,m_fill,h_300,w_300`}
                        />
                        <div className='name'>{list[index].title}</div>
                      </div>

                      <div className='user-box'>
                        <Image
                          alt='nft'
                          layout='fill'
                          src={
                            list[index].portrait
                              ? `${list[index].portrait}?x-oss-process=image/resize,m_fill,h_72,w_72`
                              : '/static/icon/logoheader.png'
                          }
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='img-box'>
                        <Skeleton height='100%' width='100%' />
                      </div>
                      <div className='user-box'>
                        <Skeleton height='100%' width='100%' />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div className='recommend-tip-box'>
            {title ? (
              <h2 dangerouslySetInnerHTML={{__html: title}} />
            ) : (
              <Skeleton borderRadius={20} height={40} width='100%' />
            )}
            {desc ? (
              <p>{desc}</p>
            ) : (
              <Skeleton
                borderRadius={20}
                height={150}
                style={{
                  marginTop: '30px',
                  marginBottom: '50px',
                }}
                width='100%'
              />
            )}
            <Button
              borderRadius={40}
              endIcon={<SvgIcon color='#53A9FF' name='right-icon' width={20} />}
              fontSize={18}
              height={58}
              variant='tertiary'
              width={214}
              onClick={handleMoreRecommend}
            >
              Explore More
            </Button>
          </div>
        </div>
      </Card>
    </HomeRecommendContainer>
  );
});
HomeRecommendPanel.displayName = 'HomeRecommendPanel';

type ICollectionProps = {
  list: any[];
  size: any;
};
const HomeCollectionPanel: FC<ICollectionProps> = memo(({list, size}) => {
  const router = useRouter();
  const handleMoreCollection = () => {
    router.push(RouterPath.list('newCollection'));
  };
  return (
    <HomeCollectionContainer>
      <Card title='New Collection'>
        <div className='collection-content'>
          <Row>
            {list.map((nft: any, index: number) => (
              <Col
                colGutter={32}
                key={`new-${index}`}
                span={size?.width && size.width > 1100 ? 4 : 3}
              >
                <Product product={nft} />
              </Col>
            ))}
          </Row>
        </div>
      </Card>
      <div className='more-box'>
        <Button
          borderRadius={40}
          fontSize={18}
          height={50}
          variant='tertiary'
          width={178}
          onClick={handleMoreCollection}
        >
          Explore More
        </Button>
      </div>
    </HomeCollectionContainer>
  );
});
HomeCollectionPanel.displayName = 'HomeCollectionPanel';

export default Home;
