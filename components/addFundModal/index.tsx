import Image from 'next/image';
import {FC, memo, useContext} from 'react';
import {useRecoilState} from 'recoil';

import {AddFundContainer} from './styles';

import {Web3ProviderContext} from '@/ethers-react';
import {userState} from '@/store/user';
import {Modal, Button} from '@/uikit';
import {copyUrlToClip, showTip, IMessageType} from '@/utils';

type IProps = {
  show: boolean;
  onClose: () => void;
};

export const AddFundModal: FC<IProps> = memo(({show, onClose}) => {
  const [user, setUser] = useRecoilState(userState);
  const {connectedAccount} = useContext(Web3ProviderContext);
  const handleCopyClick = () => {
    copyUrlToClip(`${user.accountAddress}` || '');
    showTip({type: IMessageType.SUCCESS, content: 'copy successfully!'});
  };
  return (
    <Modal height={432} visible={show} width='90%' onClose={onClose}>
      <AddFundContainer>
        <h2>Add funds</h2>
        <div className='img-box'>
          <Image
            alt='icon'
            height={120}
            src='/static/icon/add-funds-icon.png'
            width={120}
          />
        </div>
        <p>
          Transfer funds from an exchange or another wallet to your wallet
          address below:
        </p>
        <div className='input-box'>
          <div className='address-box'>{connectedAccount}</div>
          <Button
            height={44}
            variant='primary'
            width={132}
            onClick={handleCopyClick}
          >
            Copy
          </Button>
        </div>
        <p className='tip'>
          Only send ETH or any other ERC-20 token to this address.
        </p>
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
