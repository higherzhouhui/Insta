import styled from 'styled-components';

export const LoginContainer = styled.div`
  width: 100%;
  height: calc(100vh - 212px - 80px);
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
  h2 {
    font-size: 18px;
    font-family: HarmonyOs-Bold;
    color: #fff;
    line-height: 26px;
    margin-top: 96px;
    margin-bottom: 12px;
  }
  p {
    font-size: 14px;
    color: #fff;
    line-height: 20px;
  }
  .title {
    width: 100%;
    position: relative;
    color: #fff;
    text-align: center;
    align-items: center;
    line-height: 50px;
    font-size: 18px;
    font-weight: bold;
  }
  .back {
    width: 50px;
    height: 50px;
    fill: #fff;
    position: absolute;
    left: 0px;
    top: 0;
  }
`;

export const LoginContentContainer = styled.div`
  width: 422px;
  margin-top: 40px;
`;
