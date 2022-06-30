import {useSize} from 'ahooks';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useState, useEffect, useRef} from 'react';
import Skeleton from 'react-loading-skeleton';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {Product, List} from '@/components';
import {RouterPath} from '@/config/routes';
import {getUserCreated, getUserFavorite, getUserInfo} from '@/services/user';
import {userState} from '@/store/user';
import {MainContent} from '@/styles/list';
import {Content, PersonalInfo, MainTop} from '@/styles/profile';
import {Button, Row, Col, Empty} from '@/uikit';

let nfts: any[] = [];
const Profile: NextPage = () => {
  const [user, _setUser] = useRecoilState(userState);
  const homeRef: any = useRef(null);
  const size = useSize(homeRef);
  const router = useRouter();
  const {uuid, type} = router.query;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 20;
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

  const [userInfo, setuserInfo] = useState({
    username: null,
    portrait: null,
  });

  const loadList = async (page: number, init?: boolean) => {
    if (init) {
      total = 0;
      nfts = [];
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
    if (!type) {
      getUserCreated({
        page,
        pageSize,
        uuid: uuid as string,
      }).then((res: any) => {
        handleResult(res);
      });
    }
    if (type === 'favorite') {
      getUserFavorite({
        page,
        pageSize,
        uuid: uuid as string,
      }).then((res: any) => {
        handleResult(res);
      });
    }

    if (type === 'pd1nft') {
      nfts = [];
      setTotal(0);
    }
  };

  const loadMore = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
  /**
   * tab切换
   */
  const handleTabClick = (tab: string) => {
    router.push(RouterPath.profile(uuid as string, tab));
  };

  useEffect(() => {
    setCurrentPage(1);
    if (uuid) {
      getUserProfle();
    }
    loadList(1, true);
  }, [type, uuid]);

  useEffect(() => {
    if (currentPage > 1 && total > 0) {
      loadList(currentPage);
    }
  }, [currentPage]);

  const getUserProfle = async () => {
    const res: any = await getUserInfo({uuid: uuid as any});
    if (res && res.code === 0) {
      const userIn = {
        username: res.data?.username,
        portrait: res.data?.portrait,
      };
      setuserInfo(userIn as any);
    }
  };

  const EditProfile = () => {
    router.push(RouterPath.account);
  };

  return (
    <Content ref={homeRef}>
      <MainContent>
        <MainTop>
          <PersonalInfo>
            {userInfo.portrait ? (
              <div className='personalHead'>
                <Image
                  alt=''
                  className='personalHead'
                  height={96}
                  src={
                    userInfo.portrait
                      ? userInfo.portrait
                      : user.portrait || '/static/icon/avatar-icon1.png'
                  }
                  width={96}
                />
              </div>
            ) : (
              <Skeleton className='personalHead' />
            )}
            <div className='text'>
              {user.userId === uuid ? (
                <>
                  <div className='userName'>
                    {userInfo.username ? userInfo.username : 'Unnamed'}
                  </div>
                  <Button
                    className='editProfile'
                    height={32}
                    width={97}
                    onClick={EditProfile}
                  >
                    Edit Profile
                  </Button>
                </>
              ) : (
                <div className='noEdit'>
                  {userInfo.username ? userInfo.username : '--'}
                </div>
              )}
            </div>
          </PersonalInfo>
          <div className='sortButtons'>
            <Button
              borderRadius={32}
              height={32}
              marginRight={36}
              variant={!type ? 'primary' : 'text'}
              width={92}
              onClick={() => {
                handleTabClick('');
              }}
            >
              Created
            </Button>
            <Button
              borderRadius={32}
              height={32}
              marginRight={36}
              variant={type === 'favorite' ? 'primary' : 'text'}
              width={92}
              onClick={() => {
                handleTabClick('favorite');
              }}
            >
              Favorite
            </Button>
            <Button
              borderRadius={32}
              height={32}
              style={{visibility: user.userId === uuid ? 'visible' : 'hidden'}}
              variant={type === 'pd1nft' ? 'primary' : 'text'}
              width={112}
              onClick={() => {
                handleTabClick('pd1nft');
              }}
            >
              PD-1&nbsp;NFT
            </Button>
          </div>
        </MainTop>
        <List bottomHeight={0} onLoadMore={loadMore}>
          <Row>
            {nfts.map((nft: any, index: number) => (
              <Col
                colGutter={32}
                key={index}
                span={size?.width && size.width > 1100 ? 4 : 3}
              >
                <Product key={index} product={nft} />
              </Col>
            ))}
          </Row>
        </List>
        {!nfts.length ? (
          <Empty
            text={type === 'pd1nft' ? 'Under development...' : undefined}
          />
        ) : null}
      </MainContent>
    </Content>
  );
};

export default Profile;
