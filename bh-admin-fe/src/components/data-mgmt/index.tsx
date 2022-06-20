import React from "react";
import { Building, Report, Sensor, Unit } from "src/store/information/types";
import CardGroup from "../common/Card/CardGroup";
import ReportTable from "./ReportTable";

type Props = {
  buildings?: Building[] | null;
  units?: Unit[] | null;
  sensors?: Sensor[] | null;
  reports?: Report[] | null;
  selectEvent: (target: "unit" | "sensor" | "report", id?: number) => void;
  addAction: (target: "building" | "unit" | "sensor") => void;
  updateAction: (
    target: "building" | "unit" | "sensor",
    id: number,
    contents: {
      name: string;
      image?: string;
    }
  ) => void;
};

function DataMgmtComponent({
  buildings,
  units,
  sensors,
  selectEvent,
  reports,
  addAction,
  updateAction,
}: Props) {
  return (
    <>
      {buildings && (
        <CardGroup
          title="건물"
          size="big"
          datas={buildings}
          selectEvent={selectEvent}
          eventTarget="unit"
          addAction={() => addAction("building")}
          updateAction={(
            id: number,
            contents: {
              name: string;
              image?: string;
            }
          ) => updateAction("building", id, contents)}
        />
      )}
      {units && (
        <CardGroup
          title="호"
          size="small"
          datas={units}
          selectEvent={selectEvent}
          eventTarget="sensor"
          addAction={() => addAction("unit")}
          updateAction={(
            id: number,
            contents: {
              name: string;
              image?: string;
            }
          ) => updateAction("unit", id, contents)}
        />
      )}
      {sensors && (
        <CardGroup
          title="센서"
          size="small"
          datas={sensors}
          selectEvent={selectEvent}
          eventTarget="report"
          addAction={() => addAction("sensor")}
          updateAction={(
            id: number,
            contents: {
              name: string;
              image?: string;
            }
          ) => updateAction("sensor", id, contents)}
        />
      )}
      {reports && <ReportTable report={reports} />}
    </>
  );
}

export default DataMgmtComponent;
