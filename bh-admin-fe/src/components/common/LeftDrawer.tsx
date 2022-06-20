import { styled } from "@mui/material";
import { Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { blue } from "@mui/material/colors";
import { LEFT_DRAWER_WIDTH } from "../../styles/StyleDatas";

const openedMixin = (theme: Theme): CSSObject => ({
  width: LEFT_DRAWER_WIDTH,
  backgroundColor: blue[500],
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: blue[500],
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `64px`,
  [theme.breakpoints.up("sm")]: {
    width: `64px`,
  },
});

const LeftDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: LEFT_DRAWER_WIDTH,
  background: blue[500],
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  "& .MuiDivider-root": {
    borderColor: blue[50],
  },

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default LeftDrawer;
