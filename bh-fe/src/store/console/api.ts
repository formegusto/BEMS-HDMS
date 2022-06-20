import axios from "axios";
import { ConsolePath, RequestConsole } from "./types";
import qs from "qs";

const BASEPATH = "/api/bems-hdms";
const PATH_SEQUENCE = ["buildingId", "unitId", "sensorId"];

function PATH_GENERATE(pathObj: ConsolePath): string {
  let path = "";

  for (let i = 0; i < PATH_SEQUENCE.length; i++) {
    if (!pathObj[PATH_SEQUENCE[i]]) break;
    path += `/${pathObj[PATH_SEQUENCE[i]]}`;
  }

  return path;
}

export const ConsoleApi = (req: RequestConsole) =>
  axios.get(
    `${process.env.REACT_APP_API_SERVER}${BASEPATH}${PATH_GENERATE(
      req.path
    )}?${qs.stringify(req.query, { skipNulls: true })}`,
    {
      headers: {
        ...req.header,
      },
    }
  );
