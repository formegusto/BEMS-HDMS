import { Divider, Fab, IconButton, styled, Typography } from "@mui/material";
import MuiDrawer, { DrawerProps } from "@mui/material/Drawer";
import { UPDATE_DRAWER_WIDTH } from "../../styles/StyleDatas";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import BasicTableCell from "./BasicTable/BasicTableCell";
import BasicTableRow from "./BasicTable/BasicTableRow";
import ClearIcon from "@mui/icons-material/Clear";
import { ConnectedProps } from "react-redux";
import UpdateConnector from "src/store/update/connector";

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: () => true,
})(({ theme }) => ({
  width: UPDATE_DRAWER_WIDTH,

  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  zIndex: theme.zIndex.appBar + 400,

  "& .MuiPaper-root": {
    borderTopLeftRadius: "16px",
    borderBottomLeftRadius: "16px",
    width: UPDATE_DRAWER_WIDTH,
    backgroundColor: "#FFF",
    padding: "0 0 96px",
    boxShadow: "none",
  },

  "& .save-button": {
    position: "fixed",
    right: 32,
    bottom: 32,

    color: "#FFF",
  },
}));

interface Props extends ConnectedProps<typeof UpdateConnector>, DrawerProps {}

function UpdateDrawer({ updates, saveUpdate, ...drawerProps }: Props) {
  return (
    <CustomDrawer {...drawerProps}>
      <Typography variant="h6" sx={{ p: "16px" }}>
        변경 내역
      </Typography>
      <Divider />
      <TableContainer
        component={Paper}
        sx={{
          width: `calc(100% - 32px) !important`,
          margin: "16px",
          borderRadius: "4px !important",
        }}
      >
        <Table>
          <TableHead>
            <BasicTableRow>
              <BasicTableCell>분류</BasicTableCell>
              <BasicTableCell>대상</BasicTableCell>
              <BasicTableCell>내용</BasicTableCell>
              <BasicTableCell></BasicTableCell>
            </BasicTableRow>
          </TableHead>
          <TableBody>
            {updates.map((update, idx) => (
              <BasicTableRow key={idx}>
                <BasicTableCell>{update.type}</BasicTableCell>
                <BasicTableCell>{update.target}</BasicTableCell>
                <BasicTableCell>{update.description}</BasicTableCell>
                <BasicTableCell
                  align="right"
                  sx={{
                    width: "64px !important",
                    height: "64px !important",
                  }}
                >
                  <IconButton
                    sx={{
                      padding: "0",
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </BasicTableCell>
              </BasicTableRow>
            ))}
          </TableBody>
        </Table>
        <Fab
          className="save-button"
          variant="extended"
          autoFocus
          color="primary"
          onClick={saveUpdate}
        >
          저장하기
        </Fab>
      </TableContainer>
    </CustomDrawer>
  );
}

export default UpdateConnector(UpdateDrawer);
