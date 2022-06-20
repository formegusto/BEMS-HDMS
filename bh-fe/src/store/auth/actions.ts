import { createAction } from "redux-actions";
import { ApiApplication } from "../apiApplication/types";
import { Request } from "../types";
import {
  CHECK,
  LOGOUT,
  RequestSignIn,
  RequestSignUp,
  SETAUTH,
  SET_AUTH_NEW_APPLICATION,
  SIGNIN,
  SIGNUP,
} from "./types";

export const signIn = createAction<Request<RequestSignIn>>(SIGNIN);
export const signUp = createAction<Request<RequestSignUp>>(SIGNUP);
export const check = createAction(CHECK);
export const setAuth = createAction<string>(SETAUTH);
export const setNewApplication = createAction<ApiApplication>(
  SET_AUTH_NEW_APPLICATION
);
export const logout = createAction(LOGOUT);
