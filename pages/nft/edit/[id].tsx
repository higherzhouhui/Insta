import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';

import type {NextPage} from 'next';

import {Loading} from '@/components';
import {CreateForm, CreateUpload} from '@/pages/create';
import {getDetail} from '@/services/nft';
import {CreateContainer, CreateItemContainer} from '@/styles/create';

const Edit: NextPage = () => {
  const router = useRouter();
  const {id} = router.query;
  const [works, setWorks] = useState<GlobalNft.Works>();
  const [filePath, setFilePath] = useState<string | null>(null);
  /**
   * 监听路由id变化获取详情
   */
  useEffect(() => {
    if (id) {
      getServerInitProps();
    }
  }, [id]);
  /**
   * 初始化详情信息
   */
  const getServerInitProps = async () => {
    const detailRes: any = await getDetail({
      worksID: id as any,
    });
    if (detailRes.code === 0) {
      setWorks(detailRes.data);
      setFilePath(detailRes.data.worksDetail.item);
    }
  };
  return (
    <CreateContainer>
      <CreateItemContainer>
        {works ? (
          <CreateUpload filePath={filePath} onChangeFilePath={setFilePath} />
        ) : (
          <Skeleton className='leftSkleton' />
        )}
      </CreateItemContainer>
      <CreateItemContainer>
        {works ? (
          <CreateForm filePath={filePath} works={works} />
        ) : (
          <div className='loadingWrapper'>
            <Loading size='large' />
          </div>
        )}
      </CreateItemContainer>
    </CreateContainer>
  );
};

Edit.displayName = 'Edit';

export default Edit;
