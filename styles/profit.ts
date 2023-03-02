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
`;

export const PMyTable = styled.div`
  margin-top: 40px;
  background: #181e30;
  border-radius: 8px;
  padding: 8px 4px;
  .header {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    > div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #6b7280;
      height: 36px;
      font-size: 16px;
    }
  }
  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid #2a334d;
    > div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #abb5c7;
      font-size: 12px;
      line-height: 32px;
    }
    .avtive {
      color: #5297fe;
    }
  }
`;
