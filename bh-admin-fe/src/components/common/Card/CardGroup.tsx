import { Box, Typography } from "@mui/material";
import React from "react";
import Card from "./Card";
import CardAdd from "./CardAdd";

type Props = {
  title: string;
  size: "big" | "small";
  datas: {
    id?: number;
    name?: string;
    image?: string;
  }[];
  selectEvent: (target: "unit" | "sensor" | "report", id?: number) => void;
  addAction: () => void;
  updateAction: (
    id: number,
    contents: {
      name: string;
      image?: string;
    }
  ) => void;
  eventTarget: "unit" | "sensor" | "report";
};

function CardGroup({
  title,
  size,
  datas,
  selectEvent,
  eventTarget,
  addAction,
  updateAction,
}: Props) {
  const [selectId, setSelectId] = React.useState<number | null>(null);

  const selectItem = React.useCallback(
    (id?: number) => {
      if (id) {
        setSelectId(id);
        selectEvent(eventTarget, id);
      }
    },
    [selectEvent, eventTarget]
  );

  return (
    <>
      <Typography
        variant="subtitle1"
        sx={{
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: 18,
          lineHeight: "21px",
          padding: "16px 0px",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          minWidth: "1000px",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {datas.map((d) => (
          <Card
            size={size}
            contents={d}
            selectId={selectId}
            selectEvent={selectItem}
            updateAction={() =>
              updateAction(d.id!, { name: d.name!, image: d.image })
            }
          />
        ))}
        <CardAdd cardSize={size} onClick={addAction} />
      </Box>
    </>
  );
}

export default CardGroup;
