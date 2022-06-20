import { createAction } from "redux-actions";
import { GET_INFOS, InfosPath, INIT_INFOS } from "./types";

export const initInfos = createAction(INIT_INFOS);
export const getInfos = createAction<string, InfosPath>(
  GET_INFOS,
  (infosPath) =>
    `/${infosPath.target}${infosPath.rootId ? `/${infosPath.rootId}` : ""}`
);
