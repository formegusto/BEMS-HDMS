import { createAction } from "redux-actions";
import { AlertData, HIDE_ALERT, SHOW_ALERT } from "./types";

export const showAlert = createAction<AlertData>(SHOW_ALERT);
export const hideAlert = createAction(HIDE_ALERT);
