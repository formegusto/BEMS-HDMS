import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { ConnectedProps } from "react-redux";
import UpdateConnector from "src/store/update/connector";

interface Props extends ConnectedProps<typeof UpdateConnector> {}
function UpdateSnack({ updates }: Props) {
  const updateCount = React.useRef<number>(updates.length);
  const [newUpdate, setNewUpdate] = React.useState<boolean>(false);

  const handleNewUpdate = React.useCallback((state: boolean) => {
    setNewUpdate(state);
  }, []);

  React.useEffect(() => {
    if (updateCount.current < updates.length) setNewUpdate(true);

    updateCount.current = updates.length;
  }, [updates]);

  return (
    <Snackbar
      open={newUpdate}
      onClose={() => handleNewUpdate(false)}
      autoHideDuration={4000}
      message="Note archived"
      sx={{
        transform: "translateY(64px)",
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert severity="info" onClose={() => handleNewUpdate(false)}>
        새로운 업데이트 내용이 생겼어요.
        <br />
        확인 후 저장 버튼을 눌러주세요.
      </Alert>
    </Snackbar>
  );
}

export default UpdateConnector(UpdateSnack);
