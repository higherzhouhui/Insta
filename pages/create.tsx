import dynamic from 'next/dynamic';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {FC, memo, useState, forwardRef, useEffect, useRef} from 'react';
import {useForm, useField, splitFormProps} from 'react-form';

import type {NextPage} from 'next';

import {Auth, Loading, RecaptchaV3} from '@/components';
import {webUrl} from '@/config';
import {RouterPath} from '@/config/routes';
import {getPlatFormCommison} from '@/services/common';
import {createNft, updateNft} from '@/services/nft';
import {getTags, onSearchTags, createTag} from '@/services/tag';
import {
  CreateContainer,
  CreateItemContainer,
  CreateUploadContainer,
  CreateFormContainer,
  FormItemContainer,
  FormItemCheckContainer,
  ReviewContainer,
  CreateSuccessModalContainer,
} from '@/styles/create';
import {
  Upload,
  Button,
  TextArea,
  Checkbox,
  RadioGroup,
  Radio,
  MultiSelect,
  SvgIcon,
  Prompt,
  IconInput,
  UploadLoading,
} from '@/uikit';
const Modal = dynamic(import('@/uikit/components/Modal/Modal'), {ssr: false});

const Create: NextPage = () => {
  const [filePath, setFilePath] = useState<string | null>(null);
  return (
    <CreateContainer>
      <CreateItemContainer>
        <CreateUpload filePath={filePath} onChangeFilePath={setFilePath} />
      </CreateItemContainer>
      <CreateItemContainer>
        <CreateForm filePath={filePath} />
      </CreateItemContainer>
    </CreateContainer>
  );
};

type CreateUploadProps = {
  filePath: string | null;
  onChangeFilePath: (value: string) => void;
};

export const CreateUpload: FC<CreateUploadProps> = memo(
  ({filePath, onChangeFilePath}) => {
    // 上传后的图片
    const handleUploadChange = (filePath: string) => {
      onChangeFilePath(filePath);
    };
    const [imgErr, setImgErr] = useState(false);
    const [loading, setloading] = useState(false);
    useEffect(() => {
      setloading(true);
    }, [filePath]);
    return (
      <Upload loadingSize='large' onChange={handleUploadChange}>
        {filePath ? (
          <ReviewContainer>
            <Image
              alt='nft'
              blurDataURL='/static/icon/copylink-icon.png'
              layout='fill'
              objectFit='scale-down'
              placeholder='blur'
              src={
                imgErr
                  ? filePath
                  : `${filePath}?x-oss-process=image/resize,m_fill,h_644,w_644`
              }
              onError={() => {
                setImgErr(true);
              }}
              onLoad={() => {
                setloading(false);
              }}
            />
            {loading ? (
              <UploadLoading
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div>
                  <Loading size='large' />
                </div>
              </UploadLoading>
            ) : (
              <div className='modal' />
            )}
          </ReviewContainer>
        ) : (
          <CreateUploadContainer>
            <div className='add-box'>
              <div className='icon-box'>
                <Image
                  alt='add'
                  height={44}
                  src='/static/icon/add-icon.png'
                  width={44}
                />
              </div>
              <p className='drag'>
                Drag and drop an image, or <span>Browse</span> <i>*</i>
              </p>
              <p>Max size: 20MB</p>
            </div>
            <div className='type-box'>
              <p>Image (JPG、PNG、GIF、SVG)</p>
              {/* <p>Video (MP4、WEBM)</p>
                            <p>Audio (MP3、WAV、OGG)</p>
                            <p>3D Model (GLB、GLTF)</p> */}
            </div>
            <div className='cover-box' />
          </CreateUploadContainer>
        )}
      </Upload>
    );
  }
);
CreateUpload.displayName = 'CreateUpload';

