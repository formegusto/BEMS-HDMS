import React from "react";
import { ConnectedProps } from "react-redux";
import { useNavigate } from "react-router-dom";
import DocumentComponent from "src/components/sharing/DocumentComponent";
import ApiApplicationConnector from "src/store/apiApplication/connector";

interface Props extends ConnectedProps<typeof ApiApplicationConnector> {}

function DocumentContainer({
  apiApplication,
  setNewApplication,
  application,
}: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const show = React.useCallback(() => {
    setOpen(true);
  }, []);

  const hide = React.useCallback(() => {
    setOpen(false);
  }, []);

  const moveConsole = React.useCallback(() => {
    navigate("/sharing/console");
  }, [navigate]);

  React.useEffect(() => {
    if (apiApplication) {
      setNewApplication(apiApplication);
    }
  }, [apiApplication, setNewApplication]);

  return (
    <DocumentComponent
      show={show}
      hide={hide}
      open={open}
      application={application}
      moveConsole={moveConsole}
    />
  );
}

export default ApiApplicationConnector(DocumentContainer);
