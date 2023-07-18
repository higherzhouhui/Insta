import styled from 'styled-components';

export const HomeContainer = styled.div`
  width: 100%;
  background: url('/static/image/bj.png');
  height: 100%;
  padding: 20px 16px 90px 16px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .topImg {
    position: relative;
    width: 100%;
    height: 0%;
    padding-bottom: 53%;
    border-radius: 16px;
    overflow: hidden;
  }
  .jdzm {
    height: 60px;
    width: 221px;
    position: relative;
    margin: 40px auto;
  }

  .tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 20px;
    .tab {
      margin: 0 auto;
      .tabImg {
        position: relative;
        width: 81px;
        height: 30px;
      }
      .tabActive::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        background: #fff;
        left: 0;
        bottom: -8px;
      }
    }
  }

  .tabTitle {
    height: 25px;
    width: 342px;
    position: relative;
    margin: 20px auto;
  }
  .tabBg {
    width: 100%;
    height: 0;
    padding-bottom: 48%;
    position: relative;
  }
`;

export const InviterComp = styled.div`
  position: relative;
  padding: 32px 18px;
  h2 {
    color: #fff;
    font-size: 16px;
    text-align: center;
  }
  p {
    background: #000;
    color: #fff;
    font-size: 14px;
    width: 100%;
    padding: 12px 8px;
    margin: 20px 0;
    line-height: 21px;
  }
  .confirm {
    background: #d158e9;
    color: #fff;
    width: 100%;
    border-radius: 6px;
    font-size: 18px;
    line-height: 42px;
    text-align: center;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
  }
`;

export const SwipperItem = styled.div`
  position: relative;
  .bg {
    width: 100%;
    height: 0;
    padding-bottom: 48%;
    position: relative;
    z-index: -1;
  }
  .describe {
    background: #3b0150;
    border-radius: 18px;
    padding: 24px 12px;
    margin-top: -20px;
    z-index: 9;
    .number {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .total {
        font-size: 16px;
        color: #fff;
        opacity: 0.9;
      }
    }
    .proWrapper {
      position: relative;
      width: 100%;
      border-radius: 6px;
      margin: 24px 0;
      .showNumber {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 12px;
        z-index: 9;
        position: relative;
        > div {
          font-size: 22px;
          color: #fff;
        }
      }

      .proTotal {
        position: absolute;
        background: linear-gradient(to right, #fb963e, #fe5dce);
        left: 0;
        top: 0;
        height: 100%;
        z-index: 1;
      }
      .proRemain {
        position: absolute;
        background: linear-gradient(to left, #9752ff, #7e6fff);
        right: 0;
        top: 0;
        height: 100%;
        z-index: 1;
      }
      .divide {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        width: 28px;
        height: 75px;
        z-index: 98;
      }
    }
    .priceWrapper {
      color: #fff;
      font-size: 14px;
      .price {
        letter-spacing: 18px;
      }
    }
    .btn {
      margin-top: 24px;
      width: 100%;
      height: 48px;
      border-radius: 8px;
      text-align: center;
      line-height: 48px;
      color: #fff;
      font-size: 20px;
      background: #d158e9;
      font-weight: bold;
    }
    .disMint {
      background: #555;
    }
  }
  .hint {
    margin-top: 36px;
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 6px;
    }
    .list {
      color: #fff;
      opacity: 0.9;
      font-size: 15px;
      line-height: 26px;
    }
  }
`;
