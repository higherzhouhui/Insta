import styled from 'styled-components';

export const ProfitContainer = styled.div`
  padding-bottom: 30px;
  .nav {
    position: fixed;
    width: 100%;
    top: 60px;
    z-index: 5;
    height: 30px;
    font-size: 16px;
    color: #fff;
    left: 0;
    text-align: center;
    line-height: 30px;
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
  .myTable {
    padding-top: 42px;
  }
`;
