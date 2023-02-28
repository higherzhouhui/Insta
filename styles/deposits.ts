import styled from 'styled-components';

export const DepositsContainer = styled.div`
  width: 100%;
  background: rgb(6, 25, 11);
  height: 100%;
  padding: 20px 0;
  h1 {
    color: #fff;
    font-size: 24px;
    margin: 12px 0;
    line-height: 32px;
    font-weight: 500;
  }
  h2 {
    color: #ffeded;
    font-size: 18px;
    line-height: 28px;
    font-weight: 500;
    margin: 12px 0;
  }
  h3 {
    color: #d2bdbd;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
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
      padding: 8px;
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
          width: 150px;
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
            margin-right: 6px;
          }
          color: #fff;
          font-weight: bold;
        }
      }
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
      height: 32px;
      background: #776cff;
      border-radius: 8px;
      opacity: 1;
      color: #fff;
      font-weight: 500;
      font-size: 16px;
      text-align: center;
      line-height: 32px;
      margin: 8px 0;
    }
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 12px 0;
    .left {
      font-size: 15px;
      color: #fff;
    }
    .right {
      color: #6b7280;
      display: flex;
      align-items: center;
      svg {
        width: 16px;
        height: 16px;
        fill: #6b7280;
        margin-left: 6px;
      }
    }
  }
  .normalContent {
    background: #181e30;
    border-radius: 8px;
    padding: 12px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 12px 0;
    .left {
      .top {
        font-size: 14px;
        color: #abb5c7;
      }
      .bot {
        margin-top: 20px;
        color: #33c497;
        font-size: 14px;
        font-weight: bold;
        span {
          font-size: 12px;
          margin-left: 4px;
          color: #6b7280;
        }
      }
    }
    .network {
      border: 1px solid #776cff;
      background: #060b19;
      color: #fff;
      padding: 8px 18px;
      border-radius: 6px;
    }
    .right {
      .top {
        padding: 4px 6px;
        font-size: 14px;
        color: #fff;
        border-radius: 4px;
        background-color: #776cff;
      }
      .bot {
        border-radius: 4px;
        padding: 4px 6px;
        font-size: 14px;
        border: 1px solid #776cff;
        color: #776cff;
        background: #181e30;
        margin-top: 12px;
      }
    }
  }
`;

export const TotalAddress = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  .left {
    width: 100%;
    background: #181e30;
    border-radius: 8px;
    opacity: 1;
    padding: 12px;
    .top {
      font-size: 14px;
      color: #abb5c7;
      text-align: center;
    }
    .bot {
      margin-top: 12px;
      font-weight: bold;
      font-size: 16px;
      text-align: center;
      color: #33c497;
      span {
        font-size: 12px;
        margin-left: 4px;
        color: #6b7280;
      }
    }
  }
`;

export const WithDrawContainer = styled.div`
  padding: 12px;
  position: relative;
  h2 {
    font-size: 16px;
    color: #fff;
    margin: 12px 0;
  }
  input {
    background: #060b19;
    border: none;
    color: #fff;
    padding: 8px 6px;
    font-size: 14px;
    width: 100%;
    :focus-visible {
      outline: #060b19;
    }
  }
  .submit {
    margin: 22px auto 0 auto;
    width: 90px;
    text-align: center;
    height: 32px;
    background: #776cff;
    border-radius: 6px;
    opacity: 1;
    line-height: 32px;
    color: #fff;
    font-weight: 500;
    font-size: 16px;
  }
  img {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 10px;
    right: 10px;
  }
`;
