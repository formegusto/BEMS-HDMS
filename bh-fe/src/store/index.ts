import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import sessionCert from "./sessionCert";
import apiApplication from "./apiApplication";
import console from "./console";
import information from "./information";

const rootReducer = combineReducers({
  auth,
  sessionCert,
  alert,
  apiApplication,
  console,
  information,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
