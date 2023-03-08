import styled from 'styled-components';

export const AddFundContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 16px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 22px;
    height: 22px;
  }
  h2 {
    font-size: 16px;
    font-family: HarmonyOs-Bold;
    color: #000000;
  }
  .img-box {
    margin: 10px 0;
  }
  p {
    font-size: 14px;
    font-family: HarmonyOs-Medium;
    color: #989898;
    line-height: 18px;
    text-align: center;
    &.tip {
      font-size: 14px;
    }
  }
  .input-box {
    display: flex;
    align-items: center;
    margin-top: 12px;
    margin-bottom: 40px;
    flex-direction: column;
    .address-box {
      width: 100%;
      height: 44px;
      background: #f3f3f3;
      border-radius: 8px;
      opacity: 1;
      border: 1px solid #d2d2d2;
      font-size: 12px;
      font-family: HarmonyOs-Medium;
      color: #989898;
      text-align: center;
      line-height: 44px;
      padding: 0 6px;
      margin-bottom: 12px;
    }
  }
`;
