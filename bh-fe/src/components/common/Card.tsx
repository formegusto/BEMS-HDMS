import { ACHROMATIC } from "src/styles/Palette";
import styled, { css, StyledComponentProps } from "styled-components";

type ConfigProps = {
  title?: string;
  description?: string;
  code?: string;
};

type StyleProps = {
  isBorder?: boolean;
};

interface Props
  extends StyledComponentProps<"div", {}, any, any>,
    ConfigProps,
    StyleProps {}

function Card({
  children,
  title,
  description,
  code,
  className,
  ...htmlProps
}: React.PropsWithChildren<Props>) {
  return (
    <Wrap className={`card ${className ? className : ""}`} {...htmlProps}>
      {title && <Title className="card-title">{title}</Title>}
      {description && (
        <Desc>
          <pre>{description}</pre>
        </Desc>
      )}
      {children}
    </Wrap>
  );
}

const Wrap = styled.div<StyleProps>`
  box-sizing: border-box;
  padding-bottom: 40px;
  overflow: hidden;
  color: ${ACHROMATIC[3]};

  ${(props) =>
    props.isBorder &&
    css`
      border: 2px solid ${ACHROMATIC[14]};
    `}

  & .MuiFormHelperText-root {
    margin: 4px 2px 0;
  }
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;

  padding: 16px 10px;
  box-sizing: border-box;
`;

const Desc = styled.p`
  width: 100%;
  padding: 0 8px;
  box-sizing: border-box;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  & > pre {
    overflow: hidden;
    white-space: pre-wrap;
  }
`;

export default Card;
