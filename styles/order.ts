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
`;
