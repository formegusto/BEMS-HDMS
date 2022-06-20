import { createAction } from "redux-actions";
import {
  OPEN_CREATE_MODE,
  GET_INFOS,
  InfosPath,
  UPDATE_DATA,
  OPEN_UPDATE_MODE,
  VIEWMODE,
  CLOSE_CREATE_MODE,
  INIT_INFOS,
} from "./types";

export const getInfos = createAction<string, InfosPath>(
  GET_INFOS,
  (info) => `/${info.target}${info.rootId ? `/${info.rootId}` : ""}`
);
export const initInfos = createAction(INIT_INFOS);
export const createMode = createAction<VIEWMODE>(OPEN_CREATE_MODE);
export const closeCreateMode = createAction(CLOSE_CREATE_MODE);
export const updateMode =
  createAction<{ viewMode: VIEWMODE; updateData: UPDATE_DATA }>(
    OPEN_UPDATE_MODE
  );
