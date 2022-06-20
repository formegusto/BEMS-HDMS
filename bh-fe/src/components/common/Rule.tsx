import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import { ControllerRenderProps } from "react-hook-form";
import { ACHROMATIC } from "src/styles/Palette";
import styled from "styled-components";

type ConfigProps = {
  title: string;
};

interface Props extends ControllerRenderProps, ConfigProps {}

function Rule({ title, children, ...field }: React.PropsWithChildren<Props>) {
  return (
    <Wrap className="rule">
      <Title>{title}</Title>
      <Paper variant="outlined" square>
        <pre>{children}</pre>
      </Paper>
      <FormControlLabel
        control={<Checkbox color="primary" required {...field} />}
        label="동의"
      />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;

  width: 100%;
  flex-direction: column;

  & > .MuiFormControlLabel-root {
    display: flex;
    justify-content: flex-end;
  }

  & > .MuiPaper-root,
  .MuiPaper-outlined {
    width: 100%;
    height: 400px;

    border: 1px solid ${ACHROMATIC[10]};
    background: ${ACHROMATIC[15]};
    color: ${ACHROMATIC[3]};
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;

    overflow-y: scroll;

    & > pre {
      width: 100%;
      white-space: pre-wrap;
      word-break: break-all;
    }

    padding: 20px;
    box-sizing: border-box;
  }
`;

const Title = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;

  color: ${ACHROMATIC[3]};

  padding: 8px;
`;

export default Rule;
