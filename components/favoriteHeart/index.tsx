import {FC, memo, useEffect, useState} from 'react';

import {Auth} from '../auth';
import {FavoriteHeartWrapper} from './styles';

import {postFavorite} from '@/services/common';
import {PostFavoriteProps} from '@/services/common.d';
import {Prompt, SvgIcon} from '@/uikit';

export interface IFavoriteHeartProps extends PostFavoriteProps {
  color?: string;
  amount?: number;
  fontColor?: string;
}

export const FavoriteHeart: FC<IFavoriteHeartProps> = memo(({...props}) => {
  // action:1=收藏 2=取消
  let [favoriteAction, setFavoriteAction] = useState(1);
  let [totalLike, setTotalLike] = useState<number | undefined>(undefined);
  const color: string = props.color ?? '#989898';
  const fontColor: string = props.fontColor ?? '#989898';
  useEffect(() => {
    setFavoriteAction(props.action);
  }, [props.action]);

  useEffect(() => {
    setTotalLike(props.amount);
  }, [props.amount]);

  const setIsFavorite = async () => {
    if (favoriteAction === 1) {
      favoriteAction = 2;
      if (totalLike === 0 || totalLike) {
        totalLike -= 1;
      }
    } else {
      favoriteAction = 1;
      if (totalLike === 0 || totalLike) {
        totalLike += 1;
      }
    }
    await postFavorite({worksId: props.worksId, action: favoriteAction})
      .then((res) => {
        if (res.code === 0) {
          setFavoriteAction(favoriteAction);
          setTotalLike(totalLike);
        }
      })
      .catch(() => {
        console.error('favorite error');
      });
  };

  return (
    <FavoriteHeartWrapper color={fontColor}>
      <div className='wrapperIcon'>
        <Prompt text={favoriteAction === 1 ? 'Unfavorite' : 'Favorite'}>
          <Auth>
            <SvgIcon
              className='icon'
              color={favoriteAction === 1 ? '#ff6666' : color}
              height={24}
              name='love-icon'
              width={24}
              onClick={setIsFavorite}
            />
          </Auth>
        </Prompt>
      </div>
      {totalLike === 0 || totalLike ? (
        <span className='amount'>{totalLike}</span>
      ) : null}
    </FavoriteHeartWrapper>
  );
});

FavoriteHeart.displayName = 'FavoriteHeart';
