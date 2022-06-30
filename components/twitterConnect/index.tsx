import {useRouter} from 'next/router';
import {FC, useEffect, useState, memo} from 'react';

import {SocialConnectionContainer} from './styles';

import {webUrl} from '@/config';
import {getTwitterAuthUrl, getTwitterUserInfo} from '@/services/twitter';
import {Button, SvgIcon} from '@/uikit';

type SocialConnectionProps = {
  onChange: (user: GlobalTwitter.User | null) => void;
  user: GlobalTwitter.User | null;
  redirectUrl: string;
  isSubmit?: boolean;
};
export const TwitterConnect: FC<SocialConnectionProps> = memo(
  ({onChange, isSubmit = false, user, redirectUrl}) => {
    const router = useRouter();
    const [authUrl, setAuthUrl] = useState<string | null>(null);
    const {code} = router.query;
    useEffect(() => {
      getTwitterAuthUrlRequest();
    }, []);

    useEffect(() => {
      if (code) {
        getTwitterUserInfoRequest(code.toString());
      }
    }, [code]);

    // 获取授权地址
    const getTwitterAuthUrlRequest = () => {
      getTwitterAuthUrl(webUrl + redirectUrl).then((res) => {
        if (res.code === 0) {
          setAuthUrl(res.data.authUrl);
        }
      });
    };

    // 获取授权地址
    const getTwitterUserInfoRequest = (code: string) => {
      getTwitterUserInfo(code, webUrl + redirectUrl).then((res) => {
        if (res.code === 0) {
          onChange(res.data?.User);
        }
      });
    };

    // 链接twitter
    const handleConnectTwitterClick = (e: any) => {
      if (authUrl) {
        window.location.href = authUrl;
      }
    };

    // 断开twitter
    const handleDisConnectTwitterClick = (e: any) => {
      onChange(null);
    };
    return (
      <SocialConnectionContainer>
        <div className='left'>
          <div
            className={`img-box ${
              user && user?.id && user?.name ? 'active-img-box' : ''
            }`}
          >
            <SvgIcon
              color='white'
              height={24}
              name='share-twitter'
              width={24}
            />
          </div>
          <span>{(user && user?.name) || 'Twitter'}</span>
        </div>
        <div className='right'>
          {user && user?.id && user.name && (
            <Button
              borderRadius={8}
              height={32}
              type='button'
              variant='delete'
              width={89}
              onClick={handleDisConnectTwitterClick}
            >
              Delete
            </Button>
          )}
          {!user?.id && (
            <Button
              borderRadius={8}
              height={32}
              type={isSubmit ? 'submit' : 'button'}
              variant='primary'
              width={89}
              onClick={handleConnectTwitterClick}
            >
              Connect
            </Button>
          )}
        </div>
      </SocialConnectionContainer>
    );
  }
);
TwitterConnect.displayName = 'TwitterConnect';
