import createActionTypes from "src/utils/createActionTypes";

// Data Type
export type RequestConsole = {
  header: ConsoleHeader;
  path: ConsolePath;
  query: ConsoleQuery;
};

export type ConsoleHeader = {
  [key: string]: any;
  accept: string;
  authorization: string;
};

export type ConsolePath = {
  [key: string]: any;
  buildingId?: number | null;
  unitId?: number | null;
  sensorId?: number | null;
};

export type ConsoleQuery = {
  [key: string]: any;
  include?: string | null;
  exclude?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  interval?: string | null;
  limit?: string | null;
  offset?: string | null;
};

// Redux Action Type
export const INIT_CONSOLE = "console/init";
export const [REQUEST_API, REQUEST_API_SUCCESS, REQUEST_API_FAILURE] =
  createActionTypes("console/request");
export const DECRYPT_RESPONSE = "console/decrypt";
