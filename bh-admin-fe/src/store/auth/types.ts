import createActionType from "../../utils/createActionType";
import { Response } from "../types";

// data types
export interface ResponseAuth
  extends Response<{
    token?: string;
    user?: UserData;
  }> {}

export interface SignInInput {
  username: string;
  password: string;
}

export interface UserData {
  id: number;
  username: string;
  role: string;
  name: string;
  organization: string;
}

// redux action types
export const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] =
  createActionType("auth/signin");
export const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createActionType("auth/check");
