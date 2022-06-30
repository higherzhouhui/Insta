import styled from 'styled-components';

export const DetaiInfolWrapper = styled.div`
  padding: 56px 0;
  width: 100%;
  display: flex;
  .detailRight {
    flex: 1;
    border-radius: 8px;
    border: 1px solid #eef0f2;
    opacity: 1;
    padding: 24px;
    .loadingWrapper {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  }
  .topIcon {
    height: 40px;
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .iconWrap {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .linkIconStyle {
    margin-left: 32px;
    min-height: 24px;
    &:hover .share-link {
      fill: #53a9ff;
    }
  }
  .dropdownStyle {
    width: 200px;
    left: 0;
  }
  .productTitle {
    margin-top: 32px;
    font-size: 32px;
    font-family: HarmonyOs-Bold;
    color: #000000;
    line-height: 48px;
    word-break: break-word;
  }
  .productIntro {
    font-size: 18px;
    font-family: HarmonyOs-Medium;
    color: #000000;
    line-height: 26px;
    word-break: break-word;
  }
  .picTextareaWrapper {
    padding: 32px 0 16px 0;
    width: 100%;
    display: flex;
  }
  .personself {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 32px;
  }
  .textarea {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .noComment {
    color: #333;
    font-size: 16px;
  }
  .viewmore {
    width: 100%;
    height: 78px;
    font-size: 20px;
    font-family: HarmonyOs-Bold;
    color: #53a9ff;
    line-height: 30px;
    text-align: center;
    padding-top: 24px;
  }
  .pointer {
    cursor: pointer;
  }
  .cursor {
    cursor: zoom-in;
  }
  .containImg {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  .comment {
    margin-top: 20px;
    height: 50px;
    width: 100%;
  }
  .price {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    .text {
      margin-left: 12px;
      height: 48px;
      font-size: 32px;
      font-family: HarmonyOs-Bold;
      color: #000000;
      line-height: 48px;
    }
  }
  .commentsWrapper {
    max-height: calc(100vh - 510px);
    overflow: auto;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }
  .commentsWrapper::-webkit-scrollbar {
    width: 0 !important;
  }
`;

export const ClaimModalcompent = styled.div`
  padding: 40px 40px;
  .successTip {
    width: 100%;
    text-align: center;
    height: 36px;
    font-size: 24px;
    font-family: HarmonyOs-Bold;
    font-weight: normal;
    color: #000000;
    line-height: 36px;
  }
  .icon-container {
    margin-top: 16px;
    width: 100%;
    text-align: center;
  }
  .middle-text1 {
    margin-top: 16px;
    width: 496px;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    color: #989898;
    line-height: 24px;
  }
  .middle-text2 {
    width: 476px;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    color: #989898;
    line-height: 24px;
    margin: 16px 0;
  }
  .OKbutton {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
export const DetailInfoLeft = styled.div`
  margin-right: 24px;
  flex: 1;
  position: relative;
  .imageWrapper {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #eef0f2;
  }
  .author {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    margin-top: 24px;
    .name {
      height: 36px;
      font-size: 24px;
      font-family: HarmonyOs-Bold;
      color: #333333;
      line-height: 36px;
      margin-left: 16px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    a {
      border-radius: 50%;
      overflow: hidden;
      display: inherit;
      min-height: 56px;
      min-width: 56px;
    }
  }
  .tagWrapper {
    width: 100%;
    margin-top: 30px;
  }
  .tag {
    display: inline-block;
    height: 20px;
    font-size: 14px;
    font-family: HarmonyOs-Medium;
    color: #989898;
    line-height: 20px;
    margin-right: 40px;
    :hover {
      color: #333;
    }
  }
`;

export const Tip = styled.div`
  width: 154px;
  height: 32px;
  background: #3492ff;
  border-radius: 8px;
  position: absolute;
  top: -31px;
  right: 0;
  cursor: pointer;
  transition: all 1s;
  animation: jump 0.8s ease-in-out infinite alternate;
  &:hover {
    animation-play-state: paused;
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .text {
    height: 20px;
    font-size: 14px;
    font-family: HarmonyOs-Bold;
    color: #ffffff;
    line-height: 20px;
    z-index: 9;
  }
  .jiantou {
    width: 0;
    height: 0;
    border: 16px solid transparent;
    border-top-color: #3492ff;
    position: absolute;
    top: 16px;
    left: 14px;
    transform: rotate(-80deg);
  }
  .claminItem {
    background: #ffffff;
    border-radius: 4px;
    opacity: 1;
    border: 1px solid #333333;
    padding: 4px 8px;
    color: #555;
    width: max-content;
    position: absolute;
    right: 10px;
    top: -20px;
  }
  @keyframes jump {
    from {
      top: -32px;
    }
    to {
      top: 0px;
    }
  }
`;

export const CliamUpload = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 8px;
  border: 1px solid #eef0f2;
  position: relative;
  margin-bottom: 24px;
  overflow: hidden;
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .markText {
      text-align: center;
    }
    .summark {
      margin-bottom: 8px;
    }
    .text {
      width: 165px;
      font-size: 14px;
      color: #989898;
      line-height: 20px;
    }
    &:hover {
      background: #e5e5e5;
    }
  }
  .uploadImg {
    width: 100%;
    height: 100%;
    position: relative;
    .modal {
      width: 100%;
      height: 100%;
      position: relative;
      background: rgba(0, 0, 0, 0.5);
      display: none;
    }
    &:hover .modal {
      display: block;
    }
    .delete {
      position: absolute;
      width: 76px;
      height: 32px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
