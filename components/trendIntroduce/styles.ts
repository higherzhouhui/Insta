import styled from 'styled-components';

export const TrendIntroduceContainer = styled.div`
  width: 100%;
  margin: 12px 0;
  .basicflex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    .left {
      color: #fff;
      font-size: 13px;
    }
    .right {
      .listItem {
        width: 31px;
        height: 34px;
        background: #060b19;
        border-radius: 7px 7px 7px 7px;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        text-align: center;
        line-height: 34px;
        transition: all 0.5s;
        margin-right: 12px;
      }
      .ant-statistic-content span {
        color: #fff;
        font-size: 14px;
      }
      .listItem:last-child {
        margin-right: 0;
      }
      .listItemActive {
        background: #776cff;
      }
    }
    .list {
      display: flex !important;
    }
  }
`;
