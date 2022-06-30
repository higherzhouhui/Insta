import {useSize} from 'ahooks';
import {NextPage} from 'next';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';
import Skeleton from 'react-loading-skeleton';

import {List, TagProduct} from '@/components';
import {getProjectInfo, getTypeList, getUserPicList} from '@/services/nft';
import {Content, MainContent} from '@/styles/list';
import {BannerShow} from '@/styles/project';
import {OptionWrapper} from '@/styles/tag';
import {Button, Col, Empty, Row, Select} from '@/uikit';

let nfts: any[] = [];
const ProjectPage: NextPage = () => {
  const homeRef: any = useRef(null);
  const size = useSize(homeRef);
  const router = useRouter();
  // 获取参数
  const typeId = router.query.id;
  const projectName = router.query.projectName;
  // 本地模拟数据
  const options: any = [
    {label: 'Sort by', value: undefined},
    {label: 'Recently Listed', value: 1},
    {label: 'Most Viewed', value: 2},
    {label: 'Most Favorited', value: 3},
  ];
  const [sort, setSort] = useState<number | undefined>(undefined);
  const [tabType, setTabType] = useState('collection');
  const [logo, setLogo] = useState('');
  const [banner, setBaner] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, _setPageSize] = useState<number>(20);
  let [total, setTotal] = useState<number>(0);
  const [_, setRandom] = useState<number>(0);

  const handleResult = (res: any) => {
    const list = res?.data?.infoList || [];
    const totalCount = res?.data?.totalCount || 0;
    const listPage = res?.data?.page || 1;

    setTotal(() => totalCount);
    if (listPage === 1) {
      nfts = [...list];
    } else {
      list.forEach((item: any, index: number) => {
        nfts[(listPage - 1) * pageSize + index] = item;
      });
    }
    setRandom(Math.random());
  };

  const loadList = (page: number, init?: boolean) => {
    if (init) {
      nfts = [];
      total = 0;
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

    if (tabType === 'collection') {
      getTypeList({
        typeId: typeId as any,
        sort,
        page,
        pageSize,
      }).then((res: any) => {
        handleResult(res);
      });
    }
    if (tabType === 'pictures') {
      getUserPicList({
        typeId: typeId as any,
        page,
        sort,
        pageSize,
      }).then((res: any) => {
        handleResult(res);
      });
    }
  };

  /**
   * 加载更多内容
   */
  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  /**
   * tab切换
   */
  const handleTabClick = (tab: string) => {
    if (tabType === tab) {
      return;
    }
    setTabType(tab);
  };

  /**
   * sort排序
   */
  const handleSelectChange = (item: any) => {
    setSort(item.value);
  };
  /**
   * 获取logo、banner
   */

  const getBaseInfo = async () => {
    const res: any = await getProjectInfo({typeID: typeId as any});
    if (res && res.code === 0) {
      const logo = res.data.logo;
      const logoUrl = `${logo}?x-oss-process=image/resize,m_fill,h_160,w_160`;
      const banner = res.data.banner;
      const bannerUrl = `${banner}?x-oss-process=image/resize,m_fill,h_240,w_1440`;
      setLogo(logoUrl);
      setBaner(bannerUrl);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    if (typeId && (!logo || !banner)) {
      getBaseInfo();
    }
    if (typeId && tabType) {
      loadList(1, true);
    }
  }, [typeId, tabType, sort, projectName]);

  useEffect(() => {
    if (typeId && currentPage > 1 && total > 0) {
      loadList(currentPage);
    }
  }, [currentPage]);

  return (
    <Content ref={homeRef} style={{background: '#FFF'}}>
      <BannerShow>
        {banner ? (
          <Image
            alt='banner'
            layout='fill'
            src={banner}
            onError={() => {
              setBaner(banner.split('?x-oss-process')[0]);
            }}
          />
        ) : (
          <Skeleton height='100%' width='100%' />
        )}
        <span className='title'>{projectName}</span>
      </BannerShow>
      <MainContent>
        {logo ? (
          <div className='project-icon'>
            <Image
              alt='logo'
              blurDataURL='/static/icon/copylink-icon.png'
              layout='fill'
              objectFit='contain'
              placeholder='blur'
              src={logo}
              onError={() => {
                setBaner(logo.split('?x-oss-process')[0]);
              }}
            />
          </div>
        ) : (
          <Skeleton className='project-icon' />
        )}
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
          <div>
            <Select
              defaultValue={options[0]}
              fontSize={14}
              height={32}
              minHeight={32}
              options={options}
              value={sort}
              width={160}
              onChange={handleSelectChange}
            />
          </div>
        </OptionWrapper>
        <List bottomHeight={0} onLoadMore={loadMore}>
          <Row>
            {nfts.map((nft: any, index: number) => (
              <Col key={index} span={size?.width && size.width > 1100 ? 4 : 3}>
                <TagProduct key={index} product={nft} />
              </Col>
            ))}
          </Row>
        </List>
        {!nfts.length ? <Empty /> : null}
      </MainContent>
    </Content>
  );
};

ProjectPage.displayName = 'ProjectPage';

export default ProjectPage;
