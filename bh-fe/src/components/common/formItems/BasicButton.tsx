import { ACHROMATIC, BLUE } from "src/styles/Palette";
import styled, { css, StyledComponentProps } from "styled-components";

type StyleProps = {
  isBlock?: boolean;
};

interface Props extends StyledComponentProps<"button", {}, any, any> {}

function BasicButton({
  children,
  ...htmlProps
}: React.PropsWithChildren<Props>) {
  return <Button {...htmlProps}>{children}</Button>;
}

const Button = styled.button<StyleProps>`
  ${(props) =>
    props.isBlock &&
    css`
      display: block;
      width: 100%;
    `}

  height: 48px;
  border: none;

  cursor: pointer;
  background: ${BLUE[1]};

  font-style: normal;
  font-weight: normal;
  font-size: 14px;

  color: ${ACHROMATIC[15]};
`;

export default BasicButton;
