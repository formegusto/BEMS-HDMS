import { AxiosResponse } from "axios";
import createActionType from "src/utils/createActionType";

// Data Type
export type UpdateForm = {
  type: "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
  target: string;
  description: string;
  action: {
    requestInfo: {
      id?: number;
      body?: any;
      query?: any;
    };
    api: (...params: any[]) => Promise<AxiosResponse>;
  };
};

// Redux Action Type
export const ADD_UPDATE = "update/add";
export const REMOVE_UPDATE = "update/remove";
export const [SAVE_UPDATE, SAVE_UPDATE_SUCCESS, SAVE_UPDATE_FAILURE] =
  createActionType("update/save");
