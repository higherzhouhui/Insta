import {FC, useEffect, memo, useRef} from 'react';

import {ListContainer, LoadingContainer} from './styles';

import {useDebounce} from '@/hooks';

type IProps = {
  onLoadMore?: () => void;
  bottomHeight?: number;
};

export const List: FC<IProps> = memo(
  ({children, bottomHeight = 0, onLoadMore = () => {}}) => {
    const bottomDomRef = useRef<HTMLDivElement | null>(null);
    const [scrollRenderHandler] = useDebounce(
      () => {
        const rect = bottomDomRef.current?.getBoundingClientRect();
        // top 是loading组件的位置
        const top = rect ? rect.top : 0;
        // 视窗高
        const clientHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        if (top < clientHeight) {
          // 继续渲染
          onLoadMore();
        }
      },
      300,
      []
    );

    useEffect(() => {
      document.addEventListener('scroll', scrollRenderHandler);
      return (): void => {
        document.removeEventListener('scroll', scrollRenderHandler);
      };
    }, [scrollRenderHandler]);

    return (
      <>
        <ListContainer>{children}</ListContainer>
        <LoadingContainer ref={bottomDomRef}>
          {/* <Loading /> */}
        </LoadingContainer>
        {/* <BottomCompletedContainer>
                It's over ～
            </BottomCompletedContainer> */}
      </>
    );
  }
);

List.displayName = 'List';
