import styled from 'styled-components';

export const SwapContainer = styled.div`
  position: relative;
  select {
    background: rgb(6, 25, 11);
    color: #fff;
    border: none;
    opacity: 0.8;
    &:focus-visible {
      outline: none;
    }
  }
  input {
    background: #060b19;
    border: none;
    color: #999;
    padding-left: 6px;
    height: 32px;
    font-size: 14px;
    width: 100%;
    :focus-visible {
      outline: #060b19;
    }
  }
  .tabList {
    display: flex;
    align-items: center;
    padding: 12px 0;
    .tab {
      font-size: 14px;
      color: #6b7280;
      margin: auto;
    }
    .active {
      color: #fff;
      padding: 5px;
      background: #776cff;
      border-radius: 8px;
    }
  }
  .main {
    padding: 12px;
    border-radius: 8px;
    background: #181e30;
    position: relative;
    h2 {
      color: #fff;
      font-size: 14px;
    }
    .desc {
      color: #abb5c7;
      margin: 12px 0;
    }
    .from {
      color: #abb5c7;
      margin-bottom: 12px;
    }
  }
  .transform {
    text-align: center;
    margin: 6px 0;
    svg {
      width: 50px;
      height: 50px;
    }
  }
  .connectBtn {
    background: #776cff;
    margin: 24px 0 12px 0;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: #fff;
    font-size: 15px;
    border-radius: 8px;
  }
  .setting {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 10px;
    background: #242d47;
    border-radius: 12px;
    svg {
      width: 30px;
      height: 30px;
    }
  }
  .settingContent {
    margin: 12px 0;
  }
  .settingItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      .chooseBtn {
        background: #060b19;
        border-radius: 6px;
        padding: 4px 6px;
        color: #fff;
        font-size: 14px;
        margin-right: 8px;
      }
      .active {
        background: #776cff;
      }
    }
  }
`;

export const MoneyContainer = styled.div`
  border-radius: 8px;
  background: #060b19;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #6b7280;
  .left {
    flex: 1;
    .bot {
      margin-top: 6px;
      padding-left: 6px;
    }
  }
  .right {
    border-radius: 6px;
    padding: 5px;
    background: #181e30;
    display: flex;
    position: relative;
    img {
      width: 14px;
      height: 14px;
      color: #fff;
      margin-right: 4px;
    }
    svg {
      width: 30px;
      height: 30px;
      margin-left: 6px;
      position: absolute;
      right: -5px;
      transform: translate(0, -50%) rotate(-90deg);
    }
  }
  .transformContainer {
    position: relative;
  }
`;
