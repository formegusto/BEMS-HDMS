import { createAction } from "redux-actions";
import {
  DECRYPT_RESPONSE,
  INIT_CONSOLE,
  RequestConsole,
  REQUEST_API,
} from "./types";

export const initConsole = createAction(INIT_CONSOLE);
export const requestApi = createAction<RequestConsole>(REQUEST_API);
export const decryptResponse = createAction<string>(DECRYPT_RESPONSE);
