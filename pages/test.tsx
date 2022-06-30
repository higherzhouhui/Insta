import {useRouter} from 'next/router';

import type {NextPage} from 'next';

import {Project} from '@/components';
import {useTranslation} from '@/hooks';
import {Box, Button} from '@/uikit';

const Home: NextPage = () => {
  const router = useRouter();
  const {t, setLanguage} = useTranslation();
  const handleDetailClick = () => {
    router.push('/detail');
  };
  return (
    <div>
      <main>
        <h1>{t('h1')}</h1>
        <Box
          background='primary'
          border='1px solid red'
          color='primary'
          mb={2}
          mt={2}
        >
          123
        </Box>
        <Button variant='primary' width={200} onClick={handleDetailClick}>
          go detail
        </Button>
        <Button
          variant='primary'
          width={200}
          onClick={() => {
            setLanguage('zh_CN');
          }}
        >
          中文
        </Button>
        <Button
          variant='primary'
          width={200}
          onClick={() => {
            setLanguage('en_US');
          }}
        >
          英文
        </Button>
        <Project idx={1} />
      </main>
    </div>
  );
};

export default Home;
