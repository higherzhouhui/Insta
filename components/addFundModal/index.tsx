import Image from 'next/image';
import {FC, memo, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilState} from 'recoil';

import {AddFundContainer} from './styles';

import {Web3ProviderContext} from '@/ethers-react';
import {userState} from '@/store/user';
import {Modal} from '@/uikit';
import {copyUrlToClip, showTip, IMessageType} from '@/utils';

type IProps = {
  show: boolean;
  onClose: () => void;
};

export const AddFundModal: FC<IProps> = memo(({show, onClose}) => {
  const [user, setUser] = useRecoilState(userState);
  const {connectedAccount} = useContext(Web3ProviderContext);
  const {t} = useTranslation();
  const handleCopyClick = () => {
    copyUrlToClip(`${user.accountAddress}` || '');
    showTip({type: IMessageType.SUCCESS, content: t('copySuccess')});
  };
  return (
    <Modal height={432} visible={show} width='90%' onClose={onClose}>
      <AddFundContainer>
        <h2>{t('Add funds')}</h2>
        <div className='img-box'>
          <Image
            alt='icon'
            height={120}
            src='/static/icon/add-funds-icon.png'
            width={120}
          />
        </div>
        <p>{t('transferIntro')}</p>
        <div className='input-box'>
          <div className='address-box'>{connectedAccount}</div>
          <div
            className='copy'
            onClick={() => {
              handleCopyClick();
            }}
          >
            {t('Copy')}
          </div>
        </div>
        <p className='tip'>{t('onlyEth')}</p>
        <img
          className='close'
          src='/static/image/close.png'
          onClick={() => {
            onClose();
          }}
        />
      </AddFundContainer>
    </Modal>
  );
});

AddFundModal.displayName = 'AddFundModal';
