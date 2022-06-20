import { styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import TableRow from "@mui/material/TableRow";

const BasicTableRow = styled(TableRow)(({ theme }) => ({
  "& .MuiTableCell-root:nth-of-type(1)": {
    boxSizing: "border-box",
    width: 64,
  },
  "& .role, .status": {
    boxSizing: "border-box",
    width: 190,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: grey[50],
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default BasicTableRow;
