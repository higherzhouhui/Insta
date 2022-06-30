import {useSize} from 'ahooks';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';

import {List, TagProduct} from '@/components';
import {getTagContent} from '@/services/tag';
import {Content, ImageWrapper, MainContent, OptionWrapper} from '@/styles/tag';
import {Button, Col, Row, Select, Empty} from '@/uikit';

const TagPage: NextPage = () => {
  const homeRef: any = useRef(null);
  const size = useSize(homeRef);
  const router = useRouter();
  // 读取传过来的参数，根据该值读取的后台数据也有不同
  const tagId = router.query.id;
  const tagName = router.query.tagName;
  const options1: any = [
    {label: 'All', value: 0},
    {label: 'NFT', value: 2},
    {label: 'Non-NFT', value: 3},
  ];
  const options2: any = [
    {label: 'Sort by', value: undefined},
    {label: 'Recently Listed', value: 1},
    {label: 'Most Viewed', value: 2},
    {label: 'Most Favorited', value: 3},
  ];

  const [sort, setSort] = useState<number | undefined>(undefined);
  const [fliter, setfliter] = useState<number>(0);
  const [tabType, setTabType] = useState('collection');
  let [nftList, setNftList] = useState<any[]>([]);
  let [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;

  const loadList = async (page: number, init?: boolean) => {
    if (init) {
      total = 0;
      nftList = [];
    }
    let list = [];
    let totalCount = 0;
    let cpage = 1;
    // 判断是否到底
    if (total !== 0 && nftList.length >= total) {
      return;
    }
    const len =
      total - nftList.length >= pageSize || !total
        ? pageSize
        : total - nftList.length;
    const arr = [...Array(len)].map(() => null);
    setNftList(nftList.concat(arr));
    getTagContent({
      tagId: tagId as any,
      sort,
      page,
      pageSize: len,
      isOfficial: tabType === 'collection',
    })
      .then((res: any) => {
        list = res?.data?.infoList || [];
        totalCount = res?.data?.totalCount || 0;
        cpage = res?.data?.page;
        setNftList(nftList.filter((item) => item !== null).concat(list));
        setTotal(totalCount);
        setCurrentPage(cpage);
      })
      .catch(() => {
        setNftList(nftList.filter((nft) => nft !== null));
      });
  };

  const loadMore = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
  /**
   * tab切换
   */
  const handleTabClick = (tab: string) => {
    setTabType(tab);
  };

  /**
   * sort排序
   */
  const handleSelectChange = (item: any) => {
    setSort(item.value);
  };
  /**
   * 过滤
   */
  const handleSelectFliter = (item: any) => {
    setfliter(item.value);
  };

  useEffect(() => {
    setCurrentPage(1);
    if (tagId) {
      loadList(1, true);
    }
  }, [tabType, sort, fliter, tagId, tagName]);

  useEffect(() => {
    if (currentPage > 1 && tagId && total > 0) {
      loadList(currentPage);
    }
  }, [currentPage]);

  return (
    <Content ref={homeRef} style={{background: '#FFF'}}>
      <ImageWrapper backgroundImage='/static/image/tag-banner.png'>
        <span className='title'>{tagName}</span>
      </ImageWrapper>
      <MainContent>
        <OptionWrapper>
          <div className='inputwrapper'>
            <Button
              borderRadius={32}
              height={32}
              marginRight={36}
              variant={tabType === 'collection' ? 'primary' : 'text'}
              width={92}
              onClick={() => {
                handleTabClick('collection');
              }}
            >
              Collection
            </Button>
            <Button
              borderRadius={32}
              height={32}
              variant={tabType === 'pictures' ? 'primary' : 'text'}
              width={92}
              onClick={() => {
                handleTabClick('pictures');
              }}
            >
              Pictures
            </Button>
          </div>
          <div className='inputwrapper'>
            <Select
              defaultValue={options1[0]}
              fontSize={14}
              height={32}
              minHeight={32}
              mr={24}
              options={options1}
              width={160}
              onChange={(value: any) => {
                handleSelectFliter(value);
              }}
            />
            <Select
              defaultValue={options2[0]}
              fontSize={14}
              height={32}
              minHeight={32}
              options={options2}
              value={sort}
              width={160}
              onChange={(value: any) => {
                handleSelectChange(value);
              }}
            />
          </div>
        </OptionWrapper>
        <List bottomHeight={0} onLoadMore={loadMore}>
          <Row>
            {nftList?.map((nft: any, index: number) => (
              <Col key={index} span={size?.width && size.width > 1100 ? 4 : 3}>
                <TagProduct key={index} product={nft} />
              </Col>
            ))}
          </Row>
        </List>
        {!nftList.length ? <Empty /> : null}
      </MainContent>
    </Content>
  );
};

TagPage.displayName = 'TagPage';

export default TagPage;
