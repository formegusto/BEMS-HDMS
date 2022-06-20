import React from "react";
import { Building, Sensor, Unit } from "src/store/information/types";
import { ContainerWidth1240 } from "src/styles/Container";
import styled from "styled-components";
import Buildings from "./Buildings";
import Units from "./Units";
import Visualization from "./Visualization";

type Props = {
  viewUnits: boolean;
  viewVisual: boolean;
  buildings?: Building[] | null;
  units?: Unit[] | null;
  sensors?: Sensor[] | null;
  selBuilding: (id: number) => void;
  selUnit: (id: number) => void;
};

function InformationComponent({
  viewUnits,
  viewVisual,
  buildings,
  units,
  sensors,
  selBuilding: changeBuilding,
  selUnit: changeUnit,
}: Props) {
  const [selBuilding, setSelBuilding] = React.useState<number | null>(null);
  const [selUnit, setSelUnit] = React.useState<number | null>(null);

  const changeSelBuilding = React.useCallback(
    (id: number) => {
      changeBuilding(id);
      setSelBuilding(id);
    },
    [changeBuilding]
  );

  const changeSelUnit = React.useCallback(
    (id: number) => {
      changeUnit(id);
      setSelUnit(id);
    },
    [changeUnit]
  );

  React.useEffect(() => {
    if (viewUnits) {
      const elUitsWrap = document.getElementById("units-wrap");

      if (elUitsWrap) {
        const { top } = elUitsWrap.getBoundingClientRect();
        const scrolledTopLength = window.pageYOffset;
        const to = scrolledTopLength + top;

        window.scrollTo({
          top: to - 100,
          behavior: "smooth",
        });
      }
    }
  }, [viewUnits]);

  React.useEffect(() => {
    if (viewVisual) {
      const elVisualWrap = document.getElementById("visuals-wrap");

      if (elVisualWrap) {
        const { top } = elVisualWrap.getBoundingClientRect();
        const scrolledTopLength = window.pageYOffset;
        const to = scrolledTopLength + top;

        window.scrollTo({
          top: to - 120,
          behavior: "smooth",
        });
      }
    }
  }, [viewVisual]);

  return (
    <Wrap>
      <ContainerWidth1240>
        {buildings && (
          <Buildings
            buildings={buildings}
            selBuilding={selBuilding}
            changeSelBuilding={changeSelBuilding}
          />
        )}

        {units && units.length > 0 && (
          <Units
            units={units}
            selUnit={selUnit}
            changeSelUnit={changeSelUnit}
          />
        )}
        {sensors && sensors.length > 0 && <Visualization sensors={sensors} />}
      </ContainerWidth1240>
    </Wrap>
  );
}

const Wrap = styled.div``;

export default InformationComponent;
