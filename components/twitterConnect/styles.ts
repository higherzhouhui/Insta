import styled from 'styled-components';

export const SocialConnectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .img-box {
      width: 32px;
      height: 32px;
      background: #d2d2d2;
      margin-right: 8px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      &.active-img-box {
        background: #3d99f7;
      }
    }
    span {
      font-size: 14px;
      font-family: HarmonyOs-Medium;
      color: #333333;
    }
  }
  .right {
  }
`;
