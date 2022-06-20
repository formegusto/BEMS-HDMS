import { GET_APPLICATIONS_SUCCESS } from "./types";
import { Response } from "../types";
import { GetApplicationsResponse } from "./types";
import { handleActions } from "redux-actions";

type ApiApplicationStore = {
  applications?: GetApplicationsResponse | null;
};

const apiApplicationStore: ApiApplicationStore = {
  applications: null,
};

type Payload = Response<GetApplicationsResponse>;
const apiApplicationReducer = handleActions<ApiApplicationStore, Payload>(
  {
    [GET_APPLICATIONS_SUCCESS]: (state, action) => ({
      ...state,
      applications: {
        ...action.payload,
      },
    }),
  },
  apiApplicationStore
);
export default apiApplicationReducer;
