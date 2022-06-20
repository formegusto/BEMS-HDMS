import { handleActions } from "redux-actions";
import { API_STATUS } from "../apiApplication/types";
import { CommonStoreShape } from "../types";
import {
  CHECK_FAILURE,
  CHECK_SUCCESS,
  CLEANAUTH,
  ResponseAuth,
  SETAUTH,
  SET_AUTH_NEW_APPLICATION,
  SIGNIN_SUCCESS,
  SIGNUP_SUCCESS,
  UserData,
} from "./types";

type AuthStore = CommonStoreShape<{
  auth?: string | null;
  user?: UserData | null;
}>;

const authStore: AuthStore = {
  error: false,
  auth: null,
  user: null,
};

type Payload = ResponseAuth;
const authReducer = handleActions<AuthStore, Payload>(
  {
    [SIGNIN_SUCCESS]: (state, action) => ({
      ...state,
      auth: action.payload.token,
      error: false,
    }),
    [SIGNUP_SUCCESS]: (state, action) => ({
      ...state,
      auth: action.payload.token,
      error: false,
    }),
    [CHECK_SUCCESS]: (state, action) => ({
      ...state,
      user: action.payload.user
        ? {
            ...action.payload.user,
            apiApplication:
              action.payload.user.apiApplication === null
                ? {
                    status: API_STATUS.NONE,
                  }
                : action.payload.user.apiApplication,
          }
        : null,
      error: false,
    }),
    [CHECK_FAILURE]: (state) => ({
      ...state,
      auth: null,
      user: null,
      error: true,
    }),
    [SETAUTH]: (state, action) => ({
      ...state,
      auth: action.payload as any,
      error: false,
    }),
    [SET_AUTH_NEW_APPLICATION]: (state, action: any) => ({
      ...state,
      user: state.user
        ? {
            ...state.user,
            apiApplication: action.payload,
          }
        : null,
      error: false,
    }),
    [CLEANAUTH]: () => ({
      error: false,
      user: null,
      auth: null,
    }),
  },
  authStore
);

export default authReducer;
