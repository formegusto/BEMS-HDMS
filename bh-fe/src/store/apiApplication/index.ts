import { handleActions } from "redux-actions";
import {
  ApiApplication,
  APPLY_API_SUCCESS,
  ResponseApiApplication,
} from "./types";

type ApiApplicationStore = {
  apiApplication: ApiApplication | null;
};

const apiApplicationStore: ApiApplicationStore = {
  apiApplication: null,
};

type Payload = ResponseApiApplication;
const apiApplicationReducer = handleActions<ApiApplicationStore, Payload>(
  {
    [APPLY_API_SUCCESS]: (state, action) => ({
      ...state,
      apiApplication: action.payload.apiApplication
        ? action.payload.apiApplication
        : null,
    }),
  },
  apiApplicationStore
);
export default apiApplicationReducer;
