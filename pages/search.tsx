import {useSize} from 'ahooks';
import {NextPage} from 'next';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {FC, memo, useEffect, useRef, useState} from 'react';
import Skeleton from 'react-loading-skeleton';

import {List, Product, Project, searchType} from '@/components';
import {RouterPath} from '@/config/routes';
import {getSearchAuthor, getSearchImage, getSearchNft} from '@/services/search';
import {MainContent} from '@/styles/list';
import {
  ApicWarpper,
  AuthorHeader,
  AuthorName,
  Create,
  CreateTotal,
  ProductAuthorWrapper,
  Records,
  SearchResult,
  TheDescribe,
  Wnbsp,
  Work,
  Works,
} from '@/styles/search';
import {Col, Empty, Row} from '@/uikit';

// 默认1页显示8条数据
const pageSize = 20;

const SearchPage: NextPage = () => {
  const homeRef: any = useRef(null);
  const size = useSize(homeRef);
  const router = useRouter();
  // 读取传过来的参数，根据该值读取的后台数据也有不同
  const {search, type} = router.query;
  // 本地模拟数据
  const [infoList, setinfoList] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [total, settotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // 将type保存在hooks内，避免页面刷新之后type变了而infolist没有更新
  const [stype, setstype] = useState(type);
  useEffect(() => {
    setinfoList([null, null, null, null, null, null, null, null]);
    setstype(type);
    settotalCount(0);
    search && type && loadListRequest(1) && setCurrentPage(1);
  }, [type, search]);

  useEffect(() => {
    if (currentPage > 1) {
      loadListRequest(currentPage);
    }
  }, [currentPage]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const loadListRequest = async (page: number) => {
    if ((page !== 1 && total && infoList.length >= total) || !type || !search) {
      return;
    }
    const len =
      total - infoList.length >= pageSize || !total
        ? pageSize
        : total - infoList.length;
    const arr = [...Array(len)].map(() => null);
    setinfoList((infoList) => [...infoList, ...arr]);

    let list = [];
    let totalCount = 0;
    if (type === searchType.IMAGE) {
      const res: any = await getSearchImage({
        title: search,
        page,
        pageSize,
      });
      list = res?.data?.infoList || [];
      totalCount = res?.data?.totalCount || 0;
    }
    if (type === searchType.AUTHOR) {
      const res: any = await getSearchAuthor({
        title: search,
        page,
        pageSize,
      });
      list = res?.data?.infoList || [];
      totalCount = res?.data?.totalCount || 0;
    }
    if (type === searchType.NFT) {
      const res: any = await getSearchNft({
        title: search,
        page,
        pageSize,
      });
      list = res?.data?.infoList || [];
      totalCount = res?.data?.totalCount || 0;
    }
    if (total !== totalCount) {
      settotalCount(() => totalCount);
    }
    if (page === 1) {
      setinfoList([...list]);
    } else {
      const startIdx = (page - 1) * pageSize;
      list.forEach((item: any, index: number) => {
        infoList[startIdx + index] = item;
      });
      setinfoList([...infoList]);
    }
  };
  return (
    <SearchResult
      ref={homeRef}
      style={
        stype === searchType.AUTHOR
          ? {background: '#FFF'}
          : {background: '#F5F8FB'}
      }
    >
      <MainContent>
        <List bottomHeight={0} onLoadMore={loadMore}>
          <Row>
            {stype === searchType.NFT
              ? infoList.map((nft: any, index: number) => (
                  <Col
                    colGutter={32}
                    gutter={24}
                    key={`search-${index}`}
                    span={size?.width && size.width > 1100 ? 5 : 4}
                  >
                    <Project idx={index + 1} key={index} product={nft} />
                  </Col>
                ))
              : infoList.map((nft: any, index: number) => (
                  <Col
                    colGutter={32}
                    gutter={24}
                    key={`search-${index}`}
                    span={size?.width && size.width > 1100 ? 4 : 3}
                  >
                    {stype === searchType.AUTHOR ? (
                      <ProductAuthor key={index + 1} product={nft} />
                    ) : (
                      <Product key={index} product={nft} />
                    )}
                  </Col>
                ))}
          </Row>
        </List>
        {!infoList.length ? <Empty /> : null}
      </MainContent>
    </SearchResult>
  );
};

SearchPage.displayName = 'SearchPage';

type IProps = {
  product?: GlobalUser.User;
};

export const ProductAuthor: FC<IProps> = memo(({product}) => {
  const router = useRouter();
  const onClick = () => {
    if (product && product.uuid) {
      router.push(RouterPath.profile(product.uuid));
    }
  };
  return (
    <ProductAuthorWrapper onClick={onClick}>
      {product && product.works_uri ? (
        <>
          <Works>
            <Work key='work1'>
              {product.works_uri[0] ? (
                <Image alt='works1' layout='fill' src={product.works_uri[0]} />
              ) : null}
            </Work>
            <Wnbsp key='work2' />
            <Work key='work3'>
              {product.works_uri[1] ? (
                <Image alt='works1' layout='fill' src={product.works_uri[1]} />
              ) : null}
            </Work>
            <Wnbsp key='work4' />
            <Work key='work5'>
              {product.works_uri[2] ? (
                <Image alt='works1' layout='fill' src={product.works_uri[2]} />
              ) : null}
            </Work>
          </Works>
          <AuthorHeader>
            <ApicWarpper>
              <Image
                alt='user'
                layout='fill'
                src={
                  product.portrait
                    ? product.portrait
                    : '/static/icon/avatar-icon7.png'
                }
              />
            </ApicWarpper>
            <AuthorName>{product.username}</AuthorName>
          </AuthorHeader>

          <Records>
            <Create key='creat1'>
              <CreateTotal>{product.created}</CreateTotal>
              <TheDescribe>Created</TheDescribe>
            </Create>
            <Create key='creat2'>
              <CreateTotal>{product.favorite}</CreateTotal>
              <TheDescribe>Favorite</TheDescribe>
            </Create>
          </Records>
        </>
      ) : (
        <>
          <Works>
            <Work key='work1'>
              <Skeleton height='100%' />
            </Work>
            <Wnbsp key='work2' />
            <Work key='work3'>
              <Skeleton height='100%' />
            </Work>
            <Wnbsp key='work4' />
            <Work key='work5'>
              <Skeleton height='100%' />
            </Work>
          </Works>
          <AuthorHeader>
            <ApicWarpper>
              <Skeleton circle height='100%' />
            </ApicWarpper>
            <AuthorName>
              <Skeleton />
            </AuthorName>
          </AuthorHeader>
          <Records>
            <Create key='create1'>
              <CreateTotal>
                <Skeleton />
              </CreateTotal>
              <TheDescribe>
                <Skeleton />
              </TheDescribe>
            </Create>
            <Create key='create2'>
              <CreateTotal>
                <Skeleton />
              </CreateTotal>
              <TheDescribe>
                <Skeleton />
              </TheDescribe>
            </Create>
          </Records>
        </>
      )}
    </ProductAuthorWrapper>
  );
});

ProductAuthor.displayName = 'ProductAuthor';

export default SearchPage;
