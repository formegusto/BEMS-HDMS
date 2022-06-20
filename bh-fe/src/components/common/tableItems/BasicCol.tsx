import React from "react";
import styled, { css } from "styled-components";

type StyleProps = {
  isStrech?: boolean;
  size?: number;
  colspan?: number;
};

function BasicCol({
  children,
  ...styleProps
}: React.PropsWithChildren<StyleProps>) {
  return (
    <Wrap className="basictable col" {...styleProps}>
      <pre>{children}</pre>
    </Wrap>
  );
}

const Wrap = styled.div<StyleProps>`
  box-sizing: border-box;
  padding-right: 16px;

  ${(props) =>
    props.size &&
    css`
      width: ${props.size * (props.colspan ? props.colspan : 1)}px;
      padding-left: ${props.colspan ? (props.colspan - 1) * props.size : 0}px;
    `}

  ${(props) =>
    props.isStrech &&
    css`
      flex: 1;
    `}

    
  & > pre {
    white-space: pre-wrap;
  }
`;

export default BasicCol;
