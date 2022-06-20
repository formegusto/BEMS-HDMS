import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import BasicTableRow from "../common/BasicTable/BasicTableRow";
import BasicTableCell from "../common/BasicTable/BasicTableCell";
import {
  Box,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  ApiApplicationStatus,
  GetApplicationsResponse,
} from "src/store/apiApplication/types";
import { UpdateStatusParams } from "src/containers/app-mgmt";

type Props = {
  resApplications?: GetApplicationsResponse | null;
  updateStatus: (
    e: SelectChangeEvent<ApiApplicationStatus>,
    updateInfo: UpdateStatusParams
  ) => void;
};

function AppMgmtComponent({ resApplications, updateStatus }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <BasicTableRow>
            <BasicTableCell>번호</BasicTableCell>
            <BasicTableCell>아이디</BasicTableCell>
            <BasicTableCell>이용목적</BasicTableCell>
            <BasicTableCell align="right">API 상태</BasicTableCell>
          </BasicTableRow>
        </TableHead>
        <TableBody>
          {resApplications &&
            resApplications.applications.map((app) => (
              <BasicTableRow>
                <BasicTableCell>{app.id}</BasicTableCell>
                <BasicTableCell>{app.user.username}</BasicTableCell>
                <BasicTableCell>{app.purpose}</BasicTableCell>
                <BasicTableCell align="right" className="status">
                  <Select
                    value={app.status}
                    size="small"
                    onChange={(e) =>
                      updateStatus(e, {
                        id: app.id,
                        username: app.user.username,
                        originalValue: app.status,
                      })
                    }
                  >
                    <MenuItem value={ApiApplicationStatus.WAITING}>
                      대기중
                    </MenuItem>
                    <MenuItem value={ApiApplicationStatus.INACTIVE}>
                      비활성
                    </MenuItem>
                    <MenuItem value={ApiApplicationStatus.ACTIVE}>
                      활성
                    </MenuItem>
                  </Select>
                </BasicTableCell>
              </BasicTableRow>
            ))}
        </TableBody>
      </Table>
      {resApplications && (
        <Box
          sx={{ m: "16px 0 32px", display: "flex", justifyContent: "center" }}
        >
          <Pagination
            count={resApplications.lastPage}
            color="primary"
            page={resApplications.currentPage}
          />
        </Box>
      )}
    </TableContainer>
  );
}

export default AppMgmtComponent;
