import styled from 'styled-components';

export const CollectContainer = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  .cloPic {
    width: 100%;
    padding-bottom: 100%;
    position: relative;
    cursor: pointer;
    display: block;
  }
  .botContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 88px;
  }
  .leftSide {
    display: flex;
    align-items: center;
    height: 40px;
    max-width: 80%;
    flex: 8;
    padding-left: 16px;
  }
  .authorPic {
    position: relative;
    width: 40px;
    height: 40px;
    min-width: 40px;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }
  .authorName {
    margin-left: 8px;
    min-width: 80px;
    height: 24px;
    font-size: 16px;
    font-family: HarmonyOs-Bold;
    color: #333333;
    line-height: 24px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .rightSide {
    padding-right: 16px;
    height: 24px;
    flex: 2;
  }
  &:hover {
    box-shadow: 0px 12px 32px 1px rgba(147, 170, 192, 0.25);
    transform: scale(1.002);
  }
`;
export const NftProContainer = styled.div`
  .nft-wrapper {
    padding: 24px;
  }
  width: 100%;
  height: 267px;
  background: #fff;
  border-radius: 24px;
  cursor: pointer;
  overflow: hidden;
  .middelSide {
    width: 100%;
    height: 1px;
    background: #eef0f2;
    margin: 24px 0;
  }
  &:hover {
    box-shadow: 0px 12px 32px 1px rgba(147, 170, 192, 0.25);
    transform: scaleY(1.06);
  }
  .botSke {
    width: 100%;
    margin-top: 16px;
    height: 30px;
  }
`;

export const NftTopComp = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;
  .rightSide {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    height: 24px;
    max-width: 70%;
    text-overflow: ellipsis;
  }
  .sort {
    font-weight: 500;
    font-size: 12px;
    color: #fff;
    line-height: 16px;
    margin-left: 4px;
  }
  .money {
    height: 24px;
    font-size: 16px;
    font-family: 'HarmonyOs-Medium';
    color: #989898;
    line-height: 24px;
    margin-left: 4px;
  }
  .bg1 {
    background: #ffd84c;
  }
  .bg2 {
    background: #c2c5d4;
  }
  .bg3 {
    background: #e7a965;
  }
  .normal {
    background: #53a9ff;
  }
  .skl {
    width: 52px;
    border-radius: 24px;
    overflow: hidden;
    height: 24px;
  }
  .skr {
    width: 52px;
    height: 24px;
  }
`;

export const NftTlside = styled.div`
  min-width: 52px;
  height: 100%;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NftBotComp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .portrait {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
  }
  .nftName {
    min-width: 120px;
    height: 26px;
    font-size: 18px;
    font-family: 'HarmonyOs-Bold';
    color: #333333;
    line-height: 26px;
    margin: 16px 0 4px 0;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    text-overflow: ellipsis;
  }
  .nftNumber {
    min-width: 54px;
    height: 20px;
    font-size: 14px;
    font-family: 'HarmonyOs-Medium';
    width: 100%;
    color: #333333;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    text-overflow: ellipsis;
  }
`;

export const TagProductContainer = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  .img-box {
    width: 100%;
    padding-bottom: 100%;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }
  &:hover .des-box {
    /* 显示动画 */
    animation: bottomToShow 0.5s forwards;
  }
  .des-box {
    width: 100%;
    height: 40px;
    padding: 0 16px;
    position: absolute;
    left: 0;
    opacity: 0;
    bottom: 0;
    z-index: 9;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .author-icon {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    min-width: 40px;
  }
  .make-thing {
    display: flex;
    position: relative;
    align-items: center;
  }
  .make-icon {
    margin-left: 8px;
    cursor: pointer;
    position: relative;
  }
  .share-comp {
    position: absolute;
    top: 25px;
    right: 0px;
    border-radius: 6px;
    box-shadow: 0px 4px 16px 1px rgba(159, 159, 159, 0.25);
    overflow: hidden;
  }
  @keyframes bottomToShow {
    from {
      bottom: -10px;
      opacity: 0;
    }
    to {
      bottom: 12px;
      opacity: 1;
    }
  }
`;
