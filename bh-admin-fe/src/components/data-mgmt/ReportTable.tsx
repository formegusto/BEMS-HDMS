import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import BasicTableRow from "../common/BasicTable/BasicTableRow";
import BasicTableCell from "../common/BasicTable/BasicTableCell";
import { Report } from "src/store/information/types";

const InformationKor: { [key: string]: any } = {
  id: "번호",
  createdAt: "수집시간",

  isStay: "재실유무",
  residentCount: "거주자 수",
  temperature: "온도",
  humidity: "습도",
  lux: "조도",
  skinTemperature: "피부온도",
  residentDistribution: "거주자 분포",
  satisfaction: "만족도",
};

type Props = {
  report: Report[];
};

function ReportTable({ report }: Props) {
  const labels = Object.keys(report[0]);
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
      }}
    >
      <Table
        sx={{
          "& .createdAt": {
            width: "300px !important",
          },
        }}
      >
        <TableHead>
          <BasicTableRow>
            {labels.map((k) => (
              <BasicTableCell className={k}>{InformationKor[k]}</BasicTableCell>
            ))}
          </BasicTableRow>
        </TableHead>
        <TableBody>
          {report.map((r) => (
            <BasicTableRow>
              {labels.map((l) => (
                <BasicTableCell>{r[l]}</BasicTableCell>
              ))}
            </BasicTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ReportTable;
