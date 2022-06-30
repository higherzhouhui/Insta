import styled from 'styled-components';

export const AddFundContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 24px;
    font-family: HarmonyOs-Bold;
    color: #000000;
  }
  .img-box {
    margin: 10px 0;
  }
  p {
    font-size: 18px;
    font-family: HarmonyOs-Medium;
    color: #989898;
    line-height: 26px;
    text-align: center;
    &.tip {
      font-size: 16px;
    }
  }
  .input-box {
    display: flex;
    align-items: center;
    margin-top: 12px;
    margin-bottom: 40px;
    .address-box {
      width: 362px;
      height: 44px;
      background: #f3f3f3;
      border-radius: 8px;
      opacity: 1;
      border: 1px solid #d2d2d2;
      margin-right: 14px;
      font-size: 14px;
      font-family: HarmonyOs-Medium;
      color: #989898;
      text-align: center;
      line-height: 44px;
    }
  }
`;