type CreateFormProps = {
  filePath: string | null;
  works?: GlobalNft.Works;
};
export const CreateForm: FC<CreateFormProps> = memo(({filePath, works}) => {
  const router = useRouter();
  const recaptchaRef = useRef<any>();
  // 默认搜索tag条数
  const PageSize = 20;
  const [tags, setTags] = useState<any[]>([]);
  const [multiOptions, setMultiOptions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [worksInfo, setworksInfo] = useState<{
    worksUrl?: string;
    title?: string;
    loading?: boolean;
    worksId: string;
  }>({
    worksUrl: '',
    title: '',
    loading: true,
    worksId: '1',
  });
  const [platFormMis, setPlatFormMis] = useState(1);

  // 搜索关键字
  const handleSearchTag = (value: string) => {
    if (value) {
      setMultiOptions([]);
      onSearchTagRequest(value);
    } else {
      setMultiOptions([...tags]);
    }
  };
  /**
   *
   * @param works 作品详情
   * @returns 标签
   */
  const shiftMultiVal = (works?: GlobalNft.Works) => {
    if (works) {
      const list = (works.tags.infoList || []).map((item: any) => {
        return {
          label: item.tagName,
          value: item.id,
        };
      });
      return list;
    }
    return [];
  };
  const [multiValues, setMultiValues] = useState<any[]>(shiftMultiVal(works));

  useEffect(() => {
    getTagsRequest();
    getPlatFormCommison().then((res) => {
      if (res.code === 0 && res.data?.royalty) {
        setPlatFormMis(res.data?.royalty);
      }
    });
  }, []);
  // 搜索tag
  const onSearchTagRequest = (keyword: string) => {
    onSearchTags({
      title: keyword,
      page: 1,
      pageSize: PageSize,
    }).then((res: any) => {
      if (res.code === 0) {
        const list = (res?.data?.infoList || []).map((item: any) => {
          return {
            label: item.tagName,
            value: item.id,
          };
        });
        setMultiOptions([...list]);
      }
    });
  };
  // 获取tag列表
  const getTagsRequest = () => {
    getTags({
      page: 1,
      pageSize: PageSize,
    }).then((res: any) => {
      if (res.code === 0) {
        const list = (res?.data?.infoList || []).map((item: any) => {
          return {
            label: item.tagName,
            value: item.id,
          };
        });
        setTags([...list]);
        setMultiOptions([...list]);
      }
    });
  };

  // 创建tag
  const createTagRequest = (name: string) => {
    let flag = false;
    tags.forEach((item: any) => {
      if (item.label === name) {
        flag = true;
      }
    });
    if (flag) {
      return;
    }
    createTag(name).then((res: any) => {
      if (res.code === 0) {
        getTagsRequest();
        setMultiValues([
          ...multiValues,
          {
            label: name,
            value: res?.data?.id,
          },
        ]);
      }
    });
  };
  /**
   *
   * @param data 创建/更新的作品详情
   */
  const createOrUpdateNftRequest = (data: GlobalNft.CreateNft) => {
    const requestDone = (res: any) => {
      if (res.code === 0) {
        const worksId = res.data?.worksId || works?.worksDetail.id;
        const url = `${webUrl}/nft/${worksId}`;
        setworksInfo({
          worksUrl: url,
          title: data.title,
          loading: false,
          worksId,
        });
      }
    };
    // 如果传入了works信息，即判断为更新
    if (works) {
      updateNft({worksId: works.worksDetail.id, ...data}).then((res: any) => {
        requestDone(res);
      });
    } else {
      createNft(data).then((res: any) => {
        requestDone(res);
      });
    }
  };
  /**
   * 关闭成功的弹窗跳转到作品的详情
   */
  const onCloseModal = () => {
    router.push(RouterPath.worksDetail(worksInfo.worksId));
  };
  const {
    Form,
    meta: {canSubmit},
  } = useForm({
    onSubmit: async (values: any) => {
      recaptchaRef.current.updateToken();
      // if (!filePath) {
      //   showTip({type: IMessageType.WARN, content: 'file is Required!'});
      //   return;
      // }
      const submit = () => {
        setShowModal(true);
        const {
          title,
          description,
          isOriginal,
          tag_ids,
          price,
          parentItem,
          royalty,
          blockchain,
        } = values;
        const obj: GlobalNft.CreateNft = {
          title,
          item: filePath || '',
          description,
          isOriginal: !(isOriginal && isOriginal === 'no'),
          price: parseFloat(price),
          royalty: parseFloat(royalty),
          blockchain: 1, // (1,2)
          parentItem,
          tag_ids: '',
        };
        const ids: any[] = [];
        if (multiValues) {
          multiValues.forEach((id: any) => {
            ids.push(id.value);
          });
        }
        if (ids && ids.length) {
          obj.tag_ids = ids.join(',');
        }
        createOrUpdateNftRequest(obj);
      };
      submit();
    },
    debugForm: false,
  });
  return (
    <CreateFormContainer>
      <Form>
        <FormItemContainer>
          <p>
            HeadLine<i>*</i>
          </p>
          <InputField
            defaultValue={works ? works?.worksDetail.title : ''}
            field='title'
            placeholder='Please enter a HeadLine'
            validate={(value: string) => {
              if (!value) {
                return 'HeadLine is Required';
              }
              if (value.length > 500) {
                return 'No more than 500 words';
              }
              return false;
            }}
          />
        </FormItemContainer>
        <FormItemContainer>
          <p>
            Description<i>*</i>
          </p>
          <TextareaField
            defaultValue={works ? works?.worksDetail.description : ''}
            field='description'
            placeholder='Description of works'
            validate={(value: string) => {
              if (!value) {
                return 'Description is Required';
              }
              if (value.length > 3000) {
                return 'No more than 3000 words';
              }
              return false;
            }}
          />
        </FormItemContainer>
        <FormItemContainer
          style={{
            marginBottom: '24px',
          }}
        >
          <p>Tag</p>
          <MultiSelectField
            field='tag_ids'
            options={multiOptions}
            placeholder='Add label'
            value={multiValues}
            onAddOption={createTagRequest}
            onChange={(value: any[]) => {
              setMultiValues(value);
            }}
            onSearch={handleSearchTag}
          />
        </FormItemContainer>
        {/* <FormItemContainer style={{
                    marginBottom: '24px'
                }}>
                    <p>Tag</p>
                    <MultiSelectAndSearch 
                        options={multiOptions}
                        onChange={() => {
                            
                        }}
                     />
                </FormItemContainer> */}
        {/* <FormItemCheckContainer>
                    <p>Share toTwitter</p>
                    <CheckBoxField field="share" />
                </FormItemCheckContainer> */}
        <FormItemCheckContainer>
          <p>Original or not</p>
          <RadioGroupField
            field='isOriginal'
            isOriginal={
              works ? (works.worksDetail.isOriginal ? 'yes' : 'no') : 'yes'
            }
          />
        </FormItemCheckContainer>
        <FormItemCheckContainer>
          <p>BlockChain</p>
          <Radio checked readOnly mr={32} name='blockchain' value='1'>
            Ethereum
          </Radio>
        </FormItemCheckContainer>
        <FormItemContainer>
          <p>
            Price<i>*</i>
          </p>
          <InputField
            defaultValue={
              works && works.worksDetail.price ? works.worksDetail.price : ''
            }
            field='price'
            filterValue={(value: string) => {
              if (value) {
                const val = parseFloat(value);
                if (val > 999999999999) {
                  return 999999999999;
                }
                if (val < 0) {
                  return 0;
                }
              }
              return value;
            }}
            leftIcon={<SvgIcon height={24} name='create-nft' width={24} />}
            leftWidth={36}
            paddingLeft={48}
            placeholder='Amount'
            type='number'
            validate={(value: string) => {
              if (!value) {
                return 'Price is Required';
              }
              return false;
            }}
          />
        </FormItemContainer>
        <FormItemContainer>
          <p>Parent NFT</p>
          <InputField
            defaultValue={works ? works.worksDetail.parentItem : ''}
            field='parentItem'
            placeholder='Opensea URL'
            validate={(value: string) => {
              if (value) {
                const isOpensea = /^https:\/\/opensea.io/.test(value);
                if (!isOpensea || value.length > 4000) {
                  return 'Please enter the correct opensea web address,example:https://opensea.io/xx';
                }
                return false;
              }
              return false;
            }}
          />
        </FormItemContainer>
        <FormItemContainer>
          <div className='title'>
            Creator earnings<i>*</i>
            <div className='qmark'>
              <Prompt text='You can earn when every transaction'>
                <SvgIcon height={16} name='create-qmark' width={16} />
              </Prompt>
            </div>
          </div>
          <InputField
            defaultValue={
              works && works.worksDetail.royalty
                ? works.worksDetail.royalty
                : ''
            }
            field='royalty'
            filterValue={(value: string) => {
              if (value) {
                const val = parseFloat(value);
                if (val > 10) {
                  return 10;
                }
                if (val < 0) {
                  return 0;
                }
              }
              return value;
            }}
            placeholder='Creator earnings cannot be greater than 10%'
            rightIcon={<span className='innerInputText'>%</span>}
            type='number'
            validate={(value: string) => {
              if (!value) {
                return 'Creator earnings is Required';
              }
              return false;
            }}
          />
        </FormItemContainer>
        <FormItemContainer>
          <div className='title'>
            Platform Transaction Commission
            <div className='qmark'>
              <Prompt text={`The transaction commission is ${platFormMis}%`}>
                <SvgIcon height={16} name='create-qmark' width={16} />
              </Prompt>
            </div>
          </div>
        </FormItemContainer>
        <FormItemContainer>
          <Auth>
            <Button
              disabled={!canSubmit || !filePath}
              height={40}
              type='submit'
              variant='primary'
              width={240}
            >
              {works ? 'Submit Changes' : 'Publish works'}
            </Button>
          </Auth>
        </FormItemContainer>
      </Form>
      {showModal && filePath && (
        <CreatedSuccessModal
          create={!works}
          loading={worksInfo.loading}
          title={worksInfo.title}
          visible={showModal}
          worksItem={filePath}
          worksUrl={worksInfo.worksUrl}
          onClose={onCloseModal}
        />
      )}
      <RecaptchaV3 action='homepage' ref={recaptchaRef} />
    </CreateFormContainer>
  );
});
CreateForm.displayName = 'CreateForm';

export const InputField = forwardRef((props: any, ref: any) => {
  const [field, fieldOptions, rest] = splitFormProps(props);
  const {
    meta: {error, isTouched, isValidating},
    getInputProps,
  } = useField(field, fieldOptions);
  const inputProps: any = getInputProps({ref, ...rest});
  inputProps.value = inputProps.value || '';
  return (
    <>
      <IconInput
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

export const TextareaField = forwardRef((props: any, ref: any) => {
  const [field, fieldOptions, rest] = splitFormProps(props);
  const {
    meta: {error, isTouched, isValidating},
    getInputProps,
  } = useField(field, fieldOptions);
  const inputProps: any = getInputProps({ref, ...rest});
  inputProps.value = inputProps.value || '';
  return (
    <>
      <TextArea {...inputProps} paddingBottom='8px' paddingTop='8px' rows={7} />
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
TextareaField.displayName = 'TextareaField';

const MultiSelectField = forwardRef((props: any, ref: any) => {
  const [field, fieldOptions, {options, onChange, ...rest}] =
    splitFormProps(props);
  const {
    meta: {error, isTouched, isValidating},
    setValue,
  } = useField(field, fieldOptions);
  return (
    <>
      <MultiSelect
        {...rest}
        options={options}
        onChange={(value: any) => {
          onChange(value);
          setValue(value);
        }}
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
MultiSelectField.displayName = 'MultiSelectField';

const CheckBoxField = forwardRef((props: any, ref: any) => {
  const [field, fieldOptions, {...rest}] = splitFormProps(props);
  const {
    meta: {error, isTouched, isValidating},
    setValue,
  } = useField(field, fieldOptions);
  return (
    <>
      <Checkbox
        {...rest}
        onChange={(e: any) => {
          setValue(e.target.checked);
        }}
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
CheckBoxField.displayName = 'CheckBoxField';

const RadioGroupField = forwardRef((props: any, ref: any) => {
  const [isOriginal, setIsOriginal] = useState<string>(props.isOriginal);
  const [field, fieldOptions] = splitFormProps(props);
  const {
    meta: {error, isTouched, isValidating},
    setValue,
  } = useField(field, fieldOptions);
  return (
    <>
      <RadioGroup
        value={isOriginal}
        onChange={(value: any) => {
          setValue(value);
          setIsOriginal(value);
        }}
      >
        <Radio mr={32} name='original' value='yes' onChange={() => {}}>
          yes
        </Radio>
        <Radio name='original' value='no' onChange={() => {}}>
          No
        </Radio>
      </RadioGroup>
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
RadioGroupField.displayName = 'RadioGroupField';

type CreatedSucModalProps = {
  visible: boolean;
  onClose: () => void;
  worksItem: string;
  worksUrl?: string;
  title?: string;
  loading?: boolean;
  create: boolean;
};
const CreatedSuccessModal: FC<CreatedSucModalProps> = ({
  visible,
  onClose,
  worksItem,
  worksUrl,
  title,
  loading,
  create,
}) => {
  // const share = (type: 'twitter' | 'facebook' | 'ins') => {
  //     if (type === 'twitter') {
  //         shareToTwitter(title || '', webUrl + worksUrl, 'PD-1')
  //     }
  //     if (type === 'facebook') {
  //         shareToFacebook(webUrl + worksUrl)
  //     }
  //     if (type === 'ins') {
  //         window.open('https://www.instagram.com/PD-1')
  //     }
  // }
  // const onCopyLink = () => {
  //     copyUrlToClip(worksUrl);
  //     showTip({ type: IMessageType.SUCCESS, content: 'Link copied!' })
  // }
  const [imgError, setImgError] = useState(false);
  return (
    <Modal height={380} loading={loading} visible={visible} onClose={onClose}>
      <CreateSuccessModalContainer>
        <div className='modalImg'>
          <div className='ImgWrap'>
            <Image
              alt='image'
              blurDataURL='/static/icon/copylink-icon.png'
              layout='fill'
              placeholder='blur'
              src={
                imgError
                  ? worksItem
                  : `${worksItem}?x-oss-process=image/resize,m_fill,h_244,w_244`
              }
              onError={() => {
                setImgError(true);
              }}
            />
          </div>
        </div>
        <div className='background' />
        <div className='successTip'>{title}</div>
        <div className='successTip'>
          {create ? 'Created Successfully' : 'Update Successful'}
        </div>
        {/* <div className="iconsContainer">
                    <div className="iconContainer">
                        <div className="opacity" onClick={() => share('twitter')}>
                            <SvgIcon name='icon-Twiter' width={32} height={32} />
                        </div>
                    </div>
                    <div className="iconContainer">
                        <div className="opacity" onClick={() => share('facebook')}>
                            <SvgIcon name='icon-Facebook' width={32} height={32} />
                        </div>
                    </div>
                    <div className="iconContainer">
                        <div className="opacity" onClick={() => share('ins')}>
                            <SvgIcon name='icon-INS' width={32} height={32} />
                        </div>
                    </div>
                </div>
                <div className="linkContainer">
                    <span className='link'>{worksUrl}
                        <span className='copyLink' onClick={onCopyLink}>Copy Links</span>
                    </span>
                </div> */}
      </CreateSuccessModalContainer>
    </Modal>
  );
};
CreatedSuccessModal.displayName = 'CreatedSuccessModal';

export default Create;
