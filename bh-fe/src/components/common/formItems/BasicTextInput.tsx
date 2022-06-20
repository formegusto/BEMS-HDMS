import { ACHROMATIC, BLUE } from "src/styles/Palette";
import styled, { css, StyledComponentProps } from "styled-components";

type ConfigProps = {
  labelText?: string;
};

type StyleProps = {
  isBlock?: boolean;
};

interface Props
  extends ConfigProps,
    StyleProps,
    StyledComponentProps<"input", any, {}, any> {}

function BasicTextInput({ labelText, ...htmlProps }: Props) {
  return labelText ? (
    <Group>
      <Label htmlFor={htmlProps.id}>{labelText}</Label>
      <Input {...htmlProps} />
    </Group>
  ) : (
    <Input {...htmlProps} />
  );
}

const Group = styled.div`
  &:focus-within {
    & > label {
      color: ${BLUE[1]};
    }
  }
`;

const Input = styled.input<StyleProps>`
  ${(props) =>
    props.isBlock
      ? css`
          display: block;
          width: 100%;
        `
      : css`
          display: inline-block;
          width: 195px;
        `}

  height: 48px;
  box-sizing: border-box;
  padding: 0 16px;
  box-sizing: border-box;

  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: ${ACHROMATIC[3]};

  border: 2px solid;
  border-color: ${ACHROMATIC[9]};
  outline: none;

  &:focus {
    border-color: ${BLUE[1]};
  }

  &::placeholder {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;

    color: ${ACHROMATIC[9]};
  }
`;

const Label = styled.label`
  display: block;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;

  margin: 0 0 4px;

  color: ${ACHROMATIC[9]};
`;

export default BasicTextInput;
