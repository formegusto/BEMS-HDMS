import XLSX from "xlsx";
import XLSXSTYLE from "xlsx-style/xlsx";

export function s2ab(s: string) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

export interface Data {
  buildings?: Building[];
  building?: Building;
  unit?: Unit;
  sensor?: Sensor;
}

interface SheetInfo {
  infoNames: string[];
  rowSize: number;
  depthRowSize: { [key: string]: number[] };
}

interface Building {
  name: string;
  id: number;
  units: Unit[];
}

interface Unit {
  name: string;
  id: number;
  sensors: Sensor[];
}

interface Sensor {
  name: string;
  id: number;
  timeReports: TimeReport[];
}

interface TimeReport {
  createdAt: string;

  isStay?: string;
  residentCount?: string;
  residentDistribution?: string;
  temperature?: string;
  humidity?: string;
  lux?: string;
  skinTemperature?: string;
  satisfaction?: string;
}

const REQUIRED_HEADER = [
  "건물 ID",
  "건물 명",
  "호 ID",
  "호 명",
  "센서 ID",
  "센서 명",
  "기록시간",
];

const informationMap: { [key: string]: string } = {
  createdAt: "기록시간",

  isStay: "재실유무",
  residentCount: "거주자 수",
  residentDistribution: "거주자 분포",
  temperature: "온도",
  humidity: "습도",
  lux: "조도",
  skinTemperature: "피부 온도",
  satisfaction: "만족도",
};

const CELL_SORT = ["buildings", "units", "sensors"];

function getInfoNames(object: any, _: SheetInfo, fieldName: string) {
  if (Array.isArray(object)) {
    if (object.length !== 0) {
      object.forEach((o) => {
        getInfoNames(o, _, fieldName);
      });
    }
  } else {
    // 센서자체가 걸린경우 (sensors 까지는 forEach를 돌도록 해야함)
    Object.keys(object).forEach((k) => {
      if (Array.isArray(object[k])) {
        if (k === "timeReports") {
          const timeReport = object[k][0];

          Object.keys(timeReport).forEach((tk) => {
            if (tk !== "createdAt") {
              const infoName = informationMap[tk];
              if (!_.infoNames.includes(infoName)) _.infoNames.push(infoName);
            }
          });
        } else {
          getInfoNames(object[k], _, k);
        }
      }
    });
  }
}

function getRowSize(object: any, _: SheetInfo, fieldName: string) {
  if (Array.isArray(object)) {
    if (object.length !== 0) {
      object.forEach((o) => {
        getRowSize(o, _, fieldName);
      });
    }
  } else {
    // 센서자체가 걸린경우 (sensors 까지는 forEach를 돌도록 해야함)
    Object.keys(object).forEach((k) => {
      if (Array.isArray(object[k])) {
        if (k === "timeReports") {
          _.rowSize += object[k].length;
        } else {
          getRowSize(object[k], _, k);
        }
      }
    });
  }
}

function setDepthRowSize(object: any, _: SheetInfo, fieldName: string) {
  if (Array.isArray(object)) {
    const myLength: number[] = [];
    if (object.length !== 0) {
      object.forEach((o) => {
        const length = setDepthRowSize(o, _, fieldName);
        if (length) {
          myLength.push(length);
        }
      });
    }

    if (!_.depthRowSize[fieldName]) {
      _.depthRowSize[fieldName] = myLength;
    } else {
      _.depthRowSize[fieldName] = _.depthRowSize[fieldName].concat(myLength);
    }

    return myLength.reduce((acc, cur) => acc + cur, 0);
  } else {
    // 센서자체가 걸린경우 (sensors 까지는 forEach를 돌도록 해야함)
    let myLength = 0;
    Object.keys(object).forEach((k) => {
      if (Array.isArray(object[k])) {
        if (k === "timeReports") {
          myLength = object[k].length;

          console.log("timeReports", myLength);
        } else {
          // 센서가 아닌데, 여기왔으면, 이 녀석이 최종적으로 위로 던져줘야 한다는 거임.
          myLength = setDepthRowSize(object[k], _, k);
        }
      }
    });
    return myLength;
  }
}

function setMerges(merges: XLSX.Range[], modelHeaders: string[], _: SheetInfo) {
  let startField = 0;

  modelHeaders.forEach((mh, col) => {
    let prevRow = 1;
    const rowSize = _.depthRowSize[CELL_SORT[startField]];
    if (rowSize) {
      rowSize.forEach((rs) => {
        const nextRow = prevRow + rs - 1;
        merges.push({
          s: {
            r: prevRow,
            c: col,
          },
          e: {
            r: nextRow,
            c: col,
          },
        });
        prevRow = nextRow + 1;
      });
    }
    if (col % 2 === 1) startField++;
  });
}

