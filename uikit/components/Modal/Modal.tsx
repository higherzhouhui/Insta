import {rest} from 'lodash';
import {FC, memo, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import {
  ModalContainer,
  ModalMaskContainer,
  ModalContentContainer,
  ModalLoading,
} from './style';
import {ModalProps} from './types';

import {Loading} from '@/components';

const Modal: FC<ModalProps> = memo((props) => {
  const {
    destroyOnClose,
    getContainer = document.body,
    mask = true,
    width = '478px',
    height = '456px',
    zIndex = 10,
    onClose = () => {},
    children,
    loading,
  } = props;
  const [visible, setVisible] = useState(props.visible || false);
  const [isDesChild, setIsDesChild] = useState(false);
  const [isLoading, setIsloading] = useState(loading);
  // 关闭
  const handleClose = () => {
    if (isLoading) {
      return;
    }
    onClose();
    setVisible((prev) => {
      if (getContainer !== false && prev) {
        getContainer.style.overflow = 'auto';
      }
      return false;
    });
    if (destroyOnClose) {
      setIsDesChild(true);
    }
  };
  useEffect(() => {
    setVisible(props.visible || false);
    setIsDesChild(!props.visible);
    setIsloading(props.loading);
    if (props.visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [props.visible, props.loading]);

  const ModalDom = (
    <ModalContainer visible={visible} zIndex={zIndex}>
      {!!mask && (
        <ModalMaskContainer
          visible={visible}
          zIndex={zIndex}
          onClick={handleClose}
        />
      )}
      <ModalContentContainer
        {...(rest as any)}
        height={height}
        visible={visible}
        width={width}
      >
        {isLoading ? (
          <ModalLoading>
            <div className='text'>Please Wait...</div>
            <div className='loading'>
              <Loading />
            </div>
          </ModalLoading>
        ) : isDesChild ? null : (
          children
        )}
      </ModalContentContainer>
    </ModalContainer>
  );
  return getContainer === false
    ? ModalDom
    : ReactDOM.createPortal(ModalDom, getContainer);
});

Modal.defaultProps = {};

Modal.displayName = 'Modal';
export default Modal;
