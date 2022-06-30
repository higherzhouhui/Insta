import styled from 'styled-components';

export const TermsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 40px 0;
  background: #f5f8fb;
  font-family: HarmonyOs-Regular;
  .slogan-box {
    width: 100%;
    height: 440px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .left {
      h1 {
        font-size: 48px;
        font-family: HarmonyOs-Bold;
        color: #333333;
        line-height: 58px;
      }
      p {
        width: 532px;
        font-size: 20px;
        font-weight: 400;
        color: #53a9ff;
        line-height: 30px;
      }
    }
    .right {
    }
  }
  .content-box {
    width: 1312px;
    background: #ffffff;
    border-radius: 16px;
    padding: 0 111px;
    margin: 0 auto;
    .title-box {
      width: 100%;
      height: 75px;
      font-size: 16px;
      font-family: Inter-Bold, Inter;
      font-weight: bold;
      color: #333333;
      line-height: 100px;
      border-bottom: 1px solid #eef0f2;
    }
    .main-box {
      padding-bottom: 40px;
    }
  }
  p {
    margin: 8px;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
    &.step-1 {
      padding-left: 0px;
      margin-top: 16px;
    }
    &.step-2 {
      padding-left: 20px;
    }
    &.step-3 {
      padding-left: 40px;
    }
    &.title {
      margin-top: 16px;
    }
    strong {
      font-weight: bold;
      font-size: 14px;
      color: #333333;
      font-family: HarmonyOs-Bold;
    }
  }

  ul {
    margin: 20px;
    li {
      font-size: 14px;
      padding-left: 30px;
      position: relative;
      margin: 5px;
      color: #333333;
      line-height: 20px;
      &::before {
        display: block;
        position: absolute;
        content: '';
        width: 5px;
        height: 5px;
        background-color: black;
        border-radius: 50%;
        left: 5px;
        top: 8px;
      }
    }
  }
`;
