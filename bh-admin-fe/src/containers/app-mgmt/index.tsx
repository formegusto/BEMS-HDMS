import { SelectChangeEvent } from "@mui/material";
import React from "react";
import { ConnectedProps } from "react-redux";
import Api from "src/api";
import AppMgmtComponent from "src/components/app-mgmt";
import ApiApplicationConnector from "src/store/apiApplication/connector";
import {
  ApiApplicationStatus,
  GetApplicationsResponse,
} from "src/store/apiApplication/types";

interface Props extends ConnectedProps<typeof ApiApplicationConnector> {}

export type UpdateStatusParams = {
  id: number;
  username: string;
  originalValue: string;
};

function AppMgmtContainer({ getApplications, applications, addUpdate }: Props) {
  const [resApplications, setResApplications] =
    React.useState<GetApplicationsResponse | null>();

  React.useEffect(() => {
    setResApplications(applications);
  }, [applications]);

  React.useEffect(() => {
    getApplications(null);
  }, [getApplications]);

  const updateStatus = React.useCallback(
    (
      e: SelectChangeEvent<ApiApplicationStatus>,
      updateInfo: UpdateStatusParams
    ) => {
      const newApplications = resApplications!.applications.map((app) =>
        app.id === updateInfo.id
          ? {
              ...app,
              status: e.target.value as ApiApplicationStatus,
            }
          : app
      );

      setResApplications(
        resApplications && {
          ...resApplications,
          applications: newApplications,
        }
      );

      addUpdate({
        type: "PATCH",
        target: "API 상태",
        description: `${updateInfo.username}님의 API상태를 ${updateInfo.originalValue} 에서 ${e.target.value}(으)로 수정합니다.`,
        action: {
          requestInfo: {
            id: updateInfo.id,
            body: {
              status: e.target.value,
            },
          },
          api: Api["ApiApplicationAPI"].patchApplication,
        },
      });
    },
    [resApplications, addUpdate]
  );

  return (
    <AppMgmtComponent
      resApplications={resApplications}
      updateStatus={updateStatus}
    />
  );
}

export default ApiApplicationConnector(AppMgmtContainer);
