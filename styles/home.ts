import styled from 'styled-components';

export const HomeContainer = styled.div`
  width: 100%;
  background: rgb(6, 25, 11);
  height: 100%;
  padding: 20px 16px;
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
  .btnGroup {
    margin: 8px 0;
    display: flex;
    .btn {
      color: #fff;
      border-radius: 12px;
      background: rgb(119, 108, 255);
      padding: 8px 10px;
      font-size: 16px;
      svg {
        width: 14px;
        height: 12px;
        margin-left: 4px;
      }
    }
    .btnRight {
      margin-left: 12px;
      background: #3a3636;
      color: rgb(119, 108, 255);
      border: 1px solid rgb(119, 108, 255);
    }
  }
  .divide {
    height: 2px;
    background: rgb(104 114 143);
    margin: 30px 0;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 16px;
    margin-top: 24px;
    background: rgb(24, 30, 48);
    border-radius: 16px;
    padding: 10px 0;
    .flex {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .font-medium {
        line-height: 16px;
        color: #fff;
        margin-top: 6px;
      }
    }
  }
  .product {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgb(24, 30, 48);
    border-radius: 16px;
    padding: 6px 10px;
    margin-bottom: 12px;
    position: relative;
    .left {
      display: flex;
      img {
        height: 20px;
        object-fit: contain;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translate(0, -50%);
      }
      .img2 {
        margin: 8px 0 0 10px;
      }
      .title {
        margin-left: 40px;
        .top {
          font-size: 14px;
          color: #fff;
        }
        .bottom {
          margin-top: 4px;
          color: #999;
        }
      }
    }
    .right {
      color: #fff;
      font-weight: bold;
      font-size: 14px;
    }
  }
  .partners {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 20px;
    column-gap: 10px;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 32px;
      background: rgb(5, 22, 96);
      color: #daa;
      font-size: 14px;
      font-weight: bold;
    }
  }
`;

export const InviterComp = styled.div`
  position: relative;
  padding: 12px;
  h2 {
    color: #fff;
    font-size: 14px;
  }
  p {
    background: #000;
    color: #fff;
    font-size: 12px;
    width: 100%;
    border-radius: 8px;
    padding: 4px;
    margin: 20px 0;
    line-height: 21px;
  }
  .confirm {
    padding: 4px 8px;
    background: #776cff;
    color: #fff;
    width: fit-content;
    margin: 0 auto;
    border-radius: 5px;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
  }
`;
