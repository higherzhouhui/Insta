import Image from 'next/image';
import Link from 'next/link';
import {FC, memo} from 'react';

import {
  CommentConent,
  CommentUser,
  CommentWarpper,
  CommentWord,
} from './styles';

import {RouterPath} from '@/config/routes';

export const ComentPonent: FC<GlobalComment.Comment> = memo(
  ({children, userPortrait, userUsername, content, userId}) => {
    return (
      <CommentWarpper>
        <Link passHref href={RouterPath.profile(userId)}>
          <a className='userPortrait'>
            <Image
              alt='userPic'
              height={56}
              src={userPortrait || '/static/test/person2-icon.png'}
              width={56}
            />
          </a>
        </Link>
        <CommentConent>
          <CommentUser>{userUsername || 'Principal Financial'}</CommentUser>
          <CommentWord>
            {content || 'Way To improve the look and feel of our designs'}
          </CommentWord>
        </CommentConent>
        {children}
      </CommentWarpper>
    );
  }
);

ComentPonent.displayName = 'ComentPonent';
