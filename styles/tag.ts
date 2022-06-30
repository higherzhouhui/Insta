import styled from 'styled-components';
import {BackgroundImageProps} from 'styled-system';

export const Content = styled.div`
  width: 100%;
  background: #f5f8fb;
  min-height: calc(100vh - 289px);
`;

export const MainContent = styled.div`
  max-width: 1312px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
  padding: 40px 20px;
  .project-icon {
    width: 160px;
    height: 160px;
    border-radius: 15px;
    opacity: 1;
    position: absolute;
    top: 120px;
    z-index: 2;
    overflow: hidden;
    background: #dfe5df;
  }
`;

export const ImageWrapper = styled.div<BackgroundImageProps>`
  height: 240px;
  background-position: 0px 0px;
  background-size: cover;
  width: 100%;
  font-size: 32px;
  color: #fff;
  font-family: HarmonyOs-Bold;
  line-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) =>
    props.backgroundImage || '/static/image/list-banner.png'});
`;

export const OptionWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-top: 80px;
  border-bottom: 1px solid #d2d2d2;
  padding-bottom: 40px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  position: sticky;
  top: 20px;
  background: #fff;
  z-index: 20;
  .inputwrapper {
    display: flex;
  }
`;
