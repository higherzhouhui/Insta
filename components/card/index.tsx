import Link from 'next/link';
import {FC, memo} from 'react';

import {CardContainer, CardHeaderContainer, CardBodyContainer} from './styles';

import {SvgIcon} from '@/uikit';

type IProps = {
  title: string;
  moreUrl?: string | null;
};

export const Card: FC<IProps> = memo(({children, title, moreUrl = null}) => {
  return (
    <CardContainer>
      <CardHeaderContainer
        style={{
          justifyContent: moreUrl ? 'space-between' : 'center',
        }}
      >
        <h3>{title}</h3>
        {moreUrl ? (
          <div className='more-box'>
            <Link passHref href={moreUrl}>
              View all
            </Link>
            <SvgIcon
              color='#D2D2D2'
              height={24}
              name='more-right-icon'
              width={24}
            />
          </div>
        ) : null}
      </CardHeaderContainer>
      <CardBodyContainer>{children}</CardBodyContainer>
    </CardContainer>
  );
});

Card.displayName = 'Card';
