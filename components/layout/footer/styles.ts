import styled from 'styled-components';

export const FooterContainer = styled.div`
  width: 100%;
  background: #1d1731;
`;

export const FooterTop = styled.div`
  width: 100%;
  padding: 24px 16px 92px 16px;
  color: #fff;
  h1 {
    font-size: 20px;
    margin: 12px 0;
  }
  h3 {
    font-size: 16px;
    margin: 8px 0;
  }
  p {
    font-size: 14px;
    color: #999;
  }
  .learnList {
    display: flex;
    a {
      font-size: 14px;
      font-weight: 500;
      color: #666;
      margin-right: 12px;
    }
    svg {
      height: 20px;
      width: 20px;
      margin-right: 12px;
    }
  }
`;

export const FooterBot = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #090518;
  height: 60px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  z-index: 9999;
  .item {
    color: #999;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 30px;
      height: 30px;
      fill: #999;
    }
  }
  .active {
    color: #d158e9;
    svg {
      fill: #d158e9;
    }
  }
  .menuTab {
    position: relative;
    width: 25px;
    height: 25px;
    margin-bottom: 5px;
  }
`;
