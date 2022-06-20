import { createAction } from "redux-actions";
import { GetApplicationsQuery, GET_APPLICATIONS } from "./types";

export const getApplications = createAction<GetApplicationsQuery | null>(
  GET_APPLICATIONS
);
