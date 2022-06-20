import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import Card from "../common/Card";
import CardGroup from "../common/CardGroup";
import TitleCode from "../common/TitleCode";
import qs from "qs";
import {
  ConsoleHeader,
  ConsolePath,
  ConsoleQuery,
} from "src/store/console/types";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import moment from "moment";

// type InputConfigProps = {
//   labelText: string;
// };

// interface InputProps
//   extends StyledComponentProps<"input", {}, any, any>,
//     InputConfigProps {}

// function ConsoleInput({ labelText, ...htmlProps }: InputProps) {
//   return (
//     <InputStyle.Wrap>
//       <InputStyle.Label htmlFor={htmlProps.id}>{labelText}</InputStyle.Label>
//       <InputStyle.Input type="text" {...htmlProps} />
//     </InputStyle.Wrap>
//   );
// }

// const InputStyle = {
//   Wrap: styled.div`
//     display: flex;
//     flex-direction: column;

//     width: 100%;
//     padding: 0 10px;

//     box-sizing: border-box;

//     &:focus-within {
//       & > label {
//         color: ${ACHROMATIC[3]};
//       }

//       & > input {
//         color: ${ACHROMATIC[3]};
//         border-color: ${ACHROMATIC[3]};
//       }
//     }
//   `,

//   Label: styled.label`
//     margin: 0 0 4px;

//     font-style: normal;
//     font-weight: normal;
//     font-size: 12px;
//     line-height: 14px;

//     color: ${ACHROMATIC[6]};
//   `,

//   Input: styled.input`
//     width: 100%;
//     height: 32px;

//     box-sizing: border-box;

//     margin: 0 0 14px;
//     border: 1px solid ${ACHROMATIC[6]};

//     font-style: normal;
//     font-weight: normal;
//     font-size: 14px;
//     line-height: 16px;

//     color: ${ACHROMATIC[3]};

//     padding: 0 8px;

//     outline: none;

//     &::placeholder {
//       font-style: normal;
//       font-weight: 300;
//       font-size: 14px;
//       line-height: 16px;

//       color: ${ACHROMATIC[9]};
//     }
//   `,
// };

type Props = {
  header?: ConsoleHeader;
  path?: ConsolePath;
  query?: ConsoleQuery;
  changePath: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRequestApi: () => void;
  result?: string | null;
  decryptResult?: string | null;
  onDecrypt: () => void;
  onExcel: () => void;
};

