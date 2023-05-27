import styled from 'styled-components';

export const ProfitContainer = styled.div`
  padding-bottom: 30px;
  .nav {
    position: fixed;
    width: 100%;
    top: 60px;
    z-index: 5;
    height: 40px;
    font-size: 16px;
    color: #fff;
    left: 0;
    text-align: center;
    line-height: 40px;
    background: rgb(6, 11, 25);
    svg {
      fill: #fff;
      width: 40px;
      height: 40px;
      position: absolute;
      left: 18px;
      top: 50%;
      transform: translate(0, -50%) rotate(0);
    }
  }
  .smartContainer {
    background: #181e30;
    border-radius: 2px;
    padding: 12px 12px 36px 12px;
    margin-top: 40px;
    .top {
      font-size: 17px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
    }
    .middle {
      position: relative;
      font-size: 42px;
      font-family: Segoe UI-Semibold, Segoe UI;
      font-weight: 600;
      color: #776cff;
      text-align: center;
      margin-top: 30px;
      .unit {
        position: absolute;
        bottom: 0;
        right: 5%;
        width: 44px;
        font-size: 18px;
        font-family: Segoe UI-Regular, Segoe UI;
        font-weight: 400;
        color: #776cff;
      }
    }
    .bot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 45px;
    }
    .recharge {
      padding: 0 12px;
      height: 32px;
      background: #776cff;
      border-radius: 15px 15px 15px 15px;
      text-align: center;
      line-height: 32px;
      color: #fff;
      font-size: 14px;
    }
    .withdraw {
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .shareContainer {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 20px;
      margin-top: 16px;
      .sitem {
        padding: 12px;
        .stop {
          font-size: 15px;
          font-family: Segoe UI-Regular, Segoe UI;
          font-weight: 400;
          color: #abb5c7;
        }
        .sbot {
          margin-top: 8px;
          .price {
            width: 56px;
            font-size: 20px;
            font-family: Segoe UI-Semibold, Segoe UI;
            font-weight: 600;
            color: #33c497;
          }
          .sunit {
            width: 23px;
            font-size: 12px;
            font-weight: 400;
            color: #6b7280;
            margin: 6px 0 0 6px;
          }
        }
      }
    }
  }
`;

export const PMyTable = styled.div`
  margin-top: 40px;
  background: #181e30;
  border-radius: 8px;
  padding: 8px 4px;
  .header {
    display: grid;
    grid-template-columns: 1fr 2fr 1.5fr;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      height: 36px;
      font-size: 16px;
    }
  }
  .content {
    display: grid;
    grid-template-columns: 1fr 2fr 1.5fr;
    border-top: 1px solid #2a334d;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #abb5c7;
      font-size: 12px;
      line-height: 32px;
    }
    .avtive {
      color: #5297fe;
    }
  }
`;
