import React from "react";
import { ACHROMATIC } from "src/styles/Palette";
import styled, { css } from "styled-components";

type StyleProps = {
  isHead?: boolean;
};

function BasicRow({
  children,
  ...styleProps
}: React.PropsWithChildren<StyleProps>) {
  return (
    <Wrap className="basictable row" {...styleProps}>
      {children}
    </Wrap>
  );
}

const Wrap = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  font-style: normal;

  color: ${ACHROMATIC[6]};

  box-sizing: border-box;

  ${(props) =>
    props.isHead
      ? css`
          font-weight: bold;
          font-size: 12px;
          line-height: 14px;
          padding: 16px 0;
          border-bottom: 1px solid ${ACHROMATIC[9]};
        `
      : css`
          font-weight: normal;
          font-size: 10px;
          line-height: 14px;
          padding: 16px 0;
        `}
`;

export default BasicRow;
