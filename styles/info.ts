import styled from 'styled-components';

export const InfoContainer = styled.div`
  padding: 30px 0 0 0;
  h2 {
    font-size: 16px;
    color: #fff;
  }
  .baseInfo {
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      h3 {
        color: #abb5c7;
        margin-top: 12px;
      }
    }
    .right {
      color: #fff;
      font-size: 16px;
      background: #181e30;
      padding: 30px 50px;
      border-radius: 12px;
    }
  }
  .infoimage {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  #main {
    width: 100%;
    height: 300px;
    margin: 12px 0;
  }
`;
