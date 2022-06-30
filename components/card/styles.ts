import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%;
`;

export const CardHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 32px;
    color: #333333;
    font-family: HarmonyOs-Medium;
  }
  .more-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    a {
      font-size: 18px;
      font-family: HarmonyOs-Medium;
      color: #d2d2d2;
      margin-right: 8px;
    }
    &:hover {
      a {
        color: #53a9ff;
      }
      svg {
        fill: #53a9ff;
      }
    }
  }
`;

export const CardBodyContainer = styled.div`
  width: 100%;
  margin-top: 60px;
`;
