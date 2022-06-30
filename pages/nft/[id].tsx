import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC, ChangeEvent, useEffect, useState, memo} from 'react';
import {useForm} from 'react-form';
import Skeleton from 'react-loading-skeleton';
import {PhotoProvider, PhotoView} from 'react-photo-view';
import {useRecoilState} from 'recoil';

import {InputField, TextareaField} from '../create';

import type {GetStaticProps} from 'next';
import 'react-photo-view/dist/react-photo-view.css';

import {
  DropDown,
  FavoriteHeart,
  ComentPonent,
  ShareComp,
  Auth,
  Loading,
  TwitterConnect,
} from '@/components';
import {webUrl, apiUrl} from '@/config';
import {RouterPath} from '@/config/routes';
import {
  getComments,
  postComment,
  claimWorks,
  updateEmail,
} from '@/services/common';
import {getDetail} from '@/services/nft';
import {getMyInfo} from '@/services/user';
import {userState} from '@/store/user';
import {FormItemContainer} from '@/styles/create';
import {
  DetaiInfolWrapper,
  DetailInfoLeft,
  Tip,
  ClaimModalcompent,
  CliamUpload,
} from '@/styles/detail';
import {Button, Empty, SvgIcon, TextArea, Upload} from '@/uikit';
import {IMessageType, showTip, Event} from '@/utils';

const Modal = dynamic(import('@/uikit/components/Modal/Modal'), {ssr: false});
const defaultUserUuid = '00000000-0000-0000-0000-000000000000';

