import React from "react";
import { ConnectedProps } from "react-redux";
import DataMgmtComponent from "src/components/data-mgmt";
import InformationConnector from "src/store/information/connector";
import PatchFormDialog from "./PatchFormDialog";
import PostFormDialog from "./PostFormDialog";

interface Props extends ConnectedProps<typeof InformationConnector> {}

function DataMgmtContainer({
  sessionCert,
  getInfos,
  buildings,
  units,
  sensors,
  reports,
  createMode,
  updateMode,
  updateData,
  viewMode,
  closeCreateMode,
  initInfos,
}: Props) {
  const [selectBuildingId, setSelectBuildingId] = React.useState<number | null>(
    null
  );
  const [selectUnitId, setSelectUnitId] = React.useState<number | null>(null);

  React.useEffect(() => {
    return () => {
      initInfos();
    };
  }, [initInfos]);

  React.useEffect(() => {
    if (sessionCert && !buildings) {
      getInfos({
        target: "building",
      });
    }
  }, [sessionCert, buildings, getInfos]);

  const selectEvent = React.useCallback(
    (target: "unit" | "sensor" | "report", id?: number) => {
      getInfos({
        target: target,
        rootId: id,
      });

      switch (target) {
        case "unit":
          setSelectBuildingId(id!);
          break;
        case "sensor":
          setSelectUnitId(id!);
          break;
      }
    },
    [getInfos]
  );

  const addAction = React.useCallback(
    (target: "building" | "unit" | "sensor") => {
      const rootInfo =
        target === "building"
          ? {}
          : target === "unit"
          ? { rootId: selectBuildingId + "" }
          : {
              rootId: selectUnitId + "",
            };
      createMode({
        type: "create",
        target: target,
        ...rootInfo,
      });
    },
    [createMode, selectBuildingId, selectUnitId]
  );

  const updateAction = React.useCallback(
    (
      target: "building" | "unit" | "sensor",
      id: number,
      contents: {
        name: string;
        image?: string;
      }
    ) => {
      updateMode({
        viewMode: {
          type: "update",
          target: target,
          rootId: id + "",
        },
        updateData: contents,
      });
    },
    [updateMode]
  );

  const closeCreate = React.useCallback(
    (update?: boolean) => {
      closeCreateMode();

      if (update) initInfos();
    },
    [closeCreateMode, initInfos]
  );

  return (
    <>
      {/* <FormDialog /> */}
      <PatchFormDialog
        open={viewMode?.type === "update"}
        viewMode={viewMode}
        closeAction={closeCreate}
        originalData={updateData}
      />
      <PostFormDialog
        open={viewMode?.type === "create"}
        viewMode={viewMode}
        closeAction={closeCreate}
      />
      <DataMgmtComponent
        buildings={buildings}
        units={units}
        sensors={sensors}
        reports={reports}
        selectEvent={selectEvent}
        addAction={addAction}
        updateAction={updateAction}
      />
    </>
  );
}

export default InformationConnector(DataMgmtContainer);
