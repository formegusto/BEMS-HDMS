import { combineReducers } from "redux";
import user from "./user";
import auth from "./auth";
import sessionCert from "./sessionCert";
import update from "./update";
import apiApplication from "./apiApplication";
import information from "./information";

export const rootReducer = combineReducers({
  user,
  auth,
  sessionCert,
  update,
  apiApplication,
  information,
});
export type RootReducer = ReturnType<typeof rootReducer>;
