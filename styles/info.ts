import styled from 'styled-components';

export const InfoContainer = styled.div`
  width: 100%;
  background: url('/static/image/bj.png');
  height: 100%;
  padding: 20px 16px 90px 16px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  min-height: 100vh;
  .title {
    width: 130px;
    height: 30px;
    margin: 12px auto 24px auto;
    position: relative;
  }
  .myLevel {
    border-radius: 18px;
    padding: 12px 24px;
    background-image: url('/static/image/level.png');
    background-size: 100% 100%;
    margin-bottom: 12px;
    .level {
      font-size: 26px;
      color: #fff;
      font-weight: bold;
    }
  }
  .desc {
    font-size: 16px;
    color: #fff;
    margin-bottom: 18px;
  }
  .number {
    font-size: 23px;
    font-weight: bold;
    color: #fff;
  }
  .myPower {
    border-radius: 18px;
    padding: 12px 24px;
    background-image: url('/static/image/power.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .right {
    border-radius: 6px;
    border: 1px solid #fff;
    padding: 6px 12px;
    color: #fff;
    font-size: 16px;
  }
  .totalPower {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 12px;
    margin-top: 12px;
    .left {
      border-radius: 12px;
      padding: 12px 24px;
      background-image: url('/static/image/total.png');
      background-size: 100% 100%;
      .number {
        font-size: 15px;
      }
    }
  }
  .share {
    width: 90px;
    height: 20px;
    margin: 42px auto 24px auto;
    position: relative;
  }
  .wrapper {
    background: #292242;
    border-radius: 12px;
    padding: 12px;
    .link {
      color: #fff;
      font-size: 13px;
    }
    .linkUrl {
      border-radius: 4px;
      background: #615889;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 8px;
      color: #fff;
      margin: 12px 0 24px 0;
      .mylink {
        font-size: 13px;
      }
      .copy {
        width: 20px;
        height: 24px;
        position: relative;
      }
    }
  }
  .header {
    display: flex;
    color: #fff;
    opacity: 0.9;
    line-height: 32px;
    border-bottom: 1px solid #2f274c;
    .left {
      flex: 1;
      text-align: left;
      font-size: 15px;
    }
  }
  .content {
    min-height: 50px;
    text-align: center;
    line-height: 42px;
    color: #fff;
    opacity: 0.9;
  }
  .list {
    display: flex;
    color: #fff;
    opacity: 0.8;
    line-height: 32px;
    border-bottom: 1px solid #2f274c;
    .left {
      flex: 1;
      text-align: left;
      font-size: 13px;
    }
  }
  .list:last-child {
    border: none;
  }
`;
