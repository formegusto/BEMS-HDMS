import { ACHROMATIC, BLUE } from "src/styles/Palette";
import styled, { StyledComponentProps } from "styled-components";

interface Props extends StyledComponentProps<"input", any, {}, any> {}
function BasicCheckBox({
  children,
  ...htmlProps
}: React.PropsWithChildren<Props>) {
  return (
    <Wrap className="checkbox-wrap">
      <CheckBox type="checkbox" {...htmlProps} />
      <Label htmlFor={htmlProps.id}>{children}</Label>
    </Wrap>
  );
}

const Wrap = styled.div``;

const Label = styled.label`
  display: inline-block;
  position: relative;

  padding: 0 0 0 28px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  color: ${ACHROMATIC[3]};

  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;

    border: 2px solid ${ACHROMATIC[15]};
    box-sizing: border-box;
  }

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;

    width: 16px;
    height: 16px;

    background: ${BLUE[0]};

    display: none;
  }
`;

const CheckBox = styled.input`
  display: none;

  &:checked + label {
    &::before {
      display: inline-block;
    }
  }
`;

export default BasicCheckBox;
