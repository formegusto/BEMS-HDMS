import { handleActions } from "redux-actions";
import { AlertData, HIDE_ALERT, SHOW_ALERT } from "./types";

type AlertStore = {
  open: boolean;
  alert: AlertData | null;
};

const alertStore: AlertStore = {
  open: false,
  alert: null,
};

type Payload = AlertData;
const alertReducer = handleActions<AlertStore, Payload>(
  {
    [SHOW_ALERT]: (state, action) => ({
      open: true,
      alert: action.payload,
    }),
    [HIDE_ALERT]: (state) => ({
      ...state,
      open: false,
    }),
  },
  alertStore
);

export default alertReducer;
