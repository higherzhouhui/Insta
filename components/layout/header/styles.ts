import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100vw;
  height: 60px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 0px 4px 16px 1px rgba(201, 203, 205, 0.25);
  z-index: 110;
  background-color: rgb(6, 11, 25);
`;

export const HeaderLogoContainer = styled.div`
  margin-right: 80px;
  cursor: pointer;
`;

export const HeaderOptionContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  .account-address-box {
    font-size: 14px;
    color: #776cff;
  }
  .dropDown {
    padding: 4px 0;
    border: 1px solid #adabc7;
    color: #adabc7;
    font-size: 14px;
    margin-right: 12px;
    width: 70px;
    text-align: center;
    border-radius: 6px;
  }
`;
export const HeadeSearchContainer = styled.div`
  flex: 1;
  position: relative;
  .inputStyle {
    &:hover {
      background: #f3f3f3;
      border: 1px solid #53a9ff;
    }
    &:focus {
      background: #f3f3f3;
      border: 1px solid #53a9ff;
      box-shadow: none;
    }
  }
`;

export const HeadeUserContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin: 0 16px;
  overflow: hidden;
`;
export const WalletContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px 6px;
  border: 1px solid #776cff;
  border-radius: 12px;
  svg {
    width: 22px;
    height: 22px;
    fill: #776cff;
  }
  .wallet {
    color: #776cff;
    font-size: 14px;
  }
`;
export const WalletListContainer = styled.div`
  width: 288px;
  padding: 8px 0;
`;

export const WalletItemContainer = styled.div`
  width: 100%;
  height: 48px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background: #f3f3f3;
  }
  .name-box {
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      font-family: HarmonyOs-Medium;
      color: #000000;
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

export const UserListContainer = styled.div`
  width: 200px;
  padding: 8px 0;
  background-color: #fff;
  border-radius: 8px;
`;

export const UserItemContainer = styled.div`
  width: 100%;
  height: 48px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0;
  border-bottom: 1px solid #eef0f2;
  background: #ffffff;
  cursor: pointer;
  &:last-child {
    border: 0;
  }
  &:hover {
    background: #f3f3f3;
  }
  .name-box {
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      font-family: HarmonyOs-Medium;
      color: #000000;
      margin-left: 12px;
    }
  }
  .tip-box {
    font-size: 12px;
    font-family: HarmonyOs-Medium;
    font-weight: 500;
    color: #989898;
  }
`;

export const SearchList = styled.div`
  padding: 0 16px 0 53px;
  width: 100%;
  font-size: 16px;
  height: 32px;
  cursor: pointer;
  background: #fff;
  color: #333;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  .searchListImg {
    position: relative;
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SearchLists = styled.div`
  width: 100%;
  position: absolute;
  z-index: 999;
  background: #ffffff;
  box-shadow: 0px 4px 16px 1px rgba(159, 159, 159, 0.25);
  border-radius: 16px;
  padding: 16px 0;
  max-height: 400px;
  overflow: auto;
  .choose {
    background: #f3f3f3;
  }
  .more {
    font-size: 16px;
    width: 100%;
    height: 32px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'HarmonyOs-Bold';
    cursor: pointer;
    :hover {
      background: #f3f3f3;
    }
  }
`;

export const SearchTabs = styled.div`
  position: absolute;
  display: flex;
  height: 24px;
  top: 12px;
  right: 10px;
  border-left: 1px solid #d2d2d2;
`;
