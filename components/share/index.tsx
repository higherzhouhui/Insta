import {FC, memo} from 'react';

import {UserItemContainer, UserListContainer} from '../layout/header/styles';

import {SvgIcon} from '@/uikit';
import {showTip, IMessageType} from '@/utils';
import {copyUrlToClip} from '@/utils/common';
import {shareToFacebook, shareToTwitter} from '@/utils/share';

type ShareProps = {
  href?: string;
  name?: string;
};

export const ShareComp: FC<ShareProps> = memo(({href}) => {
  const onClick = (type: string) => {
    let url = window.location.href;
    if (href) {
      url = window.location.origin + href;
    }
    if (type === 'COPY') {
      copyUrlToClip(url);
      showTip({type: IMessageType.SUCCESS, content: 'Link Copied!'});
    }
    if (type === 'SHARE_FACEBOOK') {
      shareToFacebook(url);
    }
    if (type === 'SHARE_TWITTER') {
      shareToTwitter('Check out this item on PD-1', url, 'Pd1Community');
    }
  };
  const data = [
    {
      src: 'share-copy',
      name: 'Copy Link',
      href: '',
      alt: 'copy link',
      type: 'COPY',
    },
    {
      src: 'share-facebook',
      name: 'Share on Facebook',
      href: 'http://www.facebook.com',
      alt: 'facebook',
      type: 'SHARE_FACEBOOK',
    },
    {
      src: 'share-twitter',
      name: 'Share to Twitter',
      href: 'http://www.twitter.com',
      alt: 'twitter',
      type: 'SHARE_TWITTER',
      color: '#3D99F7',
    },
  ];
  return (
    <UserListContainer>
      {data.map((val, index) => (
        <UserItemContainer
          key={`${index}_User`}
          style={{cursor: val.type === 'COPY' ? 'copy' : 'pointer'}}
          onClick={() => {
            onClick(val.type);
          }}
        >
          <div className='name-box'>
            <SvgIcon
              color={val.color}
              height={24}
              name={val.src}
              width={24}
              onClick={() => {
                onClick(val.type);
              }}
            />
            <span>{val.name}</span>
          </div>
        </UserItemContainer>
      ))}
    </UserListContainer>
  );
});

ShareComp.displayName = 'ShareComp';
