import Image from 'next/image';
import {useRouter} from 'next/router';
import {
  memo,
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react';
import {useForm, useField, splitFormProps} from 'react-form';
import {useRecoilState} from 'recoil';

import type {NextPage} from 'next';

import {TwitterConnect} from '@/components';
import {getMyInfo, updateUserInfo} from '@/services/user';
import {userState} from '@/store/user';
import {
  AccountContainer,
  AvatorContainer,
  AccountFormContainer,
} from '@/styles/account';
import {FormItemContainer} from '@/styles/create';
import {Upload, Button, Input} from '@/uikit';

const Account: NextPage = () => {
  const [user, setUser] = useRecoilState(userState);
  /**
   * 修改头像
   */
  const handleUploadChange = useCallback(
    async (filePath: string) => {
      const res = await updateUserInfo({
        command: 'portrait',
        portrait: filePath,
      });
      if (res.code === 0) {
        setUser({...user, portrait: filePath});
      }
    },
    [user]
  );

  return (
    <AccountContainer>
      <AvatorContainer>
        <div className='newHead'>
          <Image
            alt=''
            height={96}
            src={user.portrait || '/static/icon/avatar-icon1.png'}
            width={96}
          />
        </div>
        <Upload height={32} loadingSize='mini' onChange={handleUploadChange}>
          <Button height={32} variant='primary' width={163}>
            Upload new picture
          </Button>
        </Upload>
      </AvatorContainer>
      <AccountForm />
    </AccountContainer>
  );
};

type AccountFormProps = {};
export const AccountForm: FC<AccountFormProps> = memo(() => {
  const recaptchaRef = useRef<any>();
  const [userInfo, setUserInfo] = useState<any>({});
  const [twitterInfo, setTwitterInfo] = useState<GlobalTwitter.User | null>(
    null
  );
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();
  useEffect(() => {
    getMyInfoRequest();
  }, []);
  // 获取个人信息
  const getMyInfoRequest = () => {
    getMyInfo().then((res) => {
      if (res.code === 0 && res.data) {
        const {bio, email, username, publicAddress, portrait, twitterInfo} =
          res.data;
        setUserInfo({
          bio,
          email,
          username,
          publicAddress,
          portrait,
        });
        setTwitterInfo(twitterInfo);
      }
    });
  };
  // 更新个人信息
  const updateUserInfoRequest = (values: any) => {
    updateUserInfo({
      command: 'all',
      ...values,
      twitterInfo: JSON.stringify(twitterInfo),
    }).then((res) => {
      if (res.code === 0) {
        setUser({
          ...user,
          username: values.username,
          accountAddress: values.publicAddress,
        });
        router.push(`/user/profile/${user.userId}`);
      }
    });
  };

  // 修改twitter信息
  const handleChangeTwitterInfo = (user: GlobalTwitter.User | null) => {
    setTwitterInfo(user);
  };

  const {Form} = useForm({
    defaultValues: userInfo,
    onSubmit: async (values: any) => {
      recaptchaRef.current.updateToken();
      updateUserInfoRequest(values);
    },
    debugForm: false,
  });
  return (
    <AccountFormContainer>
      <Form>
        <FormItemContainer>
          <p>
            UserName<i>*</i>
          </p>
          <InputField
            field='username'
            placeholder='Please fill in your PD-1 username '
            validate={(value: string) => {
              if (!value) {
                return 'UserName is Required';
              }
              return false;
            }}
          />
        </FormItemContainer>
        <FormItemContainer>
          <p>Email</p>
          <InputField
            field='email'
            placeholder='Please fill in your email address'
          />
        </FormItemContainer>
        <FormItemContainer>
          <p>Bio</p>
          <InputField field='bio' placeholder='More about you' />
        </FormItemContainer>
        <FormItemContainer>
          <p>Social Connection</p>
          <TwitterConnect
            isSubmit
            redirectUrl='/user/account'
            user={twitterInfo}
            onChange={handleChangeTwitterInfo}
          />
        </FormItemContainer>
        <FormItemContainer>
          <p>Wallet Address</p>
          <InputField
            readOnly
            field='publicAddress'
            placeholder='Wallet Address'
          />
        </FormItemContainer>
        <FormItemContainer>
          <Button height={40} type='submit' variant='primary' width={118}>
            Save
          </Button>
        </FormItemContainer>
      </Form>
    </AccountFormContainer>
  );
});
AccountForm.displayName = 'AccountForm';

const InputField = forwardRef((props: any, ref: any) => {
  const [field, fieldOptions, rest] = splitFormProps(props);
  const {
    meta: {error, isTouched, isValidating},
    getInputProps,
  } = useField(field, fieldOptions);
  const inputProps: any = getInputProps({ref, ...rest});
  inputProps.value = inputProps.value || '';
  return (
    <>
      <Input
        placeholder={props.placeholder}
        {...inputProps}
        type={props.type}
      />
      <div>
        {isValidating ? (
          <p className='validating'>Validating...</p>
        ) : isTouched && error ? (
          <p className='error'>{error}</p>
        ) : null}
      </div>
    </>
  );
});
InputField.displayName = 'InputField';

export default Account;
