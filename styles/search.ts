import styled from 'styled-components';

export const SearchResult = styled.div`
  width: 100%;
  padding-top: 40px;
  min-height: calc(100vh - 289px);
`;

export const ProductAuthorWrapper = styled.div`
  width: 100%;
  height: 250px;
  padding: 8px 8px 16px 8px;
  position: relative;
  text-align: center;
  background: #ffffff;
  border-radius: 16px 16px 16px 16px;
  border: 1px solid #eef0f2;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px #e5e5e5;
    border: 0;
    margin-top: -5px;
  }
`;

export const Works = styled.div`
  display: flex;
  width: 100%;
  height: 40%;
  .skleton {
    height: 100%;
  }
`;

export const Work = styled.div`
  flex: 1;
  border-radius: 8px;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: #f3f3f3;
`;

export const Wnbsp = styled.div`
  width: 5px;
  height: 100%;
`;

export const ApicWarpper = styled.div`
  width: 64px;
  height: 64px;
  position: relative;
  border: 2px solid #ffffff;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
`;
export const AuthorHeader = styled.div`
  z-index: 99;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const AuthorName = styled.div`
  font-size: 14px;
  color: #000000;
  line-height: 20px;
  margin-top: 4px;
  text-align: center;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: HarmonyOs-Bold;
`;
export const Records = styled.div`
  width: 100%;
  height: 40%;
  margin-top: 30%;
`;
export const Create = styled.span`
  display: inline-block;
  width: 50%;
  height: 100%;
`;
export const CreateTotal = styled.span`
  width: 100%;
  display: inline-block;
  font-size: 18px;
  font-family: HarmonyOs-Medium;
  color: #000000;
  line-height: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const TheDescribe = styled.span`
  display: inline-block;
  width: 50%;
  height: 100%;
  font-size: 14px;
  font-family: HarmonyOs-Medium;
  color: #989898;
  line-height: 20px;
`;