type DetailProps = {
  detail: GlobalNft.WorksDetail;
};
// const DetailInfo: FC<DetailProps> = forwardRef((props, ref) => {
const DetailInfo = ({detail}: any) => {
  // const {detail} = props;
  const router = useRouter();
  const {id, code} = router.query;
  const [works, setWorks] = useState<GlobalNft.Works>();
  const [comment, setComents] = useState<GlobalComment.WorkComments>();
  const [viewMoreFlag, setViewMoreFlag] = useState(true);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [user] = useRecoilState(userState);
  const [commitLoading, setcommitLoading] = useState(false);
  const [claim, setClaim] = useState(false);

  /**
   * 监听路由id变化获取详情
   */
  useEffect(() => {
    if (id) {
      getServerInitProps(id);
    }
    if (code) {
      setClaim(true);
    }
  }, [id, code]);
  /**
   * 初始化详情信息
   */
  const getServerInitProps = async (id: any) => {
    const detailRes = await getDetail({
      worksID: id,
    });
    const comentRes = await getComments({
      worksId: id,
      page: 1,
      pageSize: 4,
    });
    if (detailRes.code === 0 && detailRes.data) {
      setWorks(detailRes.data);
    }
    if (comentRes.code === 0 && comentRes.data) {
      setComents(comentRes.data);
    }
  };
  /**
   * 初始化详情信息
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextAreaValue(e.target.value);
  };
  /**
   * 提交评论
   */
  const onCommit = async () => {
    if (!works) {
      return;
    }
    // 提交评论
    // if (!textAreaValue) {
    //   showTip({type: IMessageType.WARN, content: 'Please input comments.'});
    //   return;
    // }
    if (textAreaValue.length > 500) {
      showTip({type: IMessageType.WARN, content: 'Too many words in comments'});
      return;
    }
    setcommitLoading(true);
    await postComment({
      worksId: works.worksDetail.id,
      content: textAreaValue,
    })
      .then((res: any) => {
        if (res.code === 0) {
          setTextAreaValue('');
          setcommitLoading(false);
          const comentRes = async () => {
            getComments({
              worksId: works.worksDetail.id,
              page: 1,
              pageSize: viewMoreFlag
                ? 4
                : comment
                ? comment.totalCount + 1
                : 10,
            }).then((res1) => {
              if (res1.code === 0) {
                setComents(res1.data);
              }
            });
          };
          comentRes();
        }
      })
      .catch(() => {
        console.error('add comments fail');
      });
  };
  /**
   * 监听键盘输入
   */
  const onKeyDown = (
    e: KeyboardEvent | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.keyCode === 13) {
      onCommit();
    }
  };
  /**
   * 将所有评论展示
   */
  const viewMoreComments = async () => {
    if (!works) {
      return;
    }
    const comentRes: any = await getComments({
      worksId: works.worksDetail.id,
      page: 1,
      pageSize: comment?.totalCount || 4,
    });
    setComents(comentRes.data);
    setViewMoreFlag(false);
  };

  return (
    <>
      <Head>
        <title>{detail.title} | PD-1</title>
        <meta content={`${webUrl}/nft/${id}`} property='url' />
        <meta content='article' property='type' />
        <meta content={detail.title} property='title' />
        <meta content={detail.description} property='description' />
        <meta content={detail.item} property='image' />

        <meta content='article' property='og:type' />
        <meta content={detail.title || 'PD-1'} property='og:title' />
        <meta
          content={
            detail.description ||
            'PD-1 is an NFT derivative community, with great derivative works, talented creators and web3 native users.'
          }
          property='og:description'
        />
        <meta content={`${webUrl}/nft/${id}`} property='og:url' />
        <meta content={detail.item} property='og:image' />

        <meta content='summary_large_image' name='twitter:card' />
        <meta content='@Pd1Community' name='twitter:site' />
        <meta content={detail.author || '@PD-1'} name='twitter:creator' />
        <meta content={detail.title || 'PD-1'} name='twitter:title' />
        <meta
          content={
            detail.description ||
            'PD-1 is an NFT derivative community, with great derivative works, talented creators and web3 native users.'
          }
          name='twitter:description'
        />
        <meta content={detail.item} name='twitter:image' />
      </Head>
      <DetaiInfolWrapper>
        {works ? (
          <>
            <DetailInfoLeft>
              <div className='imageWrapper'>
                <PhotoViewComp works={works} />
              </div>
              {works.worksDetail.userUuid !== defaultUserUuid ? (
                <div className='author'>
                  <Link
                    passHref
                    href={RouterPath.profile(works.worksDetail.userUuid)}
                  >
                    <a>
                      <Image
                        alt='header'
                        height={56}
                        src={
                          works.worksDetail.portrait ||
                          '/static/icon/logoheader.png'
                        }
                        width={56}
                      />
                    </a>
                  </Link>
                  <span className='name'>{works.worksDetail.author}</span>
                </div>
              ) : null}
              <div className='tagWrapper'>
                {works.tags.infoList.map((item: any, index: any) => (
                  <Link
                    passHref
                    href={`/tag/${item.id}?tagName=${item.tagName}`}
                    key={index}
                  >
                    <a className='tag'>{item.tagName}</a>
                  </Link>
                ))}
              </div>
              {!claim && works.worksDetail.userUuid === defaultUserUuid && (
                <Auth>
                  <Tip
                    onClick={() => {
                      setClaim(true);
                    }}
                  >
                    <div className='content'>
                      <div className='text'>You are the author?</div>
                    </div>
                    <div className='jiantou' />
                    <div className='claminItem'>CLAIM ITEM</div>
                  </Tip>
                </Auth>
              )}
            </DetailInfoLeft>
            <div className='detailRight'>
              {!claim ? (
                <>
                  <div className='topIcon'>
                    <div className='iconWrap'>
                      <FavoriteHeart
                        action={works.worksDetail.isLike ? 1 : 2}
                        worksId={works.worksDetail.id}
                      />
                      <DropDown
                        OptionsNode={
                          <ShareComp name={works.worksDetail.title} />
                        }
                        containerClass='linkIconStyle'
                        optionClass='dropdownStyle'
                      >
                        <SvgIcon
                          className='share-link'
                          color='#989898'
                          height={24}
                          name='share-link'
                          width={24}
                        />
                      </DropDown>
                    </div>
                    <div className='iconWrap'>
                      {works.worksDetail.parentItem ? (
                        <a
                          className='pointer'
                          href={works.worksDetail.parentItem}
                          rel='noreferrer'
                          target='_blank'
                        >
                          <SvgIcon height={24} name='opensea' width={24} />
                        </a>
                      ) : null}
                      {works.worksDetail.userUuid === user.userId ? (
                        <Button
                          borderRadius={8}
                          height={32}
                          marginLeft={16}
                          width={58}
                          onClick={() =>
                            router.push(
                              RouterPath.editWorks(works.worksDetail.id)
                            )
                          }
                        >
                          Edit
                        </Button>
                      ) : null}
                    </div>
                  </div>
                  <div className='productTitle'>{works.worksDetail.title}</div>
                  <div className='productIntro'>
                    {works.worksDetail.description}
                  </div>
                  {works.worksDetail.price ? (
                    <div className='price'>
                      <SvgIcon height={32} name='create-nft' width={32} />
                      <span className='text'>{works.worksDetail.price}</span>
                    </div>
                  ) : null}
                  <div className='picTextareaWrapper'>
                    <div className='personself'>
                      <Image
                        alt='userPic'
                        height={56}
                        src={
                          user.portrait
                            ? user.portrait
                            : '/static/icon/avatar-icon1.png'
                        }
                        width={56}
                      />
                    </div>
                    <div className='textarea'>
                      <Auth>
                        <TextArea
                          borderRadius={8}
                          placeholder='What do you think of project?'
                          rows={8}
                          value={textAreaValue}
                          onChange={(e) => {
                            onChange(e as any);
                          }}
                          onKeyDown={(e) => {
                            onKeyDown(e as any);
                          }}
                        />
                        <Button
                          borderRadius={60}
                          color='#000'
                          disabled={!textAreaValue}
                          fontSize={16}
                          height={40}
                          isLoading={commitLoading}
                          mt={16}
                          variant={textAreaValue ? 'subtle' : 'primary'}
                          width={124}
                          onClick={onCommit}
                        >
                          Comment
                        </Button>
                      </Auth>
                    </div>
                  </div>
                  {comment?.infoList?.length ? (
                    <div className='commentsWrapper'>
                      {comment.infoList.map((val, index) => (
                        <ComentPonent {...val} key={index} />
                      ))}
                      {/* 点击一次后加载所有评论并隐藏查看更多按钮, 少于四条不显示*/}
                      {viewMoreFlag && comment.totalCount > 4 ? (
                        <div
                          className='viewmore pointer'
                          onClick={viewMoreComments}
                        >
                          View more comments &nbsp;
                          <SvgIcon
                            height={12}
                            name='detail-comment-view'
                            width={12}
                          />
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <Empty text='Let us comment together...' />
                  )}
                </>
              ) : (
                <ClaimForm worksID={works.worksDetail.id} />
              )}
            </div>
          </>
        ) : (
          <>
            <DetailInfoLeft>
              <Skeleton className='imageWrapper' />
              <Skeleton className='author' />
              <Skeleton className='tagWrapper' />
            </DetailInfoLeft>
            <div className='detailRight'>
              <div className='loadingWrapper'>
                <Loading size='large' />
              </div>
            </div>
          </>
        )}
      </DetaiInfolWrapper>
    </>
  );
};

DetailInfo.displayName = 'detailInfo';

type ModalProps = {
  visible: boolean;
  onClose?: () => void;
  loading: boolean;
  email: string;
  applyId: string;
};
const ClaimModal: FC<ModalProps> = ({
  visible,
  onClose,
  loading,
  email,
  applyId,
}) => {
  return (
    <Modal
      height={476}
      loading={loading}
      visible={visible}
      width={576}
      onClose={onClose}
    >
      <ClaimModalcompent>
        <div className='successTip'>Claim Request Successfully</div>
        <div className='icon-container'>
          <SvgIcon
            className='check-right-icon'
            height={100}
            name='check-right-icon'
            width={100}
          />
        </div>
        <div className='middle-text1'>
          We will review your claim request in 3 business days, once we approve
          it, you will receive notification from us by email.
        </div>
        <div className='middle-text2'>
          When we confirm you are an author of item, you can edit and sellit.
        </div>
        <EmailForm applyId={applyId} email={email} />
      </ClaimModalcompent>
    </Modal>
  );
};
ClaimModal.displayName = 'ClaimModal';

type ClaimFormProps = {
  worksID: string;
};

export const ClaimForm: FC<ClaimFormProps> = memo(({worksID}) => {
  const router = useRouter();
  const [filePath, setFilePath] = useState('');
  const [claimModal, setclaimModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [twitterInfo, setTwitterInfo] = useState<GlobalTwitter.User | null>(
    null
  );
  const [applyId, setapplyId] = useState('');
  const [email, setEmail] = useState('');
  const [subDisable, setSubDisable] = useState(true);
  // 认领请求
  const claimWorksRequest = (data: GlobalClaim.Claim) => {
    setclaimModal(true);
    claimWorks(data).then((res: any) => {
      if (res.code === 0) {
        setLoading(false);
        setapplyId(res.data?.applyId);
      } else {
        setclaimModal(false);
        showTip({type: IMessageType.WARN, content: res.msg});
      }
    });
  };
  // 上传证明图片
  const handleUploadChange = (url: string) => {
    setFilePath(url);
    setSubDisable(false);
  };
  // 删除图片证明
  const deleteUploadImg = () => {
    setFilePath('');
    const {discordUsername, explain, twitter} = values;
    if (discordUsername || explain || twitter) {
      setSubDisable(false);
    } else {
      setSubDisable(true);
    }
  };
  const onClose = () => {
    setclaimModal(false);
    router.reload();
  };

  useEffect(() => {
    Event.addListener('hideModel', onClose);
    getMyInfoRequest();
    return () => {
      Event.removeListener('hideModel', onClose);
    };
  }, []);

  // 获取个人信息
  const getMyInfoRequest = () => {
    getMyInfo().then((res) => {
      if (res.code === 0) {
        setEmail(res.data.email);
        setTwitterInfo(res.data.twitterInfo);
      }
    });
  };
  // 修改twitter信息
  const handleChangeTwitterInfo = (user: GlobalTwitter.User | null) => {
    setTwitterInfo(user);
  };

  const {
    Form,
    values,
    meta: {canSubmit},
  } = useForm({
    validate: (values) => {
      const {discordUsername, explain, twitter} = values;
      if (discordUsername || explain || twitter || filePath) {
        setSubDisable(false);
      } else {
        setSubDisable(true);
      }
    },
    onSubmit: async (values: any) => {
      const {discordUsername, explain, twitter} = values;
      const data: GlobalClaim.Claim = {
        worksID,
        discordUsername,
        explain,
        proof: filePath ? filePath : undefined,
        link: twitter,
        nickname: twitterInfo ? twitterInfo.name : '',
        image: twitterInfo ? twitterInfo.profile_image_url : '',
      };
      claimWorksRequest(data);
    },
    debugForm: false,
  });
  return (
    <>
      <Form>
        <FormItemContainer>
          <p>Discord UserName</p>
          <InputField
            field='discordUsername'
            placeholder='Please fill your discord username'
            validate={(value: string) => {
              if (value && value.length > 500) {
                return 'No more than 500 words';
              }
              return false;
            }}
          />
        </FormItemContainer>
        <FormItemContainer>
          <p>Connect twitter to verify</p>
          <TwitterConnect
            redirectUrl={`/twitter/auth?redirectUrl=${RouterPath.worksDetail(
              worksID
            )}`}
            user={twitterInfo}
            onChange={handleChangeTwitterInfo}
          />
          <InputField
            field='twitter'
            marginTop='8px'
            placeholder='Please fill in your twitter link for this picture'
            validate={(value: string) => {
              if (value) {
                const isTwitter = /^https:\/\/twitter.com/.test(value);
                if (!isTwitter || value.length > 4000) {
                  return 'Please enter the correct twitter web address,example: https://twitter.com/xx';
                }
                return false;
              }
              return false;
            }}
          />
        </FormItemContainer>
        <FormItemContainer>
          <p>Explain</p>
          <TextareaField
            field='explain'
            placeholder='Please specify'
            validate={(value: string) => {
              if (value && value.length > 3000) {
                return 'No more than 3000 words';
              }
              return false;
            }}
          />
        </FormItemContainer>
        <CliamUpload>
          {filePath ? (
            <div className='uploadImg'>
              <Image
                alt='review-image'
                blurDataURL='/static/icon/copylink-icon.png'
                layout='fill'
                placeholder='blur'
                src={filePath}
              />

              <div className='modal'>
                <div className='delete'>
                  <Button
                    borderRadius={8}
                    height={32}
                    variant='danger'
                    width={76}
                    onClick={deleteUploadImg}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Upload onChange={handleUploadChange}>
              <div className='content'>
                <div className='markText'>
                  <div className='summark'>
                    <Image
                      alt='add'
                      height={48}
                      src='/static/icon/claim-add.png'
                      width={48}
                    />
                  </div>
                  <div className='text'>
                    Please provide other social certificates
                  </div>
                </div>
              </div>
            </Upload>
          )}
        </CliamUpload>
        <FormItemContainer>
          <Button
            disabled={subDisable || !canSubmit}
            height={40}
            variant='primary'
            width={240}
          >
            Confirm Claim
          </Button>
        </FormItemContainer>
      </Form>
      {
        <ClaimModal
          applyId={applyId}
          email={email}
          loading={loading}
          visible={claimModal}
          onClose={onClose}
        />
      }
    </>
  );
});

ClaimForm.displayName = 'ClaimForm';

type EmailProps = {
  applyId: string;
  email?: string;
};

const EmailForm: FC<EmailProps> = memo(({applyId, email}) => {
  const updateEmailReques = (email?: string) => {
    if (email) {
      updateEmail({email, applyId}).then((res: any) => {
        if (res.code === 0) {
          Event.emit('hideModel');
        }
      });
    } else {
      Event.emit('hideModel');
    }
  };

  const {Form} = useForm({
    onSubmit: async (values: any) => {
      const {email} = values;
      updateEmailReques(email);
    },
    debugForm: false,
  });

  return (
    <Form>
      <FormItemContainer>
        <InputField
          defaultValue={email}
          field='email'
          placeholder='Set up Email'
          validate={(value: string) => {
            if (value) {
              const re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              const isEmail = re.test(String(value).toLowerCase());
              if (!isEmail || value.length > 100) {
                return 'Please enter a valid email addresss.';
              }
            }
            return false;
          }}
        />
        <div className='OKbutton'>
          <Button
            borderRadius={8}
            color='white'
            fontSize={16}
            height={40}
            mt={16}
            variant='primary'
            width={160}
          >
            OK
          </Button>
        </div>
      </FormItemContainer>
    </Form>
  );
});

EmailForm.displayName = 'EmailForm';

type PhotoViewCompProps = {
  works: GlobalNft.Works;
};
const PhotoViewComp: FC<PhotoViewCompProps> = (props) => {
  const {works} = props;
  const [imgError, setImgError] = useState(false);
  return (
    <div>
      <PhotoProvider
        bannerVisible={false}
        loadingElement={<Loading size='large' />}
        maskOpacity={0.5}
        photoClassName='themeColor'
      >
        <PhotoView src={works.worksDetail.item}>
          <div>
            <Image
              alt='detailimg'
              blurDataURL='/static/icon/copylink-icon.png'
              className='cursor'
              layout='fill'
              objectFit='contain'
              placeholder='blur'
              src={
                imgError
                  ? works.worksDetail.item
                  : `${works.worksDetail.item}?x-oss-process=image/resize,m_pad,h_644,w_644`
              }
              unoptimized={works.worksDetail.item.endsWith('.gif')}
              onClick={() => {
                showTip({
                  type: IMessageType.WARN,
                  content: 'Press ESC to exit full screen mode',
                });
              }}
              onError={() => {
                setImgError(true);
              }}
            />
          </div>
        </PhotoView>
      </PhotoProvider>
    </div>
  );
};

PhotoViewComp.displayName = 'PhotoViewComp';

export const getServerSideProps: GetStaticProps = async (context: any) => {
  const res: any = await axios.get(
    `${apiUrl}/base/works-detail?worksID=${context.query.id}`
  );
  return {
    props: {
      detail: res.data.data.worksDetail || {},
    },
  };
};

export default DetailInfo;
