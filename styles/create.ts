import styled from 'styled-components';

export const CreateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
  margin-bottom: 120px;
  .modalImg {
    width: 240px;
    height: 240px;
    border-radius: 16px;
    opacity: 1;
    border: 1px solid red;
  }
`;
export const CreateItemContainer = styled.div`
  width: 50%;
  border-radius: 8px;
  border: 1px solid #eef0f2;
  overflow: hidden;
  position: relative;
  &:first-child {
    margin-right: 24px;
    height: 644px;
  }
  .leftSkleton {
    display: block;
    width: 100%;
    height: 100%;
  }
  .loadingWrapper {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
`;

export const CreateSuccessModalContainer = styled.div`
  position: relative;
  .modalImg {
    width: 240px;
    height: 240px;
    position: absolute;
    z-index: 10001;
    top: -64px;
    left: 50%;
    transform: translateX(-50%);
    .ImgWrap {
      width: 100%;
      height: 100%;
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      background-color: #f5f8fb;
    }
  }
  .background {
    background: #f5f8fb;
    width: 100%;
    height: 200px;
    border-radius: 8px 8px 0 0;
  }
  .background {
    background: #f5f8fb;
    width: 100%;
    height: 200px;
    border-radius: 8px 8px 0 0;
  }
  .successTip {
    width: 80%;
    text-align: center;
    height: 36px;
    font-size: 24px;
    font-family: HarmonyOs-Bold;
    color: #333333;
    line-height: 36px;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 24px auto 0 auto;
  }
  .iconsContainer {
    width: 216px;
    height: 56px;
    margin: 24px auto;
    display: flex;
    justify-content: space-between;
    .iconContainer {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgba(61, 153, 247, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      .opacity {
        width: 32px;
        height: 32px;
        opacity: 1;
        cursor: pointer;
      }
    }
  }
  .linkContainer {
    height: 44px;
    padding: 0 24px;
    .link {
      background: #f3f3f3;
      border-radius: 8px;
      border: 1px solid #d2d2d2;
      height: 100%;
      display: block;
      font-size: 14px;
      font-family: HarmonyOs-Medium;
      color: #989898;
      line-height: 20px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      position: relative;
    }
    .copyLink {
      position: absolute;
      right: 16px;
      top: 13px;
      height: 20px;
      font-size: 14px;
      color: #3492ff;
      line-height: 20px;
      font-family: HarmonyOs-Medium;
      cursor: pointer;
      &:hover {
        font-family: HarmonyOs-Bold;
      }
    }
  }
`;

export const CreateUploadContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  .add-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 160px;
    .icon-box {
      width: 72px;
      height: 72px;
      background: #53a9ff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 24px;
    }
    p {
      font-size: 18px;
      font-family: HarmonyOs-Medium;
      color: #989898;
      margin-bottom: 16px;
      &.drag {
        color: #333333;
        span {
          color: #53a9ff;
        }
        i {
          color: #ff6666;
          font-weight: Bold;
          font-style: normal;
          margin-left: 4px;
          margin-bottom: -5px;
        }
      }
    }
  }
  .type-box {
    display: flex;
    flex-wrap: wrap;
    margin-top: 160px;
    p {
      width: 47%;
      font-size: 18px;
      font-family: HarmonyOs-Medium;
      color: #989898;
      margin-bottom: 12px;
      padding-left: 64px;
      position: relative;
      &:nth-child(2n - 1) {
        width: 55%;
      }
      &::before {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        background: #989898;
        border-radius: 50%;
        position: absolute;
        left: 45px;
        top: 10px;
      }
    }
  }
  .cover-box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: none;
  }
  &:hover {
    .cover-box {
      display: block;
    }
  }
`;

export const ReviewContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .modal {
    width: 100%;
    height: 100%;
    position: relative;
    background: rgba(0, 0, 0, 0.15);
    display: none;
  }
  &:hover .modal {
    display: block;
  }
`;

export const CreateFormContainer = styled.div`
  padding: 40px;
`;

export const FormItemContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
  p {
    font-size: 16px;
    font-family: HarmonyOs-Bold;
    color: #333333;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    i {
      color: #ff6666;
      font-weight: Bold;
      font-style: normal;
      margin-left: 4px;
      margin-bottom: -5px;
    }
  }
  .title {
    font-size: 16px;
    font-family: HarmonyOs-Bold;
    color: #333333;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    i {
      color: #ff6666;
      font-weight: Bold;
      font-style: normal;
      margin-left: 4px;
      margin-bottom: -5px;
    }
  }
  .qmark {
    width: 16px;
    height: 16px;
    margin-left: 8px;
  }
  .innerInputText {
    height: 24px;
    font-size: 16px;
    font-family: HarmonyOs-Medium;
    color: #989898;
    line-height: 24px;
  }
  .validating {
    font-size: 12px;
    color: #e87706;
    margin-top: 5px;
  }
  .error {
    font-size: 12px;
    color: red;
    margin-top: 5px;
  }
  .claim-twitter {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 8px 0 4px 0;
    .left {
      height: 100%;
      display: flex;
      align-items: center;
    }
    .twitterwrap {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .name {
      height: 20px;
      font-size: 14px;
      font-family: HarmonyOs-Medium;
      color: #333333;
      line-height: 20px;
      margin-left: 12px;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const FormItemCheckContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  p {
    font-size: 16px;
    font-family: HarmonyOs-Bold;
    color: #333333;
    margin-right: 24px;
  }
`;
