import React, {FC, memo, useCallback, useState, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';

import {UploadContainer, UploadLoading} from './style';
import {BaseUploadProps} from './types';

import {Loading} from '@/components';
import {getSts} from '@/services/file';
import {showTip, IMessageType} from '@/utils';
import AliOss from '@/utils/aliOss';

const Upload: FC<BaseUploadProps> = memo(
  ({children, onChange, accept, isLoading, loadingSize, ...props}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [ossObj, setOssObj] = useState<any>({});

    useEffect(() => {
      getStsRequest();
    }, []);

    const getStsRequest = () => {
      getSts().then((res: any) => {
        if (res.code === 0) {
          setOssObj({...res.data});
        }
      });
    };

    const handleCreateOss = async (file: any) => {
      const {AccessKeyId, AccessKeySecret, SecurityToken, Expiration} = ossObj;
      const newOss = new AliOss({
        region: 'oss-us-west-1',
        accessKeyId: AccessKeyId,
        accessKeySecret: AccessKeySecret,
        bucket: 'pd1',
        stsToken: SecurityToken,
        refreshSTSTokenInterval: Expiration,
        refreshSTSToken: async () => {
          const refreshToken: any = await getSts();
          return {
            accessKeyId: refreshToken.data.AccessKeyId,
            accessKeySecret: refreshToken.data.AccessKeySecret,
            stsToken: refreshToken.data.SecurityToken,
          };
        },
      });
      const url = await newOss.upload(file);
      return url;
    };

    const onDrop = useCallback(
      async (acceptedFiles) => {
        if (!acceptedFiles.length) {
          showTip({
            type: IMessageType.ERROR,
            content:
              'File types supported: JPG, PNG, GIF, SVG. Max size: 20 MB',
          });
          return;
        }
        if (acceptedFiles && acceptedFiles.length) {
          const file = acceptedFiles[0];
          if (file.size > 20 * 1024 * 1024) {
            showTip({
              type: IMessageType.ERROR,
              content: 'The file is too large!',
            });
            return;
          }
          setLoading(true);
          handleCreateOss(file)
            .then((url: string) => {
              onChange && onChange(url);
              setLoading(false);
            })
            .catch(() => {
              setLoading(false);
              showTip({
                type: IMessageType.ERROR,
                content: 'Network exception, please try again',
              });
            });
        }
      },
      [ossObj]
    );
    const {getRootProps, getInputProps} = useDropzone({
      accept,
      onDrop,
    });
    return (
      <UploadContainer
        {...getRootProps({className: 'dropzone'})}
        {...(props as any)}
      >
        {children}
        <input {...getInputProps()} />
        {loading && isLoading ? (
          <UploadLoading
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div>
              <Loading size={loadingSize} />
            </div>
          </UploadLoading>
        ) : null}
      </UploadContainer>
    );
  }
);

Upload.displayName = 'Upload';

Upload.defaultProps = {
  onChange: () => {},
  accept: 'image/*',
  isLoading: true,
  loadingSize: 'regular',
};

export default Upload;
