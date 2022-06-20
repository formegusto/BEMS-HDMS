import { styled } from "@mui/material";
import { blue } from "@mui/material/colors";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const BasicTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: blue[100],
    color: "#555",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#333",
  },
}));

export default BasicTableCell;
