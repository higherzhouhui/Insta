import styled from 'styled-components';

export const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 80px;
`;
export const LayoutMainContentContainer = styled.div`
  position: relative;
`;

export const LayoutContentContainer = styled.div`
  max-width: 1312px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
  padding: 0 20px;
  min-height: calc(100vh - 292px);
`;

export const LayoutListContentContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 292px);
`;
