import styled from 'styled-components';

export const Content = styled.div`
  width: 100%;
  background: #f5f8fb;
  .wholeModel {
    width: 100%;
    display: flex;
    justify-content: center;
    .modelHead {
      width: 163px;
      height: 176px;
      .newHead {
        margin-top: 32px;
        margin-left: 33px;
        margin-bottom: 15px;
        border-radius: 50%;
      }
    }
  }
  .changeName {
    width: 350px;
    height: 80px;
    margin-left: 35px;
    margin-top: 18px;
    .titleName {
      height: 24px;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px;
    }
  }
`;
export const MainTop = styled.div`
  width: 100%;
  height: 256px;
  border-bottom: 1px solid #d2d2d2;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 40px;
  .sortButtons {
    width: 293px;
    height: 32px;
    position: absolute;
    bottom: 40px;
    left: 0;
    display: flex;
    justify-content: space-between;
    .sortButton {
      background: white;
      color: #989898;
    }
    .chosenButton {
      background: #53a9ff;
      color: white;
      border-radius: 16px;
    }
  }
`;

export const PersonalInfo = styled.div`
  height: 96px;
  display: flex;

  .personalHead {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    overflow: hidden;
  }
  .text {
    height: 96px;
    margin-left: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .userName {
      font-weight: bold;
      font-size: 28px;
      text-align: center;
    }
    .noEdit {
      font-weight: bold;
      font-size: 28px;
      text-align: center;
    }
    .editProfile {
      border: 1px solid #f3f3f3;
      background: white;
      color: black;
      margin-top: 8px;
    }
  }
`;