function ConsoleComponent({
  header,
  path,
  query,
  changePath,
  changeQuery,
  onRequestApi,
  result,
  decryptResult,
  onDecrypt,
  onExcel,
}: Props) {
  return (
    <Wrap>
      <h2 className="subtitle">Console</h2>
      <h4 className="subdescription">
        BEMS-HDMS Console Service의 간편한 인터페이스를 통해 데이터를 보다 더
        쉽게 공유받을 수 있습니다.
      </h4>
      <CardGroup>
        <Card isBorder>
          <Card title="CONFIG PATH PARAMETER" className="padding-card">
            <TextField
              label="buildingId"
              name="buildingId"
              placeholder="input buildingId"
              size="small"
              fullWidth
              autoFocus
              onChange={changePath}
            />
            <TextField
              label="unitId"
              name="unitId"
              placeholder="input unitId"
              size="small"
              onChange={changePath}
              fullWidth
              disabled={!path?.buildingId}
              helperText={!path?.buildingId && "건물 번호를 먼저 설정해주세요."}
            />
            <TextField
              label="sensorId"
              name="sensorId"
              placeholder="input sensorId"
              size="small"
              onChange={changePath}
              fullWidth
              disabled={!path?.buildingId || !path?.unitId}
              helperText={
                !path?.buildingId
                  ? "건물 번호를 먼저 설정해주세요."
                  : !path.unitId
                  ? "호 번호를 먼저 설정해주세요."
                  : ""
              }
            />
          </Card>
          <Card title="CONFIG QUERY PARAMETER" className="padding-card">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TextField
                label="include"
                name="include"
                placeholder="all"
                size="small"
                fullWidth
                onChange={changeQuery}
              />
              <TextField
                label="exclude"
                name="exclude"
                placeholder="null"
                size="small"
                fullWidth
                onChange={changeQuery}
              />
              <DateTimePicker
                label="startDate"
                value={
                  query?.startDate &&
                  moment(query.startDate).set({
                    s: 0,
                    ms: 0,
                  })
                }
                onChange={(newValue) => {
                  const e: any = {
                    target: {
                      name: "startDate",
                      value: moment(newValue)
                        .toISOString(true)
                        .split("+")[0]
                        .split(".")[0],
                    },
                  };
                  changeQuery(e);
                }}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    fullWidth
                    name="startDate"
                    size="small"
                  />
                )}
              />
              <DateTimePicker
                label="endDate"
                value={
                  query?.endDate &&
                  moment(query.endDate).set({
                    s: 0,
                    ms: 0,
                  })
                }
                onChange={(newValue) => {
                  const e: any = {
                    target: {
                      name: "endDate",
                      value: moment(newValue)
                        .toISOString(true)
                        .split("+")[0]
                        .split(".")[0],
                    },
                  };
                  changeQuery(e);
                }}
                renderInput={(props) => (
                  <TextField {...props} fullWidth name="endDate" size="small" />
                )}
              />
              <TextField
                label="interval"
                name="interval"
                placeholder="null"
                size="small"
                fullWidth
                onChange={changeQuery}
              />
              <TextField
                label="limit"
                name="limit"
                placeholder="null"
                size="small"
                fullWidth
                onChange={changeQuery}
              />
              <TextField
                label="offset"
                name="offset"
                placeholder="null"
                size="small"
                fullWidth
                onChange={changeQuery}
              />
            </LocalizationProvider>
          </Card>
        </Card>
        <Card>
          <Card title="REQUEST URI">
            <TitleCode
              contents={`curl -x “GET” http://${
                process.env.REACT_APP_API_SERVER
              }/api/bems-hdms${path?.buildingId ? "/" + path.buildingId : ""}${
                path?.buildingId && path?.unitId ? "/" + path.unitId : ""
              }${
                path?.buildingId && path?.unitId && path?.sensorId
                  ? "/" + path.sensorId
                  : ""
              }${
                qs.stringify(query, {
                  skipNulls: true,
                }) !== ""
                  ? `?${qs.stringify(query, {
                      skipNulls: true,
                      encode: false,
                    })}`
                  : ""
              } -H “Accept:${header && header.accept}” -H “Authorization:${
                header && header.authorization
              }”`}
            />
            <ButtonGroup>
              <Button
                type="button"
                color="primary"
                variant="contained"
                onClick={onRequestApi}
              >
                REQUEST
              </Button>
            </ButtonGroup>
          </Card>
          {result && (
            <Card title="RESPONSE">
              <TitleCode
                contents={
                  decryptResult
                    ? JSON.stringify(JSON.parse(decryptResult), null, "\t")
                    : result
                }
              />
              <ButtonGroup>
                <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  onClick={onDecrypt}
                >
                  DECRYPT
                </Button>
                <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  onClick={onExcel}
                >
                  EXPORT EXCEL
                </Button>
              </ButtonGroup>
            </Card>
          )}
        </Card>
      </CardGroup>
    </Wrap>
  );
}

const Wrap = styled.div`
  & .titlecode {
    width: calc(100% - 16px);
    margin: 0 8px;
  }

  & .card {
    width: 100%;
  }

  & .card.padding-card {
    margin: 0 0 88px;

    padding: 0 10px;

    & > .card-title {
      padding: 16px 2px;
    }

    & > .MuiFormControl-root {
    }

    & > .MuiFormControl-root:not(:last-child) {
      margin: 0 0 12px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  margin: 10px 0 0;
  padding: 0 8px;
  box-sizing: border-box;

  & > button:not(:last-child) {
    margin: 0 14px 0 0;
  }
`;
// const Button = styled.button`
//   border: none;
//   outline: none;

//   padding: 8px 16px;

//   background: ${BLUE[1]};

//   font-style: normal;
//   font-weight: bold;
//   font-size: 14px;
//   line-height: 16px;

//   color: ${ACHROMATIC[15]};

//   cursor: pointer;

//   &:focus,
//   &:hover {
//     background: rgba(38, 68, 109, 0.7);
//   }
// `;

export default ConsoleComponent;
