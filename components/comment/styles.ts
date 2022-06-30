import styled from 'styled-components';

export const CommentWarpper = styled.div`
  animation: show 0.5s forwards;
  @keyframes show {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  .userPortrait {
    display: flex;
    min-width: 56px;
    min-height: 56px;
    border-radius: 50%;
    overflow: hidden;
  }
`;

export const CommentConent = styled.span`
  display: inline-block;
  margin-left: 16px;
`;

export const CommentWord = styled.span`
  display: block;
  line-height: 24px;
  font-size: 16px;
  color: #000000;
  word-break: break-word;
  max-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CommentUser = styled(CommentWord)`
  font-family: HarmonyOs-Bold;
  max-height: 96px;
`;
