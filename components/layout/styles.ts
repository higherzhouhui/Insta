import styled from 'styled-components';

export const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 60px;
  background: rgb(6, 25, 11);
`;
export const LayoutMainContentContainer = styled.div`
  position: relative;
`;

export const LayoutContentContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  flex: 1;
  padding: 0 12px;
  min-height: calc(100vh - 487px);
  background: rgb(6, 25, 11);
`;

export const LayoutListContentContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 487px);
  background: rgb(6, 25, 11);
`;
