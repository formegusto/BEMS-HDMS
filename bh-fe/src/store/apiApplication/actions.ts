import { createAction } from "redux-actions";
import { ApiApplication, APPLY_API, SET_NEW_APPLICATION } from "./types";

export const applyApi = createAction<ApiApplication, string>(
  APPLY_API,
  (purpose: string) => ({
    purpose,
  })
);

export const setNewApplication =
  createAction<ApiApplication>(SET_NEW_APPLICATION);
