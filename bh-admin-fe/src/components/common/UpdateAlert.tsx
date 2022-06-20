import { Badge, IconButton } from "@mui/material";
import { ConnectedProps } from "react-redux";
import UpdateConnector from "src/store/update/connector";
import EditNotificationsIcon from "@mui/icons-material/EditNotifications";

interface Props extends ConnectedProps<typeof UpdateConnector> {
  handleUpdateOpen: (status: boolean) => void;
}
function UpdateAlert({ handleUpdateOpen, updates }: Props) {
  return (
    <IconButton
      onClick={() => handleUpdateOpen(true)}
      sx={{
        position: "absolute",
        right: "24px",
        "& .MuiBadge-badge": {
          width: "14px",
          height: "20px",
          background: "#ff4d4f",
          borderRadius: "100%",
          color: "#fff",
          fontSize: "8px",
        },
      }}
    >
      <Badge badgeContent={updates.length}>
        <EditNotificationsIcon
          fontSize="medium"
          sx={{
            color: "#FFF",
          }}
        />
      </Badge>
    </IconButton>
  );
}

export default UpdateConnector(UpdateAlert);
