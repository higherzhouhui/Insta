import {useRouter} from 'next/router';
import {FC, memo, Children, cloneElement, ReactElement} from 'react';
import {useRecoilState} from 'recoil';

import {userState} from '@/store/user';

type IProps = {
  children: ReactElement | any;
};

export const Auth: FC<IProps> = memo(({children}) => {
  const router = useRouter();
  const [user] = useRecoilState(userState);
  const handleAuthClick = () => {
    if (router.pathname === '/user/login') {
      return;
    }
    router.push(`/user/login?redirectUrl=${router.asPath}`);
  };
  if (user.token) {
    return children;
  }
  return Children.map(children, (child: ReactElement) => {
    return cloneElement(child, {
      ...child.props,
      onClick: handleAuthClick,
    });
  });
});

Auth.displayName = 'Auth';
