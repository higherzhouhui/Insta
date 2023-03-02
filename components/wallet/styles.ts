import styled from 'styled-components';

export const WalletContainer = styled.div`
  width: 100%;
`;

export const WalletHeadContainer = styled.div`
  width: 100%;
  height: 64px;
  border-bottom: 1px solid #eef0f2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  position: relative;
  .user-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    .img-box {
      width: 32px;
      height: 32px;
      border-radius: 32px;
      background-color: #d2d2d2;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    span {
      font-size: 16px;
      font-family: HarmonyOs-Medium;
      color: #fff;
      line-height: 24px;
      background-clip: text;
      margin-left: 8px;
      margin-right: 8px;
    }
  }
  .account-address-box {
    font-size: 10px;
    font-family: HarmonyOs-Medium;
    color: #fff;
  }
  .down-box {
    position: absolute;
    width: 200px;
    height: 144px;
    background: #ffffff;
    border-radius: 8px;
    left: 16px;
    top: 60px;
    z-index: 2;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    .down-item-box {
      width: 100%;
      height: 48px;
      border-bottom: 1px solid #eef0f2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      cursor: pointer;
      &:last-child {
        border: 0;
      }
      .left {
        display: flex;
        align-items: center;
        span {
          font-size: 14px;
          font-family: HarmonyOs-Medium;
          color: #fff;
          margin-left: 12px;
        }
      }
      .right {
        display: flex;
        align-items: center;
      }
      &.is-active {
        .left {
          span {
            color: #fff;
          }
        }
        .right {
        }
      }
    }
  }
`;

export const WalletBallanceContainer = styled.div`
  height: 130px;
  border-radius: 8px 8px 8px 8px;
  opacity: 1;
  border: 1px solid #eef0f2;
  margin: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 14px;
    font-family: HarmonyOs-Medium;
    color: #989898;
    margin-top: 16px;
  }
  strong {
    font-size: 18px;
    font-family: HarmonyOs-Bold;
    color: #333333;
    margin-top: 4px;
  }
  .btn-box {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 40px;
    background: #53a9ff;
    border: 1px solid #53a9ff;
    border-radius: 0px 0px 8px 8px;
    font-size: 16px;
    font-family: HarmonyOs-Bold;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
  }
`;

export const WalletTipContainer = styled.div`
  width: 100%;
  font-size: 12px;
  font-family: HarmonyOs-Medium;
  font-weight: 500;
  color: #989898;
  line-height: 18px;
  align-items: center;
  padding: 16px;
`;

export const WalletListContainer = styled.div`
  border-radius: 8px;
  border: 1px solid #eef0f2;
  margin: 0 16px;
`;

export const WalletItemContainer = styled.div`
  width: 100%;
  height: 48px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eef0f2;
  cursor: pointer;
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  &:last-child {
    border: 0;
    border-radius: 0 0 8px 8px;
  }
  &:hover {
    background: #f6fbff;
    box-shadow: 0px 0px 6px 1px rgba(130, 130, 130, 0.25);
  }
  .name-box {
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      font-family: HarmonyOs-Medium;
      color: #fff;
      margin-left: 12px;
    }
  }
  .tip-box {
    font-size: 12px;
    font-family: HarmonyOs-Medium;
    color: #989898;
  }
  .loading-box {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

export const DownListContainer = styled.div`
  width: 200px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  .down-item-box {
    width: 100%;
    height: 48px;
    border-bottom: 1px solid #eef0f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    &:last-child {
      border: 0;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        font-family: HarmonyOs-Medium;
        color: #333333;
        margin-left: 12px;
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
    &.is-active {
      .left {
        span {
          color: #000000;
        }
      }
      .right {
      }
    }
  }
`;
