import React from "react";
import { ACHROMATIC } from "src/styles/Palette";
import styled, { StyledComponentProps } from "styled-components";

type ConfigProps = {
  title?: string;
  contents: string;
};

type StyleProps = {};

interface Props
  extends StyledComponentProps<"code", {}, any, any>,
    StyleProps,
    ConfigProps {}

function TitleCode({ title, contents, className, ...htmlProps }: Props) {
  return (
    <Code className={`titlecode ${className ? className : ""}`} {...htmlProps}>
      {title && <Title>{title}</Title>}
      <Contents>
        <pre>{contents}</pre>
      </Contents>
    </Code>
  );
}

const Code = styled.code`
  display: block;

  width: calc(100% - 20px);
  box-sizing: border-box;

  padding: 20px;
  background: #f7f6f3;
  margin: 0 0 0 10px;

  max-height: 800px;
  overflow-y: scroll;
`;
const Title = styled.h1`
  box-sizing: border-box;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  padding: 8px 0;

  color: ${ACHROMATIC[3]};
`;

const Contents = styled.p`
  & > pre {
    white-space: pre-wrap;
    word-break: break-all;

    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;

    color: ${ACHROMATIC[3]};
  }
`;

export default TitleCode;
