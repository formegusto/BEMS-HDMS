import React from "react";
import { ConnectedProps } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConsoleComponent from "src/components/sharing/ConsoleComponent";
import { API_STATUS } from "src/store/apiApplication/types";
import ConsoleConnector from "src/store/console/connector";
import {
  ConsoleHeader,
  ConsolePath,
  ConsoleQuery,
} from "src/store/console/types";
import { dataToExcel, s2ab } from "src/utils/dataToExcel";

interface Props extends ConnectedProps<typeof ConsoleConnector> {}
function ConsoleContainer({
  user,
  showAlert,
  requestApi,
  result,
  decryptResult,
  initConsole,
  decryptResponse,
}: Props) {
  const navigate = useNavigate();
  const [header, setHeader] = React.useState<ConsoleHeader>();
  const [path, setPath] = React.useState<ConsolePath>();
  const [query, setQuery] = React.useState<ConsoleQuery>();

  React.useEffect(() => {
    initConsole();
    if (user) {
      if (
        user.apiApplication &&
        user.apiApplication.status !== API_STATUS.NONE
      ) {
        console.log("init start");

        setHeader({
          accept: "text/plain",
          authorization: user.apiApplication.apiKey!,
        });

        setPath({
          buildingId: null,
          unitId: null,
          sensorId: null,
        });

        setQuery({
          include: null,
          exclude: null,
          startDate: null,
          endDate: null,
          interval: null,
          limit: null,
          offset: null,
        });
      } else {
        showAlert({
          type: "error",
          message: "API 신청 후 이용해주세요.",
          action: "none",
          clickEvent: {
            failure: () => {
              navigate("/sharing");
            },
          },
        });
      }
    }
  }, [navigate, showAlert, user, initConsole]);

  const changePath = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPath((path) => ({
        ...path,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const changeQuery = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery((query) => ({
        ...query,
        [e.target.name]: e.target.value === "" ? null : e.target.value,
      }));
    },
    []
  );

  const onRequestApi = React.useCallback(() => {
    console.log(header);
    console.log(path);
    console.log(query);

    if (header && path && query)
      requestApi({
        header,
        path,
        query,
      });
  }, [header, path, query, requestApi]);

  const onDecrypt = React.useCallback(() => {
    if (user!.apiApplication) {
      decryptResponse(user!.apiApplication.symmetricKey!);
    }
  }, [decryptResponse, user]);

  const onExcel = React.useCallback(() => {
    if (decryptResult) {
      const data = JSON.parse(decryptResult).data;
      const excelBlob = dataToExcel(data);

      const url = window.URL.createObjectURL(new Blob([s2ab(excelBlob)]));
      const a = document.createElement("a");

      a.href = url;
      a.download = `HUMAN DATA ${Date.now()}.xlsx`;
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }
  }, [decryptResult]);

  return (
    <ConsoleComponent
      header={header}
      path={path}
      query={query}
      changePath={changePath}
      changeQuery={changeQuery}
      onRequestApi={onRequestApi}
      result={result}
      decryptResult={decryptResult}
      onDecrypt={onDecrypt}
      onExcel={onExcel}
    />
  );
}

export default ConsoleConnector(ConsoleContainer);
