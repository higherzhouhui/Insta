import styled from 'styled-components';

export const PledgeContainer = styled.div`
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
  .main {
    padding-top: 40px;
  }
  .approveContainer {
    background: #181e30;
    border-radius: 12px;
    padding: 8px;
    .content {
      background: #060b19;
      border-radius: 8px;
      opacity: 1;
      border: 1px solid #2a334d;
      padding: 12px 8px;
      p {
        color: #fff;
        font-size: 14px;
        margin-bottom: 12px;
      }
      .inputWrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .inputDeposit {
          background: #060b19;
          border: none;
          color: #999;
          padding: 8px 6px;
          font-size: 14px;
          width: 190px;
          align-items: center;
          :focus-visible {
            outline: #060b19;
          }
        }
        .usdtWrapper {
          display: flex;
          align-items: center;
          margin-right: 6px;
          svg {
            width: 20px;
            height: 20px;
            margin-right: 2px;
          }
          color: #fff;
          font-weight: bold;
          font-size: 14px;
        }
        .bep {
          display: flex;
          align-items: center;
          color: #ffca2c;
          font-size: 20px;
          transform: scale(0.5);
        }
        .error {
          position: absolute;
          color: #e11010;
          bottom: -8px;
          left: 5px;
        }
        select {
          background: rgb(6, 25, 11);
          color: #fff;
          border: none;
          opacity: 0.8;
          &:focus-visible {
            outline: none;
          }
        }
      }
    }
    .trendWrapper {
      margin: 18px 0;
    }
    .desc {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 400;
      color: #6b7280;
      margin: 12px 0;
    }
    .approveBtn {
      width: 100%;
      height: 37px;
      background: #776cff;
      border-radius: 8px;
      opacity: 1;
      color: #fff;
      font-weight: 500;
      font-size: 16px;
      text-align: center;
      line-height: 37px;
      margin: 8px 0;
    }
  }
`;
