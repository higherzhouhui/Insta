import styled from 'styled-components';

export const LoginContainer = styled.div`
  width: 100%;
  height: calc(100vh - 212px - 80px);
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 20px;
    font-family: HarmonyOs-Bold;
    color: #333333;
    line-height: 26px;
    margin-top: 96px;
    margin-bottom: 12px;
  }
  p {
    font-size: 14px;
    color: #333333;
    line-height: 20px;
  }
`;

export const LoginContentContainer = styled.div`
  width: 422px;
  margin-top: 40px;
`;
