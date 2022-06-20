import { Avatar, Box, styled } from "@mui/material";
import { BoxProps as MuiBoxProps } from "@mui/material/Box";

interface BoxProps extends MuiBoxProps {
  open: boolean;
}

export const ProfileImage = styled(Avatar, {
  shouldForwardProp: () => true,
})(({ theme }) => ({
  backgroundColor: "#FFF",
  width: "48px",
  height: "48px",
  color: "#333",
  fontSize: "24px",
}));

const Profile = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<BoxProps>(({ theme, open }) => ({
  overflow: "hidden",

  boxSizing: "border-box",
  padding: "30px 0",

  display: "flex",
  alignItems: "center",
  flexDirection: "column",

  color: "#FFF",

  "& .MuiTypography-subtitle1": {
    margin: "12px 0 0",
  },

  ...(open && {
    height: "auto",

    transition: theme.transitions.create(["height"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),

  ...(!open && {
    "& .MuiTypography-subtitle1": {
      display: "none",
    },

    transition: theme.transitions.create(["height"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default Profile;
