import createActionType from "../../utils/createActionType";
import { Response } from "../types";

// Data Types
export interface ResponseUser extends Response<GetUsersResponse> {}

export type GetUsersQuery = {
  offset?: number;
};

export type GetUsersResponse = {
  currentPage: number;
  lastPage: number;
  count: number;
  users: UserAttributes[];
};

export type UserAttributes = {
  readonly id: number;
  username: string;
  password: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  role: UserRole;
};

export enum UserRole {
  user = "USER",
  admin = "ADMIN",
}

// Redux Action Types
export const [GET_USER_LIST, GET_USER_LIST_SUCCESS, GET_USER_LIST_FAILURE] =
  createActionType("user/get_user_list");
