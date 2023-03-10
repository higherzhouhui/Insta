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
  .tvlContainer {
    h1 {
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      margin: 12px 0;
    }
    .chainData {
      width: 100%;
      .left {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        width: 50%;
        margin: 8px 0;
        float: left;
        padding-right: 6px;
        .title {
          font-size: 13px;
          font-weight: 500;
          opacity: 0.8;
        }
        .desc {
          font-size: 12px;
          opacity: 0.6;
        }
      }
    }
  }
`;
