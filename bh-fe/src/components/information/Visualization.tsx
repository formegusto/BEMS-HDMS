import React from "react";
import { ReportToKr, Sensor } from "src/store/information/types";
import { ACHROMATIC, GRAPHCOLORS } from "src/styles/Palette";
import styled from "styled-components";

function VisualItem({ name, timeReports }: Sensor) {
  const visualRef = React.useRef<HTMLCanvasElement>(null);
  const chartRef = React.useRef<any>(null);

  const labels = React.useRef<any>(
    timeReports.map((_) => _.createdAt.replace("T", " ").split(".")[0])
  );
  const infoKeys = React.useRef<any>(
    Object.keys(timeReports[0]).reduce<any>(
      (acc, cur) => (cur !== "createdAt" ? acc.concat(cur) : acc),
      []
    )
  );

  console.log(infoKeys);

  // 초기 랜덤값 10개치 생성
  React.useEffect(() => {
    if (visualRef) {
      const Chart = (window as any).Chart;
      const ctx = visualRef.current?.getContext("2d");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels.current,
          datasets: infoKeys.current.map((k: string) => {
            const randomColor =
              GRAPHCOLORS[Math.floor(Math.random() * GRAPHCOLORS.length)];
            return {
              label: ReportToKr[k],
              data: timeReports.reduce((acc, cur) => acc.concat(cur[k]), []),
              borderColor: randomColor,
              backgroundColor: randomColor,
            };
          }),
        },
        options: {
          animation: {
            duration: 500,
          },
        },
      });
      chartRef.current = chart;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  // interval 함수
  /*
  React.useEffect(
    () => {
      setInterval(() => {
        console.log(chartRef.current);
        const labels = chartRef.current.data.labels;
        const lastTime = labels[labels.length - 1].split(":")[2];
        const lastTimeNumber = parseInt(lastTime);
        let nextTime = lastTimeNumber + interval / 1000;

        let timeStr = `${labels[labels.length - 1].split(":")[0]}`;
        if (nextTime > 60) {
          const lastMinute = labels[labels.length - 1].split(":")[1];
          const nextMinute = parseInt(lastMinute + 1);

          nextTime -= 60;

          timeStr += `:${nextMinute}:${nextTime}`;
        } else {
          const lastMinute = labels[labels.length - 1].split(":")[1];
          timeStr += `:${lastMinute}:${nextTime}`;
        }

        chartRef.current.data.labels.shift();
        chartRef.current.data.labels.push(timeStr);
        chartRef.current.data.datasets[0].data.shift();

        chartRef.current.data.datasets[0].data.push(
          label === "ResidentCount"
            ? Math.floor(Math.random() * (range.max - range.min) + range.min)
            : Math.random() * (range.max - range.min) + range.min
        );

        chartRef.current.update();
      }, interval);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
*/
  return (
    <ItemStyle.Block>
      <ItemStyle.Title>{name}</ItemStyle.Title>
      <ItemStyle.VisualBlock>
        <ItemStyle.Visual ref={visualRef} />
      </ItemStyle.VisualBlock>
    </ItemStyle.Block>
  );
}

const ItemStyle = {
  Block: styled.div`
    border: 1px solid ${ACHROMATIC[14]};

    width: 610px;
    box-sizing: border-box;

    margin-bottom: 24px;
  `,
  Title: styled.h1`
    height: 55px;

    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;

    color: ${ACHROMATIC[3]};

    border-bottom: 2px solid ${ACHROMATIC[14]};
    box-sizing: border-box;

    display: flex;
    align-items: center;
    padding: 0 20px;
  `,
  VisualBlock: styled.article`
    padding: 8px 20px 32px 20px;
    box-sizing: border-box;
  `,
  Visual: styled.canvas`
    width: 580px;
    height: 400px;
  `,
};

type VisualProps = {
  sensors: Sensor[];
};

function Visualization({ sensors }: VisualProps) {
  const refWrap = React.useRef<HTMLDivElement>(null);

  return (
    <Wrap ref={refWrap} id="visuals-wrap">
      {sensors.map((s) => (
        <VisualItem {...s} />
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  margin: 24px 0 0;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & > div:not(:nth-child(2n + 0)) {
    margin-right: 20px;
  }
`;

export default Visualization;
