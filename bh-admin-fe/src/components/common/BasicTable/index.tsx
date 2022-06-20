import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import BasicTableRow from "./BasicTableRow";
import BasicTableCell from "./BasicTableCell";
import { Box, Pagination } from "@mui/material";

function BasicTable() {
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
        <TableBody></TableBody>
      </Table>

      {/* https://mui.com/components/pagination/#controlled-pagination */}
      <Box sx={{ m: "16px 0 32px", display: "flex", justifyContent: "center" }}>
        <Pagination count={10} color="primary" page={2} />
      </Box>
    </TableContainer>
  );
}

export default BasicTable;
