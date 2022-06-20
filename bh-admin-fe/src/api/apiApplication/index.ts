import { GetApplicationsQuery } from "src/store/apiApplication/types";
import qs from "qs";
import client from "../client";

const BASEPATH = "/admin/apiService";

export const getApplicationList = (query: GetApplicationsQuery) =>
  client.get(`${BASEPATH}?${qs.stringify(query)}`);
export const patchApplication = (id: number, encBody: string) =>
  client.patch(`${BASEPATH}/${id}`, encBody);
