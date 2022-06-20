import createActionTypes from "src/utils/createActionTypes";
import { Response } from "../types";

// DataType
export type ResponseGetInfo = Response<{
  target: "building" | "unit" | "sensor";
  data: Building[] | Unit[] | Sensor[];
}>;

export type InfosPath = {
  target: "building" | "unit" | "sensor";
  rootId?: number;
};

export type Building = {
  id: number;
  name: string;
  image?: string;
};

export type Unit = {
  id: number;
  name: string;
};

export type Sensor = Unit & {
  timeReports: Report[];
};

export type Report = {
  [key: string]: any;
  createdAt: string;

  isStay?: boolean;
  residentCount?: number;
  temperature?: number;
  humidity?: number;
  lux?: number;
  skinTemperature?: number;
  residentDistribution?: number;
  satisfaction?: number;
};

export const ReportToKr: { [key: string]: any } = {
  isStay: "재실유무",
  residentCount: "거주자 수",
  temperature: "온도",
  humidity: "습도",
  lux: "조도",
  skinTemperature: "피부온도",
  residentDistribution: "거주자 분포",
  satisfaction: "만족도",
};

// Redux Action Type
export const [GET_INFOS, GET_INFOS_SUCCESS, GET_INFOS_FAILURE] =
  createActionTypes("info/get_infos");
export const [INIT_INFOS] = createActionTypes("info/init_infos");
