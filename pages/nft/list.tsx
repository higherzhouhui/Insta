import {useSize} from 'ahooks';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useState, useRef, useEffect, FC, memo} from 'react';

import type {NextPage} from 'next';

import {Product, Project, List} from '@/components';
import {getRecommend, getNewCollection, getMoreNfts} from '@/services/nft';
import {
  BubbleComp,
  Bubbles,
  BubleStyle,
  Content,
  ImageWrapper,
  MainContent,
} from '@/styles/list';
import {Row, Col} from '@/uikit';

let nfts: any[] = [];
const NftList: NextPage = () => {
  const contentRef: any = useRef(null);
  const size = useSize(contentRef);
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, _setPageSize] = useState<number>(20);
  const [total, setTotal] = useState<number>(0);
  const [_, setRandom] = useState<number>(0);
  const {type} = router.query;

  useEffect(() => {
    if (type === 'recommend') {
      setTitle('Recommend');
    }
    if (type === 'newCollection') {
      setTitle('New Collection');
    }
    if (type === 'published') {
      setTitle('Top Collections');
    }
    if (type) {
      loadListRequest(1);
    }
  }, [type]);

  useEffect(() => {
    if (type && currentPage > 1) {
      loadListRequest(currentPage);
    }
  }, [currentPage]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleResult = (res: any) => {
    const list = res?.data?.infoList || [];
    const totalCount = res?.data?.totalCount || 0;
    const listPage = res?.data?.page || 1;

    if (total !== totalCount) {
      setTotal(() => totalCount);
    }
    if (listPage === 1) {
      nfts = [...list];
    } else {
      list.forEach((item: any, index: number) => {
        nfts[(listPage - 1) * pageSize + index] = item;
      });
    }
    setRandom(Math.random());
  };

  const loadListRequest = (page: number) => {
    if (!type) {
      return;
    }
    if (total && nfts.length >= total) {
      return;
    }

    const len =
      total - nfts.length >= pageSize || !total
        ? pageSize
        : total - nfts.length;
    const arr = [...Array(len)].map(() => null);
    nfts = [...nfts, ...arr];
    setRandom(Math.random());
    if (type === 'recommend') {
      getRecommend({
        page,
        pageSize,
      }).then((res: any) => {
        handleResult(res);
      });
    }
    if (type === 'newCollection') {
      getNewCollection({
        page,
        pageSize,
      }).then((res: any) => {
        handleResult(res);
      });
    }
    if (type === 'published') {
      getMoreNfts({
        page,
        pageSize,
      }).then((res: any) => {
        handleResult(res);
      });
    }
  };

  return (
    <Content ref={contentRef}>
      <img
        alt=''
        src="https://pd1.oss-accelerate.aliyuncs.com/pd1/uploads/2022-04-11/eEpUJJfq4OVV3AcCKPDCGypTwP8WAyig.gif'?x-oss-process=image/resize,m_fill,h_310,w_310'"
      />
      <ImageWrapper>
        {type === 'published' ? (
          <div className='published'>
            <div className='nft-image'>
              <Image layout='fill' src='/static/image/nftlist-left.png' />
            </div>
            <div className='titleWrapper'>
              <span className='title'>{title}</span>
              <span className='underline' />
            </div>
            <div className='nft-image'>
              <Image layout='fill' src='/static/image/nftlist-right.png' />
            </div>
          </div>
        ) : (
          <>
            <div className='titleWrapper'>
              <span className='title'>{title}</span>
              <span className='underline' />
            </div>
            <div className='decbubble'>
              <Bubble type={type} />
            </div>
          </>
        )}
      </ImageWrapper>
      <MainContent>
        <List bottomHeight={0} onLoadMore={loadMore}>
          <Row>
            {type === 'published'
              ? nfts.map((nft: any, index: number) => (
                  <Col
                    colGutter={40}
                    gutter={24}
                    key={index}
                    span={size?.width && size.width > 1100 ? 5 : 4}
                  >
                    <Project idx={index + 1} product={nft} />
                  </Col>
                ))
              : nfts.map((nft: any, index: number) => (
                  <Col
                    colGutter={32}
                    gutter={24}
                    key={index}
                    span={size?.width && size.width > 1100 ? 4 : 3}
                  >
                    <Product key={index} product={nft} />
                  </Col>
                ))}
          </Row>
        </List>
      </MainContent>
    </Content>
  );
};

NftList.displayName = 'NftList';

type BubbleProps = {
  type: string | string[] | undefined;
};

const Bubble: FC<BubbleProps> = memo((props) => {
  const type = props.type;
  const [bubleStyles, setBubleStyles] = useState<BubleStyle[]>([]);
  let tempStyles: any = '';
  useEffect(() => {
    if (type === 'recommend') {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      tempStyles = [
        {width: 139, left: 6, top: 81, background: '#70C3FF'},
        {width: 49, left: '25%', top: 31, background: '#FF76F1'},
        {width: 35, left: '57%', top: 148, background: '#FF8E76'},
        {width: 56, left: '65%', top: 61, background: '#76BDFF'},
        {width: 129, left: '90%', top: 6, background: '#FFD770'},
      ];
    } else if (type === 'newCollection') {
      tempStyles = [
        {width: 151, left: 6, top: -5, background: '#FF7970'},
        {width: 35, left: '30%', top: 60, background: '#FF8E76'},
        {width: 71, left: '55%', top: 140, background: '#C376FF'},
        {width: 56, left: '68%', top: 70, background: '#45EAC2'},
        {width: 151, left: '88%', top: 68, background: '#70BBFF'},
      ];
    }
    setBubleStyles(tempStyles);
  }, [type]);

  return (
    <BubbleComp {...props}>
      {bubleStyles.map((val, index) => {
        return <Bubbles {...val} key={index} />;
      })}
    </BubbleComp>
  );
});

Bubble.displayName = 'Bubble';

export default NftList;
