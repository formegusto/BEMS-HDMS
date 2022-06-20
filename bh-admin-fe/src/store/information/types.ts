import createActionType from "src/utils/createActionType";
import { Response } from "../types";

// DataType
export type ResponseGetInfo = Response<{
  target: "building" | "unit" | "sensor" | "report";
  data: Building[] | Unit[] | Sensor[] | Report[];
}>;

export type InfosPath = {
  target: "building" | "unit" | "sensor" | "report";
  rootId?: number;
};

export type Building = {
  id?: number;
  name?: string;
  image?: string;
};

export type Unit = {
  id?: number;
  name?: string;
};

export interface Sensor extends Unit {}

export type Report = {
  [key: string]: any;
  createdAt?: string;

  isStay?: boolean;
  residentCount?: number;
  temperature?: number;
  humidity?: number;
  lux?: number;
  skinTemperature?: number;
  residentDistribution?: number;
  satisfaction?: number;
};

export type UPDATE_DATA = {
  id?: number;
  name?: string;
  image?: Blob | string;
};

export type VIEWMODE = {
  rootId?: string | null;
  type: "create" | "update";
  target: "building" | "unit" | "sensor";
};

export const [GET_INFOS, GET_INFOS_SUCCESS, GET_INFOS_FAILURE] =
  createActionType("info/get_infos");
export const INIT_INFOS = "info/init";
export const OPEN_CREATE_MODE = "info/create_mode/open";
export const CLOSE_CREATE_MODE = "info/create_mode/close";
export const OPEN_UPDATE_MODE = "info/update_mode/open";
export const CLOSE_UPDATE_MODE = "info/update_mode/close";