const propertyName: { [key: string]: any } = {
  building: "건물",
  unit: "호",
  sensor: "센서",
  id: "ID",
  name: "명",
};

function setCellJson(data: any, rootName: string, fieldName: string) {
  let rtnDatas: any;
  Object.keys(data).forEach((k) => {
    if (Array.isArray(data[k])) {
      if (k === "timeReports") {
        // 이제 반환하면서 올라가면 됨.
        const timeReports = data[k].map((tr: TimeReport) =>
          Object.entries(tr).reduce(
            (acc, [k, v]) => ({
              ...acc,
              "센서 ID": data.id,

              "센서 명": data.name,
              [informationMap[k]]: v,
            }),
            {}
          )
        );
        rtnDatas = timeReports;
      } else {
        let arr: any = [];
        data[k].forEach((d: any) => {
          arr = arr.concat(setCellJson(d, rootName, k.slice(0, k.length - 1)));
        });

        arr = arr.map((ar: any) => ({
          ...ar,
          ...(rootName !== fieldName
            ? {
                [propertyName[fieldName] + " ID"]: data.id,
                [propertyName[fieldName] + " 명"]: data.name,
              }
            : {}),
        }));

        rtnDatas = arr;
      }
    }
  });

  return rtnDatas;
}

export function dataToExcel(data: Data): string {
  // 배열 타입인지 객체 타입인지의 판단이 중요
  let isArray = false;
  let startRowIdx;

  // self-in
  // 사용자가 path 없이 검색
  if (data.buildings) {
    isArray = true;
    startRowIdx = 0;
  }
  // 사용자가 buildingId 검색
  else if (data.building) startRowIdx = 0;
  // 사용자가 unitId 검색
  else if (data.unit) startRowIdx = 2;
  // 사용자가 sensorId 검색
  else startRowIdx = 4;

  // XLSX Config
  const book = XLSX.utils.book_new();
  const wb = book;

  // DataConfig
  let col = "A";
  let row = "1";
  const sheetInfo: SheetInfo = {
    infoNames: [],
    rowSize: 0,
    depthRowSize: {},
  };
  console.log("setCellJson");

  getInfoNames(data, sheetInfo, "buildings");
  getRowSize(data, sheetInfo, "buildings");
  setDepthRowSize(data, sheetInfo, "buildings");

  const modelHeaders = REQUIRED_HEADER.slice(startRowIdx);
  const headers = modelHeaders.concat(sheetInfo.infoNames);

  const colWidth = headers.map(() => ({
    wpx: 170,
  }));
  const merges: XLSX.Range[] = [];
  setMerges(merges, modelHeaders, sheetInfo);
  // header config
  // timeReports가 있을 때 까지 들어가서 배열 형태의 headerName 반환

  const json = setCellJson(data, "buildings", "buildings");
  let sheet = XLSX.utils.json_to_sheet(json, {
    header: headers,
    skipHeader: false,
  });
  sheet["!cols"] = colWidth;
  sheet["!merges"] = merges;
  XLSX.utils.book_append_sheet(book, sheet, "HUMAN DATA");

  // Config Style
  headers.forEach((headerName) => {
    const cr = col + row;
    wb.Sheets["HUMAN DATA"][cr] = {
      v: headerName,
      s: {
        font: {
          bold: true,
          sz: "14",
        },
      },
    };
    col = String.fromCharCode(col.charCodeAt(0) + 1);
  });

  Array.from({ length: sheetInfo.rowSize }).forEach((_, r: number) => {
    const excludeHeader = r + 1;
    modelHeaders.forEach((_, c: number) => {
      const col = String.fromCharCode("A".charCodeAt(0) + c);
      const cr = col + excludeHeader;

      wb.Sheets["HUMAN DATA"][cr] = {
        v: json[r][modelHeaders[c]],
        s: {
          alignment: {
            vertical: "top",
          },
        },
      };
    });
  });

  // merging
  // 사용자가 path 없이 검색
  if (startRowIdx === 0 && isArray) {
  }
  // 사용자가 buildingId 검색
  else if (startRowIdx === 0) {
  }
  // 사용자가 unitId 검색
  else if (startRowIdx === 2) {
  }
  // 사용자가 sensorId 검색
  else {
  }

  return XLSXSTYLE.write(wb, {
    bookType: "xlsx",
    bookSST: false,
    type: "binary",
  });
}
