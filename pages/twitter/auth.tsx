import {useRouter} from 'next/router';
import {useEffect} from 'react';
import styled from 'styled-components';

import type {NextPage} from 'next';

import {Loading} from '@/components';

export const TwitterAuthContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TwitterAuth: NextPage = () => {
  const router = useRouter();
  const {code, redirectUrl} = router.query;
  useEffect(() => {
    if (code && redirectUrl) {
      router.push(`${redirectUrl}?code=${code}`);
    }
  }, [code]);
  return (
    <TwitterAuthContainer>
      <Loading />
    </TwitterAuthContainer>
  );
};

export default TwitterAuth;
