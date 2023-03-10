import styled from 'styled-components';

export const MyTeamContainer = styled.div`
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
  p {
    padding-top: 42px;
    color: #eee;
    font-size: 14px;
    line-height: 21px;
    font-weight: bold;
  }
  .level {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 12px 0;
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    .left {
      color: #fff;
      font-weight: 500;
      font-size: 15px;
      span {
        margin-right: 6px;
      }
    }
    .grade {
      width: 30px;
      height: 30px;
    }
  }
  .myTable {
    margin-top: 12px;
  }
`;
