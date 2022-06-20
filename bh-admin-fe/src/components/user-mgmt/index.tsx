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
import { GetUsersResponse } from "src/store/user/types";
import { UserRole } from "src/store/user/types";
import { UpdateRoleParams } from "src/containers/user-mgmt";

type Props = {
  resUsers?: GetUsersResponse | null;
  updateRole: (
    e: SelectChangeEvent<UserRole>,
    updateInfo: UpdateRoleParams
  ) => void;
};

function UserMgmtComponent({ resUsers, updateRole }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <BasicTableRow>
            <BasicTableCell>번호</BasicTableCell>
            <BasicTableCell align="right">아이디</BasicTableCell>
            <BasicTableCell align="right">성함</BasicTableCell>
            <BasicTableCell align="right">소속기관</BasicTableCell>
            <BasicTableCell align="right">이메일</BasicTableCell>
            <BasicTableCell align="right">핸드폰번호</BasicTableCell>
            <BasicTableCell align="right">역할</BasicTableCell>
          </BasicTableRow>
        </TableHead>
        <TableBody>
          {resUsers &&
            resUsers.users.map((user) => (
              <BasicTableRow key={user.id}>
                <BasicTableCell>{user.id}</BasicTableCell>
                <BasicTableCell align="right">{user.username}</BasicTableCell>
                <BasicTableCell align="right">{user.name}</BasicTableCell>
                <BasicTableCell align="right">
                  {user.organization}
                </BasicTableCell>
                <BasicTableCell align="right">{user.email}</BasicTableCell>
                <BasicTableCell align="right">{user.phone}</BasicTableCell>
                <BasicTableCell align="right" className="role">
                  <Select
                    value={user.role}
                    size="small"
                    onChange={(e) =>
                      updateRole(e, {
                        username: user.username,
                        id: user.id,
                        originalValue: user.role,
                      })
                    }
                  >
                    <MenuItem value={UserRole.user}>사용자</MenuItem>
                    <MenuItem value={UserRole.admin}>관리자</MenuItem>
                  </Select>
                </BasicTableCell>
              </BasicTableRow>
            ))}
        </TableBody>
      </Table>
      {resUsers && (
        <Box
          sx={{ m: "16px 0 32px", display: "flex", justifyContent: "center" }}
        >
          <Pagination
            count={resUsers.lastPage}
            color="primary"
            page={resUsers.currentPage}
          />
        </Box>
      )}
    </TableContainer>
  );
}

export default UserMgmtComponent;
