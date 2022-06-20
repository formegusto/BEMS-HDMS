import createActionType from "src/utils/createActionType";

export type GetApplicationsResponse = {
  currentPage: number;
  lastPage: number;
  count: number;
  applications: ApiApplicationData[];
};

export enum ApiApplicationStatus {
  INACTIVE = "inactive",
  WAITING = "waiting",
  ACTIVE = "active",
}

export type ApiApplicationData = {
  id: number;
  purpose: string;
  status: ApiApplicationStatus;
  apiKey: string;
  symmetricKey: string;
  user: {
    username: string;
  };
};

export type GetApplicationsQuery = {
  offset?: number;
};

export const [
  GET_APPLICATIONS,
  GET_APPLICATIONS_SUCCESS,
  GET_APPLICATIONS_FAILURE,
] = createActionType("apiApplication/get_list");
