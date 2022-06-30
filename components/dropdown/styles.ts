import styled, {css} from 'styled-components';

export interface DropDownProps {
  placement?: string;
}
const getPlacement = ({placement}: DropDownProps) => {
  if (placement === 'left') {
    return css`
      left: 0;
    `;
  }
  return css`
    right: 0;
  `;
};
export const DropDownContainer = styled.div<DropDownProps>`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  min-height: 70px;
  &:hover {
    .content-box {
      display: block;
    }
  }
  .content-box {
    position: absolute;
    top: 100%;
    right: 0px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 16px 1px rgba(159, 159, 159, 0.25);
    z-index: 9;
    display: none;
    transition: all 0.5s;
    ${getPlacement};
  }
`;
