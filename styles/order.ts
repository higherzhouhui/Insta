import styled from 'styled-components';

export const MyOrderContainer = styled.div`
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
    .tabList {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: 32px;
      .tab {
        font-size: 14px;
        font-weight: 400;
        color: #6b7280;
        text-align: center;
        line-height: 32px;
      }
      .active {
        background: #776cff;
        border-radius: 15px 15px 15px 15px;
        color: #fff;
      }
    }
  }
`;

export const OrderProductContainer = styled.div`
  margin-top: 20px;
  padding: 12px;
  border-radius: 12px;
  background: #181e30;
  .basicFlex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    .left {
      font-size: 13px;
      font-weight: 400;
      color: #ffffff;
    }
    .right {
      font-size: 13px;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .basicFlex:last-child {
    margin-bottom: 0;
  }
`;
