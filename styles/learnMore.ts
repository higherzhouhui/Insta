import styled from 'styled-components';

export const LearnMoreContainer = styled.div`
  padding-bottom: 30px;
  color: #fff;
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
  main {
    padding-top: 40px;
    h2 {
      font-size: 16px;
      line-height: 24px;
      margin: 12px 0;
    }
    span {
      font-size: 14px;
      line-height: 21px;
      display: block;
      opacity: 0.9;
    }
  }
`;
