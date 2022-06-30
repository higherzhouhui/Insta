import {useRouter} from 'next/router';
import {FC, useRef, forwardRef, useImperativeHandle} from 'react';
import {ReCaptcha} from 'react-recaptcha-v3';
import {useRecoilState} from 'recoil';

import {RecaptchaContainer} from './styles';

import {useMetaMask} from '@/ethers-react';
import {onLogout, getRecapRes} from '@/services/user';
import {userState} from '@/store/user';
import {showTip, IMessageType} from '@/utils';

type IProps = {
  ref: any;
  action: 'homepage' | 'login' | 'social' | 'e-commerce';
};

export const RecaptchaV3: FC<IProps> = forwardRef((props, ref) => {
  const recaptchaRef = useRef<any>();
  const router = useRouter();
  const {action} = props;
  const [user, setUser] = useRecoilState(userState);
  const {disconnectWallect} = useMetaMask();

  useImperativeHandle(ref, () => ({
    updateToken,
  }));

  function verifyCallback(recaptchaToken: string) {
    getRecapRes(recaptchaToken).then((res) => {
      if (res.code === 0) {
        const {score} = res.data.resp;
        if (score < 0.3) {
          showTip({
            type: IMessageType.WARN,
            content:
              'The system finds that your operation is abnormal and will be forced to exit!',
          });
          // 机器人操作
          disconnectWallect();
          onLogout().then((res) => {
            if (res?.code === 0) {
              localStorage.removeItem('x-token');
              setUser({
                expiresAt: null,
                portrait: null,
                token: null,
                username: null,
                userId: null,
                accountAddress: null,
              });
              router.push('/user/login');
            }
          });
        }
      }
    });
  }

  function updateToken() {
    recaptchaRef.current.execute();
  }

  return (
    <RecaptchaContainer>
      <ReCaptcha
        action={action}
        ref={recaptchaRef}
        sitekey='6Ld_5qofAAAAAF3WTqQeNBd2U1OktPEMdhnZn6nb'
        verifyCallback={verifyCallback}
      />
    </RecaptchaContainer>
  );
});

RecaptchaV3.displayName = 'RecaptchaV3';
