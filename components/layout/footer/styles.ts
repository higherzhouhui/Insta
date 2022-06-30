import styled from 'styled-components';

export const FooterContainer = styled.div`
  width: 100%;
  background: #53a9ff;
  height: 209px;
  padding: 27px 80px;
  display: inline-block;
  .footMiddle {
    width: 100%;
    height: 1px;
    background: #ffffff;
    opacity: 0.8;
    margin: 42px 0 32px 0;
  }
`;

export const FooterTop = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const FooterHref = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  .link-item-box {
    margin: 0 16px;
    cursor: pointer;
  }
`;

export const FooterBot = styled.div`
  height: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .copyRight {
    height: 20px;
    font-size: 14px;
    font-family: HarmonyOs-Medium;
    color: #ffffff;
    line-height: 20px;
  }
  a {
    height: 20px;
    font-size: 14px;
    color: #ffffff;
    line-height: 20px;
    :visited {
      color: #fff;
    }
    :hover {
      font-family: HarmonyOs-Medium;
    }
  }
  .termsPollcy {
    display: flex;
    align-items: center;
  }
  .fenge {
    margin: 0 8px;
    width: 1px;
    height: 100%;
    display: inline-block;
    border-left: 2px solid #fff;
  }
`;
